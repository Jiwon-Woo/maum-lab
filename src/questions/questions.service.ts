import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { In, Repository } from 'typeorm';
import { Pagination } from 'src/utils/pagination';
import { CreateQuestionInput } from './dto/create-question.dto';
import { UpdateQuestionInput } from './dto/update-question.dto';
import { UpdateQuestionsOrderInput } from './dto/update-questions-order.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async findOneById(id: number) {
    const question = await this.questionRepository.findOne({ where: { id } });
    if (!question) {
      throw new BadRequestException();
    }
    return question;
  }

  async findByIds(ids: number[]) {
    return await this.questionRepository.find({ where: { id: In(ids) } });
  }

  async findBySurveyIds(surveyIds: number[]) {
    return await this.questionRepository.find({
      where: { surveyId: In(surveyIds) },
    });
  }

  async findAndCountBySurveyId(surveyId: number, pagination: Pagination) {
    const { page, pageSize } = pagination;
    return await this.questionRepository.findAndCount({
      where: { surveyId },
      order: { orderNumber: 'ASC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  async findOneByIdAndSurveyId(id: number, surveyId: number) {
    const question = await this.questionRepository.findOne({
      where: { id, surveyId },
      relations: ['options'],
    });
    if (!question) {
      throw new BadRequestException();
    }
    return question;
  }

  async getMaxOrder(surveyId: number) {
    const lastQuestion = await this.questionRepository.findOne({
      where: { surveyId },
      order: { orderNumber: 'DESC' },
    });
    return lastQuestion?.orderNumber ?? 0;
  }

  async create(questionInfo: CreateQuestionInput) {
    const maxOrderNumber = await this.getMaxOrder(questionInfo.surveyId);
    const question = this.questionRepository.create({
      ...questionInfo,
      orderNumber: maxOrderNumber + 1,
    });
    return await this.questionRepository.save(question);
  }

  async update(id: number, questionInfo: UpdateQuestionInput) {
    const question = await this.findOneById(id);
    const updatedQuestion = this.questionRepository.create({
      ...question,
      ...questionInfo,
    });
    return await this.questionRepository.save(updatedQuestion);
  }

  async updateOrder(questionsOrder: UpdateQuestionsOrderInput[]) {
    const ids = questionsOrder.map((question) => question.id);
    const questions = await this.findByIds(ids);
    if (questions.length !== ids.length) {
      throw new BadRequestException();
    }
    const updatedQuestions = questions.map((question) => {
      const questionInput = questionsOrder.find((q) => q.id === question.id)!;
      question.orderNumber = questionInput.orderNumber;
      return question;
    });
    return await this.questionRepository.save(updatedQuestions);
  }

  async delete(id: number) {
    const question = await this.questionRepository.findOne({
      where: { id },
      relations: ['options'],
    });
    if (!question) {
      throw new NotFoundException();
    }
    await this.questionRepository.softRemove(question);
  }
}

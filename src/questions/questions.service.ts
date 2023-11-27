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
    return await this.questionRepository.findOne({ where: { id } });
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
      order: { order: 'ASC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  async getMaxOrder(surveyId: number) {
    const lastQuestion = await this.questionRepository.findOne({
      where: { surveyId },
      order: { order: 'DESC' },
    });
    return lastQuestion?.order ?? 0;
  }

  async create(questionInfo: CreateQuestionInput) {
    const maxOrder = await this.getMaxOrder(questionInfo.surveyId);
    const question = this.questionRepository.create({
      ...questionInfo,
      order: maxOrder + 1,
    });
    return await this.questionRepository.save(question);
  }

  async update(id: number, questionInfo: UpdateQuestionInput) {
    const question = await this.findOneById(id);
    if (!question) {
      throw new BadRequestException();
    }
    const updatedQuestion = { ...question, ...questionInfo };
    return await this.questionRepository.save(updatedQuestion);
  }

  async updateOrder(questionsInput: UpdateQuestionsOrderInput[]) {
    const ids = questionsInput.map((question) => question.id);
    const questions = await this.findByIds(ids);
    if (questions.length !== questionsInput.length) {
      throw new BadRequestException();
    }
    const updatedQuestions = ids.map((id, index) => {
      const question = questions.find((q) => q.id === id)!;
      question.order = index + 1;
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

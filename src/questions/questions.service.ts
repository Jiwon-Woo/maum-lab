import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { Pagination } from 'src/utils/pagination';
import { CreateQuestionInput } from './dto/create-question.dto';
import { UpdateQuestionInput } from './dto/update-question.dto';
import { UpdateQuestionsOrderInput } from './dto/update-questions-order.dto';
import { FilterQuestionInput } from './dto/fillter-question.dto';
import { errorLogMessage } from 'src/utils/log-message';
import { ErrorMessage } from 'src/utils/error-message';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}
  private readonly logger = new Logger(QuestionsService.name);

  async findOneById(id: number) {
    const question = await this.questionRepository.findOne({ where: { id } });
    if (!question) {
      this.logger.error(errorLogMessage('findOneById'), id);
      throw new BadRequestException(ErrorMessage.QUESTION_NOT_FOUND);
    }
    return question;
  }

  async findByIds(ids: number[]) {
    const questions = await this.questionRepository.find({
      where: { id: In(ids) },
    });
    if (questions.length !== ids.length) {
      this.logger.error(errorLogMessage('findByIds'), ids, questions);
      throw new BadRequestException(ErrorMessage.INVALID_IDS);
    }
    return questions;
  }

  async findBySurveyIds(surveyIds: number[]) {
    return await this.questionRepository.find({
      where: { surveyId: In(surveyIds) },
    });
  }

  async findAndCount(
    questionFilter: FilterQuestionInput,
    pagination: Pagination,
  ) {
    const { page, pageSize } = pagination;
    const where: FindOptionsWhere<Question> = {};
    where.surveyId = questionFilter?.surveyId;

    return await this.questionRepository.findAndCount({
      where: { ...where },
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
      this.logger.error(
        errorLogMessage('findOneByIdAndSurveyId'),
        id,
        surveyId,
      );
      throw new BadRequestException(ErrorMessage.QUESTION_NOT_FOUND_IN_SURVEY);
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

  async updateOrder(updateQuestionsOrderInput: UpdateQuestionsOrderInput) {
    const { questionsOrder, surveyId } = updateQuestionsOrderInput;
    const ids = questionsOrder.map((question) => question.id);
    const questions = await this.questionRepository.find({
      where: {
        surveyId,
        id: In(ids),
      },
    });
    if (questions.length !== ids.length) {
      this.logger.error(
        errorLogMessage('updateOrder'),
        updateQuestionsOrderInput,
        ids,
        questions,
      );
      throw new BadRequestException(ErrorMessage.INVALID_IDS);
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
      this.logger.error(errorLogMessage('delete'), id);
      throw new BadRequestException(ErrorMessage.QUESTION_NOT_FOUND);
    }
    await this.questionRepository.softRemove(question);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { In, Repository } from 'typeorm';
import { Pagination } from 'src/utils/pagination';

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
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { Pagination } from 'src/utils/pagination';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async findById(id: number) {
    return await this.questionRepository.findOne({ where: { id } });
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

  async findSurveyById(id: number) {
    const question = await this.questionRepository.findOne({
      where: { id },
      relations: ['survey'],
    });
    return question?.survey;
  }

  async findOptionsById(id: number) {
    const question = await this.questionRepository.findOne({
      where: { id },
      relations: ['options'],
    });
    return question?.options;
  }
}

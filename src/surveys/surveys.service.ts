import { Injectable } from '@nestjs/common';
import { Survey } from './entities/survey.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/utils/pagination';

@Injectable()
export class SurveysService {
  constructor(
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,
  ) {}

  async findAndCount(pagination: Pagination) {
    const { page, pageSize } = pagination;
    return await this.surveyRepository.findAndCount({
      order: {
        id: 'ASC',
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  async findById(id: number) {
    return await this.surveyRepository.findOne({ where: { id } });
  }

  async findQuestionsById(id: number) {
    const survey = await this.surveyRepository.findOne({
      where: { id },
      relations: ['questions'],
    });
    return survey?.questions;
  }
}

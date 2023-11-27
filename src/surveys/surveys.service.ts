import { Injectable } from '@nestjs/common';
import { Survey } from './entities/survey.entity';
import { Repository, In } from 'typeorm';
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

  async findOneById(id: number) {
    return await this.surveyRepository.findOne({ where: { id } });
  }

  async findByIds(ids: number[]) {
    return await this.surveyRepository.find({ where: { id: In(ids) } });
  }
}

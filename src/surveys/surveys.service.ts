import { Injectable } from '@nestjs/common';
import { SurveyEntity } from './entities/survey.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SurveysService {
  constructor(
    @InjectRepository(SurveyEntity)
    private surveyRepository: Repository<SurveyEntity>,
  ) {}

  async findAll() {
    return await this.surveyRepository.find();
  }
}

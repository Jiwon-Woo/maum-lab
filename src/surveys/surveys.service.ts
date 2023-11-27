import { Injectable, NotFoundException } from '@nestjs/common';
import { Survey } from './entities/survey.entity';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/utils/pagination';
import { CreateSurveyInput } from './dto/create-survey.dto';
import { UpdateSurveyInput } from './dto/update-survey.dto';

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

  async create(surveyInfo: CreateSurveyInput) {
    const survey = this.surveyRepository.create(surveyInfo);
    return await this.surveyRepository.save(survey);
  }

  async update(id: number, surveyInfo: UpdateSurveyInput) {
    const survey = await this.findOneById(id);
    if (!survey) {
      throw new NotFoundException();
    }
    const updatedSurvey = { ...survey, ...surveyInfo };
    return await this.surveyRepository.save(updatedSurvey);
  }

  async delete(id: number) {
    const survey = await this.surveyRepository.findOne({
      where: { id },
      relations: ['questions', 'questions.options'],
    });
    if (!survey) {
      throw new NotFoundException();
    }
    await this.surveyRepository.softRemove(survey);
  }
}

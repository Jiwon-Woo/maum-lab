import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Survey } from './entities/survey.entity';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/utils/pagination';
import { CreateSurveyInput } from './dto/create-survey.dto';
import { UpdateSurveyInput } from './dto/update-survey.dto';
import { errorLogMessage } from 'src/utils/log-message';
import { ErrorMessage } from 'src/utils/error-message';

@Injectable()
export class SurveysService {
  constructor(
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,
  ) {}
  private readonly logger = new Logger(SurveysService.name);

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
    const survey = await this.surveyRepository.findOne({ where: { id } });
    if (!survey) {
      this.logger.error(errorLogMessage('findOneById'), id);
      throw new BadRequestException(ErrorMessage.SURVEY_NOT_FOUND);
    }
    return survey;
  }

  async findByIds(ids: number[]) {
    const surveys = await this.surveyRepository.find({
      where: { id: In(ids) },
    });
    if (surveys.length !== ids.length) {
      this.logger.error(errorLogMessage('findByIds'), ids, surveys);
      throw new BadRequestException(ErrorMessage.INVALID_IDS);
    }
    return surveys;
  }

  async create(surveyInfo: CreateSurveyInput) {
    const survey = this.surveyRepository.create(surveyInfo);
    return await this.surveyRepository.save(survey);
  }

  async update(id: number, surveyInfo: UpdateSurveyInput) {
    const survey = await this.findOneById(id);
    const updatedSurvey = this.surveyRepository.create({
      ...survey,
      ...surveyInfo,
    });
    return await this.surveyRepository.save(updatedSurvey);
  }

  async delete(id: number) {
    const survey = await this.surveyRepository.findOne({
      where: { id },
      relations: ['questions', 'questions.options'],
    });
    if (!survey) {
      this.logger.error(errorLogMessage('delete'), id);
      throw new BadRequestException(ErrorMessage.SURVEY_NOT_FOUND);
    }
    await this.surveyRepository.softRemove(survey);
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionAnswer } from './entities/question-answer.entity';
import { FindOptionsWhere, Repository, In } from 'typeorm';
import { CreateSurveyAnswerInput } from './dto/create-survey-answer.dto';
import { Pagination } from 'src/utils/pagination';
import { SurveyAnswer } from './entities/survey-answer.entity';
import { FilterSurveyAnswerInput } from './dto/filter-survey-answer.dto';
import { CreateQuestionAnswerInput } from './dto/create-question-answer.dto';
import { UpdateQuestionAnswerInput } from './dto/update-question-answer.dto';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(QuestionAnswer)
    private questionAnswerRepository: Repository<QuestionAnswer>,
    @InjectRepository(SurveyAnswer)
    private surveyAnswerRepository: Repository<SurveyAnswer>,
  ) {}

  async findAndCountQuestionAnswer(
    surveyAnswerId: number,
    pagination: Pagination,
  ) {
    const { page, pageSize } = pagination;
    return await this.questionAnswerRepository.findAndCount({
      where: { surveyAnswerId },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  async findOneQuestionAnswerById(id: number) {
    const questionAnswer = await this.questionAnswerRepository.findOne({
      where: { id },
    });
    if (!questionAnswer) {
      throw new BadRequestException();
    }
    return questionAnswer;
  }

  async createQuestionAnswer(questionAnswerInfo: CreateQuestionAnswerInput) {
    const questionAnswer =
      this.questionAnswerRepository.create(questionAnswerInfo);
    return await this.questionAnswerRepository.save(questionAnswer);
  }

  async updateQuestionAnswer(
    id: number,
    questionAnswerInfo: UpdateQuestionAnswerInput,
  ) {
    const questionAnswer = await this.findOneQuestionAnswerById(id);
    const updatedQuestionAnswer = this.questionAnswerRepository.create({
      ...questionAnswer,
      ...questionAnswerInfo,
    });
    return await this.questionAnswerRepository.save(updatedQuestionAnswer);
  }

  async deleteQuestionAnswer(id: number) {
    const questionAnswer = await this.findOneQuestionAnswerById(id);
    await this.questionAnswerRepository.softRemove(questionAnswer);
  }

  async findAndCountSurveyAnswer(
    surveyAnswerFilter: FilterSurveyAnswerInput,
    pagination: Pagination,
  ) {
    const { page, pageSize } = pagination;
    const where: FindOptionsWhere<SurveyAnswer> = {};
    where.surveyId = surveyAnswerFilter?.surveyId;
    where.userCode = surveyAnswerFilter?.userCode;

    return await this.surveyAnswerRepository.findAndCount({
      where: { ...where },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  async getAnswersTotalScore(ids: number[]) {
    const answers = await this.questionAnswerRepository
      .createQueryBuilder()
      .select('SUM(option.score)', 'totalScore')
      .addSelect('survey_answer_id', 'surveyAnswerId')
      .innerJoin('option', 'option', 'option.id = selected_option_id')
      .where('survey_answer_id IN (:...ids)', { ids })
      .groupBy('survey_answer_id')
      .getRawMany<{
        totalScore: number;
        surveyAnswerId: number;
      }>();
    return answers;
  }

  async findOneSurveyAnswerById(id: number) {
    const surveyAnswer = await this.surveyAnswerRepository.findOne({
      where: { id },
    });
    if (!surveyAnswer) {
      throw new BadRequestException();
    }
    return surveyAnswer;
  }

  async createSurveyAnswer(surveyAnswerInfo: CreateSurveyAnswerInput) {
    const surveyAnswer = this.surveyAnswerRepository.create(surveyAnswerInfo);
    return await this.surveyAnswerRepository.save(surveyAnswer);
  }

  async completeSurveyAnswer(id: number) {
    const surveyAnswer = await this.findOneSurveyAnswerById(id);
    if (surveyAnswer.completedAt) {
      throw new BadRequestException();
    }
    await this.surveyAnswerRepository.update(id, {
      completedAt: () => 'CURRENT_TIMESTAMP(6)',
    });
  }

  async deleteSurveyAnswer(id: number) {
    const surveyAnswer = await this.surveyAnswerRepository.findOne({
      where: { id },
      relations: ['questionAnwers'],
    });
    if (!surveyAnswer) {
      throw new BadRequestException();
    }
    await this.surveyAnswerRepository.softRemove(surveyAnswer);
  }

  async findSurveyAnswerByIds(ids: number[]) {
    return await this.surveyAnswerRepository.find({
      where: { id: In(ids) },
    });
  }

  async findQuestionAnswerBySurveyAnswerId(surveyAnswerIds: number[]) {
    return await this.questionAnswerRepository.find({
      where: { surveyAnswerId: In(surveyAnswerIds) },
    });
  }
}

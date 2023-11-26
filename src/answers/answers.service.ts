import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { Repository } from 'typeorm';
import { SurveyResponse } from './dto/survey-response.dto';
import { Pagination } from 'src/utils/pagination';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer) private answerRepository: Repository<Answer>,
  ) {}

  async findById(id: number) {
    return await this.answerRepository.findOne({ where: { id } });
  }

  async findAndCountBySurveyResponse(
    surveyResponse: SurveyResponse,
    pagination: Pagination,
  ) {
    const { surveyId, userCode } = surveyResponse;
    const { page, pageSize } = pagination;

    return await this.answerRepository.findAndCount({
      where: {
        question: {
          surveyId,
        },
        userCode,
      },
      relations: ['question'],
      order: {
        question: {
          order: 'ASC',
        },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  async getTotalScore(surveyResponse: SurveyResponse) {
    const { surveyId, userCode } = surveyResponse;

    const answers = await this.answerRepository
      .createQueryBuilder()
      .select('SUM(option.score)', 'totalScore')
      .innerJoin('question', 'question', 'question.id = question_id')
      .innerJoin('option', 'option', 'option.id = option_id')
      .where('question.survey_id = :surveyId', { surveyId })
      .andWhere('user_code = :userCode', { userCode })
      .getRawOne<{ totalScore: number }>();
    return answers?.totalScore;
  }

  async findQuestionById(id: number) {
    const answer = await this.answerRepository.findOne({
      where: { id },
      relations: ['question'],
    });
    return answer?.question;
  }

  async findOptionById(id: number) {
    const answer = await this.answerRepository.findOne({
      where: { id },
      relations: ['option'],
    });
    return answer?.option;
  }
}

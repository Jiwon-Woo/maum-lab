import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { SurveyAnswer } from '../entities/survey-answer.entity';
import { BadRequestException, Logger } from '@nestjs/common';
import { CreateSurveyAnswerInput } from '../dto/create-survey-answer.dto';
import { SurveysService } from 'src/surveys/surveys.service';
import { AnswersService } from '../answers.service';
import { FilterSurveyAnswerInput } from '../dto/filter-survey-answer.dto';
import { Pagination } from 'src/utils/pagination';
import { SurveyAnswersConnection } from '../dto/survey-answers.dto';
import { SurveyLoader } from '../../surveys/survey.loader';
import { QuestionAnswer } from '../entities/question-answer.entity';
import { Survey } from 'src/surveys/entities/survey.entity';
import { AnswerLoader } from '../answer.loader';

@Resolver(SurveyAnswer)
export class SurveyAnswerResolver {
  constructor(
    private answersService: AnswersService,
    private answerLoader: AnswerLoader,
    private surveysService: SurveysService,
    private surveyLoader: SurveyLoader,
  ) {}
  private readonly logger = new Logger(SurveyAnswerResolver.name);

  @Query(() => SurveyAnswersConnection, {
    description: '유저가 설문지에 답변한 정보 전체 조회',
  })
  async allSurveyAnswers(
    @Args('surveyAnswerFilter', { nullable: true })
    surveyAnswerFilter: FilterSurveyAnswerInput,
    @Args('pagination', { nullable: true })
    pagination: Pagination = new Pagination(),
  ) {
    const { pageSize } = pagination;
    const [surveyAnswers, count] =
      await this.answersService.findAndCountSurveyAnswer(
        surveyAnswerFilter,
        pagination,
      );
    return new SurveyAnswersConnection(surveyAnswers, count, pageSize);
  }

  @Query(() => SurveyAnswer, {
    description: '고유 아이디로 유저가 설문지에 응시한 정보 조회',
  })
  async surveyAnswer(
    @Args('surveyAnswerId', {
      type: () => Int,
      description: '유저가 설문지에 응시한 정보의 고유 아이디',
    })
    id: number,
  ) {
    return await this.answersService.findOneSurveyAnswerById(id);
  }

  @Mutation(() => SurveyAnswer, { description: '유저가 설문지 응답 시작' })
  async createSurveyAnswer(
    @Args('surveyAnswerInfo') surveyAnswerInfo: CreateSurveyAnswerInput,
  ) {
    const { surveyId } = surveyAnswerInfo;
    const survey = await this.surveysService.findOneById(surveyId);
    if (!survey) {
      throw new BadRequestException();
    }
    return this.answersService.createSurveyAnswer(surveyAnswerInfo);
  }

  @Mutation(() => Boolean, { description: '유저가 설문지 응답 완료' })
  async completeSurveyAnswer(
    @Args('surveyAnswerId', {
      type: () => Int,
      description: '유저가 설문지에 응답한 정보의 고유 아이디',
    })
    id: number,
  ) {
    await this.answersService.completeSurveyAnswer(id);
    return true;
  }

  @Mutation(() => Boolean, { description: '유저가 설문지 응답한 정보를 삭제' })
  async deleteSurveyAnswer(
    @Args('surveyAnswerId', {
      type: () => Int,
      description: '유저가 설문지에 응답한 정보의 고유 아이디',
    })
    id: number,
  ) {
    await this.answersService.deleteSurveyAnswer(id);
    return true;
  }

  @ResolveField(() => Survey)
  async survey(@Parent() surveyAnswer: SurveyAnswer) {
    return await this.surveyLoader.findOneById.load(surveyAnswer.surveyId);
  }

  @ResolveField(() => [QuestionAnswer])
  async questionAnwers(@Parent() surveyAnswer: SurveyAnswer) {
    return await this.answerLoader.findQuestionAnswerBySurveyAnswerId.load(
      surveyAnswer.id,
    );
  }

  @ResolveField(() => Int, {
    nullable: true,
    description: '유저의 설문지 응답 총점',
  })
  async totalScore(@Parent() surveyAnswer: SurveyAnswer) {
    return await this.answerLoader.getAnswersTotalScore.load(surveyAnswer);
  }
}

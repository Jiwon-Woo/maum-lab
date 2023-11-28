import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Args,
  Int,
  Mutation,
} from '@nestjs/graphql';
import { Survey } from '../entities/survey.entity';
import { SurveysService } from '../surveys.service';
import { Question } from 'src/questions/entities/question.entity';
import { Pagination } from 'src/utils/pagination';
import { SurveysConnection } from '../dto/surveys.dto';
import { QuestionLoader } from 'src/questions/question.loader';
import { CreateSurveyInput } from '../dto/create-survey.dto';
import { UpdateSurveyInput } from '../dto/update-survey.dto';

@Resolver(Survey)
export class SurveyResolver {
  constructor(
    private surveysService: SurveysService,
    private questionLoader: QuestionLoader,
  ) {}

  @Query(() => SurveysConnection, { description: '전체 설문지 조회' })
  async allSurveys(
    @Args('pagination', { nullable: true })
    pagination: Pagination = new Pagination(),
  ) {
    const { pageSize } = pagination;
    const [surveys, count] = await this.surveysService.findAndCount(pagination);
    return new SurveysConnection(surveys, count, pageSize);
  }

  @Query(() => Survey, {
    description: '고유 아이디로 특정 설문지 조회',
  })
  async survey(
    @Args('id', { type: () => Int, description: '설문지 고유 아이디' })
    id: number,
  ) {
    return await this.surveysService.findOneById(id);
  }

  @Mutation(() => Survey, { description: '설문지 생성' })
  async createSurvey(@Args('surveyInfo') surveyInfo: CreateSurveyInput) {
    return await this.surveysService.create(surveyInfo);
  }

  @Mutation(() => Survey, { description: '특정 설문지 수정' })
  async updateSurvey(
    @Args('surveyId', { type: () => Int, description: '설문지 고유 아이디' })
    id: number,
    @Args('surveyInfo') surveyInfo: UpdateSurveyInput,
  ) {
    return await this.surveysService.update(id, surveyInfo);
  }

  @Mutation(() => Boolean, { description: '특정 설문지 삭제' })
  async deleteSurvey(
    @Args('surveyId', { type: () => Int, description: '설문지 고유 아이디' })
    id: number,
  ) {
    await this.surveysService.delete(id);
    return true;
  }

  @ResolveField(() => [Question])
  async questions(@Parent() survey: Survey) {
    return await this.questionLoader.findBySurveyId.load(survey.id);
  }
}

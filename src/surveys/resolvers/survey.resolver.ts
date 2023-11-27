import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Args,
  Int,
} from '@nestjs/graphql';
import { Survey } from '../entities/survey.entity';
import { SurveysService } from '../surveys.service';
import { Question } from 'src/questions/entities/question.entity';
import { Pagination } from 'src/utils/pagination';
import { SurveysConnection } from '../dto/surveys.dto';
import { QuestionLoader } from 'src/questions/question.loader';

@Resolver(Survey)
export class SurveyResolver {
  constructor(
    private surveysService: SurveysService,
    private questionLoader: QuestionLoader,
  ) {}

  @Query(() => SurveysConnection, { description: '모든 설문지 조회' })
  async allSurveys(
    @Args('pagination', { nullable: true })
    pagination: Pagination = new Pagination(),
  ) {
    const { pageSize } = pagination;
    const [surveys, count] = await this.surveysService.findAndCount(pagination);
    return new SurveysConnection(surveys, count, pageSize);
  }

  @Query(() => Survey, {
    description: '설문지 고유 아이디를 통한 특정 설문지 조회',
  })
  async survey(
    @Args('id', { type: () => Int, description: '설문지 고유 아이디' })
    id: number,
  ) {
    return await this.surveysService.findOneById(id);
  }

  @ResolveField(() => [Question], { nullable: true })
  async questions(@Parent() survey: Survey) {
    return await this.questionLoader.findBySurveyId.load(survey.id);
  }
}

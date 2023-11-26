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

@Resolver(Survey)
export class SurveyResolver {
  constructor(private surveysService: SurveysService) {}

  @Query(() => SurveysConnection, { description: '모든 설문지 조회' })
  async allSurveys(@Args('pagination') pagination: Pagination) {
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
    return await this.surveysService.findById(id);
  }

  @ResolveField(() => [Question])
  async questions(@Parent() survey: Survey) {
    return await this.surveysService.findQuestionsById(survey.id);
  }
}

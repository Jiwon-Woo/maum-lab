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

@Resolver(Survey)
export class SurveyResolver {
  constructor(private surveysService: SurveysService) {}

  @Query(() => [Survey], { description: '모든 설문지 조회' })
  async allSurveys() {
    return await this.surveysService.findAll();
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

import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { SurveyEntity } from '../entities/survey.entity';
import { SurveysService } from '../surveys.service';
import { QuestionEntity } from 'src/question/entities/question.entity';
import { QuestionService } from 'src/question/question.service';

@Resolver(SurveyEntity)
export class SurveyResolver {
  constructor(
    private surveysService: SurveysService,
    private questionService: QuestionService,
  ) {}

  @Query(() => [SurveyEntity])
  async allSurveys() {
    return await this.surveysService.findAll();
  }

  @ResolveField(() => [QuestionEntity])
  async questions(@Parent() survey: SurveyEntity) {
    return await this.questionService.findBySurveyId(survey.id);
  }
}

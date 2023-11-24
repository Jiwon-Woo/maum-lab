import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { SurveyEntity } from '../entities/survey.entity';
import { SurveyService } from '../survey.service';
import { QuestionEntity } from 'src/question/entities/question.entity';
import { QuestionService } from 'src/question/resolvers/question.service';

@Resolver(SurveyEntity)
export class SurveyResolver {
  constructor(
    private surveyService: SurveyService,
    private questionService: QuestionService,
  ) {}

  @Query(() => [SurveyEntity])
  async allSurveys() {
    return await this.surveyService.findAll();
  }

  @ResolveField(() => [QuestionEntity])
  async questions(@Parent() survey: SurveyEntity) {
    return await this.questionService.findBySurveyId(survey.id);
  }
}

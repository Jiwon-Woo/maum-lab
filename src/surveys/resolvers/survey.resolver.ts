import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { SurveyEntity } from '../entities/survey.entity';
import { SurveysService } from '../surveys.service';
import { QuestionEntity } from 'src/questions/entities/question.entity';
import { QuestionsService } from 'src/questions/questions.service';

@Resolver(SurveyEntity)
export class SurveyResolver {
  constructor(
    private surveysService: SurveysService,
    private questionsService: QuestionsService,
  ) {}

  @Query(() => [SurveyEntity])
  async allSurveys() {
    return await this.surveysService.findAll();
  }

  @ResolveField(() => [QuestionEntity])
  async questions(@Parent() survey: SurveyEntity) {
    return await this.questionsService.findBySurveyId(survey.id);
  }
}

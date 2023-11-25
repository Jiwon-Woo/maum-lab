import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Survey } from '../entities/survey.entity';
import { SurveysService } from '../surveys.service';
import { Question } from 'src/questions/entities/question.entity';
import { QuestionsService } from 'src/questions/questions.service';

@Resolver(Survey)
export class SurveyResolver {
  constructor(
    private surveysService: SurveysService,
    private questionsService: QuestionsService,
  ) {}

  @Query(() => [Survey])
  async allSurveys() {
    return await this.surveysService.findAll();
  }

  @ResolveField(() => [Question])
  async questions(@Parent() survey: Survey) {
    return await this.questionsService.findBySurveyId(survey.id);
  }
}

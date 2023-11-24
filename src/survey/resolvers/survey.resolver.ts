import { Resolver, Query } from '@nestjs/graphql';
import { SurveyEntity } from '../entities/survey.entity';
import { SurveyService } from '../survey.service';

@Resolver(SurveyEntity)
export class SurveyResolver {
  constructor(private surveyService: SurveyService) {}

  @Query(() => [SurveyEntity])
  async surveys() {
    return await this.surveyService.findAll();
  }
}

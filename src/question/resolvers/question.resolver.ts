import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { QuestionEntity } from '../entities/question.entity';
import { QuestionService } from '../question.service';
import { SurveyEntity } from 'src/survey/entities/survey.entity';

@Resolver(QuestionEntity)
export class QuestionResolver {
  constructor(private questionService: QuestionService) {}

  @Query(() => [QuestionEntity])
  async allQuestions() {
    return await this.questionService.findAll();
  }

  @ResolveField(() => SurveyEntity)
  async survey(@Parent() question: QuestionEntity) {
    return await this.questionService.findSurveyById(question.id);
  }
}

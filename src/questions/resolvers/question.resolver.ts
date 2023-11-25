import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { QuestionEntity } from '../entities/question.entity';
import { QuestionsService } from '../questions.service';
import { SurveyEntity } from 'src/surveys/entities/survey.entity';

@Resolver(QuestionEntity)
export class QuestionResolver {
  constructor(private questionsService: QuestionsService) {}

  @Query(() => [QuestionEntity])
  async allQuestions() {
    return await this.questionsService.findAll();
  }

  @ResolveField(() => SurveyEntity)
  async survey(@Parent() question: QuestionEntity) {
    return await this.questionsService.findSurveyById(question.id);
  }
}

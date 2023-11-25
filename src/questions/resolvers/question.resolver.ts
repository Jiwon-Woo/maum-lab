import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Question } from '../entities/question.entity';
import { QuestionsService } from '../questions.service';
import { Survey } from 'src/surveys/entities/survey.entity';

@Resolver(Question)
export class QuestionResolver {
  constructor(private questionsService: QuestionsService) {}

  @Query(() => [Question])
  async allQuestions() {
    return await this.questionsService.findAll();
  }

  @ResolveField(() => Survey)
  async survey(@Parent() question: Question) {
    return await this.questionsService.findSurveyById(question.id);
  }
}

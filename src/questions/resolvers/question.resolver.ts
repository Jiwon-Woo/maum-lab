import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Question } from '../entities/question.entity';
import { QuestionsService } from '../questions.service';
import { Survey } from 'src/surveys/entities/survey.entity';

@Resolver(Question)
export class QuestionResolver {
  constructor(private questionsService: QuestionsService) {}

  @Query(() => [Question], {
    description: '설문지 고유 아이디를 통해 해당 설문지에 속한 문항 목록 조회',
  })
  async findQuestions(
    @Args('surveyId', { type: () => Int, description: '설문지 고유 아이디' })
    surveyId: number,
  ) {
    return await this.questionsService.findBySurveyId(surveyId);
  }

  @Query(() => Question, {
    description: '문항 고유 아이디를 통해 특정 문항 조회',
  })
  async question(
    @Args('id', { type: () => Int, description: '문항 고유 아이디' })
    id: number,
  ) {
    return await this.questionsService.findById(id);
  }

  @ResolveField(() => Survey)
  async survey(@Parent() question: Question) {
    return await this.questionsService.findSurveyById(question.id);
  }

  @ResolveField(() => [Option])
  async options(@Parent() question: Question) {
    return await this.questionsService.findOptionsById(question.id);
  }
}

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
import { Pagination } from 'src/utils/pagination';
import { QuestionsConnection } from '../dto/questions.dto';
import { OptionLoader } from '../../options/option.loader';
import { SurveyLoader } from 'src/surveys/survey.loader';

@Resolver(Question)
export class QuestionResolver {
  constructor(
    private questionsService: QuestionsService,
    private optionLoader: OptionLoader,
    private surveyLoader: SurveyLoader,
  ) {}

  @Query(() => QuestionsConnection, {
    description: '설문지 고유 아이디를 통해 해당 설문지에 속한 문항 목록 조회',
  })
  async getQuestions(
    @Args('surveyId', { type: () => Int, description: '설문지 고유 아이디' })
    surveyId: number,
    @Args('pagination', { nullable: true })
    pagination: Pagination = new Pagination(),
  ) {
    const { pageSize } = pagination;
    const [questions, count] =
      await this.questionsService.findAndCountBySurveyId(surveyId, pagination);
    return new QuestionsConnection(questions, count, pageSize);
  }

  @Query(() => Question, {
    description: '문항 고유 아이디를 통해 특정 문항 조회',
  })
  async question(
    @Args('id', { type: () => Int, description: '문항 고유 아이디' })
    id: number,
  ) {
    return await this.questionsService.findOneById(id);
  }

  @ResolveField(() => Survey)
  async survey(@Parent() question: Question) {
    return await this.surveyLoader.findOneById.load(question.surveyId);
  }

  @ResolveField(() => [Option])
  async options(@Parent() question: Question) {
    return await this.optionLoader.findByQuestionId.load(question.id);
  }
}

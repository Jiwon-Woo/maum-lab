import {
  Args,
  Int,
  Mutation,
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
import { CreateQuestionInput } from '../dto/create-question.dto';
import { SurveysService } from '../../surveys/surveys.service';
import { UpdateQuestionInput } from '../dto/update-question.dto';
import { UpdateQuestionsOrderInput } from '../dto/update-questions-order.dto';
import { FilterQuestionInput } from '../dto/fillter-question.dto';

@Resolver(Question)
export class QuestionResolver {
  constructor(
    private questionsService: QuestionsService,
    private optionLoader: OptionLoader,
    private surveysService: SurveysService,
    private surveyLoader: SurveyLoader,
  ) {}

  @Query(() => QuestionsConnection, {
    description: '전체 문항 조회',
  })
  async allQuestions(
    @Args('questionFilter', { nullable: true })
    questionFilter: FilterQuestionInput,
    @Args('pagination', { nullable: true })
    pagination: Pagination = new Pagination(),
  ) {
    const { pageSize } = pagination;
    const [questions, count] = await this.questionsService.findAndCount(
      questionFilter,
      pagination,
    );
    return new QuestionsConnection(questions, count, pageSize);
  }

  // TODO: question 없는 경우 예외 처리
  @Query(() => Question, {
    description: '고유 아이디로 특정 문항 조회',
  })
  async question(
    @Args('id', { type: () => Int, description: '문항 고유 아이디' })
    id: number,
  ) {
    return await this.questionsService.findOneById(id);
  }

  @Mutation(() => Question, { description: '문항 생성' })
  async createQuestion(
    @Args('questionInfo') questionInfo: CreateQuestionInput,
  ) {
    const { surveyId } = questionInfo;
    await this.surveysService.findOneById(surveyId);
    return await this.questionsService.create(questionInfo);
  }

  @Mutation(() => Question, { description: '특정 문항 수정' })
  async updateQuestion(
    @Args('questionId', { type: () => Int, description: '문항의 고유 아이디' })
    id: number,
    @Args('questionInfo') questionInfo: UpdateQuestionInput,
  ) {
    return await this.questionsService.update(id, questionInfo);
  }

  @Mutation(() => [Question], {
    description: '특정 설문지 내의 문항 순서 변경',
  })
  async updateQuestionsOrder(
    @Args('questionsOrderInfo', { type: () => UpdateQuestionsOrderInput })
    questionsOrderInfo: UpdateQuestionsOrderInput,
  ) {
    return await this.questionsService.updateOrder(questionsOrderInfo);
  }

  @Mutation(() => Boolean, { description: '특정 문항 삭제' })
  async deleteQuestion(
    @Args('questionId', { type: () => Int, description: '문항의 고유 아이디' })
    id: number,
  ) {
    await this.questionsService.delete(id);
    return true;
  }

  // TODO: survey 없는 경우 예외 처리
  @ResolveField(() => Survey)
  async survey(@Parent() question: Question) {
    return await this.surveyLoader.findOneById.load(question.surveyId);
  }

  @ResolveField(() => [Option])
  async options(@Parent() question: Question) {
    return await this.optionLoader.findByQuestionId.load(question.id);
  }
}

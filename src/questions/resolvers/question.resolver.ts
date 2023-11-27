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
import { BadRequestException } from '@nestjs/common';
import { UpdateQuestionInput } from '../dto/update-question.dto';
import { UpdateQuestionsOrderInput } from '../dto/update-questions-order.dto';

@Resolver(Question)
export class QuestionResolver {
  constructor(
    private questionsService: QuestionsService,
    private optionLoader: OptionLoader,
    private surveysService: SurveysService,
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

  // TODO: question 없는 경우 예외 처리
  @Query(() => Question, {
    description: '문항 고유 아이디를 통해 특정 문항 조회',
  })
  async question(
    @Args('id', { type: () => Int, description: '문항 고유 아이디' })
    id: number,
  ) {
    return await this.questionsService.findOneById(id);
  }

  @Mutation(() => Question)
  async createQuestion(
    @Args('questionInfo') questionInfo: CreateQuestionInput,
  ) {
    const { surveyId } = questionInfo;
    const survey = await this.surveysService.findOneById(surveyId);
    if (!survey) {
      throw new BadRequestException();
    }
    return await this.questionsService.create(questionInfo);
  }

  @Mutation(() => Question)
  async updateQuestion(
    @Args('questionId', { type: () => Int }) id: number,
    @Args('questionInfo') questionInfo: UpdateQuestionInput,
  ) {
    return await this.questionsService.update(id, questionInfo);
  }

  @Mutation(() => [Question])
  async updateQuestionsOrder(
    @Args('questionsOrder', { type: () => [UpdateQuestionsOrderInput] })
    questionsOrder: UpdateQuestionsOrderInput[],
  ) {
    return await this.questionsService.updateOrder(questionsOrder);
  }

  @Mutation(() => Boolean)
  async deleteQuestion(@Args('questionId', { type: () => Int }) id: number) {
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

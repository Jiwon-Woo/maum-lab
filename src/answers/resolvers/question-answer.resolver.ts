import {
  Args,
  Int,
  Resolver,
  Query,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { QuestionAnswer } from '../entities/question-answer.entity';
import { AnswersService } from '../answers.service';
import { Question } from 'src/questions/entities/question.entity';
import { QuestionLoader } from '../../questions/question.loader';
import { OptionLoader } from 'src/options/option.loader';
import { SurveyAnswer } from '../entities/survey-answer.entity';
import { CreateQuestionAnswerInput } from '../dto/create-question-answer.dto';
import { QuestionsService } from 'src/questions/questions.service';
import { BadRequestException, Logger } from '@nestjs/common';
import { UpdateQuestionAnswerInput } from '../dto/update-question-answer.dto';
import { AnswerLoader } from '../answer.loader';
import { OptionsService } from 'src/options/options.service';

@Resolver(QuestionAnswer)
export class QuestionAnswerResolver {
  constructor(
    private answersService: AnswersService,
    private answerLoader: AnswerLoader,
    private questionsService: QuestionsService,
    private questionLoader: QuestionLoader,
    private optionsService: OptionsService,
    private optionLoader: OptionLoader,
  ) {}
  private readonly logger = new Logger(QuestionAnswerResolver.name);

  @Query(() => QuestionAnswer, {
    description: '고유 아이디로 특정 답변 정보 조회',
  })
  async questionAnswer(
    @Args('id', { type: () => Int, description: '문항 답변 고유 아이디' })
    id: number,
  ) {
    return await this.answersService.findOneQuestionAnswerById(id);
  }

  @Mutation(() => QuestionAnswer, { description: '특정 문항에 대한 답변 생성' })
  async createQuestionAnswer(
    @Args('questionAnswerInfo') questionAnswerInfo: CreateQuestionAnswerInput,
  ) {
    const { surveyAnswerId, questionId, selectedOptionId } = questionAnswerInfo;
    const surveyAnswer =
      await this.answersService.findOneSurveyAnswerById(surveyAnswerId);
    const question = await this.questionsService.findOneByIdAndSurveyId(
      questionId,
      surveyAnswer.surveyId,
    );
    const selectedOption = question.options.find(
      (option) => option.id === selectedOptionId,
    );
    if (!selectedOption) {
      throw new BadRequestException();
    }
    return await this.answersService.createQuestionAnswer(questionAnswerInfo);
  }

  @Mutation(() => QuestionAnswer, { description: '특정 문항에 대한 답변 수정' })
  async updateQuestionAnswer(
    @Args('id', { type: () => Int, description: '문항 답변 고유 아이디' })
    id: number,
    @Args('questionAnswerInfo') questionAnswerInfo: UpdateQuestionAnswerInput,
  ) {
    const { selectedOptionId } = questionAnswerInfo;
    await this.optionsService.findOneById(selectedOptionId);
    return await this.answersService.updateQuestionAnswer(
      id,
      questionAnswerInfo,
    );
  }

  @Mutation(() => Boolean, {
    description: '문항 답변 고유 아이디를 통해 특정 답변 정보 삭제',
  })
  async deleteQuestionAnswer(
    @Args('id', { type: () => Int, description: '문항 답변 고유 아이디' })
    id: number,
  ) {
    await this.answersService.deleteQuestionAnswer(id);
    return true;
  }

  // TODO: survey answer 없는 경우 예외 처리
  @ResolveField(() => SurveyAnswer)
  async surveyAnswer(@Parent() questionAnswer: QuestionAnswer) {
    return await this.answerLoader.findOneSurveyAnswerById.load(
      questionAnswer.surveyAnswerId,
    );
  }

  // TODO: question 없는 경우 예외 처리
  @ResolveField(() => Question)
  async question(@Parent() questionAnswer: QuestionAnswer) {
    return await this.questionLoader.findOneById.load(
      questionAnswer.questionId,
    );
  }

  // TODO: option 없는 경우 예외 처리
  @ResolveField(() => Option)
  async selectedOption(@Parent() questionAnswer: QuestionAnswer) {
    return await this.optionLoader.findOneById.load(
      questionAnswer.selectedOptionId,
    );
  }
}

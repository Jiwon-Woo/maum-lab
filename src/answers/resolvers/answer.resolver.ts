import {
  Args,
  Int,
  Resolver,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Answer } from '../entities/answer.entity';
import { AnswersService } from '../answers.service';
import { AnswersConnection } from '../dto/answers.dto';
import { Question } from 'src/questions/entities/question.entity';
import { SurveyResponse } from '../dto/survey-response.dto';
import { Pagination } from 'src/utils/pagination';
import { QuestionLoader } from '../../questions/question.loader';
import { OptionLoader } from 'src/options/option.loader';

@Resolver(Answer)
export class AnswerResolver {
  constructor(
    private answersService: AnswersService,
    private questionLoader: QuestionLoader,
    private optionLoader: OptionLoader,
  ) {}

  @Query(() => AnswersConnection, {
    description: '특정 유저가 특정 설문지에 답변한 정보',
  })
  async getAnswers(
    @Args('surveyResponse') surveyResponse: SurveyResponse,
    @Args('pagination') pagination: Pagination,
  ) {
    const { pageSize } = pagination;
    const [answers, count] =
      await this.answersService.findAndCountBySurveyResponse(
        surveyResponse,
        pagination,
      );
    const totalScore = await this.answersService.getTotalScore(surveyResponse);
    return new AnswersConnection(answers, count, pageSize, totalScore);
  }

  @Query(() => Answer, {
    description: '답변 고유 아이디를 통해 특정 답변 정보 조회',
  })
  async answer(
    @Args('id', { type: () => Int, description: '답변 고유 아이디' })
    id: number,
  ) {
    return await this.answersService.findOneById(id);
  }

  @ResolveField(() => Question)
  async question(@Parent() answer: Answer) {
    return await this.questionLoader.findOneById.load(answer.questionId);
  }

  @ResolveField(() => Option)
  async option(@Parent() answer: Answer) {
    return await this.optionLoader.findOneById.load(answer.optionId);
  }
}

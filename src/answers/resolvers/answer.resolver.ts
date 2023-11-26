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
import { AnswersConnection } from '../dto/answers-connection.dto';
import { Question } from 'src/questions/entities/question.entity';

@Resolver(Answer)
export class AnswerResolver {
  constructor(private answersService: AnswersService) {}

  @Query(() => AnswersConnection, {
    description: '특정 유저가 특정 설문지에 답변한 정보 ',
  })
  async findAnswers(
    @Args('surveyId', { type: () => Int, description: '설문지 고유 아이디' })
    surveyId: number,
    @Args('userCode', { description: '설문지에 참여한 유저' })
    userCode: string,
  ) {
    const answers = await this.answersService.findBySurveyIdAndUserCode(
      surveyId,
      userCode,
    );
    const totalScore = answers.reduce(
      (accumulator, answer) => accumulator + answer.option.score,
      0,
    );
    return { totalScore, answers };
  }

  @Query(() => Answer, {
    description: '답변 고유 아이디를 통해 특정 답변 정보 조회',
  })
  async answer(
    @Args('id', { type: () => Int, description: '답변 고유 아이디' })
    id: number,
  ) {
    return await this.answersService.findById(id);
  }

  @ResolveField(() => Question)
  async question(@Parent() answer: Answer) {
    return await this.answersService.findQuestionById(answer.id);
  }

  @ResolveField(() => Option)
  async option(@Parent() answer: Answer) {
    return await this.answersService.findOptionById(answer.id);
  }
}

import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Answer } from '../entities/answer.entity';

@ObjectType()
export class AnswersConnection {
  @Field(() => Int, {
    description: '특정 유저가 특정 설문지에 답변한 선택지 점수의 총점',
  })
  totalScore: number;

  @Field(() => [Answer], {
    description: '특정 유저가 특정 설문지에 답변한 정보',
  })
  answers: Answer[];
}

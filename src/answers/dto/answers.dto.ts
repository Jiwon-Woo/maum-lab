import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Answer } from '../entities/answer.entity';
import { MetaData } from 'src/utils/metadata';

@ObjectType()
export class AnswersConnection extends MetaData {
  @Field(() => Int, {
    description: '특정 유저가 특정 설문지에 답변한 선택지 점수의 총점',
    nullable: true,
  })
  totalScore?: number;

  @Field(() => [Answer], {
    description: '특정 유저가 특정 설문지에 답변한 정보',
  })
  answers: Answer[];

  constructor(
    answers: Answer[],
    count: number,
    pageSize: number,
    totalScore?: number,
  ) {
    super(count, pageSize);
    this.answers = answers;
    this.totalScore = totalScore;
  }
}

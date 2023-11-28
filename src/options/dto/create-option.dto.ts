import { Field, InputType, Int } from '@nestjs/graphql';

@InputType({ description: '선택지를 생성하기 위한 정보' })
export class CreateOptionInput {
  @Field(() => Int, { description: '선택지를 생성할 문항 고유 아이디' })
  questionId: number;

  @Field({ description: '문항 선택지 내용' })
  content: string;

  @Field(() => Int, { description: '문항 선택지 점수' })
  score: number;
}

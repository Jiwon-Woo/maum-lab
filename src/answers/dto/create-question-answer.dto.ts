import { Field, InputType, Int } from '@nestjs/graphql';

@InputType({
  description: '유저가 특정 문항에서 택한 선택지를 생성하기 위한 정보',
})
export class CreateQuestionAnswerInput {
  @Field(() => Int)
  surveyAnswerId: number;

  @Field(() => Int)
  questionId: number;

  @Field(() => Int)
  selectedOptionId: number;
}

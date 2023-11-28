import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateQuestionAnswerInput {
  @Field(() => Int)
  surveyAnswerId: number;

  @Field(() => Int)
  questionId: number;

  @Field(() => Int)
  selectedOptionId: number;
}

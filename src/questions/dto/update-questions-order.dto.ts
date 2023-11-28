import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

@InputType()
class QuestionsOrder {
  @Field(() => Int)
  id: number;

  @Min(1)
  @Field(() => Int)
  orderNumber: number;
}

@InputType()
export class UpdateQuestionsOrderInput {
  @Field(() => Int)
  surveyId: number;

  @Field(() => [QuestionsOrder])
  questionsOrder: QuestionsOrder[];
}

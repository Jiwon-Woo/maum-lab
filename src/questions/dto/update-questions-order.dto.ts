import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateQuestionsOrderInput {
  @Field(() => Int)
  readonly id: number;
}

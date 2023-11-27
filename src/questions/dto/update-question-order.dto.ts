import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateQuestionOrderInput {
  @Field(() => Int)
  readonly id: number;
}

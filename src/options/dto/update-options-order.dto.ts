import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

@InputType()
class OptionOrder {
  @Field(() => Int)
  id: number;

  @Min(1)
  @Field(() => Int)
  orderNumber: number;
}

@InputType()
export class UpdateOptionsOrderInput {
  @Field(() => Int)
  questionId: number;

  @Field(() => [OptionOrder])
  optionsOrder: OptionOrder[];
}

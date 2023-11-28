import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

@InputType()
export class UpdateOptionsOrderInput {
  @Field(() => Int)
  readonly id: number;

  @Min(1)
  @Field(() => Int)
  orderNumber: number;
}

import { Field, InputType, Int } from '@nestjs/graphql';

@InputType({ description: '설문지 문항 필터' })
export class FilterQuestionInput {
  @Field(() => Int, { description: '설문지 고유 아이디', nullable: true })
  surveyId?: number;
}

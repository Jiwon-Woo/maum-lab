import { Field, InputType, Int } from '@nestjs/graphql';

@InputType({ description: '설문지 문항 선택지 필터' })
export class FilterOptionInput {
  @Field(() => Int, { description: '설문지 고유 아이디', nullable: true })
  surveyId?: number;

  @Field(() => Int, { description: '설문지 문항 고유 아이디', nullable: true })
  questionId?: number;
}

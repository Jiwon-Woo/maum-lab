import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

@InputType({ description: '문항 순서' })
class QuestionsOrder {
  @Field(() => Int)
  id: number;

  @Min(1)
  @Field(() => Int)
  orderNumber: number;
}

@InputType({ description: '문항 순서를 변경하기 위한 정보' })
export class UpdateQuestionsOrderInput {
  @Field(() => Int, { description: '문항이 속한 설문지의 고유 아이디' })
  surveyId: number;

  @Field(() => [QuestionsOrder], { description: '문항들의 순서 목록' })
  questionsOrder: QuestionsOrder[];
}

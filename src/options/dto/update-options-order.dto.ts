import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

@InputType({ description: '선택지의 순서' })
class OptionOrder {
  @Field(() => Int, { description: '선택지 고유 아이디' })
  id: number;

  @Min(1)
  @Field(() => Int, { description: '특정 선택지 순서' })
  orderNumber: number;
}

@InputType({ description: '선택지 순서를 변경하기 위한 정보' })
export class UpdateOptionsOrderInput {
  @Field(() => Int, { description: '선택지들이 속한 문항의 고유 아이디' })
  questionId: number;

  @Field(() => [OptionOrder], { description: '선택지들의 순서 목록' })
  optionsOrder: OptionOrder[];
}

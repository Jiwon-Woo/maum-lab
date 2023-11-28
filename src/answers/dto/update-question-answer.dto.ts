import { InputType, PickType } from '@nestjs/graphql';
import { CreateQuestionAnswerInput } from './create-question-answer.dto';

@InputType({
  description: '유저가 특정 문항에서 택한 선택지를 수정하기 위한 정보',
})
export class UpdateQuestionAnswerInput extends PickType(
  CreateQuestionAnswerInput,
  ['selectedOptionId'],
) {}

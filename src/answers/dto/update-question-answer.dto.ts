import { InputType, PickType } from '@nestjs/graphql';
import { CreateQuestionAnswerInput } from './create-question-answer.dto';

@InputType()
export class UpdateQuestionAnswerInput extends PickType(
  CreateQuestionAnswerInput,
  ['selectedOptionId'],
) {}

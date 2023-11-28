import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateQuestionInput } from './create-question.dto';

@InputType({ description: '문항을 수정하기 위한 정보' })
export class UpdateQuestionInput extends PartialType(
  OmitType(CreateQuestionInput, ['surveyId']),
) {}

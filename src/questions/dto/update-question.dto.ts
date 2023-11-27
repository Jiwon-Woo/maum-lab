import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateQuestionInput } from './create-question.dto';

@InputType()
export class UpdateQuestionInput extends PartialType(
  OmitType(CreateQuestionInput, ['surveyId']),
) {}

import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateOptionInput } from './create-option.dto';

@InputType()
export class UpdateOptionInput extends PartialType(
  OmitType(CreateOptionInput, ['questionId']),
) {}

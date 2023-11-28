import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateOptionInput } from './create-option.dto';

@InputType({ description: '선택지를 수정하기 위한 정보' })
export class UpdateOptionInput extends PartialType(
  OmitType(CreateOptionInput, ['questionId']),
) {}

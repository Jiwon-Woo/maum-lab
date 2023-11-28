import { InputType, PartialType } from '@nestjs/graphql';
import { CreateSurveyInput } from './create-survey.dto';

@InputType({ description: '설문지를 수정하기 위한 정보' })
export class UpdateSurveyInput extends PartialType(CreateSurveyInput) {}

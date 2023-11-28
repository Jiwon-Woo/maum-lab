import { InputType, PartialType } from '@nestjs/graphql';
import { CreateSurveyAnswerInput } from './create-survey-answer.dto';

@InputType({ description: '유저가 설문지에 응답한 정보 필터' })
export class FilterSurveyAnswerInput extends PartialType(
  CreateSurveyAnswerInput,
) {}

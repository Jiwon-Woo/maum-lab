import { InputType, PartialType } from '@nestjs/graphql';
import { CreateSurveyAnswerInput } from './create-survey-answer.dto';

@InputType({ description: '설문지 응답 조회 필터' })
export class FilterSurveyAnswerInput extends PartialType(
  CreateSurveyAnswerInput,
) {}

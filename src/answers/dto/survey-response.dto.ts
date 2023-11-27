import { Field, InputType, Int } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType({ description: '설문지 응답 정보' })
export class SurveyResponse {
  @Field(() => Int, { description: '설문지 고유 아이디' })
  surveyId: number;

  @MaxLength(255)
  @Field({ description: '설문지에 참여한 유저' })
  userCode: string;
}

import { Field, InputType, Int } from '@nestjs/graphql';

@InputType({ description: '설문지 응답을 조회하기 위한 정보' })
export class SurveyResponse {
  @Field(() => Int, { description: '설문지 고유 아이디' })
  surveyId: number;

  @Field({ description: '설문지에 참여한 유저' })
  userCode: string;
}

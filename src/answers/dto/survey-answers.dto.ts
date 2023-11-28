import { Field, ObjectType } from '@nestjs/graphql';
import { MetaData } from 'src/utils/metadata';
import { SurveyAnswer } from '../entities/survey-answer.entity';

@ObjectType({
  description: '유저가 설문지에 응답한 정보 목록과 메타 데이터',
})
export class SurveyAnswersConnection extends MetaData {
  @Field(() => [SurveyAnswer], {
    description: '유저가 설문지에 답변한 정보 전체 조회',
  })
  surveyAnswers: SurveyAnswer[];

  constructor(surveyAnswers: SurveyAnswer[], count: number, pageSize: number) {
    super(count, pageSize);
    this.surveyAnswers = surveyAnswers;
  }
}

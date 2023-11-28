import { Field, ObjectType } from '@nestjs/graphql';
import { MetaData } from 'src/utils/metadata';
import { SurveyAnswer } from '../entities/survey-answer.entity';

@ObjectType({
  description: '특정 유저가 특정 설문지에 답변한 정보와 메타 데이터',
})
export class SurveyAnswersConnection extends MetaData {
  @Field(() => [SurveyAnswer], {
    description: '특정 유저가 특정 설문지에 답변한 정보',
  })
  surveyAnswers: SurveyAnswer[];

  constructor(surveyAnswers: SurveyAnswer[], count: number, pageSize: number) {
    super(count, pageSize);
    this.surveyAnswers = surveyAnswers;
  }
}

import { Field, ID, ObjectType } from '@nestjs/graphql';
import { SurveyEntity } from '../entities/survey.entity';

@ObjectType()
export class SurveySchema implements Omit<SurveyEntity, 'questions'> {
  @Field(() => ID, { description: '설문지 고유 아이디' })
  id: number;

  @Field({ description: '설문지 제목' })
  title: string;

  @Field({ description: '설문지 설명', nullable: true })
  description?: string;
}

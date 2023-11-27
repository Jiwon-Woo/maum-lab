import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class CreateSurveyInput {
  @MaxLength(255)
  @Field({ description: '설문지 제목' })
  title: string;

  @MaxLength(255)
  @Field({ description: '설문지 설명', nullable: true })
  description?: string;
}

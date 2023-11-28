import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, MaxLength } from 'class-validator';

@InputType({ description: '설문지를 생성하기 위한 정보' })
export class CreateSurveyInput {
  @MaxLength(255)
  @Field({ description: '설문지 제목' })
  title: string;

  @IsOptional()
  @MaxLength(255)
  @Field({ description: '설문지 설명', nullable: true })
  description?: string;
}

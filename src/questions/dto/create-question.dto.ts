import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional, MaxLength } from 'class-validator';

@InputType({ description: '문항을 생성하기 위한 정보' })
export class CreateQuestionInput {
  @Field(() => Int, { description: '문항이 속한 설문지 고유 아이디' })
  surveyId: number;

  @MaxLength(255)
  @Field({ description: '설문지 문항 제목' })
  title: string;

  @IsOptional()
  @MaxLength(255)
  @Field({ description: '설문지 문항 설명', nullable: true })
  description?: string;
}

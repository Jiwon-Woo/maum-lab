import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { QuestionEntity } from '../entities/question.entity';

@ObjectType()
export class QuestionSchema
  implements Omit<QuestionEntity, 'surveyId' | 'survey'>
{
  @Field(() => ID, { description: '설문지 문항 고유 아이디' })
  id: number;

  @Field({ description: '설문지 문항 제목' })
  title: string;

  @Field({ description: '설문지 문항 부가 설명', nullable: true })
  description?: string;

  @Field(() => Int, { description: '설문지 문항 번호' })
  order: number;
}

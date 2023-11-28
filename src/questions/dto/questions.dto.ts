import { Field, ObjectType } from '@nestjs/graphql';
import { MetaData } from 'src/utils/metadata';
import { Question } from '../entities/question.entity';

@ObjectType({ description: '문항 목록과 메타데이터' })
export class QuestionsConnection extends MetaData {
  @Field(() => [Question], { description: '특정 설문지의 문항 목록' })
  questions: Question[];

  constructor(questions: Question[], count: number, pageSize: number) {
    super(count, pageSize);
    this.questions = questions;
  }
}

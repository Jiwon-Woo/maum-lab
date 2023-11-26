import { Field, ObjectType } from '@nestjs/graphql';
import { MetaData } from 'src/utils/metadata';
import { Question } from '../entities/question.entity';

@ObjectType()
export class QuestionsConnection extends MetaData {
  @Field(() => [Question])
  questions: Question[];

  constructor(questions: Question[], count: number, pageSize: number) {
    super(count, pageSize);
    this.questions = questions;
  }
}

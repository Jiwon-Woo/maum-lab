import { Field, ObjectType } from '@nestjs/graphql';
import { MetaData } from 'src/utils/metadata';
import { Survey } from '../entities/survey.entity';

@ObjectType()
export class SurveysConnection extends MetaData {
  @Field(() => [Survey], { description: '설문지 목록' })
  surveys: Survey[];

  constructor(surveys: Survey[], count: number, pageSize: number) {
    super(count, pageSize);
    this.surveys = surveys;
  }
}

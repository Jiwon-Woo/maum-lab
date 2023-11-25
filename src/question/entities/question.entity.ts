import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { SurveyEntity } from 'src/surveys/entities/survey.entity';
import { SurveySchema } from 'src/surveys/schemas/survey.schema';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity('question')
export class QuestionEntity {
  @Field(() => ID, { description: '설문지 문항 고유 아이디' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ description: '설문지 문항 제목' })
  @Column()
  title: string;

  @Field({ description: '설문지 문항 부가 설명', nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field(() => Int, { description: '설문지 문항 번호' })
  @Column()
  order: number;

  @Column()
  surveyId: number;

  @Field(() => SurveySchema, { description: '해당 문항이 속한 설문지' })
  @ManyToOne(() => SurveyEntity, (survey) => survey.questions)
  @JoinColumn()
  survey: SurveySchema;
}

import { Field, ID, ObjectType } from '@nestjs/graphql';
import { SurveyEntity } from 'src/survey/entities/survey.entity';
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

  @Field({ description: '설문지 문항 내용' })
  @Column()
  content: string;

  @Column()
  surveyId: number;

  @Field(() => SurveyEntity, { description: '해당 문항이 속한 설문지' })
  @ManyToOne(() => SurveyEntity)
  @JoinColumn()
  survey: SurveyEntity;
}

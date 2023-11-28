import { Field, ID, ObjectType, Int } from '@nestjs/graphql';
import { Survey } from 'src/surveys/entities/survey.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionAnswer } from './question-answer.entity';

@ObjectType()
@Entity('survey-answer')
export class SurveyAnswer {
  @Field(() => ID, { description: '설문지 응답 정보' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ description: '설문에 참여한 유저' })
  @Column({ length: 255 })
  userCode: string;

  @Column()
  surveyId: number;

  @Field(() => Int, { description: '설문 응답 점수', nullable: true })
  @Column({ nullable: true })
  totalScore?: number;

  @Field({ description: '설문지 정보' })
  @ManyToOne(() => Survey)
  @JoinColumn()
  survey: Survey;

  @Field(() => [QuestionAnswer], {
    description: '해당 설문에 대한 문항 답변 정보',
  })
  @OneToMany(
    () => QuestionAnswer,
    (questionAnswer) => questionAnswer.surveyAnswer,
    { cascade: true },
  )
  questionAnwers: QuestionAnswer;

  @Field({ description: '설문 응답을 시작한 시각' })
  @CreateDateColumn({ type: 'timestamp' })
  startAt: Date;

  @Field({ description: '설문 응답을 마친 시각', nullable: true })
  @Column({ type: 'timestamp', precision: 6, nullable: true })
  endAt: Date;

  @Field({ description: '설문 응답 삭제 일시', nullable: true })
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}

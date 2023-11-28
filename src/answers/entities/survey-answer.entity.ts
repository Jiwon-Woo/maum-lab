import { Field, ID, ObjectType } from '@nestjs/graphql';
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
  UpdateDateColumn,
} from 'typeorm';
import { QuestionAnswer } from './question-answer.entity';

@ObjectType({ description: '유저가 설문지에 응답한 정보' })
@Entity('survey_answer')
export class SurveyAnswer {
  @Field(() => ID, { description: '유저의 설문지 응답 정보 고유 아이디' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ description: '설문에 응답한 유저' })
  @Column({ length: 255 })
  userCode: string;

  @Column()
  surveyId: number;

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
  createdAt: Date;

  @Field({ description: '설문 응답을 마친 시각', nullable: true })
  @Column({ type: 'timestamp', precision: 6, nullable: true })
  completedAt: Date;

  @Field({ description: '설문 응답 수정 일시' })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}

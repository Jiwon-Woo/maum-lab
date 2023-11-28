import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Option } from 'src/options/entities/option.entity';
import { Question } from 'src/questions/entities/question.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SurveyAnswer } from './survey-answer.entity';

@ObjectType({ description: '유저가 택한 선택지 정보' })
@Entity('question_answer')
export class QuestionAnswer {
  @Field(() => ID, { description: '유저가 택한 선택지 정보의 고유 아이디' })
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  surveyAnswerId: number;

  @Column()
  questionId: number;

  @Column()
  selectedOptionId: number;

  @Field(() => SurveyAnswer, { description: '유저의 설문지 응답 정보' })
  @ManyToOne(() => SurveyAnswer)
  @JoinColumn()
  surveyAnswer: SurveyAnswer;

  @Field(() => Question, { description: '답변한 설문지 문항 정보' })
  @ManyToOne(() => Question)
  @JoinColumn()
  question: Question;

  @Field(() => Option, { description: '유저가 고른 선택지 정보' })
  @ManyToOne(() => Option)
  @JoinColumn()
  selectedOption: Option;

  @Field(() => Date, { description: '유저가 택한 선택지 정보 생성 일시' })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field(() => Date, { description: '유저가 택한 선택지 정보 수정 일시' })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}

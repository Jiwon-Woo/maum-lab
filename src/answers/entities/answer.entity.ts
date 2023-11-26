import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Option } from 'src/options/entities/option.entity';
import { Question } from 'src/questions/entities/question.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity('answer')
export class Answer {
  @Field(() => ID, { description: '설문지 문항 답변의 고유 아이디' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ description: '설문에 참여한 유저' })
  @Column()
  userCode: string;

  @Column()
  questionId: number;

  @Column()
  optionId: number;

  @Field(() => Question, { description: '답변한 설문지 문항 정보' })
  @ManyToOne(() => Question)
  @JoinColumn()
  question: Question;

  @Field(() => Option, { description: '유저가 고른 선택지 정보' })
  @ManyToOne(() => Option)
  @JoinColumn()
  option: Option;
}

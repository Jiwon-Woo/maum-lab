import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Question } from 'src/questions/entities/question.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType({ description: '설문지 문항의 선택지' })
@Entity('option')
export class Option {
  @Field(() => ID, { description: '문항 선택지의 고유 아이디' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ description: '문항 선택지 내용' })
  @Column()
  content: string;

  @Field(() => Int, { description: '문항 선택지 번호' })
  @Column()
  order: number;

  @Field(() => Int, { description: '문항 선택지 점수' })
  @Column()
  score: number;

  @Column()
  questionId: number;

  @Field(() => Question, {
    description: '해당 선택지가 속한 문항',
  })
  @ManyToOne(() => Question, (question) => question.options)
  question: Question;
}

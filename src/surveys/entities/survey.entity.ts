import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Question } from 'src/questions/entities/question.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('survey')
export class Survey {
  @Field(() => ID, { description: '설문지 고유 아이디' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ description: '설문지 제목' })
  @Column({ length: 255 })
  title: string;

  @Field({ description: '설문지 설명', nullable: true })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @Field(() => [Question], { description: '설문지의 문항들' })
  @OneToMany(() => Question, (question) => question.survey)
  questions: Question[];
}

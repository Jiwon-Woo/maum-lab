import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Question } from 'src/questions/entities/question.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType({ description: '설문지' })
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
  @OneToMany(() => Question, (question) => question.survey, { cascade: true })
  questions: Question[];

  @Field(() => Date, { description: '설문지 생성 일시' })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field(() => Date, { description: '설문지 수정 일시' })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}

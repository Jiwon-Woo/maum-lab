import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Option } from 'src/options/entities/option.entity';
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

@ObjectType({ description: '설문지의 문항' })
@Entity('question')
export class Question {
  @Field(() => ID, { description: '설문지 문항 고유 아이디' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ description: '설문지 문항 제목' })
  @Column({ length: 255 })
  title: string;

  @Field({ description: '설문지 문항 부가 설명', nullable: true })
  @Column({ length: 255, nullable: true })
  description?: string;

  @Field(() => Int, { description: '설문지 문항 번호' })
  @Column()
  order: number;

  @Column()
  surveyId: number;

  @Field(() => Survey, { description: '해당 문항이 속한 설문지' })
  @ManyToOne(() => Survey, (survey) => survey.questions)
  @JoinColumn()
  survey: Survey;

  @Field(() => [Option], { description: '해당 문항의 선택지들' })
  @OneToMany(() => Option, (option) => option.question, { cascade: true })
  options: Option[];

  @Field(() => Date, { description: '설문지 문항 생성 일시' })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field(() => Date, { description: '설문지 문항 수정 일시' })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}

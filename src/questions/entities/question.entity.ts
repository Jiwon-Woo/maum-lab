import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Option } from 'src/options/entities/option.entity';
import { Survey } from 'src/surveys/entities/survey.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType({ description: '설문지의 문항' })
@Entity('question')
export class Question {
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

  @Field(() => Survey, { description: '해당 문항이 속한 설문지' })
  @ManyToOne(() => Survey, (survey) => survey.questions)
  @JoinColumn()
  survey: Survey;

  @Field(() => [Option], { description: '해당 문항의 선택지들' })
  @OneToMany(() => Option, (option) => option.question)
  options: Option[];
}

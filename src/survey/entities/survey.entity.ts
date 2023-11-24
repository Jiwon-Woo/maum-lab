import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('survey')
export class SurveyEntity {
  @Field(() => Int, { description: '설문지 고유 아이디' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ description: '설문지 제목' })
  @Column({ length: 255 })
  title: string;

  @Field({ description: '설문지 설명', nullable: true })
  @Column({ type: 'text', nullable: true })
  description?: string;
}

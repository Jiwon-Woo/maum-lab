import { Field, ObjectType } from '@nestjs/graphql';
import { MetaData } from 'src/utils/metadata';
import { Option } from '../entities/option.entity';

@ObjectType({ description: '설문지 특정 문항의 선택지 목록과 메타데이터' })
export class OptionsConnection extends MetaData {
  @Field(() => [Option], { description: '설문지 특정 문항의 선택지 목록' })
  options: Option[];

  constructor(options: Option[], count: number, pageSize: number) {
    super(count, pageSize);
    this.options = options;
  }
}

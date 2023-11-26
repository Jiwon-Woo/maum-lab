import { Field, ObjectType } from '@nestjs/graphql';
import { MetaData } from 'src/utils/metadata';
import { Option } from '../entities/option.entity';

@ObjectType()
export class OptionsConnection extends MetaData {
  @Field(() => [Option])
  options: Option[];

  constructor(options: Option[], count: number, pageSize: number) {
    super(count, pageSize);
    this.options = options;
  }
}

import { Field, InputType, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@InputType({ description: '페이지네이션' })
export class Pagination {
  @Min(1)
  @Field(() => Int, {
    nullable: true,
    defaultValue: 1,
    description: '페이지 정보',
  })
  page: number = 1;

  @Min(1)
  @Max(100)
  @Field(() => Int, {
    nullable: true,
    defaultValue: 10,
    description: '한 페이지에 담길 아이템 수',
  })
  pageSize: number = 10;
}

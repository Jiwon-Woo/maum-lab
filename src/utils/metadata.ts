import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MetaData {
  @Field(() => Int, { description: '전체 아이템 개수' })
  totalCount: number;

  @Field(() => Int, { description: '전체 페이지 수' })
  totalPage: number;

  @Field(() => Int, { description: '페이지당 최대 아이템 개수' })
  pageSize: number;

  constructor(count: number, pageSize: number) {
    this.totalCount = count;
    this.pageSize = pageSize;
    this.totalPage = Math.ceil(count / pageSize);
  }
}

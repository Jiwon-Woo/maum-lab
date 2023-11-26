import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Args,
  Int,
} from '@nestjs/graphql';
import { Option } from '../entities/option.entity';
import { OptionsService } from '../options.service';
import { Question } from 'src/questions/entities/question.entity';
import { Pagination } from 'src/utils/pagination';
import { OptionsConnection } from '../dto/options.dto';

@Resolver(Option)
export class OptionResolver {
  constructor(private optionsService: OptionsService) {}

  @Query(() => OptionsConnection, {
    description: '특정 설문지 문항에 해당하는 선택지 목록',
  })
  async getOptions(
    @Args('questionId', {
      type: () => Int,
      description: '설문지 문항의 고유 아이디',
    })
    questionId: number,
    @Args('pagination') pagination: Pagination,
  ) {
    const { pageSize } = pagination;
    const [options, count] = await this.optionsService.findByQuestionId(
      questionId,
      pagination,
    );
    return new OptionsConnection(options, count, pageSize);
  }

  @Query(() => Option, {
    description: '선택지 고유 아이디를 통한 특정 선택지 조회',
  })
  async option(
    @Args('id', { type: () => Int, description: '선택지 고유 아이디' })
    id: number,
  ) {
    return await this.optionsService.findById(id);
  }

  @ResolveField(() => Question)
  async question(@Parent() option: Option) {
    return await this.optionsService.findQuestionById(option.id);
  }
}

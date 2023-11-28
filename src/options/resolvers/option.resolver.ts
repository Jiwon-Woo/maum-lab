import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Args,
  Int,
  Mutation,
} from '@nestjs/graphql';
import { Option } from '../entities/option.entity';
import { OptionsService } from '../options.service';
import { Question } from 'src/questions/entities/question.entity';
import { Pagination } from 'src/utils/pagination';
import { OptionsConnection } from '../dto/options.dto';
import { QuestionLoader } from '../../questions/question.loader';
import { CreateOptionInput } from '../dto/create-option.dto';
import { UpdateOptionInput } from '../dto/update-option.dto';
import { UpdateOptionsOrderInput } from '../dto/update-options-order.dto';
import { QuestionsService } from '../../questions/questions.service';
import { BadRequestException } from '@nestjs/common';
import { FilterOptionInput } from '../dto/fillter-option.dto';

@Resolver(Option)
export class OptionResolver {
  constructor(
    private optionsService: OptionsService,
    private questionsService: QuestionsService,
    private questionLoader: QuestionLoader,
  ) {}

  @Query(() => OptionsConnection, {
    description: '특정 설문지 문항에 해당하는 선택지 목록',
  })
  async allOptions(
    @Args('optionFilter', { nullable: true })
    optionFilter: FilterOptionInput,
    @Args('pagination', { nullable: true })
    pagination: Pagination = new Pagination(),
  ) {
    const { pageSize } = pagination;
    const [options, count] = await this.optionsService.findAndCount(
      optionFilter,
      pagination,
    );
    return new OptionsConnection(options, count, pageSize);
  }

  // TODO: option 없는 경우 예외 처리
  @Query(() => Option, {
    description: '선택지 고유 아이디를 통한 특정 선택지 조회',
  })
  async option(
    @Args('id', { type: () => Int, description: '선택지 고유 아이디' })
    id: number,
  ) {
    return await this.optionsService.findOneById(id);
  }

  @Mutation(() => Option)
  async createOption(@Args('optionInfo') optionInfo: CreateOptionInput) {
    const { questionId } = optionInfo;
    const question = await this.questionsService.findOneById(questionId);
    if (!question) {
      throw new BadRequestException();
    }
    return await this.optionsService.create(optionInfo);
  }

  @Mutation(() => Option)
  async updateOption(
    @Args('optionId', { type: () => Int, description: '선택지 고유 아이디' })
    id: number,
    @Args('optionInfo') optionInfo: UpdateOptionInput,
  ) {
    return await this.optionsService.update(id, optionInfo);
  }

  @Mutation(() => [Option])
  async updateOptionsOrder(
    @Args('optionsOrder', { type: () => [UpdateOptionsOrderInput] })
    optionsOrder: UpdateOptionsOrderInput[],
  ) {
    return this.optionsService.updateOrder(optionsOrder);
  }

  @Mutation(() => Boolean)
  async deleteOption(
    @Args('optionId', { type: () => Int, description: '선택지 고유 아이디' })
    id: number,
  ) {
    await this.optionsService.delete(id);
    return true;
  }

  // TODO: question 없는 경우 예외 처리
  @ResolveField(() => Question)
  async question(@Parent() option: Option) {
    return await this.questionLoader.findOneById.load(option.questionId);
  }
}

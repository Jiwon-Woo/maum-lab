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
import { BadRequestException, Logger } from '@nestjs/common';
import { FilterOptionInput } from '../dto/fillter-option.dto';
import { errorLogMessage } from 'src/utils/log-message';
import { ErrorMessage } from 'src/utils/error-message';

@Resolver(Option)
export class OptionResolver {
  constructor(
    private optionsService: OptionsService,
    private questionsService: QuestionsService,
    private questionLoader: QuestionLoader,
  ) {}
  private readonly logger = new Logger(OptionResolver.name);

  @Query(() => OptionsConnection, {
    description: '전체 선택지 조회',
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

  @Query(() => Option, {
    description: '고유 아이디로 특정 선택지 조회',
  })
  async option(
    @Args('id', { type: () => Int, description: '선택지 고유 아이디' })
    id: number,
  ) {
    return await this.optionsService.findOneById(id);
  }

  @Mutation(() => Option, { description: '선택지 생성' })
  async createOption(@Args('optionInfo') optionInfo: CreateOptionInput) {
    const { questionId } = optionInfo;
    const question = await this.questionsService.findOneById(questionId);
    if (!question) {
      this.logger.error(errorLogMessage('createOption'), optionInfo);
      throw new BadRequestException(ErrorMessage.QUESTION_NOT_FOUND);
    }
    return await this.optionsService.create(optionInfo);
  }

  @Mutation(() => Option, { description: '특정 선택지 수정' })
  async updateOption(
    @Args('optionId', { type: () => Int, description: '선택지 고유 아이디' })
    id: number,
    @Args('optionInfo') optionInfo: UpdateOptionInput,
  ) {
    return await this.optionsService.update(id, optionInfo);
  }

  @Mutation(() => [Option], { description: '특정 문항 내의 선택지 순서 변경' })
  async updateOptionsOrder(
    @Args('optionsOrderInfo', { type: () => UpdateOptionsOrderInput })
    optionsOrderInfo: UpdateOptionsOrderInput,
  ) {
    return this.optionsService.updateOrder(optionsOrderInfo);
  }

  @Mutation(() => Boolean, { description: '특정 선택지 삭제' })
  async deleteOption(
    @Args('optionId', { type: () => Int, description: '선택지 고유 아이디' })
    id: number,
  ) {
    await this.optionsService.delete(id);
    return true;
  }

  @ResolveField(() => Question)
  async question(@Parent() option: Option) {
    return await this.questionLoader.findOneById.load(option.questionId);
  }
}

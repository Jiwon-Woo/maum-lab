import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Option } from '../entities/option.entity';
import { OptionsService } from '../options.service';
import { Question } from 'src/questions/entities/question.entity';

@Resolver(Option)
export class OptionResolver {
  constructor(private optionsService: OptionsService) {}

  @Query(() => [Option])
  async allOptions() {
    return await this.optionsService.findAll();
  }

  @ResolveField(() => Question)
  async question(@Parent() option: Option) {
    return await this.optionsService.findQuestionById(option.id);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { OptionsService } from './options.service';
import DataLoader from 'dataloader';
import { Option } from './entities/option.entity';
import { plainLogMessage } from 'src/utils/log-message';

@Injectable()
export class OptionLoader {
  constructor(private optionsService: OptionsService) {}
  private readonly logger = new Logger(OptionLoader.name);

  findOneById = new DataLoader<number, Option>(async (ids: number[]) => {
    const options = await this.optionsService.findByIds(ids);
    const sortedOptions = ids.map(
      (id) => options.find((option) => option.id === id)!,
    );
    this.logger.log(plainLogMessage('findOneById'), ids, sortedOptions);
    return sortedOptions;
  });

  findByQuestionId = new DataLoader<number, Option[]>(
    async (questionIds: number[]) => {
      const options = await this.optionsService.findByQuestionIds(questionIds);
      const optionGroups: Record<number, Option[]> = {};

      options.forEach((option) => {
        const { questionId } = option;
        if (!optionGroups[questionId]) {
          optionGroups[questionId] = [];
        }
        optionGroups[questionId].push(option);
      });

      const sortedGroups = questionIds.map(
        (questionId) => optionGroups[questionId] ?? [],
      );
      this.logger.log(
        plainLogMessage('findByQuestionId'),
        questionIds,
        sortedGroups,
      );
      return sortedGroups;
    },
  );
}

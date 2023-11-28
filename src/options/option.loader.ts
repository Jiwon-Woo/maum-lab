import { BadRequestException, Injectable } from '@nestjs/common';
import { OptionsService } from './options.service';
import DataLoader from 'dataloader';
import { Option } from './entities/option.entity';

@Injectable()
export class OptionLoader {
  constructor(private optionsService: OptionsService) {}

  findOneById = new DataLoader<number, Option>(async (ids: number[]) => {
    const options = await this.optionsService.findByIds(ids);
    if (options.length !== ids.length) {
      throw new BadRequestException();
    }
    return ids.map((id) => options.find((option) => option.id === id)!);
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

      return questionIds.map((questionId) => optionGroups[questionId] ?? []);
    },
  );
}

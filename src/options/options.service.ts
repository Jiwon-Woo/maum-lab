import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from './entities/option.entity';
import { Repository, In } from 'typeorm';
import { Pagination } from 'src/utils/pagination';
import { CreateOptionInput } from './dto/create-option.dto';
import { UpdateOptionInput } from './dto/update-option.dto';
import { UpdateOptionsOrderInput } from './dto/update-options-order.dto';

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(Option)
    private optionRepository: Repository<Option>,
  ) {}

  async findOneById(id: number) {
    return await this.optionRepository.findOne({
      where: { id },
    });
  }

  async findAndCountByQuestionId(questionId: number, pagination: Pagination) {
    const { page, pageSize } = pagination;
    return await this.optionRepository.findAndCount({
      where: { questionId },
      order: { order: 'ASC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  async findByIds(ids: number[]) {
    return this.optionRepository.find({ where: { id: In(ids) } });
  }

  async findByQuestionIds(questionIds: number[]) {
    return await this.optionRepository.find({
      where: { questionId: In(questionIds) },
      order: { order: 'ASC' },
    });
  }

  async getMaxOrder(questionId: number) {
    const lastQuestion = await this.optionRepository.findOne({
      where: { questionId },
      order: { order: 'DESC' },
    });
    return lastQuestion?.order ?? 0;
  }

  async create(optionInfo: CreateOptionInput) {
    const maxOrder = await this.getMaxOrder(optionInfo.questionId);
    const option = this.optionRepository.create({
      ...optionInfo,
      order: maxOrder + 1,
    });
    return await this.optionRepository.save(option);
  }

  async update(id: number, optionInfo: UpdateOptionInput) {
    const option = await this.findOneById(id);
    if (!option) {
      throw new BadRequestException();
    }
    const updatedOption = this.optionRepository.create({
      ...option,
      ...optionInfo,
    });
    return await this.optionRepository.save(updatedOption);
  }

  async updateOrder(optionsOrder: UpdateOptionsOrderInput[]) {
    const ids = optionsOrder.map((option) => option.id);
    const options = await this.findByIds(ids);
    if (options.length !== ids.length) {
      throw new BadRequestException();
    }
    const updatedOptions = options.map((option) => {
      const optionInput = optionsOrder.find((o) => o.id === option.id)!;
      option.order = optionInput.order;
      return option;
    });
    return await this.optionRepository.save(updatedOptions);
  }

  async delete(id: number) {
    const option = await this.findOneById(id);
    if (!option) {
      throw new BadRequestException();
    }
    await this.optionRepository.softRemove(option);
  }
}

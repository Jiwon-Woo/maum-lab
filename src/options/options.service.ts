import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from './entities/option.entity';
import { Repository, In, FindOptionsWhere } from 'typeorm';
import { Pagination } from 'src/utils/pagination';
import { CreateOptionInput } from './dto/create-option.dto';
import { UpdateOptionInput } from './dto/update-option.dto';
import { UpdateOptionsOrderInput } from './dto/update-options-order.dto';
import { FilterOptionInput } from './dto/fillter-option.dto';

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

  async findAndCount(optionFilter: FilterOptionInput, pagination: Pagination) {
    const { page, pageSize } = pagination;
    const where: FindOptionsWhere<Option> = {};
    where.question = { surveyId: optionFilter?.surveyId };
    where.questionId = optionFilter?.questionId;

    return await this.optionRepository.findAndCount({
      where: { ...where },
      relations: ['question'],
      order: { orderNumber: 'ASC' },
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
      order: { orderNumber: 'ASC' },
    });
  }

  async getMaxOrder(questionId: number) {
    const lastQuestion = await this.optionRepository.findOne({
      where: { questionId },
      order: { orderNumber: 'DESC' },
    });
    return lastQuestion?.orderNumber ?? 0;
  }

  async create(optionInfo: CreateOptionInput) {
    const maxOrderNumber = await this.getMaxOrder(optionInfo.questionId);
    const option = this.optionRepository.create({
      ...optionInfo,
      orderNumber: maxOrderNumber + 1,
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
      option.orderNumber = optionInput.orderNumber;
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

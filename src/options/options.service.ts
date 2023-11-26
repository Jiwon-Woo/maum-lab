import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from './entities/option.entity';
import { Repository } from 'typeorm';
import { Pagination } from 'src/utils/pagination';

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(Option)
    private optionRepository: Repository<Option>,
  ) {}

  async findById(id: number) {
    return await this.optionRepository.findOne({
      where: { id },
    });
  }

  async findByQuestionId(questionId: number, pagination: Pagination) {
    const { page, pageSize } = pagination;
    return await this.optionRepository.findAndCount({
      where: { questionId },
      order: { order: 'ASC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  async findQuestionById(id: number) {
    const option = await this.optionRepository.findOne({
      where: { id },
      relations: ['question'],
    });
    return option?.question;
  }
}

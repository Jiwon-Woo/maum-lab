import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from './entities/option.entity';
import { Repository, In } from 'typeorm';
import { Pagination } from 'src/utils/pagination';

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
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from './entities/option.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(Option)
    private optionRepository: Repository<Option>,
  ) {}

  async findAll() {
    return await this.optionRepository.find();
  }

  async findQuestionById(id: number) {
    const option = await this.optionRepository.findOne({
      where: { id },
      relations: ['question'],
    });
    return option?.question;
  }
}

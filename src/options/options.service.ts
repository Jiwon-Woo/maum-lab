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

  async findById(id: number) {
    return await this.optionRepository.findOne({
      where: { id },
    });
  }

  async findByQuestionId(questionId: number) {
    return await this.optionRepository.find({
      where: { questionId },
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

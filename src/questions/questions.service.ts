import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async findById(id: number) {
    return await this.questionRepository.findOne({ where: { id } });
  }

  async findBySurveyId(surveyId: number) {
    return await this.questionRepository.find({
      where: { surveyId },
      order: { order: 'ASC' },
    });
  }

  async findSurveyById(id: number) {
    const question = await this.questionRepository.findOne({
      where: { id },
      relations: ['survey'],
    });
    return question?.survey;
  }

  async findOptionsById(id: number) {
    const question = await this.questionRepository.findOne({
      where: { id },
      relations: ['options'],
    });
    return question?.options;
  }
}

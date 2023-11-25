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

  async findAll() {
    return await this.questionRepository.find();
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
}

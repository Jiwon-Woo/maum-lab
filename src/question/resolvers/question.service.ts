import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionEntity } from '../entities/question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionEntity)
    private questionRepository: Repository<QuestionEntity>,
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

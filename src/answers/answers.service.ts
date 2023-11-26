import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer) private answerRepository: Repository<Answer>,
  ) {}

  async findById(id: number) {
    return await this.answerRepository.findOne({ where: { id } });
  }

  async findBySurveyIdAndUserCode(surveyId: number, userCode: string) {
    return await this.answerRepository.find({
      where: {
        question: {
          surveyId,
        },
        userCode,
      },
      relations: ['question'],
      order: {
        question: {
          order: 'ASC',
        },
      },
    });
  }

  async findQuestionById(id: number) {
    const answer = await this.answerRepository.findOne({
      where: { id },
      relations: ['question'],
    });
    return answer?.question;
  }

  async findOptionById(id: number) {
    const answer = await this.answerRepository.findOne({
      where: { id },
      relations: ['option'],
    });
    return answer?.option;
  }
}

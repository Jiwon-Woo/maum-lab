import { BadRequestException, Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { Question } from 'src/questions/entities/question.entity';
import { QuestionsService } from './questions.service';

@Injectable()
export class QuestionLoader {
  constructor(private questionsService: QuestionsService) {}

  findOneById = new DataLoader<number, Question>(async (ids: number[]) => {
    const questions = await this.questionsService.findByIds(ids);
    if (questions.length !== ids.length) {
      throw new BadRequestException();
    }
    return ids.map((id) => questions.find((question) => question.id === id)!);
  });

  findBySurveyId = new DataLoader<number, Question[]>(
    async (surveyIds: number[]) => {
      const questions = await this.questionsService.findBySurveyIds(surveyIds);
      const questionGroups: Record<number, Question[]> = {};

      questions.forEach((question) => {
        const { surveyId } = question;
        if (!questionGroups[surveyId]) {
          questionGroups[surveyId] = [];
        }
        questionGroups[surveyId].push(question);
      });

      return surveyIds.map((surveyId) => questionGroups[surveyId] ?? []);
    },
  );
}

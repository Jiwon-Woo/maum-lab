import { Injectable, Logger } from '@nestjs/common';
import DataLoader from 'dataloader';
import { Question } from 'src/questions/entities/question.entity';
import { QuestionsService } from './questions.service';
import { plainLogMessage } from 'src/utils/log-message';

@Injectable()
export class QuestionLoader {
  constructor(private questionsService: QuestionsService) {}
  private readonly logger = new Logger(QuestionLoader.name);

  findOneById = new DataLoader<number, Question>(async (ids: number[]) => {
    const questions = await this.questionsService.findByIds(ids);
    const sortedQuestions = ids.map(
      (id) => questions.find((question) => question.id === id)!,
    );
    this.logger.log(plainLogMessage('findOneById'), ids, sortedQuestions);
    return sortedQuestions;
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

      const sortedGroups = surveyIds.map(
        (surveyId) => questionGroups[surveyId] ?? [],
      );
      this.logger.log(
        plainLogMessage('findBySurveyId'),
        surveyIds,
        sortedGroups,
      );
      return sortedGroups;
    },
  );
}

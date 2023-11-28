import { Injectable } from '@nestjs/common';
import { AnswersService } from './answers.service';
import DataLoader from 'dataloader';
import { SurveyAnswer } from './entities/survey-answer.entity';
import { QuestionAnswer } from './entities/question-answer.entity';

@Injectable()
export class AnswerLoader {
  constructor(private answersService: AnswersService) {}

  findOneSurveyAnswerById = new DataLoader<number, SurveyAnswer>(
    async (ids: number[]) => {
      const surveyAnswers =
        await this.answersService.findSurveyAnswerByIds(ids);
      return ids.map(
        (id) => surveyAnswers.find((surveyAnswer) => surveyAnswer.id === id)!,
      );
    },
  );

  findQuestionAnswerBySurveyAnswerId = new DataLoader<number, QuestionAnswer[]>(
    async (surveyAnswerIds: number[]) => {
      const questionAnswers =
        await this.answersService.findQuestionAnswerBySurveyAnswerId(
          surveyAnswerIds,
        );
      const questionAnswerGroup: Record<number, QuestionAnswer[]> = {};

      questionAnswers.forEach((questionAnswer) => {
        const { surveyAnswerId } = questionAnswer;
        if (!questionAnswerGroup[surveyAnswerId]) {
          questionAnswerGroup[surveyAnswerId] = [];
        }
        questionAnswerGroup[surveyAnswerId].push(questionAnswer);
      });

      return surveyAnswerIds.map(
        (surveyAnswerId) => questionAnswerGroup[surveyAnswerId] ?? [],
      );
    },
  );
}

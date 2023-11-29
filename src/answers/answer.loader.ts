import { Injectable, Logger } from '@nestjs/common';
import { AnswersService } from './answers.service';
import DataLoader from 'dataloader';
import { SurveyAnswer } from './entities/survey-answer.entity';
import { QuestionAnswer } from './entities/question-answer.entity';
import { plainLogMessage } from 'src/utils/log-message';

@Injectable()
export class AnswerLoader {
  constructor(private answersService: AnswersService) {}
  private readonly logger = new Logger(AnswerLoader.name);

  getAnswersTotalScore = new DataLoader<SurveyAnswer, number | null>(
    async (surveyAnswers: SurveyAnswer[]) => {
      const ids = surveyAnswers.map((surveyAnswer) => surveyAnswer.id);
      const answersTotalScore =
        await this.answersService.getAnswersTotalScore(ids);

      const sortedTotalScore = surveyAnswers.map((surveyAnswer) => {
        const answer = answersTotalScore.find(
          (answerTotalScore) =>
            answerTotalScore.surveyAnswerId === surveyAnswer.id,
        );
        let totalScore: number | null = answer?.totalScore ?? 0;
        if (!surveyAnswer.completedAt) {
          totalScore = null;
        }
        return totalScore;
      });

      this.logger.log(
        plainLogMessage('getAnswersTotalScore'),
        surveyAnswers,
        answersTotalScore,
        sortedTotalScore,
      );
      return sortedTotalScore;
    },
  );

  findOneSurveyAnswerById = new DataLoader<number, SurveyAnswer>(
    async (ids: number[]) => {
      const surveyAnswers =
        await this.answersService.findSurveyAnswerByIds(ids);
      const sortedSurveyAnswers = ids.map(
        (id) => surveyAnswers.find((surveyAnswer) => surveyAnswer.id === id)!,
      );
      this.logger.log(
        plainLogMessage('findOneSurveyAnswerById'),
        ids,
        sortedSurveyAnswers,
      );
      return sortedSurveyAnswers;
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

      const sortedGroups = surveyAnswerIds.map(
        (surveyAnswerId) => questionAnswerGroup[surveyAnswerId] ?? [],
      );
      this.logger.log(
        plainLogMessage('findQuestionAnswerBySurveyAnswerId'),
        surveyAnswerIds,
        sortedGroups,
      );
      return sortedGroups;
    },
  );
}

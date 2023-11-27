import { Module } from '@nestjs/common';
import { SurveyResolver } from './resolvers/survey.resolver';
import { SurveysService } from './surveys.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { Question } from 'src/questions/entities/question.entity';
import { QuestionsService } from 'src/questions/questions.service';
import { QuestionLoader } from 'src/questions/question.loader';
import { SurveyLoader } from './survey.loader';

@Module({
  imports: [TypeOrmModule.forFeature([Survey, Question])],
  providers: [
    SurveyResolver,
    SurveysService,
    SurveyLoader,
    QuestionsService,
    QuestionLoader,
  ],
  exports: [SurveyLoader, SurveysService],
})
export class SurveysModule {}

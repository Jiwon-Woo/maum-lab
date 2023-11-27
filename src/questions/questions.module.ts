import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { QuestionResolver } from './resolvers/question.resolver';
import { QuestionsService } from './questions.service';
import { QuestionLoader } from './question.loader';
import { OptionsService } from 'src/options/options.service';
import { OptionLoader } from 'src/options/option.loader';
import { Option } from 'src/options/entities/option.entity';
import { Survey } from 'src/surveys/entities/survey.entity';
import { SurveysService } from 'src/surveys/surveys.service';
import { SurveyLoader } from 'src/surveys/survey.loader';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Option, Survey])],
  providers: [
    QuestionResolver,
    QuestionsService,
    QuestionLoader,
    OptionsService,
    OptionLoader,
    SurveysService,
    SurveyLoader,
  ],
  exports: [QuestionLoader, QuestionsService],
})
export class QuestionsModule {}

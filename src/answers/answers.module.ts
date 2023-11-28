import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionAnswer } from './entities/question-answer.entity';
import { QuestionAnswerResolver } from './resolvers/question-answer.resolver';
import { AnswersService } from './answers.service';
import { QuestionsService } from 'src/questions/questions.service';
import { QuestionLoader } from 'src/questions/question.loader';
import { Question } from 'src/questions/entities/question.entity';
import { OptionsService } from 'src/options/options.service';
import { OptionLoader } from 'src/options/option.loader';
import { Option } from 'src/options/entities/option.entity';
import { SurveyAnswerResolver } from './resolvers/survey-answer.resolver';
import { SurveyAnswer } from './entities/survey-answer.entity';
import { SurveysService } from 'src/surveys/surveys.service';
import { Survey } from '../surveys/entities/survey.entity';
import { SurveyLoader } from 'src/surveys/survey.loader';
import { AnswerLoader } from './answer.loader';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuestionAnswer,
      SurveyAnswer,
      Survey,
      Question,
      Option,
    ]),
  ],
  providers: [
    QuestionAnswerResolver,
    SurveyAnswerResolver,
    AnswersService,
    AnswerLoader,
    SurveysService,
    SurveyLoader,
    QuestionsService,
    QuestionLoader,
    OptionsService,
    OptionLoader,
  ],
})
export class AnswersModule {}

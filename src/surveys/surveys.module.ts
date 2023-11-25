import { Module } from '@nestjs/common';
import { SurveyResolver } from './resolvers/survey.resolver';
import { SurveysService } from './surveys.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyEntity } from './entities/survey.entity';
import { QuestionEntity } from 'src/questions/entities/question.entity';
import { QuestionsService } from 'src/questions/questions.service';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyEntity, QuestionEntity])],
  providers: [SurveyResolver, SurveysService, QuestionsService],
})
export class SurveysModule {}

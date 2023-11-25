import { Module } from '@nestjs/common';
import { SurveyResolver } from './resolvers/survey.resolver';
import { SurveysService } from './surveys.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { Question } from 'src/questions/entities/question.entity';
import { QuestionsService } from 'src/questions/questions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Survey, Question])],
  providers: [SurveyResolver, SurveysService, QuestionsService],
})
export class SurveysModule {}

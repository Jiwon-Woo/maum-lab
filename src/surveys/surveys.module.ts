import { Module } from '@nestjs/common';
import { SurveyResolver } from './resolvers/survey.resolver';
import { SurveysService } from './surveys.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyEntity } from './entities/survey.entity';
import { QuestionEntity } from 'src/question/entities/question.entity';
import { QuestionService } from 'src/question/question.service';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyEntity, QuestionEntity])],
  providers: [SurveyResolver, SurveysService, QuestionService],
})
export class SurveysModule {}

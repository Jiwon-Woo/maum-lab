import { Module } from '@nestjs/common';
import { SurveyResolver } from './resolvers/survey.resolver';
import { SurveyService } from './survey.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyEntity } from './entities/survey.entity';
import { QuestionEntity } from 'src/question/entities/question.entity';
import { QuestionService } from 'src/question/resolvers/question.service';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyEntity, QuestionEntity])],
  providers: [SurveyResolver, SurveyService, QuestionService],
})
export class SurveyModule {}

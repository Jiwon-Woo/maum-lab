import { Module } from '@nestjs/common';
import { SurveyResolver } from './resolvers/survey.resolver';
import { SurveysService } from './surveys.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Survey])],
  providers: [SurveyResolver, SurveysService],
})
export class SurveysModule {}

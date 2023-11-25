import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionEntity } from './entities/question.entity';
import { QuestionResolver } from './resolvers/question.resolver';
import { QuestionsService } from './questions.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity])],
  providers: [QuestionResolver, QuestionsService],
  exports: [QuestionsService],
})
export class QuestionsModule {}

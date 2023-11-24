import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionEntity } from './entities/question.entity';
import { QuestionResolver } from './resolvers/question.resolver';
import { QuestionService } from './resolvers/question.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity])],
  providers: [QuestionResolver, QuestionService],
})
export class QuestionModule {}

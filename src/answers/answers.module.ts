import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { AnswerResolver } from './resolvers/answer.resolver';
import { AnswersService } from './answers.service';
import { QuestionsService } from 'src/questions/questions.service';
import { QuestionLoader } from 'src/questions/question.loader';
import { Question } from 'src/questions/entities/question.entity';
import { OptionsService } from 'src/options/options.service';
import { OptionLoader } from 'src/options/option.loader';
import { Option } from 'src/options/entities/option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Answer, Question, Option])],
  providers: [
    AnswerResolver,
    AnswersService,
    QuestionsService,
    QuestionLoader,
    OptionsService,
    OptionLoader,
  ],
})
export class AnswersModule {}

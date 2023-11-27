import { Module } from '@nestjs/common';
import { OptionsService } from './options.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from './entities/option.entity';
import { OptionResolver } from './resolvers/option.resolver';
import { QuestionLoader } from 'src/questions/question.loader';
import { Question } from 'src/questions/entities/question.entity';
import { QuestionsService } from 'src/questions/questions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Option, Question])],
  providers: [OptionsService, OptionResolver, QuestionsService, QuestionLoader],
  exports: [OptionsService, OptionResolver],
})
export class OptionsModule {}

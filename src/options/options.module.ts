import { Module } from '@nestjs/common';
import { OptionsService } from './options.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from './entities/option.entity';
import { OptionResolver } from './resolvers/option.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Option])],
  providers: [OptionsService, OptionResolver],
})
export class OptionsModule {}

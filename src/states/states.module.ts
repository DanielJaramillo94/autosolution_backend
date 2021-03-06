import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StatesController } from './states.controller';
import { StatesService } from './states.service';
import { State } from './state.entity';

@Module({
  imports: [TypeOrmModule.forFeature([State])],
  controllers: [StatesController],
  providers: [StatesService],
  exports: [StatesService],
})
export class StatesModule {}

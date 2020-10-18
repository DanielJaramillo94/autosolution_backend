import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReunionesController } from './reuniones.controller';
import { ReunionesService } from './reuniones.service';
import { Reunion } from './reunion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reunion])],
  controllers: [ReunionesController],
  providers: [ReunionesService],
  exports: [ReunionesService],
})
export class ReunionesModule {}

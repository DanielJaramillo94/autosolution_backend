import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GrabacionesController } from './grabaciones.controller';
import { GrabacionesService } from './grabaciones.service';
import { Grabacion } from './grabacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Grabacion])],
  controllers: [GrabacionesController],
  providers: [GrabacionesService],
  exports: [GrabacionesService],
})
export class GrabacionesModule {}

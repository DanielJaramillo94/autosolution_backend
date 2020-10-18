import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OcurrenciasController } from './ocurrencias.controller';
import { OcurrenciasService } from './ocurrencias.service';
import { Ocurrencia } from './ocurrencia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ocurrencia])],
  controllers: [OcurrenciasController],
  providers: [OcurrenciasService],
  exports:  [OcurrenciasService],
})
export class OcurrenciasModule {}

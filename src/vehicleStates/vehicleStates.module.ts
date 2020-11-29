import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VehicleStatesController } from './vehicleStates.controller';
import { VehicleStatesService } from './vehicleStates.service';
import { VehicleState } from './vehicleState.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleState])],
  controllers: [VehicleStatesController],
  providers: [VehicleStatesService],
  exports: [VehicleStatesService],
})
export class VehicleStatesModule {}

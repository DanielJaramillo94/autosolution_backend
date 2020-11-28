import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VehicleXownersController } from './vehiclesXowners.controller';
import { VehicleXownersService } from './vehiclesXowners.service';
import { VehicleXowner } from './vehicleXowner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleXowner])],
  controllers: [VehicleXownersController],
  providers: [VehicleXownersService],
  exports: [VehicleXownersService],
})
export class VehicleXownersModule {}

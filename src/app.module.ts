import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';

import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

import {AuditsModule} from './audits/audits.module';
import { AuditsController } from './audits/audits.controller';
import { AuditsService } from './audits/audits.service';
import { Audit } from './audits/audit.entity';

import { EmployeesModule } from './employees/employees.module';
import { EmployeesController } from './employees/employees.controller';
import { EmployeesService} from './employees/employees.service';
import { Employee } from './employees/employee.entity';

import { OwnersModule } from './owners/owners.module';
import { OwnersController } from './owners/owners.controller';
import { OwnersService } from './owners/owners.service';
import { Owner } from './owners/owner.entity';

import { RolesModule } from './roles/roles.module';
import { RolesController } from './roles/roles.controller';
import { RolesService} from './roles/roles.service';
import { Role } from './roles/role.entity';

import { StatesModule } from './states/states.module';
import { StatesController } from './states/states.controller';
import { StatesService } from './states/states.service';
import { State } from './states/state.entity';

import { VehiclesModule } from './vehicles/vehicles.module';
import { VehiclesController } from './vehicles/vehicles.controller';
import { VehiclesService } from './vehicles/vehicles.service';
import { Vehicle } from './vehicles/vehicle.entity';

import { VehicleStatesModule } from './vehicleStates/vehicleStates.module';
import { VehicleStatesController } from './vehicleStates/vehicleStates.controller';
import { VehicleStatesService } from './vehicleStates/vehicleStates.service';
import { VehicleState } from './vehicleStates/vehicleState.entity';

import { VehicleXownersModule } from './vehiclesXowners/vehiclesXowners.module';
import { VehicleXownersController } from './vehiclesXowners/vehiclesXowners.controller';
import { VehicleXownersService } from './vehiclesXowners/vehiclesXowners.service';
import { VehicleXowner } from './vehiclesXowners/vehicleXowner.entity';

import { VehicleTypesModule } from './vehicleTypes/vehicleTypes.module';
import { VehicleTypesController } from './vehicleTypes/vehicleTypes.controller';
import { VehicleTypesService } from './vehicleTypes/vehicleTypes.service';
import { VehicleType } from './vehicleTypes/vehicleType.entity';

require('dotenv').config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([Audit, Employee, Owner, Role, State, Vehicle, VehicleState, VehicleXowner, VehicleType]),
    AuthModule,
    AuditsModule,
    EmployeesModule,
    OwnersModule,
    RolesModule,
    StatesModule,
    VehiclesModule,
    VehicleStatesModule,
    VehicleXownersModule,
    VehicleTypesModule
  ],
  controllers: [AppController, AuditsController, EmployeesController, OwnersController, RolesController, StatesController, VehiclesController, VehicleStatesController, VehicleXownersController, VehicleTypesController],
  providers: [AppService, AuditsService, EmployeesService, OwnersService, RolesService, StatesService, VehiclesService, VehicleStatesService, VehicleXownersService, VehicleTypesService],
})
export class AppModule {}

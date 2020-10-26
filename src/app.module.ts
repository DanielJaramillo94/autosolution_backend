import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';

import { ReunionesModule } from './reuniones/reuniones.module';
import { OcurrenciasModule } from './ocurrencias/ocurrencias.module';
import { GrabacionesModule } from './grabaciones/grabaciones.module';
import { ArchivosModule } from './archivos/archivos.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { EmployeesModule } from './employees/employees.module';
import { EmployeesController } from './employees/employees.controller';
import { EmployeesService} from './employees/employees.service';
import { Employee } from './employees/employee.entity';

import { RolesModule } from './roles/roles.module';
import { RolesController } from './roles/roles.controller';
import { RolesService} from './roles/roles.service';
import { Role } from './roles/role.entity';

require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([Role, Employee]),
    ReunionesModule,
    OcurrenciasModule,
    GrabacionesModule,
    ArchivosModule,
    AuthModule,
    UsersModule,
    RolesModule,
    EmployeesModule
  ],
  controllers: [AppController,RolesController, EmployeesController],
  providers: [AppService,RolesService, EmployeesService],
})
export class AppModule {}

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
import { ConfigModule } from '@nestjs/config';

require('dotenv').config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ReunionesModule,
    OcurrenciasModule,
    GrabacionesModule,
    ArchivosModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

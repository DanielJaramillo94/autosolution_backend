import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.trategy';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { EmployeesModule } from '../employees/employees.module';
import { OwnersModule } from '../owners/owners.module';
import { EmailStrategy } from './strategies/email.strategy';
import { EmailJwtStrategy } from './strategies/emailJwt.strategy';

@Module({
  imports: [
    PassportModule,
    EmployeesModule,
    OwnersModule,
    
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '3h',
        }
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy, EmailStrategy, EmailJwtStrategy],
  exports: [AuthService]
})
export class AuthModule{}

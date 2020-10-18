import { TypeOrmModuleOptions } from '@nestjs/typeorm';


class ConfigService {

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: process.env.MODE === 'dev',
      logging: process.env.MODE === 'dev',
      entities: ['./dist/**/*.entity{.ts,.js}'],
    };
  }
}

const configService = new ConfigService();
export { configService };
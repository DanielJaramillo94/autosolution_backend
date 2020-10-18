import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.APP_PORT);
  Logger.log(`Running on port ${process.env.APP_PORT}: http://localhost:${process.env.APP_PORT}`, 'NestBootstrapFunction')
}
bootstrap();

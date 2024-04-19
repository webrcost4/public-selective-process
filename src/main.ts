import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import { MoviesModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(MoviesModule);
  app.use(express.json());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

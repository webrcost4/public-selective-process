import { NestFactory } from '@nestjs/core';
import { MoviesModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(MoviesModule);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

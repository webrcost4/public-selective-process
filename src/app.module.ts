import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { ConfigModule } from '@nestjs/config';
import { MoviesService } from './database/movies.service';
import { PrismaService } from './services/movies.service';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from './redis/redis.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [MoviesService, PrismaService, JwtService, RedisService],
})
export class MoviesModule {}

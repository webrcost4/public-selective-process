import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redisClient: Redis;

  constructor() {
    this.redisClient = new Redis(process.env.REDIS_DB, {
      tls: {},
    });
  }

  /*
   ** Set a key-value pair in Redis with an expiration time of 30 seconds.
   */
  async set(key: string, value: string): Promise<void> {
    await this.redisClient.set(key, value, 'EX', 30);
  }

  /*
   ** Retrieve the value associated with a key from Redis.
   */
  async get(key: string): Promise<Array<object> | string> {
    const movies = await this.redisClient.get(key);
    return JSON.parse(movies);
  }
}

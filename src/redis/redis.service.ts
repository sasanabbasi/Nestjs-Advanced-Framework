import { Injectable } from '@nestjs/common';
import { RedisClient, createClient } from 'redis';

@Injectable()
export class RedisService {
  public redisClient: RedisClient;

  constructor() {
    this.newRedisClient().then((client) => {
      this.redisClient = client;
    });
  }

  private async newRedisClient() {
    return createClient({
      url: process.env.REDIS_CONNECTION_STRING,
    });
  }

  get(key): any {
    new Promise((resolve, reject) => {
      this.redisClient.get(key, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }
}

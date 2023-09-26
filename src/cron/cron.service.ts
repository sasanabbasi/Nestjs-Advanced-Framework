import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class CronService {
  private logger: Logger = new Logger('CRONJOBS');
  constructor(private readonly redisService: RedisService) {}

  // @Cron(CronExpression.EVERY_MINUTE)
  // async updateFuturePais() {
  //   this.logger.log("Pair's prices updated from binance!");
  // }
}

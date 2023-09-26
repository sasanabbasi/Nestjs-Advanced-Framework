import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [],
  providers: [CronService],
})
export class CronModule {}

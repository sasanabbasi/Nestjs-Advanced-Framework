import { RedisService } from 'src/redis/redis.service';
export declare class CronService {
    private readonly redisService;
    private logger;
    constructor(redisService: RedisService);
}

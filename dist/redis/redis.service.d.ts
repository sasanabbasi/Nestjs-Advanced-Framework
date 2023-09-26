import { RedisClient } from 'redis';
export declare class RedisService {
    redisClient: RedisClient;
    constructor();
    private newRedisClient;
    get(key: any): any;
}

import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { RedisClient } from 'redis';
import { SocketGateway } from './socket.gateway';
export declare class SocketService implements OnModuleInit, OnModuleDestroy {
    private readonly socketGateway;
    redisClient: RedisClient;
    publisherClient: RedisClient;
    private subscriberClient;
    private discoveryInterval;
    private serviceId;
    constructor(socketGateway: SocketGateway);
    onModuleInit(): Promise<void>;
    private newRedisClient;
    onModuleDestroy(): Promise<void>;
    private channelDiscovery;
    sendMessage(userId: string, payload: string, fromRedisChannel: boolean): Promise<void>;
}

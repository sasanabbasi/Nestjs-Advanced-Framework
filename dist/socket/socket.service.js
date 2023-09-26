"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketService = void 0;
const common_1 = require("@nestjs/common");
const redis_1 = require("redis");
const socket_gateway_1 = require("./socket.gateway");
let SocketService = class SocketService {
    constructor(socketGateway) {
        this.socketGateway = socketGateway;
        this.serviceId = 'SOCKET_CHANNEL_' + Math.random().toString(26).slice(2);
    }
    async onModuleInit() {
        this.redisClient = await this.newRedisClient();
        this.subscriberClient = await this.newRedisClient();
        this.publisherClient = await this.newRedisClient();
        this.subscriberClient.subscribe(this.serviceId);
        this.subscriberClient.on('message', (channel, message) => {
            console.log('Helloooo');
            const { userId, payload } = JSON.parse(message);
            this.sendMessage(userId, payload, true);
        });
        await this.channelDiscovery();
    }
    async newRedisClient() {
        return (0, redis_1.createClient)({
            url: process.env.REDIS_CONNECTION_STRING,
        });
    }
    async onModuleDestroy() {
        this.discoveryInterval && clearTimeout(this.discoveryInterval);
    }
    async channelDiscovery() {
        this.redisClient.setex(this.serviceId, 3, Date.now().toString());
        this.discoveryInterval = setTimeout(() => {
            this.channelDiscovery();
        }, 2000);
    }
    async sendMessage(userId, payload, fromRedisChannel) {
        var _a;
        console.log(this.socketGateway.connectedSockets[userId]);
        (_a = this.socketGateway.connectedSockets[userId]) === null || _a === void 0 ? void 0 : _a.forEach((socket) => socket.send(payload));
        if (!fromRedisChannel) {
            this.redisClient.keys('SOCKET_CHANNEL_*', (err, ids) => {
                ids
                    .filter((p) => p != this.serviceId)
                    .forEach((id) => {
                    this.publisherClient.publish(id, JSON.stringify({
                        payload,
                        userId,
                    }));
                });
            });
        }
    }
};
SocketService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [socket_gateway_1.SocketGateway])
], SocketService);
exports.SocketService = SocketService;
//# sourceMappingURL=socket.service.js.map
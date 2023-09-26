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
exports.SocketGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
let SocketGateway = class SocketGateway {
    constructor() {
        this.connectedSockets = {};
        this.logger = new common_1.Logger('SocketGateway');
    }
    afterInit(server) {
        this.logger.log('Initialized!');
    }
    async handleConnection(client, ...args) {
        try {
            const token = client.handshake.headers['cookie']
                .split(';')
                .map((p) => p.trim())
                .find((p) => p.split('=')[0] === 'token')
                .split('=')[1];
            client['userId'] = token;
            if (!this.connectedSockets[client['userId']])
                this.connectedSockets[client['userId']] = [];
            this.connectedSockets[client['userId']].push(client);
        }
        catch (error) {
            console.log(error);
        }
    }
    handleDisconnect(client) {
        this.connectedSockets[client.userId] = this.connectedSockets[client.userId].filter((p) => p.id !== client.id);
    }
    handleMessage(client, payload) {
        client.emit('msgToClient', payload);
        return { event: 'msgToClient', data: `Back to ${payload}` };
    }
};
__decorate([
    (0, websockets_1.SubscribeMessage)('msgToFutures'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Object)
], SocketGateway.prototype, "handleMessage", null);
SocketGateway = __decorate([
    (0, websockets_1.WebSocketGateway)()
], SocketGateway);
exports.SocketGateway = SocketGateway;
//# sourceMappingURL=socket.gateway.js.map
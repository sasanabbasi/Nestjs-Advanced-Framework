import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WsResponse } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
export declare class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    connectedSockets: {
        [key: string]: any[];
    };
    private logger;
    afterInit(server: Server): void;
    handleConnection(client: Socket, ...args: any[]): Promise<void>;
    handleDisconnect(client: any): void;
    handleMessage(client: Socket, payload: any): WsResponse<string>;
}

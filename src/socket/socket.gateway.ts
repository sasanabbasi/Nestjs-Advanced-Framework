import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  public connectedSockets: { [key: string]: any[] } = {};

  private logger: Logger = new Logger('SocketGateway');

  afterInit(server: Server) {
    this.logger.log('Initialized!');
  }

  async handleConnection(client: Socket, ...args: any[]) {
    try {
      const token = client.handshake.headers['cookie']
        .split(';')
        .map((p) => p.trim())
        .find((p) => p.split('=')[0] === 'token')
        .split('=')[1];

      // for this example, we simply set userId by token
      client['userId'] = token;

      if (!this.connectedSockets[client['userId']])
        this.connectedSockets[client['userId']] = [];

      this.connectedSockets[client['userId']].push(client);
    } catch (error) {
      console.log(error);
      // client.close(4403, 'set JWT cookie to authenticate');
    }
  }

  handleDisconnect(client: any) {
    this.connectedSockets[client.userId] = this.connectedSockets[
      client.userId
    ].filter((p) => p.id !== client.id);
  }

  @SubscribeMessage('msgToFutures')
  handleMessage(client: Socket, payload: any): WsResponse<string> {
    // console.log('Hello');
    // console.log(this.connectedSockets['user1']);
    // this.connectedSockets['user1']?.forEach((socket) =>
    //   socket.send(`Back to ${payload}`),
    // );
    // this.wss.emit('msgToClient', payload);
    client.emit('msgToClient', payload);
    return { event: 'msgToClient', data: `Back to ${payload}` };
  }
}

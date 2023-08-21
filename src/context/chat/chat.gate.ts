import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsResponse,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Logger, OnModuleInit } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { ChatInput } from 'src/view/interface/chat.interface';
import { FilterService } from '../service/filter.service';

@WebSocketGateway()
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  constructor(private service: FilterService) {}

  private logger: Logger = new Logger('MessageGateway');

  @WebSocketServer()
  server: Server;

  afterInit() {
    this.logger.log('Server Start');
  }

  @SubscribeMessage('Community')
  async onNewMessage(
    @MessageBody() body: ChatInput,
    @ConnectedSocket() socket: Socket,
  ) {
    const offensive = await this.service.filter(body);
    if (offensive) {
      return this.server.emit(
        'offensiveMessage',
        `This message was offensive and has been removed.`,
      );
    }
    return this.server.emit('Community', {
      msg: body.msg,
    });
  }

  handleConnection(client: Socket) {
    client.send('Client connected');
    this.logger.log('Client connected');
  }
  handleDisconnect(client: Socket) {
    client.send('Client disconnect');
    this.logger.log('Client disconnect');
  }
}

import {
  SubscribeMessage,
  OnGatewayConnection,
  MessageBody,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { CreateMessageDto } from './messages/dto/create-message.dto';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { MessagesService } from './messages/messages.service';
import { AuthService } from 'src/auth/auth.service';
import { getFollowerUserSockets } from './utils/helpers';

const immutable = {}


@WebSocketGateway({
  cors: {
    origin: '*',
  },
})

export class AppGateway
  implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly authService: AuthService//todo!

  ) { }

  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('create_message')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: CreateMessageDto,
  ): Promise<void> {
    await this.messagesService.createMessage(payload);
    getFollowerUserSockets(immutable, client.data).map(v => {
      this.server.to(v).emit("response_message", payload)
    })
  }

  afterInit(server: Server) {
    this.logger.log(server);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    // Senaryo 2-B:
    getFollowerUserSockets(immutable, client.data).map(v => {
      this.server.to(v).emit("user_status_announce", { status: 'offline', userId: client.data.userId })
    })
    delete immutable[client.id]
  }

  async handleConnection(client: Socket, ...args: any[]) {
    try {
      const authorizedUser = await this.authService.getFromJwt(client.handshake.headers.token)
      client.data = authorizedUser

      immutable[client.id] = {
        user: authorizedUser,
        created: new Date()
      }

      // Senaryo 2-A:
      getFollowerUserSockets(immutable, client.data).map(v => {
        this.server.to(v).emit("user_status_announce", { status: 'online', userId: authorizedUser.userId })
      })

      //const io = new Server()
      //console.log("authorizedUser", authorizedUser)
      //ex: { email: 'info@ferdiozer.com', userId: '648ef36b46d482a6c0150d3e' }
    } catch (error) {
      this.logger.log("socket:connection", error)
      // Senaryo 1:
      client.disconnect(true)
    }
    this.logger.log(`Client connected: ${client.id}, count:${Object.keys(immutable).length}`);
  }
}


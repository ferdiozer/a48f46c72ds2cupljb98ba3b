import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatsModule } from './chats/chats.module';
import { AuthService } from './auth/auth.service';
import { MessagesModule } from './messages/messages.module';

import { AuthModule } from './auth/auth.module';

//Todo!
import { JwtStategy } from './auth/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';

@Module({
  controllers: [AppController],
  providers: [AppService, AppGateway,AuthService,JwtStategy],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    UsersModule,
    ChatsModule,
    MessagesModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
})
export class AppModule {}

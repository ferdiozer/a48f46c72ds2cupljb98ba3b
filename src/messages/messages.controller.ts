import { Controller, Get, Post, Body, Param, UseGuards, Inject } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('messages')
@Controller('messages')
export class MessagesController {

  constructor(
    private readonly messagesService: MessagesService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiResponse({
    status: 201,
    description: 'The message has been successfully created.',
  })
  async createMessage(@Body() createMessageDto: CreateMessageDto) {
    const created: CreateMessageDto = await this.messagesService.createMessage(createMessageDto);
    // this.chatsService.updateLastMessage(created.chat_id, created.message)
    // console.log("created!", created)
    return created
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getAllMessagesByChatId(@Param('id') id: string) {
    return await this.messagesService.findAllMessages(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('set-is-read/:chat_id')
  async setMessagesIsRead(@Param(':chat_id') chat_id: string) {
    await this.messagesService.updateIsRead(chat_id, true);
    return { success: true }
  }

}

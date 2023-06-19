import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  chat_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sender_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty()
  @IsBoolean()
  is_read: boolean = false;
}

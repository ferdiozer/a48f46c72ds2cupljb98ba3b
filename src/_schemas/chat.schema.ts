import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes,Document, ObjectId } from 'mongoose';

export type ChatDocument = Chat & Document;

@Schema({ versionKey: false, timestamps: true })
export class Chat {
  @Prop({ ref: 'User', type: [SchemaTypes.ObjectId] })
  members: [ObjectId];

  @Prop({ default: '' })
  last_message: string;


}

export const ChatSchema = SchemaFactory.createForClass(Chat);

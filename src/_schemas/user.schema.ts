import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes,Document, ObjectId } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ versionKey: false, timestamps: true })
export class User {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ ref: 'User', type: [SchemaTypes.ObjectId] })
  followers: [ObjectId];

}

export const UserSchema = SchemaFactory.createForClass(User);

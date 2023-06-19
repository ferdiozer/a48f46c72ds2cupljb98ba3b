import { Types } from 'mongoose';

export class MessageDo {
  _id: Types.ObjectId;
  chat_id: Types.ObjectId;
  sender_id: Types.ObjectId;
  message: string;
  is_read: boolean;

  constructor(props: Partial<MessageDo>) {
    this._id = props._id || null;
    this.chat_id = props.chat_id || null;
    this.sender_id = props.sender_id || null;
    this.message = props.message || null;
    this.is_read = props.is_read || false;
  }
}

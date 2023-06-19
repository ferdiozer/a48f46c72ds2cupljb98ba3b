import { Types } from 'mongoose';

export class ChatDo {
  _id: Types.ObjectId;
  members: Array<Types.ObjectId>;
  last_message: string;

  constructor(props: Partial<ChatDo>) {
    this._id = props._id || null;
    this.members = props.members || null;
  }
}

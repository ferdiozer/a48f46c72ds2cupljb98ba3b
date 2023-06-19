import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDo } from 'src/_schemas/message.do';

export class MessagesRepository {
  constructor(
    @InjectModel('Message')
    private messageModel: Model<MessageDo>,
  ) { }

  async createMessage(message): Promise<any> {
    const createOne = await this.messageModel.create(message);
    return createOne;
  }

  async findAllMessages(id): Promise<any> {
    const findAll = await this.messageModel.find({ chat_id: { $all: [id] }, is_read: false });
    return findAll;
  }

  // Todo!
  async updateIsRead(chat_id, isRead): Promise<any> {
    const updated = await this.messageModel.findOneAndUpdate({_id:chat_id}, { is_read: isRead });
    // const updated = await this.messageModel.findOneAndUpdate({chat_id}, { is_read: isRead });
    //const updated = await this.messageModel.updateMany({ "chat_id": chat_id }, { "$set": { "is_read": true } });
    // const updated = await this.messageModel.updateMany({ chat_id }, {
    //   $set: {
    //     is_read: isRead
    //   },
    // });
    return updated
  }
}

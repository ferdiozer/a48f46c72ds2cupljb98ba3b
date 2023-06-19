import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDo } from 'src/_schemas/user.do';

export class UsersRepository {
  constructor(
    @InjectModel('User')
    private userModel: Model<UserDo>,
  ) { }

  async findById(id): Promise<any> {
    const findOne = await this.userModel.findOne({ _id: id });
    return findOne;
  }

  async findOne(email): Promise<any> {
    const findOne = await this.userModel.findOne({ email: email });
    return findOne;
  }

  async createOne(user): Promise<any> {
    const createOne = await this.userModel.create(user);
    return createOne;
  }


  async updateFollowers(id, followers): Promise<any> {
    const updated = await this.userModel.findOneAndUpdate(id, { followers: followers });
    return updated
  }

}

import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) { }

  async findById(id): Promise<any> {
    return this.usersRepository.findById(id);
  }

  async findOne(username): Promise<any> {
    return this.usersRepository.findOne(username);
  }

  async createOne(user): Promise<any> {
    const createOne = await this.usersRepository.createOne(user);
    return createOne;
  }

  async updateFollowers(id: string, followers: Array<any>): Promise<any> {
    return await this.usersRepository.updateFollowers(id, followers);
  }

}

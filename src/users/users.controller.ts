import { Controller, Get, Post, Body, UseGuards, Headers } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalStrategy } from 'src/auth/local.strategy';
import { UsersService } from './users.service';

import { ApiTags, ApiResponse } from '@nestjs/swagger';

import { AddFriendDto } from './dto/add-friend.dto';

import { AuthService } from 'src/auth/auth.service';
import { UserDo } from 'src/_schemas/user.do';


@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    //private readonly authService: AuthService//todo!
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post('add-friends')
  async addFriends(@Body() friendData: AddFriendDto) {
    const currentUser = await this.usersService.findById(friendData.from)
    const friendUser = await this.usersService.findById(friendData.friend)
    let { followers } = currentUser
    if (!followers.map(v => `${v}`).includes(friendData.friend)) {
      followers.push(friendData.friend)
    }
    const updatedData = await this.usersService.updateFollowers(currentUser._id, followers)
    return { followers };
  }

  @UseGuards(JwtAuthGuard)
  @Post('remove-friends')
  async removeFriends(@Body() friendData: AddFriendDto) {
    const currentUser = await this.usersService.findById(friendData.from)
    const friendUser = await this.usersService.findById(friendData.friend)
    let followers = currentUser.followers
    let followersStrArr = followers.map(v => `${v}`)
    const findIndex = followers.map(v => `${v}`).findIndex(v => v == friendData.friend)
    if (findIndex != -1) {
      followersStrArr = followersStrArr.filter(v => v != friendData.friend)
    }
    const updatedData = await this.usersService.updateFollowers(currentUser._id, followersStrArr)
    return { followers: followersStrArr };
  }

}

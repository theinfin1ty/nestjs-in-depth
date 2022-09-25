import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseIntPipe,
} from '@nestjs/common';
import { UserNotFoundException } from 'src/users/exceptions/UserNotFound.exception';
import { UsersService } from 'src/users/services/users/users.service';
import { SerializedUser } from 'src/users/types';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('')
  @UseInterceptors(ClassSerializerInterceptor)
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('/username/:username')
  @UseInterceptors(ClassSerializerInterceptor)
  getByusername(@Param('username') username: string) {
    const user = this.userService.getUserByUsername(username);
    if (!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }
    return new SerializedUser(user);
  }

  @Get('/id/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  getById(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.getUserById(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    return new SerializedUser(user);
  }
}

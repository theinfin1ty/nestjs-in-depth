import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseIntPipe,
  UseFilters,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/users/filters/HttpException.filter';
import { UserNotFoundException } from 'src/users/exceptions/UserNotFound.exception';
import { UsersService } from 'src/users/services/users/users.service';
import { SerializedUser } from 'src/users/types';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthenticatedGuard)
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
  @UseFilters(HttpExceptionFilter)
  getById(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.getUserById(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    return new SerializedUser(user);
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}

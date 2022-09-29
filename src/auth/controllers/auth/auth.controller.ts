import { Controller, Get, Post, Req, Session, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import {
  AuthenticatedGuard,
  LocalAuthGuard,
} from '../../../auth/utils/LocalGuard';

@Controller('auth')
export class AuthController {
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login() {
    console.log('Login route invoked');
  }

  @Get('')
  async getAuthSession(@Session() session: Record<string, any>) {
    console.log(session);
    session.authenticated = true;
    return session;
  }

  @Get('status')
  @UseGuards(AuthenticatedGuard)
  async getAuthStatus(@Req() req: Request) {
    return req.user;
  }
}

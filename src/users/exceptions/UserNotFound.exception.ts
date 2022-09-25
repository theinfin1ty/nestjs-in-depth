import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor(msg?: string, status?: number) {
    super(msg || 'User Not Fount', status || HttpStatus.NOT_FOUND);
  }
}

import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/typeorm';
import { UsersService } from 'src/users/services/users/users.service';

export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UsersService) {
    super();
  }

  serializeUser(user: User, done: (err, User) => void) {
    done(null, user);
  }

  async deserializeUser(user: User, done: (err, User) => void) {
    const userDB = await this.userService.findUserById(user.id);
    return userDB ? done(null, userDB) : done(null, null);
  }
}

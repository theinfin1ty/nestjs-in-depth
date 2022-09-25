import { Injectable } from '@nestjs/common';
import { SerializedUser, User } from 'src/users/types';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      username: 'anant',
      password: 'password',
    },
    {
      id: 2,
      username: 'gaurav',
      password: 'password',
    },
    {
      id: 3,
      username: 'jain',
      password: 'password',
    },
    {
      id: 4,
      username: 'xyz',
      password: 'password',
    },
  ];

  getUsers() {
    return this.users.map((user) => new SerializedUser(user));
  }

  getUserByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }
}

import { Injectable } from '@nestjs/common';

import { User, CreateUserDto, UpdateUserDto } from '@repo/api';

@Injectable()
export class UsersService {
  private readonly _users: User[] = [];

  create(createUserDto: CreateUserDto): User {
    const newUser: User = {
      id: this._users.length,
      ...createUserDto,
    };
    this._users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this._users;
  }

  findOne(id: number): User | undefined {
    return this._users.find((user) => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto): User | undefined {
    const userIndex = this._users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return undefined;
    }
    this._users[userIndex] = { ...this._users[userIndex], ...updateUserDto };
    return this._users[userIndex];
  }

  remove(id: number): boolean {
    const userIndex = this._users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return false;
    }
    this._users.splice(userIndex, 1);
    return true;
  }
}

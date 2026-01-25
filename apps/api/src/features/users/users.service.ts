import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from '@repo/api';
import { PrismaService } from '@api/src/prisma/prisma.service';
import { UserModel } from '@api/generated/prisma/models';

@Injectable()
export class UsersService {
  constructor(private readonly db: PrismaService) { }

  async create(createUserDto: CreateUserDto): Promise<UserModel> {
    return await this.db.user.create({
      data: createUserDto,
    });
  }

  async findAll(): Promise<UserModel[]> {
    console.log('findAll');

    return await this.db.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number): Promise<UserModel> {
    const user = await this.db.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserModel> {
    return await this.db.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number): Promise<void> {
    await this.db.user.delete({
      where: { id },
    });
  }
}
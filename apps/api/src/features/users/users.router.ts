import { Input, Mutation, Query, Router } from 'nestjs-trpc';
import { UsersService } from './users.service';
import { z } from 'zod';
import { createUserSchema, updateUserSchema, usersSchema } from './users.schema';
import { UserCreateInput, UserUpdateInput } from '@api/generated/prisma/models';

@Router({ alias: 'users' })
export class UserRouter {
  constructor(private readonly usersService: UsersService) { }

  @Query({
    input: z.object({ id: z.string() }),
    output: usersSchema,
  })
  getUserById(@Input('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Query({
    output: z.array(usersSchema),
  })
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Mutation({
    input: createUserSchema,
    output: usersSchema,
  })
  createUser(@Input() userData: UserCreateInput) {
    return this.usersService.create(userData);
  }

  @Mutation({
    input: z.object({
      id: z.string(),
      data: updateUserSchema,
    }),
    output: usersSchema,
  })
  updateUser(
    @Input('id') id: string,
    @Input('data') data: UserUpdateInput,
  ) {
    return this.usersService.update(id, data);
  }

  @Mutation({
    input: z.object({
      id: z.string(),
    }),
    output: usersSchema
  })
  deleteUser(@Input('id') id: string) {
    return this.usersService.remove(id);
  }
}
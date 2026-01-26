import { Input, Mutation, Query, Router } from 'nestjs-trpc';
import { UsersService } from './users.service';
import { z } from 'zod';
import { CreateUserInput, createUserSchema, usersSchema } from './users.schema';
import { UpdateUserDto } from '@repo/api';

@Router({ alias: 'users' })
export class UserRouter {
  constructor(private readonly usersService: UsersService) { }

  @Query({
    input: z.object({ id: z.number() }),
    output: usersSchema,
  })
  getUserById(@Input('id') id: number) {
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
  createUser(@Input() userData: CreateUserInput) {
    return this.usersService.create(userData);
  }

  @Mutation({
    input: z.object({
      id: z.number(),
      data: createUserSchema.partial(),
    }),
    output: usersSchema,
  })
  updateUser(
    @Input('id') id: number,
    @Input('data') data: Partial<CreateUserInput>,
  ) {
    return this.usersService.update(id, data as UpdateUserDto);
  }

  @Mutation({
    input: z.object({
      id: z.number(),
    }),
    output: z.void(),
  })
  deleteUser(@Input('id') id: number) {
    return this.usersService.remove(id);
  }
}
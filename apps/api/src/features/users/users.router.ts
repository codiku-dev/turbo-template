import { Ctx, Input, Mutation, Query, Router, Options } from 'nestjs-trpc';
import { UsersService } from './users.service';
import { z } from 'zod';
import { createUserSchema, updateUserSchema, usersSchema } from './users.schema';
import { UserCreateInput, UserUpdateInput } from '@api/generated/prisma/models';
import { AuthService } from '@thallesp/nestjs-better-auth';
import { Public } from '@api/src/infrastructure/decorators/public-auth.decorator';
import { LoggedAuthRouter } from '@api/src/infrastructure/decorators/logged-router.decorator';

@LoggedAuthRouter({ alias: 'users' })
export class UserRouter {
  constructor(private readonly usersService: UsersService, private readonly authService: AuthService) { }

  @Query({
    input: z.object({ id: z.string() }),
    output: usersSchema,
  })
  @Public()
  read(@Input('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Query({
    output: z.array(usersSchema),
  })
  @Public()
  readAll() {
    return this.usersService.findAll();
  }

  @Mutation({
    input: createUserSchema,
    output: usersSchema,
  })
  @Public()
  create(@Input() userData: UserCreateInput) {
    return this.usersService.create(userData);
  }

  @Mutation({
    input: z.object({
      id: z.string(),
      data: updateUserSchema,
    }),
    output: usersSchema,
  })
  @Public()
  update(
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
  @Public()
  delete(@Input('id') id: string) {
    return this.usersService.remove(id);
  }

  @Query({
    output: z.object({
      accounts: z.array(z.object({
        id: z.string(),
        providerId: z.string(),
        accountId: z.string(),
        userId: z.string(),
        scopes: z.array(z.string()),
        createdAt: z.date(),
        updatedAt: z.date(),
      })),
    }),
  })
  async getAccounts(/*@Ctx() ctx: { req: IncomingMessage }*/) {
    // console.log(ctx.req.headers);
    // const accounts = await this.authService.api.listUserAccounts({
    //   headers: fromNodeHeaders(ctx.req.headers),
    // });

    return { accounts: [] };
  }
}
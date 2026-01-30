import { PrismaService } from '@api/src/infrastructure/prisma/prisma.service';
import { Query } from 'nestjs-trpc';
import { Inject } from '@nestjs/common';
import { z } from 'zod';
import { AuthRouter } from '@api/src/infrastructure/decorators/auth-router.decorator';
import { Public } from '@api/src/infrastructure/decorators/public-auth.decorator';
import { LoggedAuthRouter } from './infrastructure/decorators/logged-router.decorator';

@LoggedAuthRouter({ alias: 'app' })
export class AppRouter {
    constructor(@Inject(PrismaService) private db: PrismaService) { }

    @Query({ output: z.object({ message: z.string() }) })
    @Public()
    async hello() {
        return { message: `Hello from public route at ${new Date().toISOString()}` };
    }

    @Query({ output: z.object({ message: z.string() }) })
    async protectedHello() {
        return { message: `Hello, you are authenticated (${new Date().toISOString()})` };
    }
}
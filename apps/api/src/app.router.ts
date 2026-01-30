import { PrismaService } from '@api/src/infrastructure/prisma/prisma.service';
import { Query, Router } from 'nestjs-trpc';
import { Inject } from '@nestjs/common';
import { z } from 'zod';
import { AuthGuardRouter } from '@api/src/infrastructure/decorators/auth/auth-guard-router.decorator';
import { Public } from './infrastructure/decorators/auth/public-procedure.decorator';

@AuthGuardRouter({ alias: 'app', logs: true })
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
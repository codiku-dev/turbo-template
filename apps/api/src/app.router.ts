import { PrismaService } from '@api/src/infrastructure/prisma/prisma.service';
import { Query, Router } from 'nestjs-trpc';
import { Inject } from '@nestjs/common';
import { z } from 'zod';
import { AuthRouter } from '@api/src/infrastructure/decorators/auth-router.decorator';
import { Public } from '@api/src/infrastructure/decorators/optional-auth.decorator';

@Router({ alias: 'app' })
export class AppRouter {
    constructor(@Inject(PrismaService) private db: PrismaService) { }

    @Query({ output: z.object({ message: z.string() }) })
    async hello(): Promise<{ message: string }> {
        return { 'message': `Hello World it's currently ${new Date().toISOString()} on the server nest` };
    }

    @Query({ output: z.object({ message: z.string() }) })
    async protectedHello(): Promise<{ message: string }> {
        return { 'message': `Hello World it's currently ${new Date().toISOString()} on the server nest and you are authenticated` };
    }
}
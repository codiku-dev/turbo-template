import { PrismaService } from '@api/src/infrastructure/prisma/prisma.service';
import { Query, Router } from 'nestjs-trpc';
import { Inject } from '@nestjs/common';
import { z } from 'zod';
import { AuthRouter } from '@api/src/infrastructure/decorators/auth-router.decorator';
import { Private } from '@api/src/infrastructure/decorators/private.decorator';
import { Public } from '@api/src/infrastructure/decorators/optional-auth.decorator';

@AuthRouter({ alias: 'app' })
export class AppRouter {
    constructor(@Inject(PrismaService) private db: PrismaService) { }

    @Query({ output: z.object({ message: z.string() }) })
    @Public()
    async hello(): Promise<{ message: string }> {
        return { 'message': `Hello World it's currently ${new Date().toISOString()} on the server nest` };
    }

    @Query({ output: z.object({ message: z.string() }) })
    async protectedHello(): Promise<{ message: string }> {
        return { 'message': `Hello World it's currently ${new Date().toISOString()} on the server nest and you are authenticated` };
    }
}
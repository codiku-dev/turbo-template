import { PrismaService } from '@api/src/prisma/prisma.service';
import { Query, Router } from 'nestjs-trpc';
import { Inject } from '@nestjs/common';
import { z } from 'zod';
import { LoggedRouter } from '@api/src/middlewares/logged-router.decorator';

@LoggedRouter({ alias: 'app' })
export class AppRouter {
    constructor(@Inject(PrismaService) private db: PrismaService) { }
    @Query({ output: z.object({ message: z.string() }) })
    async hello(): Promise<{ message: string }> {
        return { 'message': 'Hello World' };
    }
}
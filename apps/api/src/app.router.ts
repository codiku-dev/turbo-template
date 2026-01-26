import { PrismaService } from '@api/src/infrastructure/prisma/prisma.service';
import { Query, Router } from 'nestjs-trpc';
import { Inject } from '@nestjs/common';
import { z } from 'zod';

@Router({ alias: 'app' })
export class AppRouter {
    constructor(@Inject(PrismaService) private db: PrismaService) { }
    @Query({ output: z.object({ message: z.string() }) })
    async hello(): Promise<{ message: string }> {
        return { 'message': 'Hello World' };
    }
}
import { PrismaService } from '@api/src/infrastructure/prisma/prisma.service';
import { Query, Router } from 'nestjs-trpc';
import { Inject, UseGuards } from '@nestjs/common';
import { z } from 'zod';
import { AuthGuard } from '@thallesp/nestjs-better-auth';



@Router({ alias: 'app' })
export class AppRouter {
    constructor(@Inject(PrismaService) private db: PrismaService) { }
    @Query({ output: z.object({ message: z.string() }) })
    async hello(): Promise<{ message: string }> {
        return { 'message': `Hello World it's currently ${new Date().toISOString()} on the server nest` };
    }
}
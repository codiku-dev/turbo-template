import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';

import { UsersModule } from '@api/src/features/users/users.module';
import { PrismaModule } from '@api/src/infrastructure/prisma/prisma.module';

import { AppService } from '@api/src/app.service';
import { TRPCModule } from 'nestjs-trpc';
import { AppRouter } from '@api/src/app.router';
import { TrpcMiddlewaresModule } from '@api/src/infrastructure/middlewares/trpc-middlewares.module';
import { TrpcPanelController } from '@api/src/infrastructure/docs/docs.controller';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from '@api/src/features/auth/auth';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local.development', '.env.production', '.env'],
    }),
    TrpcMiddlewaresModule,
    PrismaModule,
    UsersModule,
    TRPCModule.forRoot({
      autoSchemaFile: path.resolve(__dirname, '../../../../packages/trpc/src'),
    }),
    AuthModule.forRoot({ auth }),
  ],
  controllers: [TrpcPanelController],
  providers: [AppService, AppRouter],
}) export class AppModule { }
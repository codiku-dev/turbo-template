import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';

import { UsersModule } from './features/users/users.module';
import { PrismaModule } from './prisma/prisma.module';

import { AppService } from './app.service';
import { TRPCModule } from 'nestjs-trpc';
import { AppRouter } from './app.router';
import { TrpcMiddlewaresModule } from '@api/src/middlewares/trpc-middlewares.module';

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
      autoSchemaFile: path.resolve(__dirname, '../../../../packages/trpc/src/server'),
    }),
  ],
  controllers: [],
  providers: [AppService, AppRouter],
})
export class AppModule { }
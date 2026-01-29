import { ConsoleLogger, Global, Module } from '@nestjs/common';
import { LoggedMiddleware } from '@api/src/infrastructure/middlewares/logger.middleware';
import { AuthMiddleware } from '@api/src/infrastructure/middlewares/auth.middleware';
import { OptionalAuthMiddleware } from '@api/src/infrastructure/middlewares/optional-auth.middleware';

@Global()
@Module({
  providers: [ConsoleLogger, LoggedMiddleware, AuthMiddleware, OptionalAuthMiddleware],
  exports: [LoggedMiddleware, AuthMiddleware, OptionalAuthMiddleware],
})
export class TrpcMiddlewaresModule { }

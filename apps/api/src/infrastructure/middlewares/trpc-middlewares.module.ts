import { ConsoleLogger, Global, Module } from '@nestjs/common';
import { LoggedMiddleware } from '@api/src/infrastructure/middlewares/logger.middleware';
import { AuthMiddleware } from '@api/src/infrastructure/middlewares/auth.middleware';
import { OptionalAuthMiddleware } from '@api/src/infrastructure/middlewares/optional-auth.middleware';
import { RequireAuthMiddleware } from '@api/src/infrastructure/middlewares/require-auth.middleware';

@Global()
@Module({
  providers: [
    ConsoleLogger,
    LoggedMiddleware,
    AuthMiddleware,
    OptionalAuthMiddleware,
    RequireAuthMiddleware,
  ],
  exports: [
    LoggedMiddleware,
    AuthMiddleware,
    OptionalAuthMiddleware,
    RequireAuthMiddleware,
  ],
})
export class TrpcMiddlewaresModule { }

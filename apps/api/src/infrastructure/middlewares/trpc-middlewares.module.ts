import { ConsoleLogger, Global, Module } from '@nestjs/common';
import { LoggedMiddleware } from '@api/src/infrastructure/middlewares/logger.middleware';
import { AuthGuardMiddleware } from '@api/src/infrastructure/middlewares/auth-guard.middleware';
import { PublicProcedureMiddleware } from '@api/src/infrastructure/middlewares/public-procedure.middleware';
import { PrivateProcedureMiddleware } from '@api/src/infrastructure/middlewares/private-procedure.middleware';

@Global()
@Module({
  providers: [
    ConsoleLogger,
    LoggedMiddleware,
    AuthGuardMiddleware,
    PublicProcedureMiddleware,
    PrivateProcedureMiddleware,
  ],
  exports: [
    LoggedMiddleware,
    AuthGuardMiddleware,
    PublicProcedureMiddleware,
    PrivateProcedureMiddleware,
  ],
})
export class TrpcMiddlewaresModule { }

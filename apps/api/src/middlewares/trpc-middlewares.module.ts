import { ConsoleLogger, Global, Module } from '@nestjs/common';
import { LoggedMiddleware } from '@api/src/middlewares/logger.middleware';

@Global()
@Module({
  providers: [ConsoleLogger, LoggedMiddleware],
  exports: [LoggedMiddleware],
})
export class TrpcMiddlewaresModule { }

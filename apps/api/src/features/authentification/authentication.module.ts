import { Module } from '@nestjs/common';

import { AuthRouter } from './authentication.router';

@Module({
  controllers: [],
  providers: [AuthRouter],
})
export class AuthenticationModule { }

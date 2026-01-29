import { TRPCMiddleware, MiddlewareOptions } from 'nestjs-trpc';
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@thallesp/nestjs-better-auth';

@Injectable()
export class AuthMiddleware implements TRPCMiddleware {
  constructor(private readonly authGuard: AuthGuard) {}

  async use(opts: MiddlewareOptions) {
    const { next, ctx } = opts;
    
    // Create a mock execution context for the guard
    const executionContext = {
      switchToHttp: () => ({
        getRequest: () => ctx.req,
        getResponse: () => ctx.res,
      }),
    } as ExecutionContext;

    // Check if the guard allows the request
    const canActivate = await this.authGuard.canActivate(executionContext);
    
    if (!canActivate) {
      throw new Error('Unauthorized');
    }

    return next();
  }
}

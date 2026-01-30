import { TRPCMiddleware, MiddlewareOptions } from 'nestjs-trpc';
import { Injectable } from '@nestjs/common';
import { auth } from '@api/src/infrastructure/auth/auth';
import { AuthGuardMiddleware } from './auth-guard.middleware';

@Injectable()
export class PublicProcedureMiddleware implements TRPCMiddleware {
  async use(opts: MiddlewareOptions<{ req: any; res: any }>) {
    const { next, ctx, path } = opts;

    // Register this path as optional auth IMMEDIATELY
    // This way, on subsequent requests, AuthMiddleware will know it's optional
    AuthGuardMiddleware.registerOptionalAuthPath(path);

    // Since AuthMiddleware already ran (router-level before procedure-level),
    // if it threw an error, we need to handle auth ourselves
    // We'll extract session and call next() with proper context

    try {
      // Extract session from request (Better Auth parses cookies automatically)
      const session = await auth.api.getSession({
        headers: ctx.req.headers,
      });

      // Add user and session to context if authenticated, otherwise continue with undefined
      return next({
        ctx: {
          ...ctx,
          optionalAuth: true,
          user: session?.user || undefined,
          session: session?.session || undefined,
        },
      });
    } catch {
      // If session check fails, continue without user/session
      return next({
        ctx: {
          ...ctx,
          optionalAuth: true,
          user: undefined,
          session: undefined,
        },
      });
    }
  }
}

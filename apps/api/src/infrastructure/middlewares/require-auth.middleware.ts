import { TRPCMiddleware, MiddlewareOptions } from 'nestjs-trpc';
import { Injectable } from '@nestjs/common';
import { auth } from '@api/src/features/auth/auth';

/**
 * Middleware that always requires authentication.
 * Used by @Private() at procedure level so auth works even with classic @Router.
 */
@Injectable()
export class RequireAuthMiddleware implements TRPCMiddleware {
  async use(opts: MiddlewareOptions<{ req: any; res: any }>) {
    const { next, ctx } = opts;

    const session = await auth.api.getSession({
      headers: ctx.req.headers,
    });

    if (!session?.user || !session?.session) {
      throw new Error('Unauthorized');
    }

    return next({
      ctx: {
        ...ctx,
        user: session.user,
        session: session.session,
      },
    });
  }
}

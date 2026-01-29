import { TRPCMiddleware, MiddlewareOptions } from 'nestjs-trpc';
import { Injectable } from '@nestjs/common';
import { auth } from '@api/src/features/auth/auth';

// Set of procedure paths that have optional auth (e.g. @Public)
const optionalAuthPaths = new Set<string>();
// Set of procedure paths that explicitly require auth (e.g. @Private overrides @Public)
const privatePaths = new Set<string>();

@Injectable()
export class AuthMiddleware implements TRPCMiddleware {
  async use(opts: MiddlewareOptions<{ req: any; res: any; optionalAuth?: boolean }>) {
    const { next, ctx, path } = opts;

    // Check if this procedure path has optional auth (@Private overrides @Public)
    const isOptionalAuth =
      !privatePaths.has(path) &&
      (optionalAuthPaths.has(path) || (ctx as any).optionalAuth);

    try {
      // Extract session from request (Better Auth parses cookies automatically)
      const session = await auth.api.getSession({
        headers: ctx.req.headers,
      });

      // Add user and session to context if authenticated
      if (session?.user && session?.session) {
        return next({
          ctx: {
            ...ctx,
            user: session.user,
            session: session.session,
          },
        });
      }

      // If optional auth, continue without throwing
      if (isOptionalAuth) {
        return next({
          ctx: {
            ...ctx,
            user: undefined,
            session: undefined,
          },
        });
      }

      throw new Error('Unauthorized');
    } catch (error) {
      // If optional auth, continue without throwing
      if (isOptionalAuth) {
        return next({
          ctx: {
            ...ctx,
            user: undefined,
            session: undefined,
          },
        });
      }
      throw new Error('Unauthorized');
    }
  }

  static registerOptionalAuthPath(path: string) {
    optionalAuthPaths.add(path);
  }

  static unregisterOptionalAuthPath(path: string) {
    optionalAuthPaths.delete(path);
  }

  static registerPrivatePath(path: string) {
    privatePaths.add(path);
  }
}

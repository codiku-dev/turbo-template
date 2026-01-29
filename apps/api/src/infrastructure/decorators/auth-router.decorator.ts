import { applyDecorators } from '@nestjs/common';
import { Router, UseMiddlewares } from 'nestjs-trpc';
import { AuthMiddleware } from '@api/src/infrastructure/middlewares/auth.middleware';

/**
 * Router decorator that applies AuthMiddleware to all procedures.
 * Use in place of @Router when you want authentication on every procedure.
 */
export function AuthRouter(args: { alias?: string }) {
  return (target: any) => {
    // Store router alias on the class for OptionalAuth decorator to use
    (target as any).__routerAlias = args.alias || 'app';

    // Apply Router and AuthMiddleware
    return applyDecorators(
      Router(args),
      UseMiddlewares(AuthMiddleware)
    )(target);
  };
}

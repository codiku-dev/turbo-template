import { UseMiddlewares } from 'nestjs-trpc';
import { AuthMiddleware } from '@api/src/infrastructure/middlewares/auth.middleware';
import { RequireAuthMiddleware } from '@api/src/infrastructure/middlewares/require-auth.middleware';

/**
 * Decorator to require authentication on a tRPC procedure.
 *
 * Works with classic @Router: applies RequireAuthMiddleware at procedure level,
 * so auth is enforced without using @AuthRouter. Also registers the path as
 * private so it overrides @Public when used with @AuthRouter.
 */
export function Private() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const routerAlias = (target.constructor as any).__routerAlias || 'app';
    const path = `${routerAlias}.${propertyKey}`;

    AuthMiddleware.unregisterOptionalAuthPath(path);
    AuthMiddleware.registerPrivatePath(path);

    UseMiddlewares(RequireAuthMiddleware)(target, propertyKey, descriptor);
  };
}

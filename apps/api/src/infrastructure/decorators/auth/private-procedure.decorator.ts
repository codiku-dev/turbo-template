import { UseMiddlewares } from 'nestjs-trpc';
import { PrivateProcedureMiddleware } from '@api/src/infrastructure/middlewares/private-procedure.middleware';

const PRIVATE_METHODS_KEY = '__privateMethods';

/**
 * Decorator to require authentication on a tRPC procedure.
 *
 * Works with classic @Router: applies RequireAuthMiddleware at procedure level,
 * so auth is enforced without using @AuthRouter. Also registers the path as
 * private so it overrides @Public when used with @AuthRouter.
 */
export function Private() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const ctor = target.constructor as any;
    if (!ctor[PRIVATE_METHODS_KEY]) {
      ctor[PRIVATE_METHODS_KEY] = [];
    }
    ctor[PRIVATE_METHODS_KEY].push(propertyKey);

    UseMiddlewares(PrivateProcedureMiddleware)(target, propertyKey, descriptor);
  };
}

export function getPrivateMethods(routerClass: any): string[] {
  return (routerClass as any)[PRIVATE_METHODS_KEY] ?? [];
}

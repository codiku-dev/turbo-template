import { UseMiddlewares } from 'nestjs-trpc';
import { PublicProcedureMiddleware } from '@api/src/infrastructure/middlewares/public-procedure.middleware';

/**
 * Decorator to apply optional authentication to a tRPC procedure.
 * 
 * This decorator applies OptionalAuthMiddleware which:
 * 1. Registers the path as optional auth (for future requests)
 * 2. Handles auth itself without throwing errors
 * 
 * IMPORTANT: Since router-level middlewares run BEFORE procedure-level middlewares,
 * AuthMiddleware from @AuthRouter runs BEFORE OptionalAuthMiddleware.
 * On the FIRST call, AuthMiddleware will throw an error before OptionalAuthMiddleware
 * can register the path. On SUBSEQUENT calls, AuthMiddleware will check the registered
 * path and allow the request.
 * 
 * Use this when you want to allow both authenticated and unauthenticated access.
 */
const OPTIONAL_AUTH_METHODS_KEY = '__optionalAuthMethods';

export function Public() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    // Method decorators run BEFORE class decorators, so __routerAlias is not set yet.
    // Store the method name; @AuthRouter will register paths when it runs (with the alias).
    const ctor = target.constructor as any;
    if (!ctor[OPTIONAL_AUTH_METHODS_KEY]) {
      ctor[OPTIONAL_AUTH_METHODS_KEY] = [];
    }
    ctor[OPTIONAL_AUTH_METHODS_KEY].push(propertyKey);

    // Apply OptionalAuthMiddleware
    UseMiddlewares(PublicProcedureMiddleware)(target, propertyKey, descriptor);
  };
}

export function getPublicMethods(routerClass: any): string[] {
  return (routerClass as any)[OPTIONAL_AUTH_METHODS_KEY] ?? [];
}

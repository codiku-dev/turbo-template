import { UseMiddlewares } from 'nestjs-trpc';
import { OptionalAuthMiddleware } from '@api/src/infrastructure/middlewares/optional-auth.middleware';
import { AuthMiddleware } from '@api/src/infrastructure/middlewares/auth.middleware';

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
export function Public() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    // Extract router alias and method name to build the path
    // Router alias comes from @AuthRouter({ alias: 'app' })
    // Method name is propertyKey (e.g., 'hello')
    // Path will be like "app.hello"
    const routerAlias = (target.constructor as any).__routerAlias || 'app';
    const path = `${routerAlias}.${propertyKey}`;

    // Register the path IMMEDIATELY when decorator is applied
    AuthMiddleware.registerOptionalAuthPath(path);

    // Apply OptionalAuthMiddleware
    UseMiddlewares(OptionalAuthMiddleware)(target, propertyKey, descriptor);
  };
}

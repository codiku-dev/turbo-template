import { UseMiddlewares } from 'nestjs-trpc';
import { AuthMiddleware } from '@api/src/infrastructure/middlewares/auth.middleware';

/**
 * Decorator to apply required authentication to a tRPC procedure.
 * Throws Unauthorized error if user is not authenticated.
 * Use this when you want to require authentication for a specific procedure.
 */
export function RequireAuth() {
  return UseMiddlewares(AuthMiddleware);
}

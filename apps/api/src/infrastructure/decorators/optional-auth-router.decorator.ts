import { applyDecorators } from '@nestjs/common';
import { Router, UseMiddlewares } from 'nestjs-trpc';
import { OptionalAuthMiddleware } from '@api/src/infrastructure/middlewares/optional-auth.middleware';

/**
 * Router decorator that applies OptionalAuthMiddleware to all procedures.
 * Use in place of @Router when you want optional authentication (doesn't throw if not authenticated).
 */
export function OptionalAuthRouter(args: { alias?: string }) {
  return applyDecorators(Router(args), UseMiddlewares(OptionalAuthMiddleware));
}

import { applyDecorators } from '@nestjs/common';
import { Router, UseMiddlewares } from 'nestjs-trpc';
import { LoggedMiddleware } from '@api/src/infrastructure/middlewares/logger.middleware';
import { AuthRouter } from './auth/auth-router.decorator';

/**
 * Router decorator that applies LoggedMiddleware to all procedures.
 * Use in place of @Router when you want request timing logs on every procedure.
 */
export function LoggedRouter(args: { alias?: string }) {
  return applyDecorators(Router(args), UseMiddlewares(LoggedMiddleware));
}

export function LoggedAuthRouter(args: { alias?: string }) {
  return applyDecorators(AuthRouter(args), UseMiddlewares(LoggedMiddleware));
}

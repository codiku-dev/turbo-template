import { applyDecorators } from '@nestjs/common';
import { Router, UseMiddlewares } from 'nestjs-trpc';
import { LoggedMiddleware } from '@api/src/infrastructure/middlewares/logger.middleware';

/**
 * Router decorator that applies LoggedMiddleware to all procedures (no auth).
 * Use when you want request timing logs without authentication.
 * For auth + logs, use @AuthRouter({ alias, logs: true }) instead.
 */
export function LoggedRouter(args: { alias?: string }) {
  return applyDecorators(Router(args), UseMiddlewares(LoggedMiddleware));
}

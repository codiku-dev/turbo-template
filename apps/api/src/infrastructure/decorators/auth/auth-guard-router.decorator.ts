import { applyDecorators } from '@nestjs/common';
import { Router, UseMiddlewares } from 'nestjs-trpc';
import { AuthGuardMiddleware } from '@api/src/infrastructure/middlewares/auth-guard.middleware';
import { LoggedMiddleware } from '@api/src/infrastructure/middlewares/logger.middleware';
import { getPublicMethods } from '@api/src/infrastructure/decorators/auth/public-procedure.decorator';
import { getPrivateMethods } from '@api/src/infrastructure/decorators/auth/private-procedure.decorator';

type AuthRouterArgs = { alias?: string; logs?: boolean; isAuthGuardEnabled?: boolean };

/**
 * Router decorator. By default applies AuthMiddleware to all procedures.
 * Use in place of @Router when you want authentication on every procedure.
 * - isEnabled: true (default) → auth + optional logs. false → classic Router only (no auth).
 * - logs: true → also apply request logging (LoggedMiddleware).
 */
export function AuthGuardRouter(args: AuthRouterArgs = {}) {
  return (target: any) => {
    const isEnabled = args.isAuthGuardEnabled !== false;
    if (!isEnabled) {
      return applyDecorators(Router(args))(target);
    }

    const alias = args.alias ?? 'app';

    // Method decorators (@Public, @Private) run before this, so they only stored method names.
    for (const methodName of getPublicMethods(target)) {
      AuthGuardMiddleware.registerOptionalAuthPath(`${alias}.${methodName}`);
    }
    for (const methodName of getPrivateMethods(target)) {
      AuthGuardMiddleware.unregisterOptionalAuthPath(`${alias}.${methodName}`);
      AuthGuardMiddleware.registerPrivatePath(`${alias}.${methodName}`);
    }

    const middlewares = args.logs
      ? UseMiddlewares(AuthGuardMiddleware, LoggedMiddleware)
      : UseMiddlewares(AuthGuardMiddleware);

    return applyDecorators(Router(args), middlewares)(target);
  };
}

import { applyDecorators } from '@nestjs/common';
import { Router, UseMiddlewares } from 'nestjs-trpc';
import { LoggedMiddleware } from '@api/src/infrastructure/middlewares/logger.middleware';
import { AuthMiddleware } from '@api/src/infrastructure/middlewares/auth.middleware';
import { getOptionalAuthMethods } from '@api/src/infrastructure/decorators/auth/optional-auth.decorator';
import { getPrivateMethods } from '@api/src/infrastructure/decorators/auth/private.decorator';

/**
 * Router decorator that applies LoggedMiddleware to all procedures.
 * Use in place of @Router when you want request timing logs on every procedure.
 */
export function LoggedRouter(args: { alias?: string }) {
  return applyDecorators(Router(args), UseMiddlewares(LoggedMiddleware));
}

/**
 * Router decorator that applies AuthMiddleware then LoggedMiddleware to all procedures.
 * Use in place of @AuthRouter when you want auth guarding + request logs.
 * Must apply both middlewares in a single UseMiddlewares() because at class level
 * UseMiddlewares overwrites previous middleware metadata.
 */
export function LoggedAuthRouter(args: { alias?: string }) {
  return (target: any) => {
    const alias = args.alias ?? 'app';

    for (const methodName of getOptionalAuthMethods(target)) {
      AuthMiddleware.registerOptionalAuthPath(`${alias}.${methodName}`);
    }
    for (const methodName of getPrivateMethods(target)) {
      AuthMiddleware.unregisterOptionalAuthPath(`${alias}.${methodName}`);
      AuthMiddleware.registerPrivatePath(`${alias}.${methodName}`);
    }

    return applyDecorators(
      Router(args),
      UseMiddlewares(AuthMiddleware, LoggedMiddleware),
    )(target);
  };
}

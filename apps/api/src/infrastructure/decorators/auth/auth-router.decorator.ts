import { applyDecorators } from '@nestjs/common';
import { Router, UseMiddlewares } from 'nestjs-trpc';
import { AuthMiddleware } from '@api/src/infrastructure/middlewares/auth.middleware';
import { getOptionalAuthMethods } from '@api/src/infrastructure/decorators/auth/optional-auth.decorator';
import { getPrivateMethods } from '@api/src/infrastructure/decorators/auth/private.decorator';

/**
 * Router decorator that applies AuthMiddleware to all procedures.
 * Use in place of @Router when you want authentication on every procedure.
 */
export function AuthRouter(args: { alias?: string }) {
  return (target: any) => {
    const alias = args.alias ?? 'app';

    // Method decorators (@Public, @Private) run before this, so they only stored method names.
    // Register full paths now that we have the alias.
    for (const methodName of getOptionalAuthMethods(target)) {
      AuthMiddleware.registerOptionalAuthPath(`${alias}.${methodName}`);
    }
    for (const methodName of getPrivateMethods(target)) {
      AuthMiddleware.unregisterOptionalAuthPath(`${alias}.${methodName}`);
      AuthMiddleware.registerPrivatePath(`${alias}.${methodName}`);
    }

    // Apply Router and AuthMiddleware
    return applyDecorators(
      Router(args),
      UseMiddlewares(AuthMiddleware)
    )(target);
  };
}

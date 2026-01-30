import { AuthService } from '@thallesp/nestjs-better-auth';
import { AuthGuardRouter } from '@api/src/infrastructure/decorators/auth/auth-guard-router.decorator';
import { Input, Mutation, Query } from 'nestjs-trpc';
import { CredentialsSchema, credentialsSchema } from './authentication.schema';
import { z } from 'zod';

@AuthGuardRouter({ alias: 'auth', isAuthGuardEnabled: false, logs: true })
export class AuthRouter {
  constructor(private readonly authService: AuthService) { }

  @Mutation({ input: credentialsSchema })
  async signup(@Input() credentials: CredentialsSchema) {
    return await this.authService.api.signUpEmail({
      body: {
        image: "",
        name: "",
        email: credentials.email,
        password: credentials.password,
      },
    });
  }
}
import { AuthService } from '@thallesp/nestjs-better-auth';
import { Router } from 'nestjs-trpc';
import { AuthGuard } from '@api/src/infrastructure/decorators/auth/auth-guard.decorator';
import { Input, Mutation } from 'nestjs-trpc';
import { CredentialsSchema, credentialsSchema } from './authentication.schema';

@Router({ alias: 'auth' })
@AuthGuard({ logs: true, enabled: false })
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
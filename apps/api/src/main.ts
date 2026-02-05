import { NestFactory } from '@nestjs/core';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';

import { AppModule } from '@api/src/app.module';
import { PrismaExceptionFilter } from '@api/src/infrastructure/prisma/prisma-exception.filter';
import { parseEnv } from '@api/env-type';

/** Hide nestjs-trpc generator warnings for custom decorators (Public, Private). */
function isDecoratorNotSupportedWarning(message: unknown): boolean {
  return typeof message === 'string' && /Decorator .+, not supported\./.test(message);
}

class FilteredLogger extends ConsoleLogger {
  warn(message: unknown, ...optionalParams: unknown[]) {
    if (isDecoratorNotSupportedWarning(message)) return;
    super.warn(message, ...optionalParams);
  }
}

const originalConsoleWarn = console.warn;
console.warn = (...args: unknown[]) => {
  if (isDecoratorNotSupportedWarning(args[0])) return;
  originalConsoleWarn.apply(console, args);
};

async function bootstrap() {
  let env: ReturnType<typeof parseEnv>;
  try {
    env = parseEnv();
  } catch (err: unknown) {
    const issues = (err as { issues?: Array<{ path?: (string | number)[] }> })?.issues;
    const vars = issues?.length
      ? [...new Set(issues.map((i) => i.path?.filter(Boolean).join(".")).filter(Boolean))]
      : ["?"];
    const envKeys = Object.keys(process.env).sort().join(", ");
    console.error("\n❌ Environment validation failed\n");
    console.error("  App: apps/api");
    console.error(`  Missing: ${vars.join(", ")}`);
    console.error(`  process.env keys in this process: ${envKeys || "(none)"}\n`);
    process.exit(1);
  }

  const app = await NestFactory.create(AppModule, {
    logger: new FilteredLogger(),
    bodyParser: false,
    cors: {
      origin: env.FRONTEND_URL,
      credentials: true,
    },
  });
  // app.enableCors({
  //   origin: '*',
  //   credentials: true,
  // });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new PrismaExceptionFilter());

  const port = Number(env.PORT) || 3090;

  await app.listen(port);

  const serverUrl = await app.getUrl();
  console.log(`🚀 Backend     : ${serverUrl}/trpc/app.hello`);
  console.log(`📚 Docs        : ${serverUrl}/docs`);
  console.log(`🎨 Frontend    : ${env.FRONTEND_URL}`);
}

void bootstrap();

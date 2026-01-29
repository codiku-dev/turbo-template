import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from '@api/src/app.module';
import { PrismaExceptionFilter } from '@api/src/infrastructure/prisma/prisma-exception.filter';
import { parseEnv } from '@api/env-type';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'verbose', 'debug'],
    bodyParser: false,
  });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new PrismaExceptionFilter());

  const env = parseEnv();
  const port = Number(env.PORT) || 3090;
  // Listen on all interfaces (0.0.0.0) for deployment compatibility (Docker, cloud, etc.)

  await app.listen(port);

  // Get the actual server URL from NestJS
  const serverUrl = await app.getUrl();

  console.log(`🚀 Backend     : ${serverUrl}/trpc/app.hello`);
  console.log(`📚 Docs     : ${serverUrl}/docs`);
}

void bootstrap();

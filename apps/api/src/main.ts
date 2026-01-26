import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from '@api/src/app.module';
import { PrismaExceptionFilter } from '@api/src/infrastructure/prisma/prisma-exception.filter';
import { parseEnv } from '@api/env-type';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'verbose', 'debug'],
  });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new PrismaExceptionFilter());

  const env = parseEnv();
  const port = Number(env.PORT) || 3090;
  // Listen on all interfaces (0.0.0.0) for deployment compatibility (Docker, cloud, etc.)
  const listenHost = process.env.HOST || '0.0.0.0';

  await app.listen(port, listenHost);

  // Get the actual server URL from NestJS
  const serverUrl = await app.getUrl();

  console.log(`🚀 Backend     : ${serverUrl}`);
  console.log(`📚 Docs     : ${serverUrl}/docs`);
}

void bootstrap();

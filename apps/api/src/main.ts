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
  await app.listen(port, () => {
    const url = `http://localhost:${port}`;
    console.log(`🚀 Backend     : ${url}`);
    console.log(`📚 Docs     : ${url}/docs`);
    console.log("🎨 Front end   : http://localhost:3000");
  });


}

void bootstrap();

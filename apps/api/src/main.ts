import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './prisma/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'verbose', 'debug'],
  });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new PrismaExceptionFilter()); // Ajoutez cette ligne
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? 3090;


  await app.listen(port);

  const url = `http://localhost:${port}`;
  console.log(`🚀 Backend  : ${url}`);
  console.log(`📚 Swagger  : ${url}/docs`);
  console.log("🎨 Front end: http://localhost:3000");
}

void bootstrap();

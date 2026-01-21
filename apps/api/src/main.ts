import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? 3090;
  await app.listen(port);
  
  const url = `http://localhost:${port}`;
  console.log(`🚀 Backend is running on: ${url}`);
}

void bootstrap();

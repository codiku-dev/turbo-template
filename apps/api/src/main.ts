import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './prisma/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new PrismaExceptionFilter()); // Ajoutez cette ligne

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? 3090;
  
  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Turbo Template API')
    .setDescription('API documentation for Turbo Template')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  
  await app.listen(port);
  
  const url = `http://localhost:${port}`;
  console.log(`🚀 Backend  : ${url}`);
  console.log(`📚 Swagger  : ${url}/docs`);
  console.log("🎨 Front end: http://localhost:3000");
}

void bootstrap();

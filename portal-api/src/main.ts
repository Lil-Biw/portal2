import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefix global para todos los endpoints
  app.setGlobalPrefix('api/v1');

  // Validación automática de DTOs con class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        // elimina campos no declarados en el DTO
      forbidNonWhitelisted: true,
      transform: true,        // convierte tipos automáticamente (string → number, etc.)
    }),
  );

  // CORS — ajustar origins en producción
  const corsOrigin = process.env.CORS_ORIGIN || '*';
  const origin = corsOrigin === '*'
    ? '*'
    : corsOrigin.split(',').map((item) => item.trim()).filter(Boolean);

  app.enableCors({
    origin,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Portal API corriendo en http://localhost:${port}/api/v1`);
}

bootstrap();

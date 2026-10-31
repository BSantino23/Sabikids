import 'reflect-metadata';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const allowedOrigins = process.env.CORS_ORIGIN
    ?.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.enableCors({ origin: allowedOrigins?.length ? allowedOrigins : true });
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true }),
  );

  const port = Number(process.env.PORT ?? 5000);
  await app.listen(port, '0.0.0.0');
  console.log(`Sabikids API escuchando en http://localhost:${port}`);
}

void bootstrap();

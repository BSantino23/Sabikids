import 'reflect-metadata';
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ProgressMicroserviceModule } from './progress-microservice.module';

async function bootstrap() {
  const host = process.env.PROGRESS_TCP_HOST ?? '127.0.0.1';
  const port = Number(process.env.PROGRESS_TCP_PORT ?? 8877);
  const app = await NestFactory.createMicroservice(ProgressMicroserviceModule, {
    transport: Transport.TCP,
    options: { host, port },
  });

  await app.listen();
  console.log(`Microservicio de progreso escuchando por TCP en ${host}:${port}`);
}

void bootstrap();

import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ProgressController } from './progress.controller';
import { ProgressResolver } from './progress.resolver';
import { ProgressService } from './progress.service';

@Module({
  controllers: [ProgressController],
  providers: [
    ProgressService,
    ProgressResolver,
    {
      provide: 'PROGRESS_MICROSERVICE',
      useFactory: () =>
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: process.env.PROGRESS_TCP_HOST ?? '127.0.0.1',
            port: Number(process.env.PROGRESS_TCP_PORT ?? 8877),
          },
        }),
    },
  ],
  exports: [ProgressService],
})
export class ProgressModule {}

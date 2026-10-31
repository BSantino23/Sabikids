import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ProgressMicroserviceController } from './progress-microservice/progress-microservice.controller';
import { ProgressMicroserviceService } from './progress-microservice/progress-microservice.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProgressMicroserviceController],
  providers: [ProgressMicroserviceService],
})
export class ProgressMicroserviceModule {}

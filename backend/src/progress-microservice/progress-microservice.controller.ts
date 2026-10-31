import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SaveProgressDto } from '../progress/dto/save-progress.dto';
import { ProgressMicroserviceService } from './progress-microservice.service';

@Controller()
export class ProgressMicroserviceController {
  constructor(private readonly progressService: ProgressMicroserviceService) {}

  @MessagePattern({ cmd: 'progress.save' })
  saveProgress(@Payload() payload: SaveProgressDto) {
    return this.progressService.save(payload);
  }

  @MessagePattern({ cmd: 'progress.health' })
  health() {
    return { status: 'ok', service: 'progress' };
  }
}

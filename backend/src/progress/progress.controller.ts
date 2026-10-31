import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { SaveProgressDto } from './dto/save-progress.dto';

@Controller('api/progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Get('microservice-health')
  microserviceHealth() {
    return this.progressService.getMicroserviceHealth();
  }

  @Get(':userId/:gameKey')
  getGameProgress(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('gameKey') gameKey: string,
  ) {
    return this.progressService.getGameProgress(userId, gameKey);
  }

  @Post()
  saveGameProgress(@Body() dto: SaveProgressDto) {
    return this.progressService.saveGameProgress(dto);
  }
}

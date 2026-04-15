import { Controller, Get } from '@nestjs/common';
import { TimelineService } from './timeline.service.js';

@Controller('timeline')
export class TimelineController {
  constructor(private readonly timelineService: TimelineService) {}

  @Get()
  async getAllPosts() {
    return this.timelineService.findAll();
  }
}
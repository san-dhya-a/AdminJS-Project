import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Timeline } from '../../entities/timeline.entity.js';
 import { TimelineService } from './timeline.service.js';
import { TimelineController } from './timeline.controller.js';

@Module({
    imports: [TypeOrmModule.forFeature([Timeline])],
    providers: [TimelineService],
    controllers: [TimelineController],
    exports: [TimelineService],
})
export class TimelineModule { }
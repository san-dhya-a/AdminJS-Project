import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Timeline } from '../../entities/timeline.entity.js';

@Injectable()
export class TimelineService {
  constructor(
    @InjectRepository(Timeline)
    private timelineRepository: Repository<Timeline>,
  ) {}

  async findAll(): Promise<Timeline[]> {
    return this.timelineRepository.find({
      order: {
        pin: 'DESC',
        created_at: 'DESC',
      },
    });
  }

  async create(data: Partial<Timeline>): Promise<Timeline> {
    const post = this.timelineRepository.create(data);
    return this.timelineRepository.save(post);
  }
}
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
    return this.timelineRepository
      .createQueryBuilder('timeline')
      .orderBy('CASE WHEN timeline.pin IS NOT NULL AND timeline.pin != "" THEN 1 ELSE 0 END', 'DESC')
      .addOrderBy('timeline.created_at', 'DESC')
      .getMany();
  }

  async create(data: Partial<Timeline>): Promise<Timeline> {
    const post = this.timelineRepository.create(data);
    return this.timelineRepository.save(post);
  }
}
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Page } from '../../entities/page.entity.js';

@Injectable()    //service class
export class PageService {
  constructor(
    @InjectRepository(Page)
    private pageRepository: Repository<Page>, // page table in database
  ) {}

  async findByType(type: string): Promise<any> {
    const page = await this.pageRepository.findOne({
      where: { pageType: type as any }, // pageType is a column in the page table
    });

    if (!page) {
      throw new NotFoundException(`Page of type ${type} not found`);
    }

    // Return structured data for the frontend
    return {
      id: page.id,
      pageType: page.pageType,
      title: page.title,
      subtitle: page.subtitle,
      description: page.description,
      content: page.content, // This contains the items array
    };
  }
}

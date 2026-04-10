import { Controller, Get, Param } from '@nestjs/common';
import { PageService } from './page.service.js';

@Controller('pages')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Get(':type')
  async getPageByType(@Param('type') type: string) {
    return this.pageService.findByType(type);
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from '../../entities/page.entity.js';
import { PageController } from './page.controller.js';
import { PageService } from './page.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Page])],
  controllers: [PageController],
  providers: [PageService],
  exports: [TypeOrmModule, PageService],
})
export class PageModule {}

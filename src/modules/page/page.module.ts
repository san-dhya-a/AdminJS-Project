import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from '../../entities/page.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Page])],
  exports: [TypeOrmModule],
})
export class PageModule {}

import { NestFactory } from '@nestjs/core';
import AdminJS from 'adminjs';
import * as AdminJSTypeORM from '@adminjs/typeorm';
import { AppModule } from './app.module.js';
import {AppDataSource} from './db/datasource.js';
async function bootstrap() {
  AdminJS.registerAdapter({
    Database: AdminJSTypeORM.Database,
    Resource: AdminJSTypeORM.Resource,
  });
  await AppDataSource.initialize();
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
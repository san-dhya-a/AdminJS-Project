import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import AdminJS from 'adminjs';
import * as AdminJSTypeORM from '@adminjs/typeorm';
import { AppModule } from './app.module.js';
import { AppDataSource } from './db/datasource.js';
import session from 'express-session';
async function bootstrap() {
  AdminJS.registerAdapter({
    Database: AdminJSTypeORM.Database,
    Resource: AdminJSTypeORM.Resource,
  });
  await AppDataSource.initialize();
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: process.env.COOKIE_SECRET || 'supersecret',
      resave: false,
      saveUninitialized: false,
    }),
  );

  // Increase payload limits for Base64 images
  const { json, urlencoded } = await import('express');
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
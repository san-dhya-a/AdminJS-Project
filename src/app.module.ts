import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from '@adminjs/nestjs';
import { ConfigModule } from '@nestjs/config';
import AdminJS from 'adminjs';
import * as AdminJSTypeORM from '@adminjs/typeorm';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import provider from './admin/auth-provider.js';
import options from './admin/options.js';
import { User } from './entities/user.entity.js';
import { Contact } from './entities/contact.entity.js';
import { Page } from './entities/page.entity.js';
import { Noticias } from './entities/noticias.entity.js';
import { NoticiasCategory } from './entities/noticias-category.entity.js';
import { Mission } from './entities/mission.entity.js';
import { HomeBanner } from './entities/home-banner.entity.js';
import { Role } from './entities/role.entity.js';
import { UserHasRoles } from './entities/user-has-roles.entity.js';
import { PageModule } from './modules/page/page.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    PageModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      port: 3306,
      username: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || 'mareeswari',
      database: process.env.DATABASE_NAME || 'Login_system',
      entities: [User, Contact, Page, Noticias, NoticiasCategory, Mission, HomeBanner, Role, UserHasRoles],
      synchronize: false,
    }),
    AdminModule.createAdminAsync({
      useFactory: async () => {
        return {
          adminJsOptions: options,
          auth: {
            provider,
            cookiePassword: process.env.COOKIE_SECRET,
            cookieName: 'adminjs',
          },
          sessionOptions: {
            resave: true,
            saveUninitialized: true,
            secret: process.env.COOKIE_SECRET,
          },
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

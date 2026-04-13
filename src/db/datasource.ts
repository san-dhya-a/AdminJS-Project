import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity.js';
import { Contact } from '../entities/contact.entity.js';
import { Page } from '../entities/page.entity.js';
import { Noticias } from '../entities/noticias.entity.js';
import { NoticiasCategory } from '../entities/noticias-category.entity.js';
import { Mission } from '../entities/mission.entity.js';
import { HomeBanner } from '../entities/home-banner.entity.js';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: 3306, // Default MySQL port
  username: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || 'mareeswari',
  database: process.env.DATABASE_NAME || 'Login_system',
  entities: [User, Contact, Page, Noticias, NoticiasCategory, Mission, HomeBanner],
  // migrations: ['src/db/migrations/*.ts'],
  migrationsTableName: 'migrations',
  synchronize: false, // DO NOT CHANGE THE DATABASE
  logging: true,
});

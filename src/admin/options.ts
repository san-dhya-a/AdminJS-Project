import AdminJS, { AdminJSOptions } from 'adminjs';
import { Database, Resource } from '@adminjs/typeorm';
import componentLoader from './component-loader.js';
import { UserResource } from './resources/user.resource.js';
import { ContactResource } from './resources/contact.resource.js';

console.log('Registering TypeORM adapter in options.ts');
AdminJS.registerAdapter({ Database, Resource });

const options: AdminJSOptions = {
  componentLoader,
  rootPath: '/admin',
  resources: [
    UserResource,
    ContactResource,
  ],
  databases: [],
};

export default options;

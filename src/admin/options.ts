import AdminJS, { AdminJSOptions } from 'adminjs';
import componentLoader from './component-loader.js';
import { UserResource } from './resources/user.resource.js';
import { ContactResource } from './resources/contact.resource.js';
import { PageResource } from './resources/page.resource.js';

const options: AdminJSOptions = {
  componentLoader,
  rootPath: '/admin',
  resources: [
    UserResource,
    ContactResource,
    PageResource,
  ],
  databases: [],
};

export default options;

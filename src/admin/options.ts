import AdminJS, { AdminJSOptions } from 'adminjs';
import componentLoader from './component-loader.js';
import { UserResource } from './resources/user.resource.js';
import { ContactResource } from './resources/contact.resource.js';
import { PageResource } from './resources/page.resource.js';
import { NoticiasResource } from './resources/noticias.resource.js';
import { NoticiasCategoryResource } from './resources/noticias-category.resource.js';
import { MissionResource } from './resources/mission.resource.js';
import { HomeBannerResource } from './resources/home-banner.resource.js';
import { RoleResource } from './resources/role.resource.js';


const options: AdminJSOptions = {
  componentLoader,
  rootPath: '/admin',
  resources: [
    UserResource,
    ContactResource,
    PageResource,
    NoticiasResource,
    NoticiasCategoryResource,
    MissionResource,
    HomeBannerResource,
    RoleResource,
  ],
  databases: [],
};
export default options;
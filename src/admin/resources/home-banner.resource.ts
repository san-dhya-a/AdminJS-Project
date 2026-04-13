import { ResourceWithOptions } from 'adminjs';
import { HomeBanner } from '../../entities/home-banner.entity.js';
import { Components } from '../component-loader.js';

export const HomeBannerResource: ResourceWithOptions = {
  resource: HomeBanner,
  options: {
    id: 'HomeBanner',
    navigation: { icon: 'Home' },
    listProperties: ['id', 'image', 'link', 'startDate', 'endDate'],
    editProperties: ['image', 'link', 'startDate', 'endDate'],
    showProperties: ['id', 'image', 'link', 'startDate', 'endDate', 'createdAt'],
    properties: {
      image: {
        components: {
          edit: Components.ImageUploader,
          show: Components.ImageUploader,
        },
      },
      link: {
        type: 'string',
        displayName: 'Banner Link',
      } as any,
      startDate: {
        type: 'date',
        displayName: 'Start Date',
      } as any,
      endDate: {
        type: 'date',
        displayName: 'End Date',
      } as any,
      createdAt: {
        isVisible: { list: false, show: true, edit: false, filter: true },
      } as any,
    },
  },
};

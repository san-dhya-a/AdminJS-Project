import { ResourceWithOptions } from 'adminjs';
import { Page } from '../../entities/page.entity.js';
import { Components } from '../component-loader.js';

export const PageResource: ResourceWithOptions = {
  resource: Page,
  options: {
    id: 'Pages',
    navigation: { icon: 'Play' },
    listProperties: ['id', 'title', 'subtitle', 'pageType'],
    showProperties: ['id', 'title', 'subtitle', 'description', 'pageType', 'content'],
    editProperties: ['title', 'subtitle', 'description', 'pageType', 'content'],
    filterProperties: ['title', 'pageType'],
    properties: {
      id: { isVisible: { list: true, show: false, edit: false, filter: false } },
      pageType: {
        isVisible: { list: true, show: false, edit: true, filter: true },
        availableValues: [
          { value: 'faq', label: 'FAQ' },
          { value: 'regulamento', label: 'Regulamento' },
        ],
      } as any,
      
      // Top-level fields (Hidden for both FAQ and Regulamento since we use the builder)
      title: { 
        isVisible: { 
          list: true, 
          edit: ({ record }) => !record?.params?.pageType,
          show: ({ record }) => !record?.params?.pageType,
          filter: true 
        },
        label: 'Page Title' 
      } as any,
      subtitle: { 
        isVisible: { 
          list: true, 
          edit: ({ record }) => !record?.params?.pageType,
          show: ({ record }) => !record?.params?.pageType,
          filter: true 
        },
        label: 'Page Subtitle' 
      } as any,
      description: { 
        type: 'textarea', 
        isVisible: { 
          list: false, 
          edit: ({ record }) => !record?.params?.pageType,
          show: ({ record }) => !record?.params?.pageType,
          filter: false 
        },
        label: 'Page Description' 
      } as any,
      
      // Standalone Content Builder (FAQ & Regulamento)
      content: {
        type: 'json',
        label: 'Dynamic Content',
        isVisible: ({ record }) => !!record?.params?.pageType,
        components: {
          edit: Components.FAQBuilder,
          show: Components.FAQBuilder,
        },
      } as any,
    },
  },
};

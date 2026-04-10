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
      id: { isVisible: { list: true, show: true, edit: false, filter: false } },
      pageType: {
        isVisible: true,
        availableValues: [
          { value: 'faq', label: 'FAQ' },
          { value: 'regulamento', label: 'Regulamento' },
        ],
      } as any,
      
      // Top-level fields (Visible for Regulamento, hidden for FAQ)
      title: { 
        isVisible: ({ record }) => record?.params?.pageType !== 'faq',
        label: 'Page Title' 
      } as any,
      subtitle: { 
        isVisible: ({ record }) => record?.params?.pageType !== 'faq',
        label: 'Page Subtitle' 
      } as any,
      description: { 
        type: 'textarea', 
        isVisible: ({ record }) => record?.params?.pageType !== 'faq',
        label: 'Page Description' 
      } as any,
      
      // Standalone FAQ content builder
      content: {
        type: 'json',
        label: 'FAQ Content List',
        isVisible: ({ record }) => record?.params?.pageType === 'faq',
        components: {
          edit: Components.FAQBuilder,
          show: Components.FAQBuilder,
        },
      } as any,
    },
  },
};

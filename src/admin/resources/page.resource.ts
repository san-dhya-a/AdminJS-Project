import { ResourceWithOptions } from 'adminjs';
import { Page } from '../../entities/page.entity.js';

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
      
      // Top-level fields (Hidden until a Page Type is selected)
      title: { 
        isVisible: ({ record }) => !!record?.params?.pageType,
        label: 'Page Title' 
      } as any,
      subtitle: { 
        isVisible: ({ record }) => !!record?.params?.pageType,
        label: 'Page Subtitle' 
      } as any,
      description: { 
        type: 'textarea', 
        isVisible: ({ record }) => !!record?.params?.pageType,
        label: 'Page Description' 
      } as any,
      
      // Unified Dynamic List (Hidden until a Page Type is selected)
      content: {
        type: 'mixed',
        isArray: true,
        label: 'Dynamic Entries',
        isVisible: ({ record }) => !!record?.params?.pageType,
      } as any,
      'content.title': {
        type: 'string',
        label: 'Entry Title',
      } as any,
      'content.subtitle': {
        type: 'string',
        label: 'Entry Subtitle',
      } as any,
      'content.description': {
        type: 'textarea',
        label: 'Entry Description',
      } as any,
    },
  },
};

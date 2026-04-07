import { ResourceWithOptions } from 'adminjs';
import { Page } from '../../entities/page.entity.js';

export const FAQResource: ResourceWithOptions = {
  resource: Page,
  options: {
    id: 'FAQ',
    navigation: { icon: 'Help' },
    listProperties: ['id', 'title', 'pageType'],
    filterProperties: ['title'],
    properties: {
      id: { isVisible: { list: true, show: true, edit: false, filter: false } },
      pageType: {
        isVisible: { list: false, show: false, edit: true, filter: false },
        availableValues: [
          { value: 'faq', label: 'FAQ' },
        ],
        isDisabled: true,
      } as any,
      subtitle: { isVisible: true },
      description: { type: 'textarea' },
      content: {
        type: 'mixed',
        isArray: true,
      } as any,
      'content.title': {
        type: 'string',
      } as any,
      'content.subtitle': {
        type: 'string',
      } as any,
      'content.description': {
        type: 'textarea',
      } as any,
    },
    actions: {
      new: {
        before: async (request) => {
          if (request.payload) {
            request.payload.pageType = 'faq';
          }
          return request;
        },
      },
      list: {
        before: async (request) => {
          request.query['pageType'] = 'faq';
          return request;
        },
      },
    },
  },
};

import { ResourceWithOptions } from 'adminjs';
import { Page } from '../../entities/page.entity.js';

export const RegulamentoResource: ResourceWithOptions = {
  resource: Page,
  options: {
    id: 'Regulamento',
    navigation: { icon: 'Checklist' },
    listProperties: ['id', 'title', 'pageType'],
    filterProperties: ['title'],
    properties: {
      id: { isVisible: { list: true, show: true, edit: false, filter: false } },
      pageType: {
        isVisible: { list: false, show: false, edit: true, filter: false },
        availableValues: [
          { value: 'regulamento', label: 'Regulamento' },
        ],
        isDisabled: true,
      } as any,
      subtitle: { isVisible: false },
      description: { type: 'textarea' },
      content: {
        type: 'mixed',
        isArray: true,
      } as any,
      'content.title': {
        type: 'string',
      } as any,
      'content.description': {
        type: 'textarea',
      } as any,
    } as any,
    actions: {
      new: {
        before: async (request) => {
          if (request.payload) {
            request.payload.pageType = 'regulamento';
          }
          return request;
        },
      },
      list: {
        before: async (request) => {
          request.query['pageType'] = 'regulamento';
          return request;
        },
      },
    },
  },
};

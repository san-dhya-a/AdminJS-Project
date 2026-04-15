import { Timeline } from '../../entities/timeline.entity.js';
import { Components } from '../component-loader.js';

export const TimelineResource = {
  resource: Timeline,
  options: {
    navigation: {
      icon: 'Calendar',
    },

    actions: {
      new: {
        before: async (request, context) => {
          if (request.method === 'post') {
            request.payload = {
              ...request.payload,
              user_id: context.currentAdmin.id,
            };
          }
          return request;
        },
      },
      edit: {
        before: async (request, context) => {
          if (request.method === 'post') {
            request.payload = {
              ...request.payload,
              user_id: context.currentAdmin.id,
            };
          }
          return request;
        },
      },
    },

    listProperties: ['id', 'title', 'image', 'pin', 'created_at'],
    editProperties: ['title', 'description', 'image', 'pin', 'user_id'],
    showProperties: ['id', 'title', 'description', 'image', 'pin', 'user_id', 'created_at', 'updated_at'],

    properties: {
      id: {
        isVisible: { list: true, show: true, edit: false, filter: true },
      },

      title: {
        type: 'string',
      },

      description: {
        type: 'textarea',
      },

      image: {
        type: 'textarea',
        isRequired: false,
        components: {
          list: Components.ImageUploader,
          edit: Components.ImageUploader,
          show: Components.ImageUploader,
        },
      },

      pin: {
        type: 'textarea',
      },

      user_id: {
        type: 'number',
        isVisible: { list: true, show: true, edit: false, filter: true },
      },

      created_at: {
        isVisible: { list: true, show: true, edit: false, filter: true },
      },

      updated_at: {
        isVisible: { list: true, show: true, edit: false, filter: false },
      },
    },
  },
};
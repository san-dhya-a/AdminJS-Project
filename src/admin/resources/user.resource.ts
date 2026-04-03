import { ResourceWithOptions } from 'adminjs';
import { User } from '../../entities/user.entity.js';

export const UserResource: ResourceWithOptions = {
  resource: User,
  options: {
    navigation: { icon: 'User' },
    listProperties: ['id', 'name', 'email'],
    actions: {
      sendWelcomeEmail: {
        actionType: 'record',
        icon: 'Email',
        handler: async (request, response, context) => {
          const { record } = context;
          return {
            record: record.toJSON(context.currentAdmin),
            notice: {
              message: `Welcome email sent successfully to ${record.params.email}`,
              type: 'success',
            },
          };
        },
        component: false,
      },
    },
    properties: {
      password: {
        isVisible: { list: false, edit: true, filter: false, show: false },
      },
    },
  },
};
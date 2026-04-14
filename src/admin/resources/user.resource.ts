import { ResourceWithOptions } from 'adminjs';
import bcrypt from 'bcryptjs';
import { User } from '../../entities/user.entity.js';
import { Components } from '../component-loader.js';

export const UserResource: ResourceWithOptions = {
  resource: User,
  options: {
    id: 'User',
    navigation: { name: 'User Management', icon: 'User' },
    listProperties: ['id', 'name', 'email', 'phone', 'roles', 'status'],
    actions: {
      list: {
        after: async (response) => {
          if (response.records) {
            response.records.forEach((record) => {
              const roles = (record as any).roles || [];
              record.params.roleNames = roles.map((r: any) => r.name).filter(Boolean);
            });
          }
          return response;
        },
      },
      new: {
        before: async (request) => {
          if (request.payload?.password) {
            request.payload.password = await bcrypt.hash(request.payload.password, 10);
          }
          return request;
        },
        after: async (response) => {
          if (response.record?.params) {
            response.record.params.password = '';
            const roles = (response.record as any).roles || [];
            response.record.params.roleNames = roles.map((r: any) => r.name).filter(Boolean);
          }
          return response;
        },
      },
      edit: {
        before: async (request) => {
          if (request.payload?.password) {
            request.payload.password = await bcrypt.hash(request.payload.password, 10);
          } else {
            delete request.payload.password;
          }
          return request;
        },
        after: async (response) => {
          if (response.record?.params) {
            response.record.params.password = '';
            const roles = (response.record as any).roles || [];
            response.record.params.roleNames = roles.map((r: any) => r.name).filter(Boolean);
          }
          return response;
        },
      },
      show: {
        after: async (response) => {
          if (response.record?.params) {
            response.record.params.password = '';
            const roles = (response.record as any).roles || [];
            response.record.params.roleNames = roles.map((r: any) => r.name).filter(Boolean);
          }
          return response;
        },
      },
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
        type: 'password',
        isVisible: { list: false, edit: true, filter: false, show: false },
      },
      id: {
        isVisible: { show: false, list: true, edit: false, filter: true },
      },
      roles: {
        reference: 'Role',
        isVisible: { list: true, edit: true, filter: true, show: true },
        components: {
          list: Components.RoleList,
          show: Components.RoleList,
        },
      },
    },
  },
};
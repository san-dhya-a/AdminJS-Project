import { ResourceWithOptions } from 'adminjs';
import { UserHasRoles } from '../../entities/user-has-roles.entity.js';

export const UserHasRolesResource: ResourceWithOptions = {
  resource: UserHasRoles,
  options: {
    navigation: { name: 'User Management', icon: 'User' },
    listProperties: ['id', 'user', 'role'],
    editProperties: ['user', 'role'],
    showProperties: ['id', 'user', 'role'],
    sort: {
      sortBy: 'id',
      direction: 'asc',
    },
    properties: {
      id: { isVisible: { list: true, show: true, edit: false, filter: true } },
      userId: { isVisible: false },
      roleId: { isVisible: false },
      user: {
        reference: 'User',
      },
      role: {
        reference: 'Role',
      },
    },
  },
};

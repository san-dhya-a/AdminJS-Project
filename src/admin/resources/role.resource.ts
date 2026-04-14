import { ResourceWithOptions } from 'adminjs';
import { Role } from '../../entities/role.entity.js';

export const RoleResource: ResourceWithOptions = {
  resource: Role,
  options: {
    id: 'Role',
    navigation: { name: 'User Management', icon: 'User' },
    listProperties: ['id', 'name'],
    editProperties: ['name'],
    showProperties: ['id', 'name'],
  },
};

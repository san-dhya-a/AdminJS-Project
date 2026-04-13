import { ResourceWithOptions } from 'adminjs';
import { Contact } from '../../entities/contact.entity.js';

export const ContactResource: ResourceWithOptions = {
  resource: Contact,
  options: {
    navigation: { icon: 'Phone' },
    listProperties: ['id', 'phone', 'address', 'email', 'city'],
    properties: {
      id: {
        isVisible: { show: false, list: true, edit: false, filter: true },
      },
    },
  },
};
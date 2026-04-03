import { ResourceWithOptions } from 'adminjs';
import { Contact } from '../../entities/contact.entity.js';

export const ContactResource: ResourceWithOptions = {
  resource: Contact,
  options: {
    navigation: { icon: 'phone' },
    listProperties: ['id', 'phone', 'address'],
  },
};

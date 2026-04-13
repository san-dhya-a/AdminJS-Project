import { ResourceWithOptions } from 'adminjs';
import { Noticias } from '../../entities/noticias.entity.js';
import { Components } from '../component-loader.js';

export const NoticiasResource: ResourceWithOptions = {
  resource: Noticias,
  options: {
    id: 'Noticias',
    navigation: { name: 'Notícias', icon: 'Document' },
    listProperties: ['id', 'category', 'title', 'date', 'image'],
    editProperties: ['category', 'title', 'date', 'image', 'description'],
    showProperties: ['id', 'category', 'image', 'date', 'title', 'description'],
    properties: {
      category: {
        type: 'string', // Stored as a string in the database
        availableValues: [
          { value: 'Novidades', label: 'Novidades' },
          { value: 'Eventos', label: 'Eventos' },
          { value: 'Postos Petrobras', label: 'Postos Petrobras' },
        ],
        isRequired: false,
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
      date: {
        type: 'date',
        isRequired: false,
      },
      title: {
        type: 'string',
        isRequired: false,
      },
      description: {
        type: 'textarea',
        isRequired: false,
      },
    },
  },
};
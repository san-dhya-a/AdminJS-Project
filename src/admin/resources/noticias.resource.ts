import { ResourceWithOptions } from 'adminjs';
import { Noticias } from '../../entities/noticias.entity.js';
import { Components } from '../component-loader.js';

export const NoticiasResource: ResourceWithOptions = {
  resource: Noticias,
  options: {
    navigation: { icon: 'Document' },
    listProperties: ['id', 'category', 'title', 'date', 'image'],
    filterProperties: ['category', 'title', 'date'],
    editProperties: ['category', 'image', 'date', 'title'],
    showProperties: ['id', 'category', 'image', 'date', 'title'],
    properties: {
      category: {
        availableValues: [
          { value: 'Novidades', label: 'Novidades' },
          { value: 'Eventos', label: 'Eventos' },
          { value: 'Postos Petrobras', label: 'Postos Petrobras' },
        ],
      },
      image: {
        components: {
          edit: Components.ImageUploader,
          show: Components.ImageUploader,
        },
      },
      date: {
        type: 'date',
      },
      title: {
        type: 'string',
      },
    },
  },
};

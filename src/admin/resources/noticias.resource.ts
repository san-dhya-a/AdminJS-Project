import { ResourceWithOptions } from 'adminjs';
import { Noticias } from '../../entities/noticias.entity.js';
import { Components } from '../component-loader.js';

export const NoticiasResource: ResourceWithOptions = {
  resource: Noticias,
  options: {
    id: 'noticias',
    navigation: { name: 'Notícias', icon: 'Document' },
    listProperties: ['id', 'category', 'title', 'date', 'image'],
    filterProperties: ['category', 'title', 'date'],
    editProperties: ['category', 'image', 'date', 'title', 'description'],
    showProperties: ['id', 'category', 'image', 'date', 'title', 'description'],
    properties: {
      category: {
        isVisible: { list: true, edit: true, show: true, filter: true },
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
      description: {
        type: 'textarea',
      },
    },
  },
};
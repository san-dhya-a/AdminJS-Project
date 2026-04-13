import { ResourceWithOptions } from 'adminjs';
import { Noticias } from '../../entities/noticias.entity.js';
import { Components } from '../component-loader.js';

export const NoticiasResource: ResourceWithOptions = {
  resource: Noticias,
  options: {
    id: 'Noticias',
    navigation: { name: 'Notícias', icon: 'Globe' },
    listProperties: ['id', 'category', 'title', 'date', 'image', 'image1'],
    editProperties: ['category', 'title', 'date', 'image', 'image1', 'description'],
    showProperties: ['id', 'category', 'image', 'image1', 'date', 'title', 'description'],
    properties: {
      category: {
        type: 'string',
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
      image1: {
        type: 'textarea',
        isRequired: false,
        components: {
          list: Components.ImageUploader,
          edit: Components.ImageUploader,
          show: Components.ImageUploader,
        },
      },
      title: { isRequired: false },
      date: { type: 'date', isRequired: false },
      description: { type: 'textarea', isRequired: false },
    },
  },
};
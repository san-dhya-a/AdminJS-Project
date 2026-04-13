import { ResourceWithOptions } from 'adminjs';
import { Noticias } from '../../entities/noticias.entity.js';
import { Components } from '../component-loader.js';

export const NoticiasResource: ResourceWithOptions = {
  resource: Noticias,
  options: {
    id: 'Noticias',
    navigation: { name: 'Notícias', icon: 'Document' },
    listProperties: ['categories', 'title', 'date', 'image'],
    filterProperties: ['categories', 'title', 'date'],
    editProperties: ['categories', 'title', 'date', 'image', 'description'],
    showProperties: ['id', 'categories', 'image', 'date', 'title', 'description'],
    properties: {
      categories: {
        type: 'reference',
        reference: 'NoticiasCategory',
        components: {
          edit: Components.CategoryMultiSelect,
          show: Components.CategoryMultiSelect,
        },
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
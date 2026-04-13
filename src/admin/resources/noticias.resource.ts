import { ResourceWithOptions } from 'adminjs';
import { Noticias } from '../../entities/noticias.entity.js';
import { Components } from '../component-loader.js';

export const NoticiasResource: ResourceWithOptions = {
  resource: Noticias,
  options: {
    id: 'Noticias',
    navigation: { name: 'Notícias', icon: 'Globe' },
    listProperties: ['id', 'categories', 'title', 'date', 'image'],
    editProperties: ['categories', 'title', 'date', 'image', 'description'],
    showProperties: ['id', 'categories', 'image', 'date', 'title', 'description'],
    properties: {
      categories: {
        type: 'reference', // Correct for relational mapping
        reference: 'NoticiasCategory',
        isRequired: false,
        components: {
          list: Components.CategoryMultiSelect,
          edit: Components.CategoryMultiSelect,
          show: Components.CategoryMultiSelect,
        },
        isVisible: { list: true, edit: true, show: true, filter: true },
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
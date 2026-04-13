import { ResourceWithOptions } from 'adminjs';
import { Noticias } from '../../entities/noticias.entity.js';
import { Components } from '../component-loader.js';

export const NoticiasResource: ResourceWithOptions = {
  resource: Noticias,
  options: {
    id: 'Noticias',
    navigation: { name: 'Notícias', icon: 'Globe' },
    listProperties: ['id', 'categories', 'title', 'date', 'image', 'image1'],
    editProperties: ['categories', 'title', 'date', 'image', 'image1', 'description'],
    showProperties: ['id', 'categories', 'image', 'image1', 'date', 'title', 'description'],
    properties: {
      categories: {
        type: 'string', // Use string type to bypass TypeORM reference validation for custom components
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
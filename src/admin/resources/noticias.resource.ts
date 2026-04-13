import { ResourceWithOptions } from 'adminjs';
import { Noticias } from '../../entities/noticias.entity.js';
import { Components } from '../component-loader.js';

export const NoticiasResource: ResourceWithOptions = {
  resource: Noticias,
  options: {
    id: 'Noticias',
    navigation: { name: 'Notícias', icon: 'Document' },
    listProperties: ['category', 'title', 'date', 'image'],
    filterProperties: ['category', 'title', 'date'],
    editProperties: ['category', 'title', 'date', 'image', 'description'],
    showProperties: ['id', 'category', 'image', 'date', 'title', 'description'],
    properties: {
      category: {
        type: 'reference',
        reference: 'NoticiasCategory',
        isVisible: { list: true, edit: true, show: true, filter: true },
      },
      categoryId: {
        isVisible: false,
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
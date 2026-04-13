import { ResourceWithOptions } from 'adminjs';
import { NoticiasCategory } from '../../entities/noticias-category.entity.js';

export const NoticiasCategoryResource: ResourceWithOptions = {
  resource: NoticiasCategory,
  options: {
    id: 'NoticiasCategory',
    navigation: { name: 'Notícias', icon: 'Folder' },
    listProperties: ['id', 'title'],
    showProperties: ['id', 'title'],
    editProperties: ['title'],
    properties: {
      title: {
        isTitle: true,
      },
    },
  },
};

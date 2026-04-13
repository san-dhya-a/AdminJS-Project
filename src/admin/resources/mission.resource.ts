import { ResourceWithOptions } from 'adminjs';
import { Mission } from '../../entities/mission.entity.js';
import { Components } from '../component-loader.js';

export const MissionResource: ResourceWithOptions = {
  resource: Mission,
  options: {
    id: 'Missoes',
    navigation: { icon: 'Compass' },
    listProperties: ['id', 'status', 'title', 'rewardType', 'rewardValue', 'expireDate'],
    editProperties: [
      'title', 'description', 'image', 'rewardType', 'rewardValue', 
      'rewardLabel', 'buttonText', 'startDate', 'endDate', 
      'publishDate', 'expireDate'
    ],
    showProperties: [
      'id', 'status', 'title', 'description', 'image', 'rewardType', 
      'rewardValue', 'rewardLabel', 'buttonText', 'startDate', 
      'endDate', 'publishDate', 'expireDate', 'createdAt'
    ],
    properties: {
      title: { isRequired: false },
      image: {
        type: 'textarea', // Support large Base64
        isRequired: false,
        components: {
          list: Components.ImageUploader,
          edit: Components.ImageUploader,
          show: Components.ImageUploader,
        },
      },
      status: {
        type: 'string',
        isVisible: { list: true, show: true, edit: false, filter: true },
        availableValues: [
          { value: 'Ativo', label: 'Ativo' },
          { value: 'Expirado', label: 'Expirado' },
        ],
        position: 1,
      },
      rewardType: {
        availableValues: [
          { value: 'Diamantes', label: 'Diamantes' },
          { value: 'Pontos', label: 'Pontos' },
        ],
        isRequired: false,
      },
      rewardValue: { isRequired: false },
      rewardLabel: { isRequired: false },
      buttonText: { isRequired: false },
      description: {
        type: 'textarea',
        isRequired: false,
      },
      startDate: { type: 'date', isRequired: false },
      endDate: { type: 'date', isRequired: false },
      publishDate: { type: 'date', isRequired: false },
      expireDate: { type: 'date', isRequired: false },
      createdAt: { isRequired: false, isVisible: { list: false, show: true, edit: false, filter: true } },
    },
    actions: {
      list: {
        after: async (response) => {
          const now = new Date();
          response.records.forEach(record => {
            const expireDate = record.params.expireDate ? new Date(record.params.expireDate) : null;
            if (expireDate && now > expireDate) {
              record.params.status = 'Expirado';
            } else {
              record.params.status = 'Ativo';
            }
          });
          return response;
        },
      },
      show: {
        after: async (response) => {
          const now = new Date();
          const expireDate = response.record.params.expireDate ? new Date(response.record.params.expireDate) : null;
          if (expireDate && now > expireDate) {
            response.record.params.status = 'Expirado';
          } else {
            response.record.params.status = 'Ativo';
          }
          return response;
        },
      },
    },
  },
};

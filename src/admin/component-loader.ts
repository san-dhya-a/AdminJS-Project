import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader();

export const Components = {
  FAQBuilder: componentLoader.add('FAQBuilder', './components/FAQBuilder.tsx'),
  ImageUploader: componentLoader.add('ImageUploader', './components/ImageUploader.tsx'),
  CategoryMultiSelect: componentLoader.add('CategoryMultiSelect', './components/CategoryMultiSelect.tsx'),
  RoleList: componentLoader.add('RoleList', './components/role-list.tsx'),
  AuthenticationBackgroundComponent: componentLoader.override('AuthenticationBackgroundComponent', './components/AuthenticationBackground.tsx'),
};

export default componentLoader;

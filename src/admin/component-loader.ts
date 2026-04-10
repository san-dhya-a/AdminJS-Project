import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader();

export const Components = {
  FAQBuilder: componentLoader.add('FAQBuilder', './components/FAQBuilder.tsx'),
  ImageUploader: componentLoader.add('ImageUploader', './components/ImageUploader.tsx'),
};

export default componentLoader;

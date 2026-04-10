import React, { useState } from 'react';
import { Box, Label, Input, DropZone, DropZoneProps, Button, Icon, Text } from '@adminjs/design-system';
import { BasePropertyProps } from 'adminjs';

const ImageUploader: React.FC<BasePropertyProps> = (props) => {
  const { property, record, onChange } = props;
  const [preview, setPreview] = useState<string | null>(record.params[property.name] || null);

  const handleFileChange: DropZoneProps['onChange'] = (files) => {
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreview(base64String);
        onChange(property.name, base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    setPreview(null);
    onChange(property.name, '');
  };

  return (
    <Box mb="xl">
      <Label>{property.label}</Label>
      {preview ? (
        <Box border="1px solid #ddd" p="md" borderRadius="md" position="relative" textAlign="center">
          <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '4px' }} />
          <Box mt="md">
            <Button variant="danger" size="sm" onClick={handleClear} type="button">
              <Icon icon="Trash" mr="xs" /> Remove Image
            </Button>
          </Box>
        </Box>
      ) : (
        <DropZone onChange={handleFileChange} validate={{ maxSize: 5000000, mimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'] }} />
      )}
      <Text variant="sm" color="grey60" mt="xs">
        Select an image to use as the card background. Base64 format will be stored in the database.
      </Text>
    </Box>
  );
};

export default ImageUploader;

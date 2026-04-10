import React, { useState } from 'react';
import { Box, Button, FormGroup, Input, Label, TextArea, Icon, Text } from '@adminjs/design-system';
import { BasePropertyProps } from 'adminjs';

const FAQBuilder: React.FC<BasePropertyProps> = (props) => {
  const { property, record, onChange } = props;

  // Parse existing content
  let initialValue = record.params[property.name] || { title: '', items: [] };
  if (typeof initialValue === 'string') {
    try {
      initialValue = JSON.parse(initialValue);
    } catch (e) {
      initialValue = { title: '', items: [] };
    }
  }

  const [data, setData] = useState(initialValue);

  const updateContent = (newData: any) => {
    setData(newData);
    onChange(property.name, newData);
  };

  const handleTitleChange = (val: string) => {
    updateContent({ ...data, title: val });
  };

  const addItem = () => {
    const newItems = [...(data.items || []), { subtitle: '', description: '' }];
    updateContent({ ...data, items: newItems });
  };

  const removeItem = (index: number) => {
    const newItems = data.items.filter((_, i: number) => i !== index);
    updateContent({ ...data, items: newItems });
  };

  const handleItemChange = (index: number, key: string, val: string) => {
    const newItems = [...data.items];
    newItems[index] = { ...newItems[index], [key]: val };
    updateContent({ ...data, items: newItems });
  };

  // Only render if pageType is FAQ
  if (record.params.pageType !== 'faq') {
    return null;
  }

  const hasItems = data.items && data.items.length > 0;

  return (
    <Box variant="white" p="xxl" border="1px solid #ddd" borderRadius="lg" mt="xl" boxShadow="card">

      {/* Title only shows if at least one item has been added (first click happened) */}
      {hasItems && (
        <FormGroup>
          <Label size="lg">Title</Label>
          <Input
            value={data.title || ''}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Enter the main title"
            width={1}
            size="lg"
          />
        </FormGroup>
      )}

      {/* Dynamic Subtitle and Description Blocks */}
      <Box mt="lg">
        {data.items && data.items.map((item: any, index: number) => (
          <Box key={index} mb="xl" position="relative" pt="lg">
            <Box position="absolute" top="10px" right="0">
              <Button
                type="button"
                variant="danger"
                size="icon"
                onClick={() => removeItem(index)}
                borderRadius="full"
              >
                <Icon icon="Trash" />
              </Button>
            </Box>

            <FormGroup>
              <Label>Subtitle</Label>
              <Input
                value={item.subtitle || ''}
                onChange={(e) => handleItemChange(index, 'subtitle', e.target.value)}
                placeholder="Enter subtitle"
                width={1}
              />
            </FormGroup>

            <FormGroup>
              <Label>Description</Label>
              <TextArea
                value={item.description || ''}
                onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                placeholder="Enter description"
                width={1}
                rows={3}
              />
            </FormGroup>
          </Box>
        ))}
      </Box>

      {/* The (+) icon button - Always available to trigger the first and subsequent adds */}
      <Box mt="xl" flex justifyContent="center" pt={hasItems ? 'xl' : 'none'}>
        <Button
          type="button"
          onClick={addItem}
          variant="primary"
          borderRadius="full"
          display="flex"
          alignItems="center"
        >
          <Icon icon="Plus" mr="xs" /> Add Items
        </Button>
      </Box>
    </Box>
  );
};

export default FAQBuilder;

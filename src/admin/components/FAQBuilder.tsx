import React, { useState } from 'react';
import { Box, Button, FormGroup, Input, Label, TextArea, Icon, Text } from '@adminjs/design-system';
import { BasePropertyProps } from 'adminjs';

const FAQBuilder: React.FC<BasePropertyProps> = (props) => {
  const { property, record, onChange } = props;
  const pageType = record.params.pageType || 'faq';
  
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
    const newItems = [...(data.items || []), { title: '', subtitle: '', description: '' }];
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

  // Only render if a pageType is selected
  if (!record.params.pageType) {
    return null;
  }

  const isFAQ = pageType === 'faq';
  const hasItems = data.items && data.items.length > 0;

  return (
    <Box variant="white" p="xxl" border="1px solid #ddd" borderRadius="lg" mt="xl" boxShadow="card">
      
      {/* FAQ Mode - Shared Title (Only shows if items exist) */}
      {isFAQ && hasItems && (
        <FormGroup>
          <Label size="lg">Title</Label>
          <Input
            value={data.title || ''}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Enter the main FAQ title"
            width={1}
            size="lg"
          />
        </FormGroup>
      )}

      {/* Dynamic Blocks */}
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
            
            {/* Title - Repeated for Regulamento, Shared for FAQ */}
            {!isFAQ && (
              <FormGroup>
                <Label>Title</Label>
                <Input
                  value={item.title || ''}
                  onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                  placeholder="Enter title"
                  width={1}
                />
              </FormGroup>
            )}

            {/* Subtitle - Only for FAQ */}
            {isFAQ && (
              <FormGroup>
                <Label>Subtitle</Label>
                <Input
                  value={item.subtitle || ''}
                  onChange={(e) => handleItemChange(index, 'subtitle', e.target.value)}
                  placeholder="Enter subtitle"
                  width={1}
                />
              </FormGroup>
            )}

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

      {/* Action Button */}
      <Box mt="xl" flex justifyContent="center" pt={hasItems ? 'xl' : 'none'}>
        <Button 
          type="button" 
          onClick={addItem} 
          variant="primary" 
          borderRadius="full"
          display="flex"
          alignItems="center"
        >
          <Icon icon="Plus" mr="xs" /> 
          {isFAQ ? 'Add FAQ Items' : 'Add Regulamento Items'}
        </Button>
      </Box>
    </Box>
  );
};

export default FAQBuilder;

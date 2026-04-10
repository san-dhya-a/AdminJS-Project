import React, { useState } from 'react';
import { Box, Button, FormGroup, Input, Label, TextArea, Icon, Text } from '@adminjs/design-system';
import { BasePropertyProps } from 'adminjs';

const FAQBuilder: React.FC<BasePropertyProps> = (props) => {
  const { property, record, onChange } = props;
  const pageType = record.params.pageType || 'faq';
  
  // Parse existing content
  let initialValue = record.params[property.name] || { items: [] };
  if (typeof initialValue === 'string') {
    try {
      initialValue = JSON.parse(initialValue);
    } catch (e) {
      initialValue = { items: [] };
    }
  }
  
  const [data, setData] = useState(initialValue);

  const updateContent = (newData: any) => {
    setData(newData);
    onChange(property.name, newData);
  };

  const addItem = () => {
    const newItems = [...(data.items || []), { subtitle: '', description: '', showTitle: false }];
    updateContent({ ...data, items: newItems });
  };

  const addTitleSection = () => {
    const newItems = [...(data.items || []), { title: '', subtitle: '', description: '', showTitle: true }];
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

  if (!record.params.pageType) {
    return null;
  }

  const isFAQ = pageType === 'faq';
  const hasItems = data.items && data.items.length > 0;

  return (
    <Box variant="white" p="xxl" border="1px solid #ddd" borderRadius="lg" mt="xl" boxShadow="card">
      
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
            
            {/* Title - Repeated for Regulamento, first FAQ item, or FAQ "Add Title" sections */}
            {(!isFAQ || index === 0 || item.showTitle) && (
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

      {/* Action Buttons */}
      <Box mt="xl" flex flexDirection="row" justifyContent="center" pt={hasItems ? 'xl' : 'none'}>
        <Button 
          type="button" 
          onClick={addItem} 
          variant="outline" 
          borderRadius="full"
          display="flex"
          alignItems="center"
          mr="md"
        >
          <Icon icon="Plus" mr="xs" /> 
          {isFAQ ? 'Add FAQ Items' : 'Add Regulamento Items'}
        </Button>

        {isFAQ && (
          <Button 
            type="button" 
            onClick={addTitleSection} 
            variant="primary" 
            borderRadius="full"
            display="flex"
            alignItems="center"
          >
            <Icon icon="Plus" mr="xs" /> Add Title
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default FAQBuilder;

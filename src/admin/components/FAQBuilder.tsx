import React, { useState, useEffect } from 'react';
import { Box, Button, FormGroup, Input, Label, TextArea, Icon, Text } from '@adminjs/design-system';
import { BasePropertyProps } from 'adminjs';

const FAQBuilder: React.FC<BasePropertyProps> = (props) => {
  const { property, record, onChange, resource } = props;
  const action = (props as any).action;
  const pageType = record.params.pageType || 'faq';
  
  // Detect if we are in "Show" (read-only) mode
  const isShow = action?.name === 'show' || !onChange;

  // Function to robustly extract data from record.params (handles flattened keys)
  const getInitialData = () => {
    // 1. Try direct access
    const directValue = record.params[property.name];
    if (directValue) {
      if (typeof directValue === 'object' && directValue.items) return directValue;
      if (typeof directValue === 'string') {
        try {
          const parsed = JSON.parse(directValue);
          if (parsed && parsed.items) return parsed;
        } catch (e) {
          // Fall through to flattened check
        }
      }
    }

    // 2. Try flattened access (e.g., content.items.0.title)
    const items = [];
    let i = 0;
    while (
      record.params[`${property.name}.items.${i}.subtitle`] !== undefined || 
      record.params[`${property.name}.items.${i}.title`] !== undefined ||
      record.params[`${property.name}.items.${i}.description`] !== undefined
    ) {
      const showTitleVal = record.params[`${property.name}.items.${i}.showTitle`];
      items.push({
        title: record.params[`${property.name}.items.${i}.title`] || '',
        subtitle: record.params[`${property.name}.items.${i}.subtitle`] || '',
        description: record.params[`${property.name}.items.${i}.description`] || '',
        showTitle: showTitleVal === true || showTitleVal === 'true',
      });
      i++;
    }

    return items.length > 0 ? { items } : { items: [] };
  };

  const [data, setData] = useState(getInitialData());

  // Keep state in sync if record changes (important for Show view transition)
  useEffect(() => {
    setData(getInitialData());
  }, [record.params]);

  const updateContent = (newData: any) => {
    setData(newData);
    if (onChange) {
      onChange(property.name, newData);
    }
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

  const isFAQ = pageType === 'faq';
  const hasItems = data.items && data.items.length > 0;

  if (!record.params.pageType) {
    return null;
  }

  if (isShow) {
    return (
      <Box variant="white" p="xxl" border="1px solid #ddd" borderRadius="lg" mt="xl" boxShadow="card">
        {hasItems ? (
          <Box>
            {data.items.map((item: any, index: number) => (
              <Box key={index} mb="xl" pb="lg" borderBottom={index < data.items.length - 1 ? "1px solid #eee" : "none"}>
                {(!isFAQ || index === 0 || item.showTitle) && item.title && (
                  <Text variant="lg" fontWeight="bold" mb="sm" color="primary100">
                    {item.title}
                  </Text>
                )}
                {isFAQ && item.subtitle && (
                  <Text variant="md" fontWeight="semibold" mb="xs" color="grey80">
                    {item.subtitle}
                  </Text>
                )}
                {item.description && (
                  <Text variant="sm" color="grey60">
                    {item.description}
                  </Text>
                )}
              </Box>
            ))}
          </Box>
        ) : (
          <Text italic color="grey40">No entries added yet.</Text>
        )}
      </Box>
    );
  }

  return (
    <Box variant="white" p="xxl" border="1px solid #ddd" borderRadius="lg" mt="xl" boxShadow="card">
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

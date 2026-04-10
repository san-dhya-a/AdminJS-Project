import React, { useState } from 'react';
import { Box, Button, FormGroup, Input, Label, Icon, TextArea, Text } from '@adminjs/design-system';
import { BasePropertyProps } from 'adminjs';

const DynamicContent: React.FC<BasePropertyProps> = (props) => {
  const { property, record, onChange } = props;
  
  // Use a map to track open/closed state for each index
  const [openEntries, setOpenEntries] = useState<Record<number, boolean>>({ 0: true });

  // Get the current value of the array
  const value = record.params[property.name] || [];
  // AdminJS might flatten the array in params, but for custom components it often passes the object if it's JSON.
  // However, often it's better to parse from record.params if it's flat.
  // For 'mixed' isArray, record.params usually has 'content.0.title', 'content.1.title' etc.
  
  // Let's helper function to get array from flat params
  const getArrayValue = () => {
    if (Array.isArray(value)) return value;
    // If it's flattened in params:
    const result: any[] = [];
    let i = 0;
    while (record.params[`${property.name}.${i}.subtitle`] !== undefined || record.params[`${property.name}.${i}.title`] !== undefined) {
      result.push({
        title: record.params[`${property.name}.${i}.title`],
        subtitle: record.params[`${property.name}.${i}.subtitle`],
        description: record.params[`${property.name}.${i}.description`],
      });
      i++;
    }
    return result;
  };

  const entries = getArrayValue();

  const handleToggle = (index: number) => {
    setOpenEntries(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleAdd = () => {
    const newIndex = entries.length;
    const newEntries = [...entries, { title: '', subtitle: '', description: '' }];
    
    // Update AdminJS record
    onChange(property.name, newEntries);
    
    // Automatically open the new entry
    setOpenEntries(prev => ({ ...prev, [newIndex]: true }));
  };

  const handleRemove = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newEntries = entries.filter((_, i) => i !== index);
    onChange(property.name, newEntries);
  };

  const handleChange = (index: number, field: string, fieldValue: string) => {
    const newEntries = [...entries];
    newEntries[index] = { ...newEntries[index], [field]: fieldValue };
    onChange(property.name, newEntries);
  };

  return (
    <Box mb="xl" mt="xl">
      <Label variant="medium" mb="md">{property.label}</Label>
      
      {entries.map((item: any, index: number) => {
        const isOpen = !!openEntries[index];
        const isFirst = index === 0;

        return (
          <Box key={index} border="1px solid #ddd" borderRadius="md" mb="md" overflow="hidden">
            {/* Header - Always visible with + icon toggle */}
            <Box 
              backgroundColor="#fcfcfc" 
              p="md" 
              flex 
              flexDirection="row" 
              justifyContent="space-between" 
              alignItems="center"
              onClick={() => handleToggle(index)}
              style={{ cursor: 'pointer', transition: 'background-color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fcfcfc')}
            >
              <Box flex flexDirection="row" alignItems="center">
                <Icon 
                  icon={isOpen ? 'ChevronUp' : 'Add'} 
                  mr="md" 
                  color="primary100"
                />
                <Text fontWeight="bold">
                  {isFirst 
                    ? (item.title || "FAQ Main Title (Header)") 
                    : (item.subtitle || `FAQ Section ${index + 1}`)
                  }
                </Text>
              </Box>
              <Button 
                variant="text" 
                color="danger" 
                onClick={(e) => handleRemove(index, e)}
                size="sm"
              >
                <Icon icon="Trash" />
              </Button>
            </Box>

            {/* Content - Toggleable fields */}
            {isOpen && (
              <Box p="md" borderTop="1px solid #eee" backgroundColor="white">
                {/* Title is ONLY shown for the very first entry */}
                {isFirst && (
                  <FormGroup>
                    <Label>Main FAQ Title</Label>
                    <Input
                      value={item.title || ''}
                      onChange={(e) => handleChange(index, 'title', e.target.value)}
                      placeholder="Enter the main title for this FAQ group..."
                    />
                  </FormGroup>
                )}
                
                <FormGroup>
                  <Label>Section Subtitle</Label>
                  <Input
                    value={item.subtitle || ''}
                    onChange={(e) => handleChange(index, 'subtitle', e.target.value)}
                    placeholder="Enter the subtitle or question..."
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label>Section Description</Label>
                  <TextArea
                    value={item.description || ''}
                    onChange={(e) => handleChange(index, 'description', e.target.value)}
                    placeholder="Enter the detailed description or answer..."
                    rows={5}
                  />
                </FormGroup>
              </Box>
            )}
          </Box>
        );
      })}

      <Button onClick={handleAdd} variant="primary" mt="md" type="button" size="lg">
        <Icon icon="Add" /> Click to Add {entries.length === 0 ? 'Initial FAQ' : 'More FAQ Sections'}
      </Button>
      {entries.length > 0 && (
        <Text mt="sm" size="sm" color="grey60">
          Only the first section contains the Title. Subsequent sections are Subtitle + Description only.
        </Text>
      )}
    </Box>
  );
};

export default DynamicContent;

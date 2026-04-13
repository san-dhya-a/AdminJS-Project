import React, { useState, useEffect } from 'react';
import { Box, FormGroup, Label, Select, SelectAsync, Text } from '@adminjs/design-system';
import { BasePropertyProps, ApiClient } from 'adminjs';

const CategoryMultiSelect: React.FC<BasePropertyProps> = (props) => {
  const { property, record, onChange, where } = props;
  const isList = where === 'list';
  const isShow = where === 'show';
  const api = new ApiClient();

  // For List view, just show comma-separated names
  if (isList) {
    // 1. Try to get titles from populated data (best way)
    const populated = record.populated?.[property.name];
    if (populated) {
      const items = Array.isArray(populated) ? populated : [populated];
      const titles = items.map(p => p.title || p.params?.title || p.id).filter(Boolean).join(', ');
      if (titles) return <Text>{titles}</Text>;
    }
    
    // 2. Fallback: Check if names exist in params (sometimes flattened as categories.0.title)
    const paramsTitles: string[] = [];
    Object.keys(record.params).forEach(key => {
      if (key.startsWith(`${property.name}.`) && key.endsWith('.title')) {
        paramsTitles.push(record.params[key]);
      }
    });
    if (paramsTitles.length > 0) return <Text>{paramsTitles.join(', ')}</Text>;

    return <Text>-</Text>;
  }
  
  // Current values are usually stored as categories.0, categories.1, etc or as a raw array in some contexts
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const [allOptions, setAllOptions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await api.searchRecords({
          resourceId: 'NoticiasCategory',
          query: '',
        });
        
        const options = response.map(r => ({
          value: r.id,
          label: r.title,
        }));
        
        setAllOptions(options);

        // Get currently selected IDs
        const currentIds: string[] = [];
        Object.keys(record.params).forEach(key => {
          if (key.startsWith(`${property.name}.`)) {
            const val = record.params[key];
            if (val) currentIds.push(val.toString());
          }
        });
        
        const rawValue = record.params[property.name];
        if (Array.isArray(rawValue)) {
            rawValue.forEach(v => currentIds.push(v.toString()));
        }

        const selected = options.filter(opt => currentIds.includes(opt.value.toString()));
        setSelectedOptions(selected);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load categories:', error);
        setIsLoading(false);
      }
    };

    loadCategories();
  }, [record.id, record.params]); // Update on record change

  const handleChange = (selected: any) => {
    const newOptions = selected ? (Array.isArray(selected) ? selected : [selected]) : [];
    setSelectedOptions(newOptions);
    const ids = newOptions.map(opt => opt.value);
    onChange(property.name, ids);
  };

  if (isShow) {
    return (
      <FormGroup>
        <Label>{property.label}</Label>
        <Box variant="white" p="md" border="1px solid #ddd" borderRadius="md">
          {selectedOptions.length > 0 ? (
            <Box flex flexDirection="row" flexWrap="wrap">
              {selectedOptions.map(opt => (
                <Box key={opt.value} bg="primary100" color="white" px="sm" py="xs" mr="xs" mb="xs" borderRadius="md">
                  {opt.label}
                </Box>
              ))}
            </Box>
          ) : (
            <Text color="grey40">No categories selected</Text>
          )}
        </Box>
      </FormGroup>
    );
  }

  return (
    <Box mb="xl">
      <FormGroup>
        <Label>{property.label}</Label>
        <Select
          isMulti
          isLoading={isLoading}
          value={selectedOptions}
          options={allOptions}
          onChange={handleChange}
          placeholder="Select categories..."
        />
        <Text variant="sm" color="grey60" mt="xs">
          Select one or more categories for this news item.
        </Text>
      </FormGroup>
    </Box>
  );
};

export default CategoryMultiSelect;

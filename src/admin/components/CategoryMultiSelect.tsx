import React, { useState, useEffect } from 'react';
import { Box, FormGroup, Label, Select, SelectAsync, Text } from '@adminjs/design-system';
import { BasePropertyProps, ApiClient } from 'adminjs';

const CategoryMultiSelect: React.FC<BasePropertyProps> = (props) => {
  const { property, record, onChange } = props;
  const api = new ApiClient();
  
  // Current values are usually stored as categories.0, categories.1, etc or as a raw array in some contexts
  // For Many-to-Many editing, AdminJS expects an array of IDs
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const [allOptions, setAllOptions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        // Search for all categories (empty query)
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
        // When using Many-to-Many, AdminJS might pass them in various ways depending on the adapter
        // Usually, for many-to-many, we can look for keys like 'categories.0', 'categories.1'
        const currentIds: string[] = [];
        Object.keys(record.params).forEach(key => {
          if (key.startsWith(`${property.name}.`)) {
            const val = record.params[key];
            if (val) currentIds.push(val.toString());
          }
        });
        
        // If it's a new record or not flattened yet, it might be in an array
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
  }, [record.id]);

  const handleChange = (selected: any) => {
    const newOptions = selected ? (Array.isArray(selected) ? selected : [selected]) : [];
    setSelectedOptions(newOptions);
    
    // We update the record params. 
    // In AdminJS, for Many-to-Many, it's often best to pass the array of IDs
    // The adapter will handle the flattening if needed
    const ids = newOptions.map(opt => opt.value);
    onChange(property.name, ids);
  };

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

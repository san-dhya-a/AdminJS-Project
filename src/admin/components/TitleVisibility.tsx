import React, { useEffect } from 'react';
import { FormGroup, Input, Label, Box } from '@adminjs/design-system';
import { BasePropertyProps } from 'adminjs';

const TitleVisibility: React.FC<BasePropertyProps> = (props) => {
  const { property, record, onChange } = props;
  const name = property.name;
  const pageType = record.params.pageType;

  useEffect(() => {
    console.log(`[TitleVisibility] Path: ${name}, PageType: ${pageType}`);
  }, [name, pageType]);

  // Hide if not FAQ mode
  if (pageType !== 'faq') {
    return null;
  }

  // Logic: Hide if the property name indicates an index greater than 0
  // e.g., "content.1.title", "content.2.title" should be hidden.
  // "content.0.title" should stay visible.
  if (/\.([1-9]\d*)\./.test(name)) {
    return null;
  }

  return (
    <Box mb="xl">
      <FormGroup>
        <Label>{property.label}</Label>
        <Input
          value={record.params[name] || ''}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder="Main FAQ Title (Entry 1 Only)"
        />
      </FormGroup>
    </Box>
  );
};

export default TitleVisibility;

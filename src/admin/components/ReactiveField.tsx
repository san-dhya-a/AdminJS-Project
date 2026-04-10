import React from 'react';
import { FormGroup, Input, Label, TextArea } from '@adminjs/design-system';
import { BasePropertyProps } from 'adminjs';

const ReactiveField: React.FC<BasePropertyProps> = (props) => {
  const { property, record, onChange } = props;
  const pageType = record.params.pageType;

  // Hide if pageType is FAQ (because FAQ uses the dynamic content list instead)
  if (pageType === 'faq') {
    return null;
  }

  const isTextArea = property.type === 'textarea';

  return (
    <FormGroup>
      <Label>{property.label}</Label>
      {isTextArea ? (
        <TextArea
          value={record.params[property.name] || ''}
          onChange={(e) => onChange(property.name, e.target.value)}
          rows={3}
        />
      ) : (
        <Input
          value={record.params[property.name] || ''}
          onChange={(e) => onChange(property.name, e.target.value)}
          placeholder={`Enter Page ${property.label}`}
        />
      )}
    </FormGroup>
  );
};

export default ReactiveField;

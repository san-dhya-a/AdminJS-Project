(function (React, designSystem, adminjs) {
  'use strict';

  function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

  var React__default = /*#__PURE__*/_interopDefault(React);

  const FAQBuilder = props => {
    const {
      property,
      record,
      onChange,
      resource
    } = props;
    const action = props.action;
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
      while (record.params[`${property.name}.items.${i}.subtitle`] !== undefined || record.params[`${property.name}.items.${i}.title`] !== undefined || record.params[`${property.name}.items.${i}.description`] !== undefined) {
        const showTitleVal = record.params[`${property.name}.items.${i}.showTitle`];
        items.push({
          title: record.params[`${property.name}.items.${i}.title`] || '',
          subtitle: record.params[`${property.name}.items.${i}.subtitle`] || '',
          description: record.params[`${property.name}.items.${i}.description`] || '',
          showTitle: showTitleVal === true || showTitleVal === 'true'
        });
        i++;
      }
      return items.length > 0 ? {
        items
      } : {
        items: []
      };
    };
    const [data, setData] = React.useState(getInitialData());

    // Keep state in sync if record changes (important for Show view transition)
    React.useEffect(() => {
      setData(getInitialData());
    }, [record.params]);
    const updateContent = newData => {
      setData(newData);
      if (onChange) {
        onChange(property.name, newData);
      }
    };
    const addItem = () => {
      const newItems = [...(data.items || []), {
        subtitle: '',
        description: '',
        showTitle: false
      }];
      updateContent({
        ...data,
        items: newItems
      });
    };
    const addTitleSection = () => {
      const newItems = [...(data.items || []), {
        title: '',
        subtitle: '',
        description: '',
        showTitle: true
      }];
      updateContent({
        ...data,
        items: newItems
      });
    };
    const removeItem = index => {
      const newItems = data.items.filter((_, i) => i !== index);
      updateContent({
        ...data,
        items: newItems
      });
    };
    const handleItemChange = (index, key, val) => {
      const newItems = [...data.items];
      newItems[index] = {
        ...newItems[index],
        [key]: val
      };
      updateContent({
        ...data,
        items: newItems
      });
    };
    const isFAQ = pageType === 'faq';
    const hasItems = data.items && data.items.length > 0;
    if (!record.params.pageType) {
      return null;
    }
    if (isShow) {
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        variant: "white",
        p: "xxl",
        border: "1px solid #ddd",
        borderRadius: "lg",
        mt: "xl",
        boxShadow: "card"
      }, hasItems ? /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, data.items.map((item, index) => /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        key: index,
        mb: "xl",
        pb: "lg",
        borderBottom: index < data.items.length - 1 ? "1px solid #eee" : "none"
      }, (!isFAQ || index === 0 || item.showTitle) && item.title && /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        variant: "lg",
        fontWeight: "bold",
        mb: "sm",
        color: "primary100"
      }, item.title), isFAQ && item.subtitle && /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        variant: "md",
        fontWeight: "semibold",
        mb: "xs",
        color: "grey80"
      }, item.subtitle), item.description && /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        variant: "sm",
        color: "grey60"
      }, item.description)))) : /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        italic: true,
        color: "grey40"
      }, "No entries added yet."));
    }
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      variant: "white",
      p: "xxl",
      border: "1px solid #ddd",
      borderRadius: "lg",
      mt: "xl",
      boxShadow: "card"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mt: "lg"
    }, data.items && data.items.map((item, index) => /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      key: index,
      mb: "xl",
      position: "relative",
      pt: "lg"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      position: "absolute",
      top: "10px",
      right: "0"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      type: "button",
      variant: "danger",
      size: "icon",
      onClick: () => removeItem(index),
      borderRadius: "full"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Icon, {
      icon: "Trash"
    }))), (!isFAQ || index === 0 || item.showTitle) && /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Title"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      value: item.title || '',
      onChange: e => handleItemChange(index, 'title', e.target.value),
      placeholder: "Enter title",
      width: 1
    })), isFAQ && /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Subtitle"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      value: item.subtitle || '',
      onChange: e => handleItemChange(index, 'subtitle', e.target.value),
      placeholder: "Enter subtitle",
      width: 1
    })), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Description"), /*#__PURE__*/React__default.default.createElement(designSystem.TextArea, {
      value: item.description || '',
      onChange: e => handleItemChange(index, 'description', e.target.value),
      placeholder: "Enter description",
      width: 1,
      rows: 3
    }))))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mt: "xl",
      flex: true,
      flexDirection: "row",
      justifyContent: "center",
      pt: hasItems ? 'xl' : 'none'
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      type: "button",
      onClick: addItem,
      variant: "outline",
      borderRadius: "full",
      display: "flex",
      alignItems: "center",
      mr: "md"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Icon, {
      icon: "Plus",
      mr: "xs"
    }), isFAQ ? 'Add FAQ Items' : 'Add Regulamento Items'), isFAQ && /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      type: "button",
      onClick: addTitleSection,
      variant: "primary",
      borderRadius: "full",
      display: "flex",
      alignItems: "center"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Icon, {
      icon: "Plus",
      mr: "xs"
    }), " Add Title")));
  };

  const ImageUploader = props => {
    const {
      property,
      record,
      onChange
    } = props;
    const [preview, setPreview] = React.useState(record.params[property.name] || null);
    const handleFileChange = files => {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result;
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
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "xl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, property.label), preview ? /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      border: "1px solid #ddd",
      p: "md",
      borderRadius: "md",
      position: "relative",
      textAlign: "center"
    }, /*#__PURE__*/React__default.default.createElement("img", {
      src: preview,
      alt: "Preview",
      style: {
        maxWidth: '100%',
        maxHeight: '200px',
        borderRadius: '4px'
      }
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mt: "md"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      variant: "danger",
      size: "sm",
      onClick: handleClear,
      type: "button"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Icon, {
      icon: "Trash",
      mr: "xs"
    }), " Remove Image"))) : /*#__PURE__*/React__default.default.createElement(designSystem.DropZone, {
      onChange: handleFileChange,
      validate: {
        maxSize: 5000000,
        mimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
      }
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      variant: "sm",
      color: "grey60",
      mt: "xs"
    }, "Select an image to use as the card background. Base64 format will be stored in the database."));
  };

  const CategoryMultiSelect = props => {
    const {
      property,
      record,
      onChange,
      where
    } = props;
    const isList = where === 'list';
    const isShow = where === 'show';
    const api = new adminjs.ApiClient();

    // For List view, just show comma-separated names
    if (isList) {
      // 1. Try to get titles from populated data (best way)
      const populated = record.populated?.[property.name];
      if (populated) {
        const items = Array.isArray(populated) ? populated : [populated];
        const titles = items.map(p => p.title || p.params?.title || p.id).filter(Boolean).join(', ');
        if (titles) return /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, titles);
      }

      // 2. Fallback: Check if names exist in params (sometimes flattened as categories.0.title)
      const paramsTitles = [];
      Object.keys(record.params).forEach(key => {
        if (key.startsWith(`${property.name}.`) && key.endsWith('.title')) {
          paramsTitles.push(record.params[key]);
        }
      });
      if (paramsTitles.length > 0) return /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, paramsTitles.join(', '));
      return /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "-");
    }

    // Current values are usually stored as categories.0, categories.1, etc or as a raw array in some contexts
    const [selectedOptions, setSelectedOptions] = React.useState([]);
    const [allOptions, setAllOptions] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    React.useEffect(() => {
      const loadCategories = async () => {
        try {
          const response = await api.searchRecords({
            resourceId: 'NoticiasCategory',
            query: ''
          });
          const options = response.map(r => ({
            value: r.id,
            label: r.title
          }));
          setAllOptions(options);

          // Get currently selected IDs
          const currentIds = [];
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

    const handleChange = selected => {
      const newOptions = selected ? Array.isArray(selected) ? selected : [selected] : [];
      setSelectedOptions(newOptions);
      const ids = newOptions.map(opt => opt.value);
      onChange(property.name, ids);
    };
    if (isShow) {
      return /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, property.label), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        variant: "white",
        p: "md",
        border: "1px solid #ddd",
        borderRadius: "md"
      }, selectedOptions.length > 0 ? /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        flex: true,
        flexDirection: "row",
        flexWrap: "wrap"
      }, selectedOptions.map(opt => /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        key: opt.value,
        bg: "primary100",
        color: "white",
        px: "sm",
        py: "xs",
        mr: "xs",
        mb: "xs",
        borderRadius: "md"
      }, opt.label))) : /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        color: "grey40"
      }, "No categories selected")));
    }
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "xl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, property.label), /*#__PURE__*/React__default.default.createElement(designSystem.Select, {
      isMulti: true,
      isLoading: isLoading,
      value: selectedOptions,
      options: allOptions,
      onChange: handleChange,
      placeholder: "Select categories..."
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      variant: "sm",
      color: "grey60",
      mt: "xs"
    }, "Select one or more categories for this news item.")));
  };

  AdminJS.UserComponents = {};
  AdminJS.UserComponents.FAQBuilder = FAQBuilder;
  AdminJS.UserComponents.ImageUploader = ImageUploader;
  AdminJS.UserComponents.CategoryMultiSelect = CategoryMultiSelect;

})(React, AdminJSDesignSystem, AdminJS);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9GQVFCdWlsZGVyLnRzeCIsIi4uL3NyYy9hZG1pbi9jb21wb25lbnRzL0ltYWdlVXBsb2FkZXIudHN4IiwiLi4vc3JjL2FkbWluL2NvbXBvbmVudHMvQ2F0ZWdvcnlNdWx0aVNlbGVjdC50c3giLCJlbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJveCwgQnV0dG9uLCBGb3JtR3JvdXAsIElucHV0LCBMYWJlbCwgVGV4dEFyZWEsIEljb24sIFRleHQgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IEJhc2VQcm9wZXJ0eVByb3BzIH0gZnJvbSAnYWRtaW5qcyc7XG5cbmNvbnN0IEZBUUJ1aWxkZXI6IFJlYWN0LkZDPEJhc2VQcm9wZXJ0eVByb3BzPiA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IHByb3BlcnR5LCByZWNvcmQsIG9uQ2hhbmdlLCByZXNvdXJjZSB9ID0gcHJvcHM7XG4gIGNvbnN0IGFjdGlvbiA9IChwcm9wcyBhcyBhbnkpLmFjdGlvbjtcbiAgY29uc3QgcGFnZVR5cGUgPSByZWNvcmQucGFyYW1zLnBhZ2VUeXBlIHx8ICdmYXEnO1xuICBcbiAgLy8gRGV0ZWN0IGlmIHdlIGFyZSBpbiBcIlNob3dcIiAocmVhZC1vbmx5KSBtb2RlXG4gIGNvbnN0IGlzU2hvdyA9IGFjdGlvbj8ubmFtZSA9PT0gJ3Nob3cnIHx8ICFvbkNoYW5nZTtcblxuICAvLyBGdW5jdGlvbiB0byByb2J1c3RseSBleHRyYWN0IGRhdGEgZnJvbSByZWNvcmQucGFyYW1zIChoYW5kbGVzIGZsYXR0ZW5lZCBrZXlzKVxuICBjb25zdCBnZXRJbml0aWFsRGF0YSA9ICgpID0+IHtcbiAgICAvLyAxLiBUcnkgZGlyZWN0IGFjY2Vzc1xuICAgIGNvbnN0IGRpcmVjdFZhbHVlID0gcmVjb3JkLnBhcmFtc1twcm9wZXJ0eS5uYW1lXTtcbiAgICBpZiAoZGlyZWN0VmFsdWUpIHtcbiAgICAgIGlmICh0eXBlb2YgZGlyZWN0VmFsdWUgPT09ICdvYmplY3QnICYmIGRpcmVjdFZhbHVlLml0ZW1zKSByZXR1cm4gZGlyZWN0VmFsdWU7XG4gICAgICBpZiAodHlwZW9mIGRpcmVjdFZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHBhcnNlZCA9IEpTT04ucGFyc2UoZGlyZWN0VmFsdWUpO1xuICAgICAgICAgIGlmIChwYXJzZWQgJiYgcGFyc2VkLml0ZW1zKSByZXR1cm4gcGFyc2VkO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gRmFsbCB0aHJvdWdoIHRvIGZsYXR0ZW5lZCBjaGVja1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gMi4gVHJ5IGZsYXR0ZW5lZCBhY2Nlc3MgKGUuZy4sIGNvbnRlbnQuaXRlbXMuMC50aXRsZSlcbiAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgIGxldCBpID0gMDtcbiAgICB3aGlsZSAoXG4gICAgICByZWNvcmQucGFyYW1zW2Ake3Byb3BlcnR5Lm5hbWV9Lml0ZW1zLiR7aX0uc3VidGl0bGVgXSAhPT0gdW5kZWZpbmVkIHx8IFxuICAgICAgcmVjb3JkLnBhcmFtc1tgJHtwcm9wZXJ0eS5uYW1lfS5pdGVtcy4ke2l9LnRpdGxlYF0gIT09IHVuZGVmaW5lZCB8fFxuICAgICAgcmVjb3JkLnBhcmFtc1tgJHtwcm9wZXJ0eS5uYW1lfS5pdGVtcy4ke2l9LmRlc2NyaXB0aW9uYF0gIT09IHVuZGVmaW5lZFxuICAgICkge1xuICAgICAgY29uc3Qgc2hvd1RpdGxlVmFsID0gcmVjb3JkLnBhcmFtc1tgJHtwcm9wZXJ0eS5uYW1lfS5pdGVtcy4ke2l9LnNob3dUaXRsZWBdO1xuICAgICAgaXRlbXMucHVzaCh7XG4gICAgICAgIHRpdGxlOiByZWNvcmQucGFyYW1zW2Ake3Byb3BlcnR5Lm5hbWV9Lml0ZW1zLiR7aX0udGl0bGVgXSB8fCAnJyxcbiAgICAgICAgc3VidGl0bGU6IHJlY29yZC5wYXJhbXNbYCR7cHJvcGVydHkubmFtZX0uaXRlbXMuJHtpfS5zdWJ0aXRsZWBdIHx8ICcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogcmVjb3JkLnBhcmFtc1tgJHtwcm9wZXJ0eS5uYW1lfS5pdGVtcy4ke2l9LmRlc2NyaXB0aW9uYF0gfHwgJycsXG4gICAgICAgIHNob3dUaXRsZTogc2hvd1RpdGxlVmFsID09PSB0cnVlIHx8IHNob3dUaXRsZVZhbCA9PT0gJ3RydWUnLFxuICAgICAgfSk7XG4gICAgICBpKys7XG4gICAgfVxuXG4gICAgcmV0dXJuIGl0ZW1zLmxlbmd0aCA+IDAgPyB7IGl0ZW1zIH0gOiB7IGl0ZW1zOiBbXSB9O1xuICB9O1xuXG4gIGNvbnN0IFtkYXRhLCBzZXREYXRhXSA9IHVzZVN0YXRlKGdldEluaXRpYWxEYXRhKCkpO1xuXG4gIC8vIEtlZXAgc3RhdGUgaW4gc3luYyBpZiByZWNvcmQgY2hhbmdlcyAoaW1wb3J0YW50IGZvciBTaG93IHZpZXcgdHJhbnNpdGlvbilcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXREYXRhKGdldEluaXRpYWxEYXRhKCkpO1xuICB9LCBbcmVjb3JkLnBhcmFtc10pO1xuXG4gIGNvbnN0IHVwZGF0ZUNvbnRlbnQgPSAobmV3RGF0YTogYW55KSA9PiB7XG4gICAgc2V0RGF0YShuZXdEYXRhKTtcbiAgICBpZiAob25DaGFuZ2UpIHtcbiAgICAgIG9uQ2hhbmdlKHByb3BlcnR5Lm5hbWUsIG5ld0RhdGEpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBhZGRJdGVtID0gKCkgPT4ge1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gWy4uLihkYXRhLml0ZW1zIHx8IFtdKSwgeyBzdWJ0aXRsZTogJycsIGRlc2NyaXB0aW9uOiAnJywgc2hvd1RpdGxlOiBmYWxzZSB9XTtcbiAgICB1cGRhdGVDb250ZW50KHsgLi4uZGF0YSwgaXRlbXM6IG5ld0l0ZW1zIH0pO1xuICB9O1xuXG4gIGNvbnN0IGFkZFRpdGxlU2VjdGlvbiA9ICgpID0+IHtcbiAgICBjb25zdCBuZXdJdGVtcyA9IFsuLi4oZGF0YS5pdGVtcyB8fCBbXSksIHsgdGl0bGU6ICcnLCBzdWJ0aXRsZTogJycsIGRlc2NyaXB0aW9uOiAnJywgc2hvd1RpdGxlOiB0cnVlIH1dO1xuICAgIHVwZGF0ZUNvbnRlbnQoeyAuLi5kYXRhLCBpdGVtczogbmV3SXRlbXMgfSk7XG4gIH07XG5cbiAgY29uc3QgcmVtb3ZlSXRlbSA9IChpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgbmV3SXRlbXMgPSBkYXRhLml0ZW1zLmZpbHRlcigoXywgaTogbnVtYmVyKSA9PiBpICE9PSBpbmRleCk7XG4gICAgdXBkYXRlQ29udGVudCh7IC4uLmRhdGEsIGl0ZW1zOiBuZXdJdGVtcyB9KTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVJdGVtQ2hhbmdlID0gKGluZGV4OiBudW1iZXIsIGtleTogc3RyaW5nLCB2YWw6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gWy4uLmRhdGEuaXRlbXNdO1xuICAgIG5ld0l0ZW1zW2luZGV4XSA9IHsgLi4ubmV3SXRlbXNbaW5kZXhdLCBba2V5XTogdmFsIH07XG4gICAgdXBkYXRlQ29udGVudCh7IC4uLmRhdGEsIGl0ZW1zOiBuZXdJdGVtcyB9KTtcbiAgfTtcblxuICBjb25zdCBpc0ZBUSA9IHBhZ2VUeXBlID09PSAnZmFxJztcbiAgY29uc3QgaGFzSXRlbXMgPSBkYXRhLml0ZW1zICYmIGRhdGEuaXRlbXMubGVuZ3RoID4gMDtcblxuICBpZiAoIXJlY29yZC5wYXJhbXMucGFnZVR5cGUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmIChpc1Nob3cpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPEJveCB2YXJpYW50PVwid2hpdGVcIiBwPVwieHhsXCIgYm9yZGVyPVwiMXB4IHNvbGlkICNkZGRcIiBib3JkZXJSYWRpdXM9XCJsZ1wiIG10PVwieGxcIiBib3hTaGFkb3c9XCJjYXJkXCI+XG4gICAgICAgIHtoYXNJdGVtcyA/IChcbiAgICAgICAgICA8Qm94PlxuICAgICAgICAgICAge2RhdGEuaXRlbXMubWFwKChpdGVtOiBhbnksIGluZGV4OiBudW1iZXIpID0+IChcbiAgICAgICAgICAgICAgPEJveCBrZXk9e2luZGV4fSBtYj1cInhsXCIgcGI9XCJsZ1wiIGJvcmRlckJvdHRvbT17aW5kZXggPCBkYXRhLml0ZW1zLmxlbmd0aCAtIDEgPyBcIjFweCBzb2xpZCAjZWVlXCIgOiBcIm5vbmVcIn0+XG4gICAgICAgICAgICAgICAgeyghaXNGQVEgfHwgaW5kZXggPT09IDAgfHwgaXRlbS5zaG93VGl0bGUpICYmIGl0ZW0udGl0bGUgJiYgKFxuICAgICAgICAgICAgICAgICAgPFRleHQgdmFyaWFudD1cImxnXCIgZm9udFdlaWdodD1cImJvbGRcIiBtYj1cInNtXCIgY29sb3I9XCJwcmltYXJ5MTAwXCI+XG4gICAgICAgICAgICAgICAgICAgIHtpdGVtLnRpdGxlfVxuICAgICAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAge2lzRkFRICYmIGl0ZW0uc3VidGl0bGUgJiYgKFxuICAgICAgICAgICAgICAgICAgPFRleHQgdmFyaWFudD1cIm1kXCIgZm9udFdlaWdodD1cInNlbWlib2xkXCIgbWI9XCJ4c1wiIGNvbG9yPVwiZ3JleTgwXCI+XG4gICAgICAgICAgICAgICAgICAgIHtpdGVtLnN1YnRpdGxlfVxuICAgICAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAge2l0ZW0uZGVzY3JpcHRpb24gJiYgKFxuICAgICAgICAgICAgICAgICAgPFRleHQgdmFyaWFudD1cInNtXCIgY29sb3I9XCJncmV5NjBcIj5cbiAgICAgICAgICAgICAgICAgICAge2l0ZW0uZGVzY3JpcHRpb259XG4gICAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8VGV4dCBpdGFsaWMgY29sb3I9XCJncmV5NDBcIj5ObyBlbnRyaWVzIGFkZGVkIHlldC48L1RleHQ+XG4gICAgICAgICl9XG4gICAgICA8L0JveD5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94IHZhcmlhbnQ9XCJ3aGl0ZVwiIHA9XCJ4eGxcIiBib3JkZXI9XCIxcHggc29saWQgI2RkZFwiIGJvcmRlclJhZGl1cz1cImxnXCIgbXQ9XCJ4bFwiIGJveFNoYWRvdz1cImNhcmRcIj5cbiAgICAgIDxCb3ggbXQ9XCJsZ1wiPlxuICAgICAgICB7ZGF0YS5pdGVtcyAmJiBkYXRhLml0ZW1zLm1hcCgoaXRlbTogYW55LCBpbmRleDogbnVtYmVyKSA9PiAoXG4gICAgICAgICAgPEJveCBrZXk9e2luZGV4fSBtYj1cInhsXCIgcG9zaXRpb249XCJyZWxhdGl2ZVwiIHB0PVwibGdcIj5cbiAgICAgICAgICAgIDxCb3ggcG9zaXRpb249XCJhYnNvbHV0ZVwiIHRvcD1cIjEwcHhcIiByaWdodD1cIjBcIj5cbiAgICAgICAgICAgICAgPEJ1dHRvbiBcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCIgXG4gICAgICAgICAgICAgICAgdmFyaWFudD1cImRhbmdlclwiIFxuICAgICAgICAgICAgICAgIHNpemU9XCJpY29uXCIgXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gcmVtb3ZlSXRlbShpbmRleCl9XG4gICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzPVwiZnVsbFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8SWNvbiBpY29uPVwiVHJhc2hcIiAvPlxuICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgXG4gICAgICAgICAgICB7KCFpc0ZBUSB8fCBpbmRleCA9PT0gMCB8fCBpdGVtLnNob3dUaXRsZSkgJiYgKFxuICAgICAgICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgICAgICAgIDxMYWJlbD5UaXRsZTwvTGFiZWw+XG4gICAgICAgICAgICAgICAgPElucHV0XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17aXRlbS50aXRsZSB8fCAnJ31cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gaGFuZGxlSXRlbUNoYW5nZShpbmRleCwgJ3RpdGxlJywgZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciB0aXRsZVwiXG4gICAgICAgICAgICAgICAgICB3aWR0aD17MX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgIHtpc0ZBUSAmJiAoXG4gICAgICAgICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgICAgICAgPExhYmVsPlN1YnRpdGxlPC9MYWJlbD5cbiAgICAgICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtpdGVtLnN1YnRpdGxlIHx8ICcnfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBoYW5kbGVJdGVtQ2hhbmdlKGluZGV4LCAnc3VidGl0bGUnLCBlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIHN1YnRpdGxlXCJcbiAgICAgICAgICAgICAgICAgIHdpZHRoPXsxfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICAgICAgPExhYmVsPkRlc2NyaXB0aW9uPC9MYWJlbD5cbiAgICAgICAgICAgICAgPFRleHRBcmVhXG4gICAgICAgICAgICAgICAgdmFsdWU9e2l0ZW0uZGVzY3JpcHRpb24gfHwgJyd9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBoYW5kbGVJdGVtQ2hhbmdlKGluZGV4LCAnZGVzY3JpcHRpb24nLCBlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBkZXNjcmlwdGlvblwiXG4gICAgICAgICAgICAgICAgd2lkdGg9ezF9XG4gICAgICAgICAgICAgICAgcm93cz17M31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICApKX1cbiAgICAgIDwvQm94PlxuXG4gICAgICA8Qm94IG10PVwieGxcIiBmbGV4IGZsZXhEaXJlY3Rpb249XCJyb3dcIiBqdXN0aWZ5Q29udGVudD1cImNlbnRlclwiIHB0PXtoYXNJdGVtcyA/ICd4bCcgOiAnbm9uZSd9PlxuICAgICAgICA8QnV0dG9uIFxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIiBcbiAgICAgICAgICBvbkNsaWNrPXthZGRJdGVtfSBcbiAgICAgICAgICB2YXJpYW50PVwib3V0bGluZVwiIFxuICAgICAgICAgIGJvcmRlclJhZGl1cz1cImZ1bGxcIlxuICAgICAgICAgIGRpc3BsYXk9XCJmbGV4XCJcbiAgICAgICAgICBhbGlnbkl0ZW1zPVwiY2VudGVyXCJcbiAgICAgICAgICBtcj1cIm1kXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxJY29uIGljb249XCJQbHVzXCIgbXI9XCJ4c1wiIC8+IFxuICAgICAgICAgIHtpc0ZBUSA/ICdBZGQgRkFRIEl0ZW1zJyA6ICdBZGQgUmVndWxhbWVudG8gSXRlbXMnfVxuICAgICAgICA8L0J1dHRvbj5cblxuICAgICAgICB7aXNGQVEgJiYgKFxuICAgICAgICAgIDxCdXR0b24gXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCIgXG4gICAgICAgICAgICBvbkNsaWNrPXthZGRUaXRsZVNlY3Rpb259IFxuICAgICAgICAgICAgdmFyaWFudD1cInByaW1hcnlcIiBcbiAgICAgICAgICAgIGJvcmRlclJhZGl1cz1cImZ1bGxcIlxuICAgICAgICAgICAgZGlzcGxheT1cImZsZXhcIlxuICAgICAgICAgICAgYWxpZ25JdGVtcz1cImNlbnRlclwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPEljb24gaWNvbj1cIlBsdXNcIiBtcj1cInhzXCIgLz4gQWRkIFRpdGxlXG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICl9XG4gICAgICA8L0JveD5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEZBUUJ1aWxkZXI7XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCb3gsIExhYmVsLCBJbnB1dCwgRHJvcFpvbmUsIERyb3Bab25lUHJvcHMsIEJ1dHRvbiwgSWNvbiwgVGV4dCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuaW1wb3J0IHsgQmFzZVByb3BlcnR5UHJvcHMgfSBmcm9tICdhZG1pbmpzJztcblxuY29uc3QgSW1hZ2VVcGxvYWRlcjogUmVhY3QuRkM8QmFzZVByb3BlcnR5UHJvcHM+ID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgcHJvcGVydHksIHJlY29yZCwgb25DaGFuZ2UgfSA9IHByb3BzO1xuICBjb25zdCBbcHJldmlldywgc2V0UHJldmlld10gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihyZWNvcmQucGFyYW1zW3Byb3BlcnR5Lm5hbWVdIHx8IG51bGwpO1xuXG4gIGNvbnN0IGhhbmRsZUZpbGVDaGFuZ2U6IERyb3Bab25lUHJvcHNbJ29uQ2hhbmdlJ10gPSAoZmlsZXMpID0+IHtcbiAgICBjb25zdCBmaWxlID0gZmlsZXNbMF07XG4gICAgaWYgKGZpbGUpIHtcbiAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICByZWFkZXIub25sb2FkZW5kID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBiYXNlNjRTdHJpbmcgPSByZWFkZXIucmVzdWx0IGFzIHN0cmluZztcbiAgICAgICAgc2V0UHJldmlldyhiYXNlNjRTdHJpbmcpO1xuICAgICAgICBvbkNoYW5nZShwcm9wZXJ0eS5uYW1lLCBiYXNlNjRTdHJpbmcpO1xuICAgICAgfTtcbiAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVDbGVhciA9ICgpID0+IHtcbiAgICBzZXRQcmV2aWV3KG51bGwpO1xuICAgIG9uQ2hhbmdlKHByb3BlcnR5Lm5hbWUsICcnKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxCb3ggbWI9XCJ4bFwiPlxuICAgICAgPExhYmVsPntwcm9wZXJ0eS5sYWJlbH08L0xhYmVsPlxuICAgICAge3ByZXZpZXcgPyAoXG4gICAgICAgIDxCb3ggYm9yZGVyPVwiMXB4IHNvbGlkICNkZGRcIiBwPVwibWRcIiBib3JkZXJSYWRpdXM9XCJtZFwiIHBvc2l0aW9uPVwicmVsYXRpdmVcIiB0ZXh0QWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICA8aW1nIHNyYz17cHJldmlld30gYWx0PVwiUHJldmlld1wiIHN0eWxlPXt7IG1heFdpZHRoOiAnMTAwJScsIG1heEhlaWdodDogJzIwMHB4JywgYm9yZGVyUmFkaXVzOiAnNHB4JyB9fSAvPlxuICAgICAgICAgIDxCb3ggbXQ9XCJtZFwiPlxuICAgICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwiZGFuZ2VyXCIgc2l6ZT1cInNtXCIgb25DbGljaz17aGFuZGxlQ2xlYXJ9IHR5cGU9XCJidXR0b25cIj5cbiAgICAgICAgICAgICAgPEljb24gaWNvbj1cIlRyYXNoXCIgbXI9XCJ4c1wiIC8+IFJlbW92ZSBJbWFnZVxuICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgIDwvQm94PlxuICAgICAgKSA6IChcbiAgICAgICAgPERyb3Bab25lIG9uQ2hhbmdlPXtoYW5kbGVGaWxlQ2hhbmdlfSB2YWxpZGF0ZT17eyBtYXhTaXplOiA1MDAwMDAwLCBtaW1lVHlwZXM6IFsnaW1hZ2UvcG5nJywgJ2ltYWdlL2pwZWcnLCAnaW1hZ2UvanBnJywgJ2ltYWdlL3dlYnAnXSB9fSAvPlxuICAgICAgKX1cbiAgICAgIDxUZXh0IHZhcmlhbnQ9XCJzbVwiIGNvbG9yPVwiZ3JleTYwXCIgbXQ9XCJ4c1wiPlxuICAgICAgICBTZWxlY3QgYW4gaW1hZ2UgdG8gdXNlIGFzIHRoZSBjYXJkIGJhY2tncm91bmQuIEJhc2U2NCBmb3JtYXQgd2lsbCBiZSBzdG9yZWQgaW4gdGhlIGRhdGFiYXNlLlxuICAgICAgPC9UZXh0PlxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSW1hZ2VVcGxvYWRlcjtcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQm94LCBGb3JtR3JvdXAsIExhYmVsLCBTZWxlY3QsIFNlbGVjdEFzeW5jLCBUZXh0IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5pbXBvcnQgeyBCYXNlUHJvcGVydHlQcm9wcywgQXBpQ2xpZW50IH0gZnJvbSAnYWRtaW5qcyc7XG5cbmNvbnN0IENhdGVnb3J5TXVsdGlTZWxlY3Q6IFJlYWN0LkZDPEJhc2VQcm9wZXJ0eVByb3BzPiA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IHByb3BlcnR5LCByZWNvcmQsIG9uQ2hhbmdlLCB3aGVyZSB9ID0gcHJvcHM7XG4gIGNvbnN0IGlzTGlzdCA9IHdoZXJlID09PSAnbGlzdCc7XG4gIGNvbnN0IGlzU2hvdyA9IHdoZXJlID09PSAnc2hvdyc7XG4gIGNvbnN0IGFwaSA9IG5ldyBBcGlDbGllbnQoKTtcblxuICAvLyBGb3IgTGlzdCB2aWV3LCBqdXN0IHNob3cgY29tbWEtc2VwYXJhdGVkIG5hbWVzXG4gIGlmIChpc0xpc3QpIHtcbiAgICAvLyAxLiBUcnkgdG8gZ2V0IHRpdGxlcyBmcm9tIHBvcHVsYXRlZCBkYXRhIChiZXN0IHdheSlcbiAgICBjb25zdCBwb3B1bGF0ZWQgPSByZWNvcmQucG9wdWxhdGVkPy5bcHJvcGVydHkubmFtZV07XG4gICAgaWYgKHBvcHVsYXRlZCkge1xuICAgICAgY29uc3QgaXRlbXMgPSBBcnJheS5pc0FycmF5KHBvcHVsYXRlZCkgPyBwb3B1bGF0ZWQgOiBbcG9wdWxhdGVkXTtcbiAgICAgIGNvbnN0IHRpdGxlcyA9IGl0ZW1zLm1hcChwID0+IHAudGl0bGUgfHwgcC5wYXJhbXM/LnRpdGxlIHx8IHAuaWQpLmZpbHRlcihCb29sZWFuKS5qb2luKCcsICcpO1xuICAgICAgaWYgKHRpdGxlcykgcmV0dXJuIDxUZXh0Pnt0aXRsZXN9PC9UZXh0PjtcbiAgICB9XG4gICAgXG4gICAgLy8gMi4gRmFsbGJhY2s6IENoZWNrIGlmIG5hbWVzIGV4aXN0IGluIHBhcmFtcyAoc29tZXRpbWVzIGZsYXR0ZW5lZCBhcyBjYXRlZ29yaWVzLjAudGl0bGUpXG4gICAgY29uc3QgcGFyYW1zVGl0bGVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIE9iamVjdC5rZXlzKHJlY29yZC5wYXJhbXMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmIChrZXkuc3RhcnRzV2l0aChgJHtwcm9wZXJ0eS5uYW1lfS5gKSAmJiBrZXkuZW5kc1dpdGgoJy50aXRsZScpKSB7XG4gICAgICAgIHBhcmFtc1RpdGxlcy5wdXNoKHJlY29yZC5wYXJhbXNba2V5XSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKHBhcmFtc1RpdGxlcy5sZW5ndGggPiAwKSByZXR1cm4gPFRleHQ+e3BhcmFtc1RpdGxlcy5qb2luKCcsICcpfTwvVGV4dD47XG5cbiAgICByZXR1cm4gPFRleHQ+LTwvVGV4dD47XG4gIH1cbiAgXG4gIC8vIEN1cnJlbnQgdmFsdWVzIGFyZSB1c3VhbGx5IHN0b3JlZCBhcyBjYXRlZ29yaWVzLjAsIGNhdGVnb3JpZXMuMSwgZXRjIG9yIGFzIGEgcmF3IGFycmF5IGluIHNvbWUgY29udGV4dHNcbiAgY29uc3QgW3NlbGVjdGVkT3B0aW9ucywgc2V0U2VsZWN0ZWRPcHRpb25zXSA9IHVzZVN0YXRlPGFueVtdPihbXSk7XG4gIGNvbnN0IFthbGxPcHRpb25zLCBzZXRBbGxPcHRpb25zXSA9IHVzZVN0YXRlPGFueVtdPihbXSk7XG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGxvYWRDYXRlZ29yaWVzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuc2VhcmNoUmVjb3Jkcyh7XG4gICAgICAgICAgcmVzb3VyY2VJZDogJ05vdGljaWFzQ2F0ZWdvcnknLFxuICAgICAgICAgIHF1ZXJ5OiAnJyxcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBvcHRpb25zID0gcmVzcG9uc2UubWFwKHIgPT4gKHtcbiAgICAgICAgICB2YWx1ZTogci5pZCxcbiAgICAgICAgICBsYWJlbDogci50aXRsZSxcbiAgICAgICAgfSkpO1xuICAgICAgICBcbiAgICAgICAgc2V0QWxsT3B0aW9ucyhvcHRpb25zKTtcblxuICAgICAgICAvLyBHZXQgY3VycmVudGx5IHNlbGVjdGVkIElEc1xuICAgICAgICBjb25zdCBjdXJyZW50SWRzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBPYmplY3Qua2V5cyhyZWNvcmQucGFyYW1zKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgaWYgKGtleS5zdGFydHNXaXRoKGAke3Byb3BlcnR5Lm5hbWV9LmApKSB7XG4gICAgICAgICAgICBjb25zdCB2YWwgPSByZWNvcmQucGFyYW1zW2tleV07XG4gICAgICAgICAgICBpZiAodmFsKSBjdXJyZW50SWRzLnB1c2godmFsLnRvU3RyaW5nKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCByYXdWYWx1ZSA9IHJlY29yZC5wYXJhbXNbcHJvcGVydHkubmFtZV07XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJhd1ZhbHVlKSkge1xuICAgICAgICAgICAgcmF3VmFsdWUuZm9yRWFjaCh2ID0+IGN1cnJlbnRJZHMucHVzaCh2LnRvU3RyaW5nKCkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gb3B0aW9ucy5maWx0ZXIob3B0ID0+IGN1cnJlbnRJZHMuaW5jbHVkZXMob3B0LnZhbHVlLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgc2V0U2VsZWN0ZWRPcHRpb25zKHNlbGVjdGVkKTtcbiAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBsb2FkIGNhdGVnb3JpZXM6JywgZXJyb3IpO1xuICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBsb2FkQ2F0ZWdvcmllcygpO1xuICB9LCBbcmVjb3JkLmlkLCByZWNvcmQucGFyYW1zXSk7IC8vIFVwZGF0ZSBvbiByZWNvcmQgY2hhbmdlXG5cbiAgY29uc3QgaGFuZGxlQ2hhbmdlID0gKHNlbGVjdGVkOiBhbnkpID0+IHtcbiAgICBjb25zdCBuZXdPcHRpb25zID0gc2VsZWN0ZWQgPyAoQXJyYXkuaXNBcnJheShzZWxlY3RlZCkgPyBzZWxlY3RlZCA6IFtzZWxlY3RlZF0pIDogW107XG4gICAgc2V0U2VsZWN0ZWRPcHRpb25zKG5ld09wdGlvbnMpO1xuICAgIGNvbnN0IGlkcyA9IG5ld09wdGlvbnMubWFwKG9wdCA9PiBvcHQudmFsdWUpO1xuICAgIG9uQ2hhbmdlKHByb3BlcnR5Lm5hbWUsIGlkcyk7XG4gIH07XG5cbiAgaWYgKGlzU2hvdykge1xuICAgIHJldHVybiAoXG4gICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICA8TGFiZWw+e3Byb3BlcnR5LmxhYmVsfTwvTGFiZWw+XG4gICAgICAgIDxCb3ggdmFyaWFudD1cIndoaXRlXCIgcD1cIm1kXCIgYm9yZGVyPVwiMXB4IHNvbGlkICNkZGRcIiBib3JkZXJSYWRpdXM9XCJtZFwiPlxuICAgICAgICAgIHtzZWxlY3RlZE9wdGlvbnMubGVuZ3RoID4gMCA/IChcbiAgICAgICAgICAgIDxCb3ggZmxleCBmbGV4RGlyZWN0aW9uPVwicm93XCIgZmxleFdyYXA9XCJ3cmFwXCI+XG4gICAgICAgICAgICAgIHtzZWxlY3RlZE9wdGlvbnMubWFwKG9wdCA9PiAoXG4gICAgICAgICAgICAgICAgPEJveCBrZXk9e29wdC52YWx1ZX0gYmc9XCJwcmltYXJ5MTAwXCIgY29sb3I9XCJ3aGl0ZVwiIHB4PVwic21cIiBweT1cInhzXCIgbXI9XCJ4c1wiIG1iPVwieHNcIiBib3JkZXJSYWRpdXM9XCJtZFwiPlxuICAgICAgICAgICAgICAgICAge29wdC5sYWJlbH1cbiAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPFRleHQgY29sb3I9XCJncmV5NDBcIj5ObyBjYXRlZ29yaWVzIHNlbGVjdGVkPC9UZXh0PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQm94PlxuICAgICAgPC9Gb3JtR3JvdXA+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPEJveCBtYj1cInhsXCI+XG4gICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICA8TGFiZWw+e3Byb3BlcnR5LmxhYmVsfTwvTGFiZWw+XG4gICAgICAgIDxTZWxlY3RcbiAgICAgICAgICBpc011bHRpXG4gICAgICAgICAgaXNMb2FkaW5nPXtpc0xvYWRpbmd9XG4gICAgICAgICAgdmFsdWU9e3NlbGVjdGVkT3B0aW9uc31cbiAgICAgICAgICBvcHRpb25zPXthbGxPcHRpb25zfVxuICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVDaGFuZ2V9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWxlY3QgY2F0ZWdvcmllcy4uLlwiXG4gICAgICAgIC8+XG4gICAgICAgIDxUZXh0IHZhcmlhbnQ9XCJzbVwiIGNvbG9yPVwiZ3JleTYwXCIgbXQ9XCJ4c1wiPlxuICAgICAgICAgIFNlbGVjdCBvbmUgb3IgbW9yZSBjYXRlZ29yaWVzIGZvciB0aGlzIG5ld3MgaXRlbS5cbiAgICAgICAgPC9UZXh0PlxuICAgICAgPC9Gb3JtR3JvdXA+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDYXRlZ29yeU11bHRpU2VsZWN0O1xuIiwiQWRtaW5KUy5Vc2VyQ29tcG9uZW50cyA9IHt9XG5pbXBvcnQgRkFRQnVpbGRlciBmcm9tICcuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9GQVFCdWlsZGVyJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5GQVFCdWlsZGVyID0gRkFRQnVpbGRlclxuaW1wb3J0IEltYWdlVXBsb2FkZXIgZnJvbSAnLi4vc3JjL2FkbWluL2NvbXBvbmVudHMvSW1hZ2VVcGxvYWRlcidcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuSW1hZ2VVcGxvYWRlciA9IEltYWdlVXBsb2FkZXJcbmltcG9ydCBDYXRlZ29yeU11bHRpU2VsZWN0IGZyb20gJy4uL3NyYy9hZG1pbi9jb21wb25lbnRzL0NhdGVnb3J5TXVsdGlTZWxlY3QnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkNhdGVnb3J5TXVsdGlTZWxlY3QgPSBDYXRlZ29yeU11bHRpU2VsZWN0Il0sIm5hbWVzIjpbIkZBUUJ1aWxkZXIiLCJwcm9wcyIsInByb3BlcnR5IiwicmVjb3JkIiwib25DaGFuZ2UiLCJyZXNvdXJjZSIsImFjdGlvbiIsInBhZ2VUeXBlIiwicGFyYW1zIiwiaXNTaG93IiwibmFtZSIsImdldEluaXRpYWxEYXRhIiwiZGlyZWN0VmFsdWUiLCJpdGVtcyIsInBhcnNlZCIsIkpTT04iLCJwYXJzZSIsImUiLCJpIiwidW5kZWZpbmVkIiwic2hvd1RpdGxlVmFsIiwicHVzaCIsInRpdGxlIiwic3VidGl0bGUiLCJkZXNjcmlwdGlvbiIsInNob3dUaXRsZSIsImxlbmd0aCIsImRhdGEiLCJzZXREYXRhIiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJ1cGRhdGVDb250ZW50IiwibmV3RGF0YSIsImFkZEl0ZW0iLCJuZXdJdGVtcyIsImFkZFRpdGxlU2VjdGlvbiIsInJlbW92ZUl0ZW0iLCJpbmRleCIsImZpbHRlciIsIl8iLCJoYW5kbGVJdGVtQ2hhbmdlIiwia2V5IiwidmFsIiwiaXNGQVEiLCJoYXNJdGVtcyIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsIkJveCIsInZhcmlhbnQiLCJwIiwiYm9yZGVyIiwiYm9yZGVyUmFkaXVzIiwibXQiLCJib3hTaGFkb3ciLCJtYXAiLCJpdGVtIiwibWIiLCJwYiIsImJvcmRlckJvdHRvbSIsIlRleHQiLCJmb250V2VpZ2h0IiwiY29sb3IiLCJpdGFsaWMiLCJwb3NpdGlvbiIsInB0IiwidG9wIiwicmlnaHQiLCJCdXR0b24iLCJ0eXBlIiwic2l6ZSIsIm9uQ2xpY2siLCJJY29uIiwiaWNvbiIsIkZvcm1Hcm91cCIsIkxhYmVsIiwiSW5wdXQiLCJ2YWx1ZSIsInRhcmdldCIsInBsYWNlaG9sZGVyIiwid2lkdGgiLCJUZXh0QXJlYSIsInJvd3MiLCJmbGV4IiwiZmxleERpcmVjdGlvbiIsImp1c3RpZnlDb250ZW50IiwiZGlzcGxheSIsImFsaWduSXRlbXMiLCJtciIsIkltYWdlVXBsb2FkZXIiLCJwcmV2aWV3Iiwic2V0UHJldmlldyIsImhhbmRsZUZpbGVDaGFuZ2UiLCJmaWxlcyIsImZpbGUiLCJyZWFkZXIiLCJGaWxlUmVhZGVyIiwib25sb2FkZW5kIiwiYmFzZTY0U3RyaW5nIiwicmVzdWx0IiwicmVhZEFzRGF0YVVSTCIsImhhbmRsZUNsZWFyIiwibGFiZWwiLCJ0ZXh0QWxpZ24iLCJzcmMiLCJhbHQiLCJzdHlsZSIsIm1heFdpZHRoIiwibWF4SGVpZ2h0IiwiRHJvcFpvbmUiLCJ2YWxpZGF0ZSIsIm1heFNpemUiLCJtaW1lVHlwZXMiLCJDYXRlZ29yeU11bHRpU2VsZWN0Iiwid2hlcmUiLCJpc0xpc3QiLCJhcGkiLCJBcGlDbGllbnQiLCJwb3B1bGF0ZWQiLCJBcnJheSIsImlzQXJyYXkiLCJ0aXRsZXMiLCJpZCIsIkJvb2xlYW4iLCJqb2luIiwicGFyYW1zVGl0bGVzIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJzdGFydHNXaXRoIiwiZW5kc1dpdGgiLCJzZWxlY3RlZE9wdGlvbnMiLCJzZXRTZWxlY3RlZE9wdGlvbnMiLCJhbGxPcHRpb25zIiwic2V0QWxsT3B0aW9ucyIsImlzTG9hZGluZyIsInNldElzTG9hZGluZyIsImxvYWRDYXRlZ29yaWVzIiwicmVzcG9uc2UiLCJzZWFyY2hSZWNvcmRzIiwicmVzb3VyY2VJZCIsInF1ZXJ5Iiwib3B0aW9ucyIsInIiLCJjdXJyZW50SWRzIiwidG9TdHJpbmciLCJyYXdWYWx1ZSIsInYiLCJzZWxlY3RlZCIsIm9wdCIsImluY2x1ZGVzIiwiZXJyb3IiLCJjb25zb2xlIiwiaGFuZGxlQ2hhbmdlIiwibmV3T3B0aW9ucyIsImlkcyIsImZsZXhXcmFwIiwiYmciLCJweCIsInB5IiwiU2VsZWN0IiwiaXNNdWx0aSIsIkFkbWluSlMiLCJVc2VyQ29tcG9uZW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQUlBLE1BQU1BLFVBQXVDLEdBQUlDLEtBQUssSUFBSztJQUN6RCxNQUFNO01BQUVDLFFBQVE7TUFBRUMsTUFBTTtNQUFFQyxRQUFRO0VBQUVDLElBQUFBO0VBQVMsR0FBQyxHQUFHSixLQUFLO0VBQ3RELEVBQUEsTUFBTUssTUFBTSxHQUFJTCxLQUFLLENBQVNLLE1BQU07SUFDcEMsTUFBTUMsUUFBUSxHQUFHSixNQUFNLENBQUNLLE1BQU0sQ0FBQ0QsUUFBUSxJQUFJLEtBQUs7O0VBRWhEO0lBQ0EsTUFBTUUsTUFBTSxHQUFHSCxNQUFNLEVBQUVJLElBQUksS0FBSyxNQUFNLElBQUksQ0FBQ04sUUFBUTs7RUFFbkQ7SUFDQSxNQUFNTyxjQUFjLEdBQUdBLE1BQU07RUFDM0I7TUFDQSxNQUFNQyxXQUFXLEdBQUdULE1BQU0sQ0FBQ0ssTUFBTSxDQUFDTixRQUFRLENBQUNRLElBQUksQ0FBQztFQUNoRCxJQUFBLElBQUlFLFdBQVcsRUFBRTtRQUNmLElBQUksT0FBT0EsV0FBVyxLQUFLLFFBQVEsSUFBSUEsV0FBVyxDQUFDQyxLQUFLLEVBQUUsT0FBT0QsV0FBVztFQUM1RSxNQUFBLElBQUksT0FBT0EsV0FBVyxLQUFLLFFBQVEsRUFBRTtVQUNuQyxJQUFJO0VBQ0YsVUFBQSxNQUFNRSxNQUFNLEdBQUdDLElBQUksQ0FBQ0MsS0FBSyxDQUFDSixXQUFXLENBQUM7RUFDdEMsVUFBQSxJQUFJRSxNQUFNLElBQUlBLE1BQU0sQ0FBQ0QsS0FBSyxFQUFFLE9BQU9DLE1BQU07VUFDM0MsQ0FBQyxDQUFDLE9BQU9HLENBQUMsRUFBRTtFQUNWO0VBQUEsUUFBQTtFQUVKLE1BQUE7RUFDRixJQUFBOztFQUVBO01BQ0EsTUFBTUosS0FBSyxHQUFHLEVBQUU7TUFDaEIsSUFBSUssQ0FBQyxHQUFHLENBQUM7TUFDVCxPQUNFZixNQUFNLENBQUNLLE1BQU0sQ0FBQyxHQUFHTixRQUFRLENBQUNRLElBQUksQ0FBQSxPQUFBLEVBQVVRLENBQUMsV0FBVyxDQUFDLEtBQUtDLFNBQVMsSUFDbkVoQixNQUFNLENBQUNLLE1BQU0sQ0FBQyxHQUFHTixRQUFRLENBQUNRLElBQUksQ0FBQSxPQUFBLEVBQVVRLENBQUMsUUFBUSxDQUFDLEtBQUtDLFNBQVMsSUFDaEVoQixNQUFNLENBQUNLLE1BQU0sQ0FBQyxHQUFHTixRQUFRLENBQUNRLElBQUksQ0FBQSxPQUFBLEVBQVVRLENBQUMsY0FBYyxDQUFDLEtBQUtDLFNBQVMsRUFDdEU7RUFDQSxNQUFBLE1BQU1DLFlBQVksR0FBR2pCLE1BQU0sQ0FBQ0ssTUFBTSxDQUFDLENBQUEsRUFBR04sUUFBUSxDQUFDUSxJQUFJLENBQUEsT0FBQSxFQUFVUSxDQUFDLFlBQVksQ0FBQztRQUMzRUwsS0FBSyxDQUFDUSxJQUFJLENBQUM7RUFDVEMsUUFBQUEsS0FBSyxFQUFFbkIsTUFBTSxDQUFDSyxNQUFNLENBQUMsQ0FBQSxFQUFHTixRQUFRLENBQUNRLElBQUksQ0FBQSxPQUFBLEVBQVVRLENBQUMsQ0FBQSxNQUFBLENBQVEsQ0FBQyxJQUFJLEVBQUU7RUFDL0RLLFFBQUFBLFFBQVEsRUFBRXBCLE1BQU0sQ0FBQ0ssTUFBTSxDQUFDLENBQUEsRUFBR04sUUFBUSxDQUFDUSxJQUFJLENBQUEsT0FBQSxFQUFVUSxDQUFDLENBQUEsU0FBQSxDQUFXLENBQUMsSUFBSSxFQUFFO0VBQ3JFTSxRQUFBQSxXQUFXLEVBQUVyQixNQUFNLENBQUNLLE1BQU0sQ0FBQyxDQUFBLEVBQUdOLFFBQVEsQ0FBQ1EsSUFBSSxDQUFBLE9BQUEsRUFBVVEsQ0FBQyxDQUFBLFlBQUEsQ0FBYyxDQUFDLElBQUksRUFBRTtFQUMzRU8sUUFBQUEsU0FBUyxFQUFFTCxZQUFZLEtBQUssSUFBSSxJQUFJQSxZQUFZLEtBQUs7RUFDdkQsT0FBQyxDQUFDO0VBQ0ZGLE1BQUFBLENBQUMsRUFBRTtFQUNMLElBQUE7RUFFQSxJQUFBLE9BQU9MLEtBQUssQ0FBQ2EsTUFBTSxHQUFHLENBQUMsR0FBRztFQUFFYixNQUFBQTtFQUFNLEtBQUMsR0FBRztFQUFFQSxNQUFBQSxLQUFLLEVBQUU7T0FBSTtJQUNyRCxDQUFDO0lBRUQsTUFBTSxDQUFDYyxJQUFJLEVBQUVDLE9BQU8sQ0FBQyxHQUFHQyxjQUFRLENBQUNsQixjQUFjLEVBQUUsQ0FBQzs7RUFFbEQ7RUFDQW1CLEVBQUFBLGVBQVMsQ0FBQyxNQUFNO0VBQ2RGLElBQUFBLE9BQU8sQ0FBQ2pCLGNBQWMsRUFBRSxDQUFDO0VBQzNCLEVBQUEsQ0FBQyxFQUFFLENBQUNSLE1BQU0sQ0FBQ0ssTUFBTSxDQUFDLENBQUM7SUFFbkIsTUFBTXVCLGFBQWEsR0FBSUMsT0FBWSxJQUFLO01BQ3RDSixPQUFPLENBQUNJLE9BQU8sQ0FBQztFQUNoQixJQUFBLElBQUk1QixRQUFRLEVBQUU7RUFDWkEsTUFBQUEsUUFBUSxDQUFDRixRQUFRLENBQUNRLElBQUksRUFBRXNCLE9BQU8sQ0FBQztFQUNsQyxJQUFBO0lBQ0YsQ0FBQztJQUVELE1BQU1DLE9BQU8sR0FBR0EsTUFBTTtNQUNwQixNQUFNQyxRQUFRLEdBQUcsQ0FBQyxJQUFJUCxJQUFJLENBQUNkLEtBQUssSUFBSSxFQUFFLENBQUMsRUFBRTtFQUFFVSxNQUFBQSxRQUFRLEVBQUUsRUFBRTtFQUFFQyxNQUFBQSxXQUFXLEVBQUUsRUFBRTtFQUFFQyxNQUFBQSxTQUFTLEVBQUU7RUFBTSxLQUFDLENBQUM7RUFDN0ZNLElBQUFBLGFBQWEsQ0FBQztFQUFFLE1BQUEsR0FBR0osSUFBSTtFQUFFZCxNQUFBQSxLQUFLLEVBQUVxQjtFQUFTLEtBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsTUFBTUMsZUFBZSxHQUFHQSxNQUFNO01BQzVCLE1BQU1ELFFBQVEsR0FBRyxDQUFDLElBQUlQLElBQUksQ0FBQ2QsS0FBSyxJQUFJLEVBQUUsQ0FBQyxFQUFFO0VBQUVTLE1BQUFBLEtBQUssRUFBRSxFQUFFO0VBQUVDLE1BQUFBLFFBQVEsRUFBRSxFQUFFO0VBQUVDLE1BQUFBLFdBQVcsRUFBRSxFQUFFO0VBQUVDLE1BQUFBLFNBQVMsRUFBRTtFQUFLLEtBQUMsQ0FBQztFQUN2R00sSUFBQUEsYUFBYSxDQUFDO0VBQUUsTUFBQSxHQUFHSixJQUFJO0VBQUVkLE1BQUFBLEtBQUssRUFBRXFCO0VBQVMsS0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxNQUFNRSxVQUFVLEdBQUlDLEtBQWEsSUFBSztFQUNwQyxJQUFBLE1BQU1ILFFBQVEsR0FBR1AsSUFBSSxDQUFDZCxLQUFLLENBQUN5QixNQUFNLENBQUMsQ0FBQ0MsQ0FBQyxFQUFFckIsQ0FBUyxLQUFLQSxDQUFDLEtBQUttQixLQUFLLENBQUM7RUFDakVOLElBQUFBLGFBQWEsQ0FBQztFQUFFLE1BQUEsR0FBR0osSUFBSTtFQUFFZCxNQUFBQSxLQUFLLEVBQUVxQjtFQUFTLEtBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsTUFBTU0sZ0JBQWdCLEdBQUdBLENBQUNILEtBQWEsRUFBRUksR0FBVyxFQUFFQyxHQUFXLEtBQUs7RUFDcEUsSUFBQSxNQUFNUixRQUFRLEdBQUcsQ0FBQyxHQUFHUCxJQUFJLENBQUNkLEtBQUssQ0FBQztNQUNoQ3FCLFFBQVEsQ0FBQ0csS0FBSyxDQUFDLEdBQUc7UUFBRSxHQUFHSCxRQUFRLENBQUNHLEtBQUssQ0FBQztFQUFFLE1BQUEsQ0FBQ0ksR0FBRyxHQUFHQztPQUFLO0VBQ3BEWCxJQUFBQSxhQUFhLENBQUM7RUFBRSxNQUFBLEdBQUdKLElBQUk7RUFBRWQsTUFBQUEsS0FBSyxFQUFFcUI7RUFBUyxLQUFDLENBQUM7SUFDN0MsQ0FBQztFQUVELEVBQUEsTUFBTVMsS0FBSyxHQUFHcEMsUUFBUSxLQUFLLEtBQUs7RUFDaEMsRUFBQSxNQUFNcUMsUUFBUSxHQUFHakIsSUFBSSxDQUFDZCxLQUFLLElBQUljLElBQUksQ0FBQ2QsS0FBSyxDQUFDYSxNQUFNLEdBQUcsQ0FBQztFQUVwRCxFQUFBLElBQUksQ0FBQ3ZCLE1BQU0sQ0FBQ0ssTUFBTSxDQUFDRCxRQUFRLEVBQUU7RUFDM0IsSUFBQSxPQUFPLElBQUk7RUFDYixFQUFBO0VBRUEsRUFBQSxJQUFJRSxNQUFNLEVBQUU7RUFDVixJQUFBLG9CQUNFb0Msc0JBQUEsQ0FBQUMsYUFBQSxDQUFDQyxnQkFBRyxFQUFBO0VBQUNDLE1BQUFBLE9BQU8sRUFBQyxPQUFPO0VBQUNDLE1BQUFBLENBQUMsRUFBQyxLQUFLO0VBQUNDLE1BQUFBLE1BQU0sRUFBQyxnQkFBZ0I7RUFBQ0MsTUFBQUEsWUFBWSxFQUFDLElBQUk7RUFBQ0MsTUFBQUEsRUFBRSxFQUFDLElBQUk7RUFBQ0MsTUFBQUEsU0FBUyxFQUFDO09BQU0sRUFDNUZULFFBQVEsZ0JBQ1BDLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ0MsZ0JBQUcsRUFBQSxJQUFBLEVBQ0RwQixJQUFJLENBQUNkLEtBQUssQ0FBQ3lDLEdBQUcsQ0FBQyxDQUFDQyxJQUFTLEVBQUVsQixLQUFhLGtCQUN2Q1Esc0JBQUEsQ0FBQUMsYUFBQSxDQUFDQyxnQkFBRyxFQUFBO0VBQUNOLE1BQUFBLEdBQUcsRUFBRUosS0FBTTtFQUFDbUIsTUFBQUEsRUFBRSxFQUFDLElBQUk7RUFBQ0MsTUFBQUEsRUFBRSxFQUFDLElBQUk7RUFBQ0MsTUFBQUEsWUFBWSxFQUFFckIsS0FBSyxHQUFHVixJQUFJLENBQUNkLEtBQUssQ0FBQ2EsTUFBTSxHQUFHLENBQUMsR0FBRyxnQkFBZ0IsR0FBRztPQUFPLEVBQ3RHLENBQUMsQ0FBQ2lCLEtBQUssSUFBSU4sS0FBSyxLQUFLLENBQUMsSUFBSWtCLElBQUksQ0FBQzlCLFNBQVMsS0FBSzhCLElBQUksQ0FBQ2pDLEtBQUssaUJBQ3REdUIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDYSxpQkFBSSxFQUFBO0VBQUNYLE1BQUFBLE9BQU8sRUFBQyxJQUFJO0VBQUNZLE1BQUFBLFVBQVUsRUFBQyxNQUFNO0VBQUNKLE1BQUFBLEVBQUUsRUFBQyxJQUFJO0VBQUNLLE1BQUFBLEtBQUssRUFBQztFQUFZLEtBQUEsRUFDNUROLElBQUksQ0FBQ2pDLEtBQ0YsQ0FDUCxFQUNBcUIsS0FBSyxJQUFJWSxJQUFJLENBQUNoQyxRQUFRLGlCQUNyQnNCLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ2EsaUJBQUksRUFBQTtFQUFDWCxNQUFBQSxPQUFPLEVBQUMsSUFBSTtFQUFDWSxNQUFBQSxVQUFVLEVBQUMsVUFBVTtFQUFDSixNQUFBQSxFQUFFLEVBQUMsSUFBSTtFQUFDSyxNQUFBQSxLQUFLLEVBQUM7RUFBUSxLQUFBLEVBQzVETixJQUFJLENBQUNoQyxRQUNGLENBQ1AsRUFDQWdDLElBQUksQ0FBQy9CLFdBQVcsaUJBQ2ZxQixzQkFBQSxDQUFBQyxhQUFBLENBQUNhLGlCQUFJLEVBQUE7RUFBQ1gsTUFBQUEsT0FBTyxFQUFDLElBQUk7RUFBQ2EsTUFBQUEsS0FBSyxFQUFDO0VBQVEsS0FBQSxFQUM5Qk4sSUFBSSxDQUFDL0IsV0FDRixDQUVMLENBQ04sQ0FDRSxDQUFDLGdCQUVOcUIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDYSxpQkFBSSxFQUFBO1FBQUNHLE1BQU0sRUFBQSxJQUFBO0VBQUNELE1BQUFBLEtBQUssRUFBQztPQUFRLEVBQUMsdUJBQTJCLENBRXRELENBQUM7RUFFVixFQUFBO0VBRUEsRUFBQSxvQkFDRWhCLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ0MsZ0JBQUcsRUFBQTtFQUFDQyxJQUFBQSxPQUFPLEVBQUMsT0FBTztFQUFDQyxJQUFBQSxDQUFDLEVBQUMsS0FBSztFQUFDQyxJQUFBQSxNQUFNLEVBQUMsZ0JBQWdCO0VBQUNDLElBQUFBLFlBQVksRUFBQyxJQUFJO0VBQUNDLElBQUFBLEVBQUUsRUFBQyxJQUFJO0VBQUNDLElBQUFBLFNBQVMsRUFBQztFQUFNLEdBQUEsZUFDN0ZSLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ0MsZ0JBQUcsRUFBQTtFQUFDSyxJQUFBQSxFQUFFLEVBQUM7RUFBSSxHQUFBLEVBQ1R6QixJQUFJLENBQUNkLEtBQUssSUFBSWMsSUFBSSxDQUFDZCxLQUFLLENBQUN5QyxHQUFHLENBQUMsQ0FBQ0MsSUFBUyxFQUFFbEIsS0FBYSxrQkFDckRRLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ0MsZ0JBQUcsRUFBQTtFQUFDTixJQUFBQSxHQUFHLEVBQUVKLEtBQU07RUFBQ21CLElBQUFBLEVBQUUsRUFBQyxJQUFJO0VBQUNPLElBQUFBLFFBQVEsRUFBQyxVQUFVO0VBQUNDLElBQUFBLEVBQUUsRUFBQztFQUFJLEdBQUEsZUFDbERuQixzQkFBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUE7RUFBQ2dCLElBQUFBLFFBQVEsRUFBQyxVQUFVO0VBQUNFLElBQUFBLEdBQUcsRUFBQyxNQUFNO0VBQUNDLElBQUFBLEtBQUssRUFBQztFQUFHLEdBQUEsZUFDM0NyQixzQkFBQSxDQUFBQyxhQUFBLENBQUNxQixtQkFBTSxFQUFBO0VBQ0xDLElBQUFBLElBQUksRUFBQyxRQUFRO0VBQ2JwQixJQUFBQSxPQUFPLEVBQUMsUUFBUTtFQUNoQnFCLElBQUFBLElBQUksRUFBQyxNQUFNO0VBQ1hDLElBQUFBLE9BQU8sRUFBRUEsTUFBTWxDLFVBQVUsQ0FBQ0MsS0FBSyxDQUFFO0VBQ2pDYyxJQUFBQSxZQUFZLEVBQUM7RUFBTSxHQUFBLGVBRW5CTixzQkFBQSxDQUFBQyxhQUFBLENBQUN5QixpQkFBSSxFQUFBO0VBQUNDLElBQUFBLElBQUksRUFBQztFQUFPLEdBQUUsQ0FDZCxDQUNMLENBQUMsRUFFTCxDQUFDLENBQUM3QixLQUFLLElBQUlOLEtBQUssS0FBSyxDQUFDLElBQUlrQixJQUFJLENBQUM5QixTQUFTLGtCQUN2Q29CLHNCQUFBLENBQUFDLGFBQUEsQ0FBQzJCLHNCQUFTLEVBQUEsSUFBQSxlQUNSNUIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDNEIsa0JBQUssRUFBQSxJQUFBLEVBQUMsT0FBWSxDQUFDLGVBQ3BCN0Isc0JBQUEsQ0FBQUMsYUFBQSxDQUFDNkIsa0JBQUssRUFBQTtFQUNKQyxJQUFBQSxLQUFLLEVBQUVyQixJQUFJLENBQUNqQyxLQUFLLElBQUksRUFBRztFQUN4QmxCLElBQUFBLFFBQVEsRUFBR2EsQ0FBQyxJQUFLdUIsZ0JBQWdCLENBQUNILEtBQUssRUFBRSxPQUFPLEVBQUVwQixDQUFDLENBQUM0RCxNQUFNLENBQUNELEtBQUssQ0FBRTtFQUNsRUUsSUFBQUEsV0FBVyxFQUFDLGFBQWE7RUFDekJDLElBQUFBLEtBQUssRUFBRTtLQUNSLENBQ1EsQ0FDWixFQUVBcEMsS0FBSyxpQkFDSkUsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDMkIsc0JBQVMsRUFBQSxJQUFBLGVBQ1I1QixzQkFBQSxDQUFBQyxhQUFBLENBQUM0QixrQkFBSyxFQUFBLElBQUEsRUFBQyxVQUFlLENBQUMsZUFDdkI3QixzQkFBQSxDQUFBQyxhQUFBLENBQUM2QixrQkFBSyxFQUFBO0VBQ0pDLElBQUFBLEtBQUssRUFBRXJCLElBQUksQ0FBQ2hDLFFBQVEsSUFBSSxFQUFHO0VBQzNCbkIsSUFBQUEsUUFBUSxFQUFHYSxDQUFDLElBQUt1QixnQkFBZ0IsQ0FBQ0gsS0FBSyxFQUFFLFVBQVUsRUFBRXBCLENBQUMsQ0FBQzRELE1BQU0sQ0FBQ0QsS0FBSyxDQUFFO0VBQ3JFRSxJQUFBQSxXQUFXLEVBQUMsZ0JBQWdCO0VBQzVCQyxJQUFBQSxLQUFLLEVBQUU7S0FDUixDQUNRLENBQ1osZUFFRGxDLHNCQUFBLENBQUFDLGFBQUEsQ0FBQzJCLHNCQUFTLEVBQUEsSUFBQSxlQUNSNUIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDNEIsa0JBQUssUUFBQyxhQUFrQixDQUFDLGVBQzFCN0Isc0JBQUEsQ0FBQUMsYUFBQSxDQUFDa0MscUJBQVEsRUFBQTtFQUNQSixJQUFBQSxLQUFLLEVBQUVyQixJQUFJLENBQUMvQixXQUFXLElBQUksRUFBRztFQUM5QnBCLElBQUFBLFFBQVEsRUFBR2EsQ0FBQyxJQUFLdUIsZ0JBQWdCLENBQUNILEtBQUssRUFBRSxhQUFhLEVBQUVwQixDQUFDLENBQUM0RCxNQUFNLENBQUNELEtBQUssQ0FBRTtFQUN4RUUsSUFBQUEsV0FBVyxFQUFDLG1CQUFtQjtFQUMvQkMsSUFBQUEsS0FBSyxFQUFFLENBQUU7RUFDVEUsSUFBQUEsSUFBSSxFQUFFO0tBQ1AsQ0FDUSxDQUNSLENBQ04sQ0FDRSxDQUFDLGVBRU5wQyxzQkFBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUE7RUFBQ0ssSUFBQUEsRUFBRSxFQUFDLElBQUk7TUFBQzhCLElBQUksRUFBQSxJQUFBO0VBQUNDLElBQUFBLGFBQWEsRUFBQyxLQUFLO0VBQUNDLElBQUFBLGNBQWMsRUFBQyxRQUFRO0VBQUNwQixJQUFBQSxFQUFFLEVBQUVwQixRQUFRLEdBQUcsSUFBSSxHQUFHO0VBQU8sR0FBQSxlQUN6RkMsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDcUIsbUJBQU0sRUFBQTtFQUNMQyxJQUFBQSxJQUFJLEVBQUMsUUFBUTtFQUNiRSxJQUFBQSxPQUFPLEVBQUVyQyxPQUFRO0VBQ2pCZSxJQUFBQSxPQUFPLEVBQUMsU0FBUztFQUNqQkcsSUFBQUEsWUFBWSxFQUFDLE1BQU07RUFDbkJrQyxJQUFBQSxPQUFPLEVBQUMsTUFBTTtFQUNkQyxJQUFBQSxVQUFVLEVBQUMsUUFBUTtFQUNuQkMsSUFBQUEsRUFBRSxFQUFDO0VBQUksR0FBQSxlQUVQMUMsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDeUIsaUJBQUksRUFBQTtFQUFDQyxJQUFBQSxJQUFJLEVBQUMsTUFBTTtFQUFDZSxJQUFBQSxFQUFFLEVBQUM7RUFBSSxHQUFFLENBQUMsRUFDM0I1QyxLQUFLLEdBQUcsZUFBZSxHQUFHLHVCQUNyQixDQUFDLEVBRVJBLEtBQUssaUJBQ0pFLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ3FCLG1CQUFNLEVBQUE7RUFDTEMsSUFBQUEsSUFBSSxFQUFDLFFBQVE7RUFDYkUsSUFBQUEsT0FBTyxFQUFFbkMsZUFBZ0I7RUFDekJhLElBQUFBLE9BQU8sRUFBQyxTQUFTO0VBQ2pCRyxJQUFBQSxZQUFZLEVBQUMsTUFBTTtFQUNuQmtDLElBQUFBLE9BQU8sRUFBQyxNQUFNO0VBQ2RDLElBQUFBLFVBQVUsRUFBQztFQUFRLEdBQUEsZUFFbkJ6QyxzQkFBQSxDQUFBQyxhQUFBLENBQUN5QixpQkFBSSxFQUFBO0VBQUNDLElBQUFBLElBQUksRUFBQyxNQUFNO0VBQUNlLElBQUFBLEVBQUUsRUFBQztFQUFJLEdBQUUsQ0FBQyxFQUFBLFlBQ3RCLENBRVAsQ0FDRixDQUFDO0VBRVYsQ0FBQzs7RUMzTUQsTUFBTUMsYUFBMEMsR0FBSXZGLEtBQUssSUFBSztJQUM1RCxNQUFNO01BQUVDLFFBQVE7TUFBRUMsTUFBTTtFQUFFQyxJQUFBQTtFQUFTLEdBQUMsR0FBR0gsS0FBSztFQUM1QyxFQUFBLE1BQU0sQ0FBQ3dGLE9BQU8sRUFBRUMsVUFBVSxDQUFDLEdBQUc3RCxjQUFRLENBQWdCMUIsTUFBTSxDQUFDSyxNQUFNLENBQUNOLFFBQVEsQ0FBQ1EsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDO0lBRTNGLE1BQU1pRixnQkFBMkMsR0FBSUMsS0FBSyxJQUFLO0VBQzdELElBQUEsTUFBTUMsSUFBSSxHQUFHRCxLQUFLLENBQUMsQ0FBQyxDQUFDO0VBQ3JCLElBQUEsSUFBSUMsSUFBSSxFQUFFO0VBQ1IsTUFBQSxNQUFNQyxNQUFNLEdBQUcsSUFBSUMsVUFBVSxFQUFFO1FBQy9CRCxNQUFNLENBQUNFLFNBQVMsR0FBRyxNQUFNO0VBQ3ZCLFFBQUEsTUFBTUMsWUFBWSxHQUFHSCxNQUFNLENBQUNJLE1BQWdCO1VBQzVDUixVQUFVLENBQUNPLFlBQVksQ0FBQztFQUN4QjdGLFFBQUFBLFFBQVEsQ0FBQ0YsUUFBUSxDQUFDUSxJQUFJLEVBQUV1RixZQUFZLENBQUM7UUFDdkMsQ0FBQztFQUNESCxNQUFBQSxNQUFNLENBQUNLLGFBQWEsQ0FBQ04sSUFBSSxDQUFDO0VBQzVCLElBQUE7SUFDRixDQUFDO0lBRUQsTUFBTU8sV0FBVyxHQUFHQSxNQUFNO01BQ3hCVixVQUFVLENBQUMsSUFBSSxDQUFDO0VBQ2hCdEYsSUFBQUEsUUFBUSxDQUFDRixRQUFRLENBQUNRLElBQUksRUFBRSxFQUFFLENBQUM7SUFDN0IsQ0FBQztFQUVELEVBQUEsb0JBQ0VtQyxzQkFBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUE7RUFBQ1MsSUFBQUEsRUFBRSxFQUFDO0VBQUksR0FBQSxlQUNWWCxzQkFBQSxDQUFBQyxhQUFBLENBQUM0QixrQkFBSyxRQUFFeEUsUUFBUSxDQUFDbUcsS0FBYSxDQUFDLEVBQzlCWixPQUFPLGdCQUNONUMsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDQyxnQkFBRyxFQUFBO0VBQUNHLElBQUFBLE1BQU0sRUFBQyxnQkFBZ0I7RUFBQ0QsSUFBQUEsQ0FBQyxFQUFDLElBQUk7RUFBQ0UsSUFBQUEsWUFBWSxFQUFDLElBQUk7RUFBQ1ksSUFBQUEsUUFBUSxFQUFDLFVBQVU7RUFBQ3VDLElBQUFBLFNBQVMsRUFBQztLQUFRLGVBQzFGekQsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUFLeUQsSUFBQUEsR0FBRyxFQUFFZCxPQUFRO0VBQUNlLElBQUFBLEdBQUcsRUFBQyxTQUFTO0VBQUNDLElBQUFBLEtBQUssRUFBRTtFQUFFQyxNQUFBQSxRQUFRLEVBQUUsTUFBTTtFQUFFQyxNQUFBQSxTQUFTLEVBQUUsT0FBTztFQUFFeEQsTUFBQUEsWUFBWSxFQUFFO0VBQU07RUFBRSxHQUFFLENBQUMsZUFDekdOLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ0MsZ0JBQUcsRUFBQTtFQUFDSyxJQUFBQSxFQUFFLEVBQUM7RUFBSSxHQUFBLGVBQ1ZQLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ3FCLG1CQUFNLEVBQUE7RUFBQ25CLElBQUFBLE9BQU8sRUFBQyxRQUFRO0VBQUNxQixJQUFBQSxJQUFJLEVBQUMsSUFBSTtFQUFDQyxJQUFBQSxPQUFPLEVBQUU4QixXQUFZO0VBQUNoQyxJQUFBQSxJQUFJLEVBQUM7RUFBUSxHQUFBLGVBQ3BFdkIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDeUIsaUJBQUksRUFBQTtFQUFDQyxJQUFBQSxJQUFJLEVBQUMsT0FBTztFQUFDZSxJQUFBQSxFQUFFLEVBQUM7S0FBTSxDQUFDLEVBQUEsZUFDdkIsQ0FDTCxDQUNGLENBQUMsZ0JBRU4xQyxzQkFBQSxDQUFBQyxhQUFBLENBQUM4RCxxQkFBUSxFQUFBO0VBQUN4RyxJQUFBQSxRQUFRLEVBQUV1RixnQkFBaUI7RUFBQ2tCLElBQUFBLFFBQVEsRUFBRTtFQUFFQyxNQUFBQSxPQUFPLEVBQUUsT0FBTztRQUFFQyxTQUFTLEVBQUUsQ0FBQyxXQUFXLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZO0VBQUU7RUFBRSxHQUFFLENBQzNJLGVBQ0RsRSxzQkFBQSxDQUFBQyxhQUFBLENBQUNhLGlCQUFJLEVBQUE7RUFBQ1gsSUFBQUEsT0FBTyxFQUFDLElBQUk7RUFBQ2EsSUFBQUEsS0FBSyxFQUFDLFFBQVE7RUFBQ1QsSUFBQUEsRUFBRSxFQUFDO0tBQUksRUFBQyw4RkFFcEMsQ0FDSCxDQUFDO0VBRVYsQ0FBQzs7RUMxQ0QsTUFBTTRELG1CQUFnRCxHQUFJL0csS0FBSyxJQUFLO0lBQ2xFLE1BQU07TUFBRUMsUUFBUTtNQUFFQyxNQUFNO01BQUVDLFFBQVE7RUFBRTZHLElBQUFBO0VBQU0sR0FBQyxHQUFHaEgsS0FBSztFQUNuRCxFQUFBLE1BQU1pSCxNQUFNLEdBQUdELEtBQUssS0FBSyxNQUFNO0VBQy9CLEVBQUEsTUFBTXhHLE1BQU0sR0FBR3dHLEtBQUssS0FBSyxNQUFNO0VBQy9CLEVBQUEsTUFBTUUsR0FBRyxHQUFHLElBQUlDLGlCQUFTLEVBQUU7O0VBRTNCO0VBQ0EsRUFBQSxJQUFJRixNQUFNLEVBQUU7RUFDVjtNQUNBLE1BQU1HLFNBQVMsR0FBR2xILE1BQU0sQ0FBQ2tILFNBQVMsR0FBR25ILFFBQVEsQ0FBQ1EsSUFBSSxDQUFDO0VBQ25ELElBQUEsSUFBSTJHLFNBQVMsRUFBRTtFQUNiLE1BQUEsTUFBTXhHLEtBQUssR0FBR3lHLEtBQUssQ0FBQ0MsT0FBTyxDQUFDRixTQUFTLENBQUMsR0FBR0EsU0FBUyxHQUFHLENBQUNBLFNBQVMsQ0FBQztFQUNoRSxNQUFBLE1BQU1HLE1BQU0sR0FBRzNHLEtBQUssQ0FBQ3lDLEdBQUcsQ0FBQ0wsQ0FBQyxJQUFJQSxDQUFDLENBQUMzQixLQUFLLElBQUkyQixDQUFDLENBQUN6QyxNQUFNLEVBQUVjLEtBQUssSUFBSTJCLENBQUMsQ0FBQ3dFLEVBQUUsQ0FBQyxDQUFDbkYsTUFBTSxDQUFDb0YsT0FBTyxDQUFDLENBQUNDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDNUYsSUFBSUgsTUFBTSxFQUFFLG9CQUFPM0Usc0JBQUEsQ0FBQUMsYUFBQSxDQUFDYSxpQkFBSSxFQUFBLElBQUEsRUFBRTZELE1BQWEsQ0FBQztFQUMxQyxJQUFBOztFQUVBO01BQ0EsTUFBTUksWUFBc0IsR0FBRyxFQUFFO01BQ2pDQyxNQUFNLENBQUNDLElBQUksQ0FBQzNILE1BQU0sQ0FBQ0ssTUFBTSxDQUFDLENBQUN1SCxPQUFPLENBQUN0RixHQUFHLElBQUk7RUFDeEMsTUFBQSxJQUFJQSxHQUFHLENBQUN1RixVQUFVLENBQUMsQ0FBQSxFQUFHOUgsUUFBUSxDQUFDUSxJQUFJLENBQUEsQ0FBQSxDQUFHLENBQUMsSUFBSStCLEdBQUcsQ0FBQ3dGLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtVQUNqRUwsWUFBWSxDQUFDdkcsSUFBSSxDQUFDbEIsTUFBTSxDQUFDSyxNQUFNLENBQUNpQyxHQUFHLENBQUMsQ0FBQztFQUN2QyxNQUFBO0VBQ0YsSUFBQSxDQUFDLENBQUM7RUFDRixJQUFBLElBQUltRixZQUFZLENBQUNsRyxNQUFNLEdBQUcsQ0FBQyxFQUFFLG9CQUFPbUIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDYSxpQkFBSSxRQUFFaUUsWUFBWSxDQUFDRCxJQUFJLENBQUMsSUFBSSxDQUFRLENBQUM7RUFFMUUsSUFBQSxvQkFBTzlFLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ2EsaUJBQUksRUFBQSxJQUFBLEVBQUMsR0FBTyxDQUFDO0VBQ3ZCLEVBQUE7O0VBRUE7SUFDQSxNQUFNLENBQUN1RSxlQUFlLEVBQUVDLGtCQUFrQixDQUFDLEdBQUd0RyxjQUFRLENBQVEsRUFBRSxDQUFDO0lBQ2pFLE1BQU0sQ0FBQ3VHLFVBQVUsRUFBRUMsYUFBYSxDQUFDLEdBQUd4RyxjQUFRLENBQVEsRUFBRSxDQUFDO0lBQ3ZELE1BQU0sQ0FBQ3lHLFNBQVMsRUFBRUMsWUFBWSxDQUFDLEdBQUcxRyxjQUFRLENBQUMsSUFBSSxDQUFDO0VBRWhEQyxFQUFBQSxlQUFTLENBQUMsTUFBTTtFQUNkLElBQUEsTUFBTTBHLGNBQWMsR0FBRyxZQUFZO1FBQ2pDLElBQUk7RUFDRixRQUFBLE1BQU1DLFFBQVEsR0FBRyxNQUFNdEIsR0FBRyxDQUFDdUIsYUFBYSxDQUFDO0VBQ3ZDQyxVQUFBQSxVQUFVLEVBQUUsa0JBQWtCO0VBQzlCQyxVQUFBQSxLQUFLLEVBQUU7RUFDVCxTQUFDLENBQUM7RUFFRixRQUFBLE1BQU1DLE9BQU8sR0FBR0osUUFBUSxDQUFDbkYsR0FBRyxDQUFDd0YsQ0FBQyxLQUFLO1lBQ2pDbEUsS0FBSyxFQUFFa0UsQ0FBQyxDQUFDckIsRUFBRTtZQUNYcEIsS0FBSyxFQUFFeUMsQ0FBQyxDQUFDeEg7RUFDWCxTQUFDLENBQUMsQ0FBQztVQUVIK0csYUFBYSxDQUFDUSxPQUFPLENBQUM7O0VBRXRCO1VBQ0EsTUFBTUUsVUFBb0IsR0FBRyxFQUFFO1VBQy9CbEIsTUFBTSxDQUFDQyxJQUFJLENBQUMzSCxNQUFNLENBQUNLLE1BQU0sQ0FBQyxDQUFDdUgsT0FBTyxDQUFDdEYsR0FBRyxJQUFJO1lBQ3hDLElBQUlBLEdBQUcsQ0FBQ3VGLFVBQVUsQ0FBQyxDQUFBLEVBQUc5SCxRQUFRLENBQUNRLElBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQyxFQUFFO0VBQ3ZDLFlBQUEsTUFBTWdDLEdBQUcsR0FBR3ZDLE1BQU0sQ0FBQ0ssTUFBTSxDQUFDaUMsR0FBRyxDQUFDO2NBQzlCLElBQUlDLEdBQUcsRUFBRXFHLFVBQVUsQ0FBQzFILElBQUksQ0FBQ3FCLEdBQUcsQ0FBQ3NHLFFBQVEsRUFBRSxDQUFDO0VBQzFDLFVBQUE7RUFDRixRQUFBLENBQUMsQ0FBQztVQUVGLE1BQU1DLFFBQVEsR0FBRzlJLE1BQU0sQ0FBQ0ssTUFBTSxDQUFDTixRQUFRLENBQUNRLElBQUksQ0FBQztFQUM3QyxRQUFBLElBQUk0RyxLQUFLLENBQUNDLE9BQU8sQ0FBQzBCLFFBQVEsQ0FBQyxFQUFFO0VBQ3pCQSxVQUFBQSxRQUFRLENBQUNsQixPQUFPLENBQUNtQixDQUFDLElBQUlILFVBQVUsQ0FBQzFILElBQUksQ0FBQzZILENBQUMsQ0FBQ0YsUUFBUSxFQUFFLENBQUMsQ0FBQztFQUN4RCxRQUFBO1VBRUEsTUFBTUcsUUFBUSxHQUFHTixPQUFPLENBQUN2RyxNQUFNLENBQUM4RyxHQUFHLElBQUlMLFVBQVUsQ0FBQ00sUUFBUSxDQUFDRCxHQUFHLENBQUN4RSxLQUFLLENBQUNvRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1VBQ2pGYixrQkFBa0IsQ0FBQ2dCLFFBQVEsQ0FBQztVQUM1QlosWUFBWSxDQUFDLEtBQUssQ0FBQztRQUNyQixDQUFDLENBQUMsT0FBT2UsS0FBSyxFQUFFO0VBQ2RDLFFBQUFBLE9BQU8sQ0FBQ0QsS0FBSyxDQUFDLDRCQUE0QixFQUFFQSxLQUFLLENBQUM7VUFDbERmLFlBQVksQ0FBQyxLQUFLLENBQUM7RUFDckIsTUFBQTtNQUNGLENBQUM7RUFFREMsSUFBQUEsY0FBYyxFQUFFO0VBQ2xCLEVBQUEsQ0FBQyxFQUFFLENBQUNySSxNQUFNLENBQUNzSCxFQUFFLEVBQUV0SCxNQUFNLENBQUNLLE1BQU0sQ0FBQyxDQUFDLENBQUM7O0lBRS9CLE1BQU1nSixZQUFZLEdBQUlMLFFBQWEsSUFBSztFQUN0QyxJQUFBLE1BQU1NLFVBQVUsR0FBR04sUUFBUSxHQUFJN0IsS0FBSyxDQUFDQyxPQUFPLENBQUM0QixRQUFRLENBQUMsR0FBR0EsUUFBUSxHQUFHLENBQUNBLFFBQVEsQ0FBQyxHQUFJLEVBQUU7TUFDcEZoQixrQkFBa0IsQ0FBQ3NCLFVBQVUsQ0FBQztNQUM5QixNQUFNQyxHQUFHLEdBQUdELFVBQVUsQ0FBQ25HLEdBQUcsQ0FBQzhGLEdBQUcsSUFBSUEsR0FBRyxDQUFDeEUsS0FBSyxDQUFDO0VBQzVDeEUsSUFBQUEsUUFBUSxDQUFDRixRQUFRLENBQUNRLElBQUksRUFBRWdKLEdBQUcsQ0FBQztJQUM5QixDQUFDO0VBRUQsRUFBQSxJQUFJakosTUFBTSxFQUFFO01BQ1Ysb0JBQ0VvQyxzQkFBQSxDQUFBQyxhQUFBLENBQUMyQixzQkFBUyxFQUFBLElBQUEsZUFDUjVCLHNCQUFBLENBQUFDLGFBQUEsQ0FBQzRCLGtCQUFLLEVBQUEsSUFBQSxFQUFFeEUsUUFBUSxDQUFDbUcsS0FBYSxDQUFDLGVBQy9CeEQsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDQyxnQkFBRyxFQUFBO0VBQUNDLE1BQUFBLE9BQU8sRUFBQyxPQUFPO0VBQUNDLE1BQUFBLENBQUMsRUFBQyxJQUFJO0VBQUNDLE1BQUFBLE1BQU0sRUFBQyxnQkFBZ0I7RUFBQ0MsTUFBQUEsWUFBWSxFQUFDO09BQUksRUFDbEUrRSxlQUFlLENBQUN4RyxNQUFNLEdBQUcsQ0FBQyxnQkFDekJtQixzQkFBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUE7UUFBQ21DLElBQUksRUFBQSxJQUFBO0VBQUNDLE1BQUFBLGFBQWEsRUFBQyxLQUFLO0VBQUN3RSxNQUFBQSxRQUFRLEVBQUM7T0FBTSxFQUMxQ3pCLGVBQWUsQ0FBQzVFLEdBQUcsQ0FBQzhGLEdBQUcsaUJBQ3RCdkcsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDQyxnQkFBRyxFQUFBO1FBQUNOLEdBQUcsRUFBRTJHLEdBQUcsQ0FBQ3hFLEtBQU07RUFBQ2dGLE1BQUFBLEVBQUUsRUFBQyxZQUFZO0VBQUMvRixNQUFBQSxLQUFLLEVBQUMsT0FBTztFQUFDZ0csTUFBQUEsRUFBRSxFQUFDLElBQUk7RUFBQ0MsTUFBQUEsRUFBRSxFQUFDLElBQUk7RUFBQ3ZFLE1BQUFBLEVBQUUsRUFBQyxJQUFJO0VBQUMvQixNQUFBQSxFQUFFLEVBQUMsSUFBSTtFQUFDTCxNQUFBQSxZQUFZLEVBQUM7T0FBSSxFQUNqR2lHLEdBQUcsQ0FBQy9DLEtBQ0YsQ0FDTixDQUNFLENBQUMsZ0JBRU54RCxzQkFBQSxDQUFBQyxhQUFBLENBQUNhLGlCQUFJLEVBQUE7RUFBQ0UsTUFBQUEsS0FBSyxFQUFDO09BQVEsRUFBQyx3QkFBNEIsQ0FFaEQsQ0FDSSxDQUFDO0VBRWhCLEVBQUE7RUFFQSxFQUFBLG9CQUNFaEIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDQyxnQkFBRyxFQUFBO0VBQUNTLElBQUFBLEVBQUUsRUFBQztLQUFJLGVBQ1ZYLHNCQUFBLENBQUFDLGFBQUEsQ0FBQzJCLHNCQUFTLEVBQUEsSUFBQSxlQUNSNUIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDNEIsa0JBQUssRUFBQSxJQUFBLEVBQUV4RSxRQUFRLENBQUNtRyxLQUFhLENBQUMsZUFDL0J4RCxzQkFBQSxDQUFBQyxhQUFBLENBQUNpSCxtQkFBTSxFQUFBO01BQ0xDLE9BQU8sRUFBQSxJQUFBO0VBQ1AxQixJQUFBQSxTQUFTLEVBQUVBLFNBQVU7RUFDckIxRCxJQUFBQSxLQUFLLEVBQUVzRCxlQUFnQjtFQUN2QlcsSUFBQUEsT0FBTyxFQUFFVCxVQUFXO0VBQ3BCaEksSUFBQUEsUUFBUSxFQUFFb0osWUFBYTtFQUN2QjFFLElBQUFBLFdBQVcsRUFBQztFQUFzQixHQUNuQyxDQUFDLGVBQ0ZqQyxzQkFBQSxDQUFBQyxhQUFBLENBQUNhLGlCQUFJLEVBQUE7RUFBQ1gsSUFBQUEsT0FBTyxFQUFDLElBQUk7RUFBQ2EsSUFBQUEsS0FBSyxFQUFDLFFBQVE7RUFBQ1QsSUFBQUEsRUFBRSxFQUFDO0tBQUksRUFBQyxtREFFcEMsQ0FDRyxDQUNSLENBQUM7RUFFVixDQUFDOztFQzVIRDZHLE9BQU8sQ0FBQ0MsY0FBYyxHQUFHLEVBQUU7RUFFM0JELE9BQU8sQ0FBQ0MsY0FBYyxDQUFDbEssVUFBVSxHQUFHQSxVQUFVO0VBRTlDaUssT0FBTyxDQUFDQyxjQUFjLENBQUMxRSxhQUFhLEdBQUdBLGFBQWE7RUFFcER5RSxPQUFPLENBQUNDLGNBQWMsQ0FBQ2xELG1CQUFtQixHQUFHQSxtQkFBbUI7Ozs7OzsifQ==

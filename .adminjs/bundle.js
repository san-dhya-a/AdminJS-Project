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
      onChange,
      where
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

    // List View (Thumbnail)
    if (where === 'list') {
      const imgUrl = record.params[property.name];
      if (imgUrl) {
        return /*#__PURE__*/React__default.default.createElement("img", {
          src: imgUrl,
          alt: "Thumbnail",
          style: {
            width: '40px',
            height: '40px',
            objectFit: 'cover',
            borderRadius: '4px',
            border: '1px solid #ddd'
          }
        });
      }
      return /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        color: "grey40"
      }, "-");
    }

    // Show View
    if (where === 'show') {
      const imgUrl = record.params[property.name];
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, property.label), imgUrl ? /*#__PURE__*/React__default.default.createElement("img", {
        src: imgUrl,
        alt: "Preview",
        style: {
          maxWidth: '300px',
          borderRadius: '4px',
          border: '1px solid #ddd'
        }
      }) : /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        color: "grey40"
      }, "No image uploaded"));
    }

    // Edit/Create View
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
    }, "Select an image. Base64 format will be stored in the database."));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9GQVFCdWlsZGVyLnRzeCIsIi4uL3NyYy9hZG1pbi9jb21wb25lbnRzL0ltYWdlVXBsb2FkZXIudHN4IiwiLi4vc3JjL2FkbWluL2NvbXBvbmVudHMvQ2F0ZWdvcnlNdWx0aVNlbGVjdC50c3giLCJlbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJveCwgQnV0dG9uLCBGb3JtR3JvdXAsIElucHV0LCBMYWJlbCwgVGV4dEFyZWEsIEljb24sIFRleHQgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IEJhc2VQcm9wZXJ0eVByb3BzIH0gZnJvbSAnYWRtaW5qcyc7XG5cbmNvbnN0IEZBUUJ1aWxkZXI6IFJlYWN0LkZDPEJhc2VQcm9wZXJ0eVByb3BzPiA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IHByb3BlcnR5LCByZWNvcmQsIG9uQ2hhbmdlLCByZXNvdXJjZSB9ID0gcHJvcHM7XG4gIGNvbnN0IGFjdGlvbiA9IChwcm9wcyBhcyBhbnkpLmFjdGlvbjtcbiAgY29uc3QgcGFnZVR5cGUgPSByZWNvcmQucGFyYW1zLnBhZ2VUeXBlIHx8ICdmYXEnO1xuICBcbiAgLy8gRGV0ZWN0IGlmIHdlIGFyZSBpbiBcIlNob3dcIiAocmVhZC1vbmx5KSBtb2RlXG4gIGNvbnN0IGlzU2hvdyA9IGFjdGlvbj8ubmFtZSA9PT0gJ3Nob3cnIHx8ICFvbkNoYW5nZTtcblxuICAvLyBGdW5jdGlvbiB0byByb2J1c3RseSBleHRyYWN0IGRhdGEgZnJvbSByZWNvcmQucGFyYW1zIChoYW5kbGVzIGZsYXR0ZW5lZCBrZXlzKVxuICBjb25zdCBnZXRJbml0aWFsRGF0YSA9ICgpID0+IHtcbiAgICAvLyAxLiBUcnkgZGlyZWN0IGFjY2Vzc1xuICAgIGNvbnN0IGRpcmVjdFZhbHVlID0gcmVjb3JkLnBhcmFtc1twcm9wZXJ0eS5uYW1lXTtcbiAgICBpZiAoZGlyZWN0VmFsdWUpIHtcbiAgICAgIGlmICh0eXBlb2YgZGlyZWN0VmFsdWUgPT09ICdvYmplY3QnICYmIGRpcmVjdFZhbHVlLml0ZW1zKSByZXR1cm4gZGlyZWN0VmFsdWU7XG4gICAgICBpZiAodHlwZW9mIGRpcmVjdFZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHBhcnNlZCA9IEpTT04ucGFyc2UoZGlyZWN0VmFsdWUpO1xuICAgICAgICAgIGlmIChwYXJzZWQgJiYgcGFyc2VkLml0ZW1zKSByZXR1cm4gcGFyc2VkO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gRmFsbCB0aHJvdWdoIHRvIGZsYXR0ZW5lZCBjaGVja1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gMi4gVHJ5IGZsYXR0ZW5lZCBhY2Nlc3MgKGUuZy4sIGNvbnRlbnQuaXRlbXMuMC50aXRsZSlcbiAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgIGxldCBpID0gMDtcbiAgICB3aGlsZSAoXG4gICAgICByZWNvcmQucGFyYW1zW2Ake3Byb3BlcnR5Lm5hbWV9Lml0ZW1zLiR7aX0uc3VidGl0bGVgXSAhPT0gdW5kZWZpbmVkIHx8IFxuICAgICAgcmVjb3JkLnBhcmFtc1tgJHtwcm9wZXJ0eS5uYW1lfS5pdGVtcy4ke2l9LnRpdGxlYF0gIT09IHVuZGVmaW5lZCB8fFxuICAgICAgcmVjb3JkLnBhcmFtc1tgJHtwcm9wZXJ0eS5uYW1lfS5pdGVtcy4ke2l9LmRlc2NyaXB0aW9uYF0gIT09IHVuZGVmaW5lZFxuICAgICkge1xuICAgICAgY29uc3Qgc2hvd1RpdGxlVmFsID0gcmVjb3JkLnBhcmFtc1tgJHtwcm9wZXJ0eS5uYW1lfS5pdGVtcy4ke2l9LnNob3dUaXRsZWBdO1xuICAgICAgaXRlbXMucHVzaCh7XG4gICAgICAgIHRpdGxlOiByZWNvcmQucGFyYW1zW2Ake3Byb3BlcnR5Lm5hbWV9Lml0ZW1zLiR7aX0udGl0bGVgXSB8fCAnJyxcbiAgICAgICAgc3VidGl0bGU6IHJlY29yZC5wYXJhbXNbYCR7cHJvcGVydHkubmFtZX0uaXRlbXMuJHtpfS5zdWJ0aXRsZWBdIHx8ICcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogcmVjb3JkLnBhcmFtc1tgJHtwcm9wZXJ0eS5uYW1lfS5pdGVtcy4ke2l9LmRlc2NyaXB0aW9uYF0gfHwgJycsXG4gICAgICAgIHNob3dUaXRsZTogc2hvd1RpdGxlVmFsID09PSB0cnVlIHx8IHNob3dUaXRsZVZhbCA9PT0gJ3RydWUnLFxuICAgICAgfSk7XG4gICAgICBpKys7XG4gICAgfVxuXG4gICAgcmV0dXJuIGl0ZW1zLmxlbmd0aCA+IDAgPyB7IGl0ZW1zIH0gOiB7IGl0ZW1zOiBbXSB9O1xuICB9O1xuXG4gIGNvbnN0IFtkYXRhLCBzZXREYXRhXSA9IHVzZVN0YXRlKGdldEluaXRpYWxEYXRhKCkpO1xuXG4gIC8vIEtlZXAgc3RhdGUgaW4gc3luYyBpZiByZWNvcmQgY2hhbmdlcyAoaW1wb3J0YW50IGZvciBTaG93IHZpZXcgdHJhbnNpdGlvbilcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXREYXRhKGdldEluaXRpYWxEYXRhKCkpO1xuICB9LCBbcmVjb3JkLnBhcmFtc10pO1xuXG4gIGNvbnN0IHVwZGF0ZUNvbnRlbnQgPSAobmV3RGF0YTogYW55KSA9PiB7XG4gICAgc2V0RGF0YShuZXdEYXRhKTtcbiAgICBpZiAob25DaGFuZ2UpIHtcbiAgICAgIG9uQ2hhbmdlKHByb3BlcnR5Lm5hbWUsIG5ld0RhdGEpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBhZGRJdGVtID0gKCkgPT4ge1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gWy4uLihkYXRhLml0ZW1zIHx8IFtdKSwgeyBzdWJ0aXRsZTogJycsIGRlc2NyaXB0aW9uOiAnJywgc2hvd1RpdGxlOiBmYWxzZSB9XTtcbiAgICB1cGRhdGVDb250ZW50KHsgLi4uZGF0YSwgaXRlbXM6IG5ld0l0ZW1zIH0pO1xuICB9O1xuXG4gIGNvbnN0IGFkZFRpdGxlU2VjdGlvbiA9ICgpID0+IHtcbiAgICBjb25zdCBuZXdJdGVtcyA9IFsuLi4oZGF0YS5pdGVtcyB8fCBbXSksIHsgdGl0bGU6ICcnLCBzdWJ0aXRsZTogJycsIGRlc2NyaXB0aW9uOiAnJywgc2hvd1RpdGxlOiB0cnVlIH1dO1xuICAgIHVwZGF0ZUNvbnRlbnQoeyAuLi5kYXRhLCBpdGVtczogbmV3SXRlbXMgfSk7XG4gIH07XG5cbiAgY29uc3QgcmVtb3ZlSXRlbSA9IChpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgbmV3SXRlbXMgPSBkYXRhLml0ZW1zLmZpbHRlcigoXywgaTogbnVtYmVyKSA9PiBpICE9PSBpbmRleCk7XG4gICAgdXBkYXRlQ29udGVudCh7IC4uLmRhdGEsIGl0ZW1zOiBuZXdJdGVtcyB9KTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVJdGVtQ2hhbmdlID0gKGluZGV4OiBudW1iZXIsIGtleTogc3RyaW5nLCB2YWw6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gWy4uLmRhdGEuaXRlbXNdO1xuICAgIG5ld0l0ZW1zW2luZGV4XSA9IHsgLi4ubmV3SXRlbXNbaW5kZXhdLCBba2V5XTogdmFsIH07XG4gICAgdXBkYXRlQ29udGVudCh7IC4uLmRhdGEsIGl0ZW1zOiBuZXdJdGVtcyB9KTtcbiAgfTtcblxuICBjb25zdCBpc0ZBUSA9IHBhZ2VUeXBlID09PSAnZmFxJztcbiAgY29uc3QgaGFzSXRlbXMgPSBkYXRhLml0ZW1zICYmIGRhdGEuaXRlbXMubGVuZ3RoID4gMDtcblxuICBpZiAoIXJlY29yZC5wYXJhbXMucGFnZVR5cGUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmIChpc1Nob3cpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPEJveCB2YXJpYW50PVwid2hpdGVcIiBwPVwieHhsXCIgYm9yZGVyPVwiMXB4IHNvbGlkICNkZGRcIiBib3JkZXJSYWRpdXM9XCJsZ1wiIG10PVwieGxcIiBib3hTaGFkb3c9XCJjYXJkXCI+XG4gICAgICAgIHtoYXNJdGVtcyA/IChcbiAgICAgICAgICA8Qm94PlxuICAgICAgICAgICAge2RhdGEuaXRlbXMubWFwKChpdGVtOiBhbnksIGluZGV4OiBudW1iZXIpID0+IChcbiAgICAgICAgICAgICAgPEJveCBrZXk9e2luZGV4fSBtYj1cInhsXCIgcGI9XCJsZ1wiIGJvcmRlckJvdHRvbT17aW5kZXggPCBkYXRhLml0ZW1zLmxlbmd0aCAtIDEgPyBcIjFweCBzb2xpZCAjZWVlXCIgOiBcIm5vbmVcIn0+XG4gICAgICAgICAgICAgICAgeyghaXNGQVEgfHwgaW5kZXggPT09IDAgfHwgaXRlbS5zaG93VGl0bGUpICYmIGl0ZW0udGl0bGUgJiYgKFxuICAgICAgICAgICAgICAgICAgPFRleHQgdmFyaWFudD1cImxnXCIgZm9udFdlaWdodD1cImJvbGRcIiBtYj1cInNtXCIgY29sb3I9XCJwcmltYXJ5MTAwXCI+XG4gICAgICAgICAgICAgICAgICAgIHtpdGVtLnRpdGxlfVxuICAgICAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAge2lzRkFRICYmIGl0ZW0uc3VidGl0bGUgJiYgKFxuICAgICAgICAgICAgICAgICAgPFRleHQgdmFyaWFudD1cIm1kXCIgZm9udFdlaWdodD1cInNlbWlib2xkXCIgbWI9XCJ4c1wiIGNvbG9yPVwiZ3JleTgwXCI+XG4gICAgICAgICAgICAgICAgICAgIHtpdGVtLnN1YnRpdGxlfVxuICAgICAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAge2l0ZW0uZGVzY3JpcHRpb24gJiYgKFxuICAgICAgICAgICAgICAgICAgPFRleHQgdmFyaWFudD1cInNtXCIgY29sb3I9XCJncmV5NjBcIj5cbiAgICAgICAgICAgICAgICAgICAge2l0ZW0uZGVzY3JpcHRpb259XG4gICAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8VGV4dCBpdGFsaWMgY29sb3I9XCJncmV5NDBcIj5ObyBlbnRyaWVzIGFkZGVkIHlldC48L1RleHQ+XG4gICAgICAgICl9XG4gICAgICA8L0JveD5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94IHZhcmlhbnQ9XCJ3aGl0ZVwiIHA9XCJ4eGxcIiBib3JkZXI9XCIxcHggc29saWQgI2RkZFwiIGJvcmRlclJhZGl1cz1cImxnXCIgbXQ9XCJ4bFwiIGJveFNoYWRvdz1cImNhcmRcIj5cbiAgICAgIDxCb3ggbXQ9XCJsZ1wiPlxuICAgICAgICB7ZGF0YS5pdGVtcyAmJiBkYXRhLml0ZW1zLm1hcCgoaXRlbTogYW55LCBpbmRleDogbnVtYmVyKSA9PiAoXG4gICAgICAgICAgPEJveCBrZXk9e2luZGV4fSBtYj1cInhsXCIgcG9zaXRpb249XCJyZWxhdGl2ZVwiIHB0PVwibGdcIj5cbiAgICAgICAgICAgIDxCb3ggcG9zaXRpb249XCJhYnNvbHV0ZVwiIHRvcD1cIjEwcHhcIiByaWdodD1cIjBcIj5cbiAgICAgICAgICAgICAgPEJ1dHRvbiBcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCIgXG4gICAgICAgICAgICAgICAgdmFyaWFudD1cImRhbmdlclwiIFxuICAgICAgICAgICAgICAgIHNpemU9XCJpY29uXCIgXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gcmVtb3ZlSXRlbShpbmRleCl9XG4gICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzPVwiZnVsbFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8SWNvbiBpY29uPVwiVHJhc2hcIiAvPlxuICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgXG4gICAgICAgICAgICB7KCFpc0ZBUSB8fCBpbmRleCA9PT0gMCB8fCBpdGVtLnNob3dUaXRsZSkgJiYgKFxuICAgICAgICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgICAgICAgIDxMYWJlbD5UaXRsZTwvTGFiZWw+XG4gICAgICAgICAgICAgICAgPElucHV0XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17aXRlbS50aXRsZSB8fCAnJ31cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gaGFuZGxlSXRlbUNoYW5nZShpbmRleCwgJ3RpdGxlJywgZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciB0aXRsZVwiXG4gICAgICAgICAgICAgICAgICB3aWR0aD17MX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgIHtpc0ZBUSAmJiAoXG4gICAgICAgICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgICAgICAgPExhYmVsPlN1YnRpdGxlPC9MYWJlbD5cbiAgICAgICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtpdGVtLnN1YnRpdGxlIHx8ICcnfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBoYW5kbGVJdGVtQ2hhbmdlKGluZGV4LCAnc3VidGl0bGUnLCBlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIHN1YnRpdGxlXCJcbiAgICAgICAgICAgICAgICAgIHdpZHRoPXsxfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICAgICAgPExhYmVsPkRlc2NyaXB0aW9uPC9MYWJlbD5cbiAgICAgICAgICAgICAgPFRleHRBcmVhXG4gICAgICAgICAgICAgICAgdmFsdWU9e2l0ZW0uZGVzY3JpcHRpb24gfHwgJyd9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBoYW5kbGVJdGVtQ2hhbmdlKGluZGV4LCAnZGVzY3JpcHRpb24nLCBlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBkZXNjcmlwdGlvblwiXG4gICAgICAgICAgICAgICAgd2lkdGg9ezF9XG4gICAgICAgICAgICAgICAgcm93cz17M31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICApKX1cbiAgICAgIDwvQm94PlxuXG4gICAgICA8Qm94IG10PVwieGxcIiBmbGV4IGZsZXhEaXJlY3Rpb249XCJyb3dcIiBqdXN0aWZ5Q29udGVudD1cImNlbnRlclwiIHB0PXtoYXNJdGVtcyA/ICd4bCcgOiAnbm9uZSd9PlxuICAgICAgICA8QnV0dG9uIFxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIiBcbiAgICAgICAgICBvbkNsaWNrPXthZGRJdGVtfSBcbiAgICAgICAgICB2YXJpYW50PVwib3V0bGluZVwiIFxuICAgICAgICAgIGJvcmRlclJhZGl1cz1cImZ1bGxcIlxuICAgICAgICAgIGRpc3BsYXk9XCJmbGV4XCJcbiAgICAgICAgICBhbGlnbkl0ZW1zPVwiY2VudGVyXCJcbiAgICAgICAgICBtcj1cIm1kXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxJY29uIGljb249XCJQbHVzXCIgbXI9XCJ4c1wiIC8+IFxuICAgICAgICAgIHtpc0ZBUSA/ICdBZGQgRkFRIEl0ZW1zJyA6ICdBZGQgUmVndWxhbWVudG8gSXRlbXMnfVxuICAgICAgICA8L0J1dHRvbj5cblxuICAgICAgICB7aXNGQVEgJiYgKFxuICAgICAgICAgIDxCdXR0b24gXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCIgXG4gICAgICAgICAgICBvbkNsaWNrPXthZGRUaXRsZVNlY3Rpb259IFxuICAgICAgICAgICAgdmFyaWFudD1cInByaW1hcnlcIiBcbiAgICAgICAgICAgIGJvcmRlclJhZGl1cz1cImZ1bGxcIlxuICAgICAgICAgICAgZGlzcGxheT1cImZsZXhcIlxuICAgICAgICAgICAgYWxpZ25JdGVtcz1cImNlbnRlclwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPEljb24gaWNvbj1cIlBsdXNcIiBtcj1cInhzXCIgLz4gQWRkIFRpdGxlXG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICl9XG4gICAgICA8L0JveD5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEZBUUJ1aWxkZXI7XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCb3gsIExhYmVsLCBJbnB1dCwgRHJvcFpvbmUsIERyb3Bab25lUHJvcHMsIEJ1dHRvbiwgSWNvbiwgVGV4dCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuaW1wb3J0IHsgQmFzZVByb3BlcnR5UHJvcHMgfSBmcm9tICdhZG1pbmpzJztcblxuY29uc3QgSW1hZ2VVcGxvYWRlcjogUmVhY3QuRkM8QmFzZVByb3BlcnR5UHJvcHM+ID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgcHJvcGVydHksIHJlY29yZCwgb25DaGFuZ2UsIHdoZXJlIH0gPSBwcm9wcztcbiAgY29uc3QgW3ByZXZpZXcsIHNldFByZXZpZXddID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4ocmVjb3JkLnBhcmFtc1twcm9wZXJ0eS5uYW1lXSB8fCBudWxsKTtcblxuICBjb25zdCBoYW5kbGVGaWxlQ2hhbmdlOiBEcm9wWm9uZVByb3BzWydvbkNoYW5nZSddID0gKGZpbGVzKSA9PiB7XG4gICAgY29uc3QgZmlsZSA9IGZpbGVzWzBdO1xuICAgIGlmIChmaWxlKSB7XG4gICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgcmVhZGVyLm9ubG9hZGVuZCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgYmFzZTY0U3RyaW5nID0gcmVhZGVyLnJlc3VsdCBhcyBzdHJpbmc7XG4gICAgICAgIHNldFByZXZpZXcoYmFzZTY0U3RyaW5nKTtcbiAgICAgICAgb25DaGFuZ2UocHJvcGVydHkubmFtZSwgYmFzZTY0U3RyaW5nKTtcbiAgICAgIH07XG4gICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ2xlYXIgPSAoKSA9PiB7XG4gICAgc2V0UHJldmlldyhudWxsKTtcbiAgICBvbkNoYW5nZShwcm9wZXJ0eS5uYW1lLCAnJyk7XG4gIH07XG5cbiAgLy8gTGlzdCBWaWV3IChUaHVtYm5haWwpXG4gIGlmICh3aGVyZSA9PT0gJ2xpc3QnKSB7XG4gICAgY29uc3QgaW1nVXJsID0gcmVjb3JkLnBhcmFtc1twcm9wZXJ0eS5uYW1lXTtcbiAgICBpZiAoaW1nVXJsKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8aW1nIFxuICAgICAgICAgIHNyYz17aW1nVXJsfSBcbiAgICAgICAgICBhbHQ9XCJUaHVtYm5haWxcIiBcbiAgICAgICAgICBzdHlsZT17eyB3aWR0aDogJzQwcHgnLCBoZWlnaHQ6ICc0MHB4Jywgb2JqZWN0Rml0OiAnY292ZXInLCBib3JkZXJSYWRpdXM6ICc0cHgnLCBib3JkZXI6ICcxcHggc29saWQgI2RkZCcgfX0gXG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gPFRleHQgY29sb3I9XCJncmV5NDBcIj4tPC9UZXh0PjtcbiAgfVxuXG4gIC8vIFNob3cgVmlld1xuICBpZiAod2hlcmUgPT09ICdzaG93Jykge1xuICAgICBjb25zdCBpbWdVcmwgPSByZWNvcmQucGFyYW1zW3Byb3BlcnR5Lm5hbWVdO1xuICAgICByZXR1cm4gKFxuICAgICAgIDxCb3g+XG4gICAgICAgICA8TGFiZWw+e3Byb3BlcnR5LmxhYmVsfTwvTGFiZWw+XG4gICAgICAgICB7aW1nVXJsID8gKFxuICAgICAgICAgICA8aW1nIHNyYz17aW1nVXJsfSBhbHQ9XCJQcmV2aWV3XCIgc3R5bGU9e3sgbWF4V2lkdGg6ICczMDBweCcsIGJvcmRlclJhZGl1czogJzRweCcsIGJvcmRlcjogJzFweCBzb2xpZCAjZGRkJyB9fSAvPlxuICAgICAgICAgKSA6IChcbiAgICAgICAgICAgPFRleHQgY29sb3I9XCJncmV5NDBcIj5ObyBpbWFnZSB1cGxvYWRlZDwvVGV4dD5cbiAgICAgICAgICl9XG4gICAgICAgPC9Cb3g+XG4gICAgICk7XG4gIH1cblxuICAvLyBFZGl0L0NyZWF0ZSBWaWV3XG4gIHJldHVybiAoXG4gICAgPEJveCBtYj1cInhsXCI+XG4gICAgICA8TGFiZWw+e3Byb3BlcnR5LmxhYmVsfTwvTGFiZWw+XG4gICAgICB7cHJldmlldyA/IChcbiAgICAgICAgPEJveCBib3JkZXI9XCIxcHggc29saWQgI2RkZFwiIHA9XCJtZFwiIGJvcmRlclJhZGl1cz1cIm1kXCIgcG9zaXRpb249XCJyZWxhdGl2ZVwiIHRleHRBbGlnbj1cImNlbnRlclwiPlxuICAgICAgICAgIDxpbWcgc3JjPXtwcmV2aWV3fSBhbHQ9XCJQcmV2aWV3XCIgc3R5bGU9e3sgbWF4V2lkdGg6ICcxMDAlJywgbWF4SGVpZ2h0OiAnMjAwcHgnLCBib3JkZXJSYWRpdXM6ICc0cHgnIH19IC8+XG4gICAgICAgICAgPEJveCBtdD1cIm1kXCI+XG4gICAgICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJkYW5nZXJcIiBzaXplPVwic21cIiBvbkNsaWNrPXtoYW5kbGVDbGVhcn0gdHlwZT1cImJ1dHRvblwiPlxuICAgICAgICAgICAgICA8SWNvbiBpY29uPVwiVHJhc2hcIiBtcj1cInhzXCIgLz4gUmVtb3ZlIEltYWdlXG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgPC9Cb3g+XG4gICAgICApIDogKFxuICAgICAgICA8RHJvcFpvbmUgb25DaGFuZ2U9e2hhbmRsZUZpbGVDaGFuZ2V9IHZhbGlkYXRlPXt7IG1heFNpemU6IDUwMDAwMDAsIG1pbWVUeXBlczogWydpbWFnZS9wbmcnLCAnaW1hZ2UvanBlZycsICdpbWFnZS9qcGcnLCAnaW1hZ2Uvd2VicCddIH19IC8+XG4gICAgICApfVxuICAgICAgPFRleHQgdmFyaWFudD1cInNtXCIgY29sb3I9XCJncmV5NjBcIiBtdD1cInhzXCI+XG4gICAgICAgIFNlbGVjdCBhbiBpbWFnZS4gQmFzZTY0IGZvcm1hdCB3aWxsIGJlIHN0b3JlZCBpbiB0aGUgZGF0YWJhc2UuXG4gICAgICA8L1RleHQ+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBJbWFnZVVwbG9hZGVyO1xuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCb3gsIEZvcm1Hcm91cCwgTGFiZWwsIFNlbGVjdCwgU2VsZWN0QXN5bmMsIFRleHQgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IEJhc2VQcm9wZXJ0eVByb3BzLCBBcGlDbGllbnQgfSBmcm9tICdhZG1pbmpzJztcblxuY29uc3QgQ2F0ZWdvcnlNdWx0aVNlbGVjdDogUmVhY3QuRkM8QmFzZVByb3BlcnR5UHJvcHM+ID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgcHJvcGVydHksIHJlY29yZCwgb25DaGFuZ2UsIHdoZXJlIH0gPSBwcm9wcztcbiAgY29uc3QgaXNMaXN0ID0gd2hlcmUgPT09ICdsaXN0JztcbiAgY29uc3QgaXNTaG93ID0gd2hlcmUgPT09ICdzaG93JztcbiAgY29uc3QgYXBpID0gbmV3IEFwaUNsaWVudCgpO1xuXG4gIC8vIEZvciBMaXN0IHZpZXcsIGp1c3Qgc2hvdyBjb21tYS1zZXBhcmF0ZWQgbmFtZXNcbiAgaWYgKGlzTGlzdCkge1xuICAgIC8vIDEuIFRyeSB0byBnZXQgdGl0bGVzIGZyb20gcG9wdWxhdGVkIGRhdGEgKGJlc3Qgd2F5KVxuICAgIGNvbnN0IHBvcHVsYXRlZCA9IHJlY29yZC5wb3B1bGF0ZWQ/Lltwcm9wZXJ0eS5uYW1lXTtcbiAgICBpZiAocG9wdWxhdGVkKSB7XG4gICAgICBjb25zdCBpdGVtcyA9IEFycmF5LmlzQXJyYXkocG9wdWxhdGVkKSA/IHBvcHVsYXRlZCA6IFtwb3B1bGF0ZWRdO1xuICAgICAgY29uc3QgdGl0bGVzID0gaXRlbXMubWFwKHAgPT4gcC50aXRsZSB8fCBwLnBhcmFtcz8udGl0bGUgfHwgcC5pZCkuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJywgJyk7XG4gICAgICBpZiAodGl0bGVzKSByZXR1cm4gPFRleHQ+e3RpdGxlc308L1RleHQ+O1xuICAgIH1cbiAgICBcbiAgICAvLyAyLiBGYWxsYmFjazogQ2hlY2sgaWYgbmFtZXMgZXhpc3QgaW4gcGFyYW1zIChzb21ldGltZXMgZmxhdHRlbmVkIGFzIGNhdGVnb3JpZXMuMC50aXRsZSlcbiAgICBjb25zdCBwYXJhbXNUaXRsZXM6IHN0cmluZ1tdID0gW107XG4gICAgT2JqZWN0LmtleXMocmVjb3JkLnBhcmFtcykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKGtleS5zdGFydHNXaXRoKGAke3Byb3BlcnR5Lm5hbWV9LmApICYmIGtleS5lbmRzV2l0aCgnLnRpdGxlJykpIHtcbiAgICAgICAgcGFyYW1zVGl0bGVzLnB1c2gocmVjb3JkLnBhcmFtc1trZXldKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAocGFyYW1zVGl0bGVzLmxlbmd0aCA+IDApIHJldHVybiA8VGV4dD57cGFyYW1zVGl0bGVzLmpvaW4oJywgJyl9PC9UZXh0PjtcblxuICAgIHJldHVybiA8VGV4dD4tPC9UZXh0PjtcbiAgfVxuICBcbiAgLy8gQ3VycmVudCB2YWx1ZXMgYXJlIHVzdWFsbHkgc3RvcmVkIGFzIGNhdGVnb3JpZXMuMCwgY2F0ZWdvcmllcy4xLCBldGMgb3IgYXMgYSByYXcgYXJyYXkgaW4gc29tZSBjb250ZXh0c1xuICBjb25zdCBbc2VsZWN0ZWRPcHRpb25zLCBzZXRTZWxlY3RlZE9wdGlvbnNdID0gdXNlU3RhdGU8YW55W10+KFtdKTtcbiAgY29uc3QgW2FsbE9wdGlvbnMsIHNldEFsbE9wdGlvbnNdID0gdXNlU3RhdGU8YW55W10+KFtdKTtcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgbG9hZENhdGVnb3JpZXMgPSBhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5zZWFyY2hSZWNvcmRzKHtcbiAgICAgICAgICByZXNvdXJjZUlkOiAnTm90aWNpYXNDYXRlZ29yeScsXG4gICAgICAgICAgcXVlcnk6ICcnLFxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSByZXNwb25zZS5tYXAociA9PiAoe1xuICAgICAgICAgIHZhbHVlOiByLmlkLFxuICAgICAgICAgIGxhYmVsOiByLnRpdGxlLFxuICAgICAgICB9KSk7XG4gICAgICAgIFxuICAgICAgICBzZXRBbGxPcHRpb25zKG9wdGlvbnMpO1xuXG4gICAgICAgIC8vIEdldCBjdXJyZW50bHkgc2VsZWN0ZWQgSURzXG4gICAgICAgIGNvbnN0IGN1cnJlbnRJZHM6IHN0cmluZ1tdID0gW107XG4gICAgICAgIE9iamVjdC5rZXlzKHJlY29yZC5wYXJhbXMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoYCR7cHJvcGVydHkubmFtZX0uYCkpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbCA9IHJlY29yZC5wYXJhbXNba2V5XTtcbiAgICAgICAgICAgIGlmICh2YWwpIGN1cnJlbnRJZHMucHVzaCh2YWwudG9TdHJpbmcoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHJhd1ZhbHVlID0gcmVjb3JkLnBhcmFtc1twcm9wZXJ0eS5uYW1lXTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmF3VmFsdWUpKSB7XG4gICAgICAgICAgICByYXdWYWx1ZS5mb3JFYWNoKHYgPT4gY3VycmVudElkcy5wdXNoKHYudG9TdHJpbmcoKSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSBvcHRpb25zLmZpbHRlcihvcHQgPT4gY3VycmVudElkcy5pbmNsdWRlcyhvcHQudmFsdWUudG9TdHJpbmcoKSkpO1xuICAgICAgICBzZXRTZWxlY3RlZE9wdGlvbnMoc2VsZWN0ZWQpO1xuICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGxvYWQgY2F0ZWdvcmllczonLCBlcnJvcik7XG4gICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxvYWRDYXRlZ29yaWVzKCk7XG4gIH0sIFtyZWNvcmQuaWQsIHJlY29yZC5wYXJhbXNdKTsgLy8gVXBkYXRlIG9uIHJlY29yZCBjaGFuZ2VcblxuICBjb25zdCBoYW5kbGVDaGFuZ2UgPSAoc2VsZWN0ZWQ6IGFueSkgPT4ge1xuICAgIGNvbnN0IG5ld09wdGlvbnMgPSBzZWxlY3RlZCA/IChBcnJheS5pc0FycmF5KHNlbGVjdGVkKSA/IHNlbGVjdGVkIDogW3NlbGVjdGVkXSkgOiBbXTtcbiAgICBzZXRTZWxlY3RlZE9wdGlvbnMobmV3T3B0aW9ucyk7XG4gICAgY29uc3QgaWRzID0gbmV3T3B0aW9ucy5tYXAob3B0ID0+IG9wdC52YWx1ZSk7XG4gICAgb25DaGFuZ2UocHJvcGVydHkubmFtZSwgaWRzKTtcbiAgfTtcblxuICBpZiAoaXNTaG93KSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgIDxMYWJlbD57cHJvcGVydHkubGFiZWx9PC9MYWJlbD5cbiAgICAgICAgPEJveCB2YXJpYW50PVwid2hpdGVcIiBwPVwibWRcIiBib3JkZXI9XCIxcHggc29saWQgI2RkZFwiIGJvcmRlclJhZGl1cz1cIm1kXCI+XG4gICAgICAgICAge3NlbGVjdGVkT3B0aW9ucy5sZW5ndGggPiAwID8gKFxuICAgICAgICAgICAgPEJveCBmbGV4IGZsZXhEaXJlY3Rpb249XCJyb3dcIiBmbGV4V3JhcD1cIndyYXBcIj5cbiAgICAgICAgICAgICAge3NlbGVjdGVkT3B0aW9ucy5tYXAob3B0ID0+IChcbiAgICAgICAgICAgICAgICA8Qm94IGtleT17b3B0LnZhbHVlfSBiZz1cInByaW1hcnkxMDBcIiBjb2xvcj1cIndoaXRlXCIgcHg9XCJzbVwiIHB5PVwieHNcIiBtcj1cInhzXCIgbWI9XCJ4c1wiIGJvcmRlclJhZGl1cz1cIm1kXCI+XG4gICAgICAgICAgICAgICAgICB7b3B0LmxhYmVsfVxuICAgICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8VGV4dCBjb2xvcj1cImdyZXk0MFwiPk5vIGNhdGVnb3JpZXMgc2VsZWN0ZWQ8L1RleHQ+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9Cb3g+XG4gICAgICA8L0Zvcm1Hcm91cD5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94IG1iPVwieGxcIj5cbiAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgIDxMYWJlbD57cHJvcGVydHkubGFiZWx9PC9MYWJlbD5cbiAgICAgICAgPFNlbGVjdFxuICAgICAgICAgIGlzTXVsdGlcbiAgICAgICAgICBpc0xvYWRpbmc9e2lzTG9hZGluZ31cbiAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRPcHRpb25zfVxuICAgICAgICAgIG9wdGlvbnM9e2FsbE9wdGlvbnN9XG4gICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlbGVjdCBjYXRlZ29yaWVzLi4uXCJcbiAgICAgICAgLz5cbiAgICAgICAgPFRleHQgdmFyaWFudD1cInNtXCIgY29sb3I9XCJncmV5NjBcIiBtdD1cInhzXCI+XG4gICAgICAgICAgU2VsZWN0IG9uZSBvciBtb3JlIGNhdGVnb3JpZXMgZm9yIHRoaXMgbmV3cyBpdGVtLlxuICAgICAgICA8L1RleHQ+XG4gICAgICA8L0Zvcm1Hcm91cD5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENhdGVnb3J5TXVsdGlTZWxlY3Q7XG4iLCJBZG1pbkpTLlVzZXJDb21wb25lbnRzID0ge31cbmltcG9ydCBGQVFCdWlsZGVyIGZyb20gJy4uL3NyYy9hZG1pbi9jb21wb25lbnRzL0ZBUUJ1aWxkZXInXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkZBUUJ1aWxkZXIgPSBGQVFCdWlsZGVyXG5pbXBvcnQgSW1hZ2VVcGxvYWRlciBmcm9tICcuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9JbWFnZVVwbG9hZGVyJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5JbWFnZVVwbG9hZGVyID0gSW1hZ2VVcGxvYWRlclxuaW1wb3J0IENhdGVnb3J5TXVsdGlTZWxlY3QgZnJvbSAnLi4vc3JjL2FkbWluL2NvbXBvbmVudHMvQ2F0ZWdvcnlNdWx0aVNlbGVjdCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ2F0ZWdvcnlNdWx0aVNlbGVjdCA9IENhdGVnb3J5TXVsdGlTZWxlY3QiXSwibmFtZXMiOlsiRkFRQnVpbGRlciIsInByb3BzIiwicHJvcGVydHkiLCJyZWNvcmQiLCJvbkNoYW5nZSIsInJlc291cmNlIiwiYWN0aW9uIiwicGFnZVR5cGUiLCJwYXJhbXMiLCJpc1Nob3ciLCJuYW1lIiwiZ2V0SW5pdGlhbERhdGEiLCJkaXJlY3RWYWx1ZSIsIml0ZW1zIiwicGFyc2VkIiwiSlNPTiIsInBhcnNlIiwiZSIsImkiLCJ1bmRlZmluZWQiLCJzaG93VGl0bGVWYWwiLCJwdXNoIiwidGl0bGUiLCJzdWJ0aXRsZSIsImRlc2NyaXB0aW9uIiwic2hvd1RpdGxlIiwibGVuZ3RoIiwiZGF0YSIsInNldERhdGEiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsInVwZGF0ZUNvbnRlbnQiLCJuZXdEYXRhIiwiYWRkSXRlbSIsIm5ld0l0ZW1zIiwiYWRkVGl0bGVTZWN0aW9uIiwicmVtb3ZlSXRlbSIsImluZGV4IiwiZmlsdGVyIiwiXyIsImhhbmRsZUl0ZW1DaGFuZ2UiLCJrZXkiLCJ2YWwiLCJpc0ZBUSIsImhhc0l0ZW1zIiwiUmVhY3QiLCJjcmVhdGVFbGVtZW50IiwiQm94IiwidmFyaWFudCIsInAiLCJib3JkZXIiLCJib3JkZXJSYWRpdXMiLCJtdCIsImJveFNoYWRvdyIsIm1hcCIsIml0ZW0iLCJtYiIsInBiIiwiYm9yZGVyQm90dG9tIiwiVGV4dCIsImZvbnRXZWlnaHQiLCJjb2xvciIsIml0YWxpYyIsInBvc2l0aW9uIiwicHQiLCJ0b3AiLCJyaWdodCIsIkJ1dHRvbiIsInR5cGUiLCJzaXplIiwib25DbGljayIsIkljb24iLCJpY29uIiwiRm9ybUdyb3VwIiwiTGFiZWwiLCJJbnB1dCIsInZhbHVlIiwidGFyZ2V0IiwicGxhY2Vob2xkZXIiLCJ3aWR0aCIsIlRleHRBcmVhIiwicm93cyIsImZsZXgiLCJmbGV4RGlyZWN0aW9uIiwianVzdGlmeUNvbnRlbnQiLCJkaXNwbGF5IiwiYWxpZ25JdGVtcyIsIm1yIiwiSW1hZ2VVcGxvYWRlciIsIndoZXJlIiwicHJldmlldyIsInNldFByZXZpZXciLCJoYW5kbGVGaWxlQ2hhbmdlIiwiZmlsZXMiLCJmaWxlIiwicmVhZGVyIiwiRmlsZVJlYWRlciIsIm9ubG9hZGVuZCIsImJhc2U2NFN0cmluZyIsInJlc3VsdCIsInJlYWRBc0RhdGFVUkwiLCJoYW5kbGVDbGVhciIsImltZ1VybCIsInNyYyIsImFsdCIsInN0eWxlIiwiaGVpZ2h0Iiwib2JqZWN0Rml0IiwibGFiZWwiLCJtYXhXaWR0aCIsInRleHRBbGlnbiIsIm1heEhlaWdodCIsIkRyb3Bab25lIiwidmFsaWRhdGUiLCJtYXhTaXplIiwibWltZVR5cGVzIiwiQ2F0ZWdvcnlNdWx0aVNlbGVjdCIsImlzTGlzdCIsImFwaSIsIkFwaUNsaWVudCIsInBvcHVsYXRlZCIsIkFycmF5IiwiaXNBcnJheSIsInRpdGxlcyIsImlkIiwiQm9vbGVhbiIsImpvaW4iLCJwYXJhbXNUaXRsZXMiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsInN0YXJ0c1dpdGgiLCJlbmRzV2l0aCIsInNlbGVjdGVkT3B0aW9ucyIsInNldFNlbGVjdGVkT3B0aW9ucyIsImFsbE9wdGlvbnMiLCJzZXRBbGxPcHRpb25zIiwiaXNMb2FkaW5nIiwic2V0SXNMb2FkaW5nIiwibG9hZENhdGVnb3JpZXMiLCJyZXNwb25zZSIsInNlYXJjaFJlY29yZHMiLCJyZXNvdXJjZUlkIiwicXVlcnkiLCJvcHRpb25zIiwiciIsImN1cnJlbnRJZHMiLCJ0b1N0cmluZyIsInJhd1ZhbHVlIiwidiIsInNlbGVjdGVkIiwib3B0IiwiaW5jbHVkZXMiLCJlcnJvciIsImNvbnNvbGUiLCJoYW5kbGVDaGFuZ2UiLCJuZXdPcHRpb25zIiwiaWRzIiwiZmxleFdyYXAiLCJiZyIsInB4IiwicHkiLCJTZWxlY3QiLCJpc011bHRpIiwiQWRtaW5KUyIsIlVzZXJDb21wb25lbnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBSUEsTUFBTUEsVUFBdUMsR0FBSUMsS0FBSyxJQUFLO0lBQ3pELE1BQU07TUFBRUMsUUFBUTtNQUFFQyxNQUFNO01BQUVDLFFBQVE7RUFBRUMsSUFBQUE7RUFBUyxHQUFDLEdBQUdKLEtBQUs7RUFDdEQsRUFBQSxNQUFNSyxNQUFNLEdBQUlMLEtBQUssQ0FBU0ssTUFBTTtJQUNwQyxNQUFNQyxRQUFRLEdBQUdKLE1BQU0sQ0FBQ0ssTUFBTSxDQUFDRCxRQUFRLElBQUksS0FBSzs7RUFFaEQ7SUFDQSxNQUFNRSxNQUFNLEdBQUdILE1BQU0sRUFBRUksSUFBSSxLQUFLLE1BQU0sSUFBSSxDQUFDTixRQUFROztFQUVuRDtJQUNBLE1BQU1PLGNBQWMsR0FBR0EsTUFBTTtFQUMzQjtNQUNBLE1BQU1DLFdBQVcsR0FBR1Qs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

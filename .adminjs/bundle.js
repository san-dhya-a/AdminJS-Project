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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9GQVFCdWlsZGVyLnRzeCIsIi4uL3NyYy9hZG1pbi9jb21wb25lbnRzL0ltYWdlVXBsb2FkZXIudHN4IiwiLi4vc3JjL2FkbWluL2NvbXBvbmVudHMvQ2F0ZWdvcnlNdWx0aVNlbGVjdC50c3giLCJlbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJveCwgQnV0dG9uLCBGb3JtR3JvdXAsIElucHV0LCBMYWJlbCwgVGV4dEFyZWEsIEljb24sIFRleHQgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IEJhc2VQcm9wZXJ0eVByb3BzIH0gZnJvbSAnYWRtaW5qcyc7XG5cbmNvbnN0IEZBUUJ1aWxkZXI6IFJlYWN0LkZDPEJhc2VQcm9wZXJ0eVByb3BzPiA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IHByb3BlcnR5LCByZWNvcmQsIG9uQ2hhbmdlLCByZXNvdXJjZSB9ID0gcHJvcHM7XG4gIGNvbnN0IGFjdGlvbiA9IChwcm9wcyBhcyBhbnkpLmFjdGlvbjtcbiAgY29uc3QgcGFnZVR5cGUgPSByZWNvcmQucGFyYW1zLnBhZ2VUeXBlIHx8ICdmYXEnO1xuICBcbiAgLy8gRGV0ZWN0IGlmIHdlIGFyZSBpbiBcIlNob3dcIiAocmVhZC1vbmx5KSBtb2RlXG4gIGNvbnN0IGlzU2hvdyA9IGFjdGlvbj8ubmFtZSA9PT0gJ3Nob3cnIHx8ICFvbkNoYW5nZTtcblxuICAvLyBGdW5jdGlvbiB0byByb2J1c3RseSBleHRyYWN0IGRhdGEgZnJvbSByZWNvcmQucGFyYW1zIChoYW5kbGVzIGZsYXR0ZW5lZCBrZXlzKVxuICBjb25zdCBnZXRJbml0aWFsRGF0YSA9ICgpID0+IHtcbiAgICAvLyAxLiBUcnkgZGlyZWN0IGFjY2Vzc1xuICAgIGNvbnN0IGRpcmVjdFZhbHVlID0gcmVjb3JkLnBhcmFtc1twcm9wZXJ0eS5uYW1lXTtcbiAgICBpZiAoZGlyZWN0VmFsdWUpIHtcbiAgICAgIGlmICh0eXBlb2YgZGlyZWN0VmFsdWUgPT09ICdvYmplY3QnICYmIGRpcmVjdFZhbHVlLml0ZW1zKSByZXR1cm4gZGlyZWN0VmFsdWU7XG4gICAgICBpZiAodHlwZW9mIGRpcmVjdFZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHBhcnNlZCA9IEpTT04ucGFyc2UoZGlyZWN0VmFsdWUpO1xuICAgICAgICAgIGlmIChwYXJzZWQgJiYgcGFyc2VkLml0ZW1zKSByZXR1cm4gcGFyc2VkO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gRmFsbCB0aHJvdWdoIHRvIGZsYXR0ZW5lZCBjaGVja1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gMi4gVHJ5IGZsYXR0ZW5lZCBhY2Nlc3MgKGUuZy4sIGNvbnRlbnQuaXRlbXMuMC50aXRsZSlcbiAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgIGxldCBpID0gMDtcbiAgICB3aGlsZSAoXG4gICAgICByZWNvcmQucGFyYW1zW2Ake3Byb3BlcnR5Lm5hbWV9Lml0ZW1zLiR7aX0uc3VidGl0bGVgXSAhPT0gdW5kZWZpbmVkIHx8IFxuICAgICAgcmVjb3JkLnBhcmFtc1tgJHtwcm9wZXJ0eS5uYW1lfS5pdGVtcy4ke2l9LnRpdGxlYF0gIT09IHVuZGVmaW5lZCB8fFxuICAgICAgcmVjb3JkLnBhcmFtc1tgJHtwcm9wZXJ0eS5uYW1lfS5pdGVtcy4ke2l9LmRlc2NyaXB0aW9uYF0gIT09IHVuZGVmaW5lZFxuICAgICkge1xuICAgICAgY29uc3Qgc2hvd1RpdGxlVmFsID0gcmVjb3JkLnBhcmFtc1tgJHtwcm9wZXJ0eS5uYW1lfS5pdGVtcy4ke2l9LnNob3dUaXRsZWBdO1xuICAgICAgaXRlbXMucHVzaCh7XG4gICAgICAgIHRpdGxlOiByZWNvcmQucGFyYW1zW2Ake3Byb3BlcnR5Lm5hbWV9Lml0ZW1zLiR7aX0udGl0bGVgXSB8fCAnJyxcbiAgICAgICAgc3VidGl0bGU6IHJlY29yZC5wYXJhbXNbYCR7cHJvcGVydHkubmFtZX0uaXRlbXMuJHtpfS5zdWJ0aXRsZWBdIHx8ICcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogcmVjb3JkLnBhcmFtc1tgJHtwcm9wZXJ0eS5uYW1lfS5pdGVtcy4ke2l9LmRlc2NyaXB0aW9uYF0gfHwgJycsXG4gICAgICAgIHNob3dUaXRsZTogc2hvd1RpdGxlVmFsID09PSB0cnVlIHx8IHNob3dUaXRsZVZhbCA9PT0gJ3RydWUnLFxuICAgICAgfSk7XG4gICAgICBpKys7XG4gICAgfVxuXG4gICAgcmV0dXJuIGl0ZW1zLmxlbmd0aCA+IDAgPyB7IGl0ZW1zIH0gOiB7IGl0ZW1zOiBbXSB9O1xuICB9O1xuXG4gIGNvbnN0IFtkYXRhLCBzZXREYXRhXSA9IHVzZVN0YXRlKGdldEluaXRpYWxEYXRhKCkpO1xuXG4gIC8vIEtlZXAgc3RhdGUgaW4gc3luYyBpZiByZWNvcmQgY2hhbmdlcyAoaW1wb3J0YW50IGZvciBTaG93IHZpZXcgdHJhbnNpdGlvbilcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXREYXRhKGdldEluaXRpYWxEYXRhKCkpO1xuICB9LCBbcmVjb3JkLnBhcmFtc10pO1xuXG4gIGNvbnN0IHVwZGF0ZUNvbnRlbnQgPSAobmV3RGF0YTogYW55KSA9PiB7XG4gICAgc2V0RGF0YShuZXdEYXRhKTtcbiAgICBpZiAob25DaGFuZ2UpIHtcbiAgICAgIG9uQ2hhbmdlKHByb3BlcnR5Lm5hbWUsIG5ld0RhdGEpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBhZGRJdGVtID0gKCkgPT4ge1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gWy4uLihkYXRhLml0ZW1zIHx8IFtdKSwgeyBzdWJ0aXRsZTogJycsIGRlc2NyaXB0aW9uOiAnJywgc2hvd1RpdGxlOiBmYWxzZSB9XTtcbiAgICB1cGRhdGVDb250ZW50KHsgLi4uZGF0YSwgaXRlbXM6IG5ld0l0ZW1zIH0pO1xuICB9O1xuXG4gIGNvbnN0IGFkZFRpdGxlU2VjdGlvbiA9ICgpID0+IHtcbiAgICBjb25zdCBuZXdJdGVtcyA9IFsuLi4oZGF0YS5pdGVtcyB8fCBbXSksIHsgdGl0bGU6ICcnLCBzdWJ0aXRsZTogJycsIGRlc2NyaXB0aW9uOiAnJywgc2hvd1RpdGxlOiB0cnVlIH1dO1xuICAgIHVwZGF0ZUNvbnRlbnQoeyAuLi5kYXRhLCBpdGVtczogbmV3SXRlbXMgfSk7XG4gIH07XG5cbiAgY29uc3QgcmVtb3ZlSXRlbSA9IChpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgbmV3SXRlbXMgPSBkYXRhLml0ZW1zLmZpbHRlcigoXywgaTogbnVtYmVyKSA9PiBpICE9PSBpbmRleCk7XG4gICAgdXBkYXRlQ29udGVudCh7IC4uLmRhdGEsIGl0ZW1zOiBuZXdJdGVtcyB9KTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVJdGVtQ2hhbmdlID0gKGluZGV4OiBudW1iZXIsIGtleTogc3RyaW5nLCB2YWw6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gWy4uLmRhdGEuaXRlbXNdO1xuICAgIG5ld0l0ZW1zW2luZGV4XSA9IHsgLi4ubmV3SXRlbXNbaW5kZXhdLCBba2V5XTogdmFsIH07XG4gICAgdXBkYXRlQ29udGVudCh7IC4uLmRhdGEsIGl0ZW1zOiBuZXdJdGVtcyB9KTtcbiAgfTtcblxuICBjb25zdCBpc0ZBUSA9IHBhZ2VUeXBlID09PSAnZmFxJztcbiAgY29uc3QgaGFzSXRlbXMgPSBkYXRhLml0ZW1zICYmIGRhdGEuaXRlbXMubGVuZ3RoID4gMDtcblxuICBpZiAoIXJlY29yZC5wYXJhbXMucGFnZVR5cGUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmIChpc1Nob3cpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPEJveCB2YXJpYW50PVwid2hpdGVcIiBwPVwieHhsXCIgYm9yZGVyPVwiMXB4IHNvbGlkICNkZGRcIiBib3JkZXJSYWRpdXM9XCJsZ1wiIG10PVwieGxcIiBib3hTaGFkb3c9XCJjYXJkXCI+XG4gICAgICAgIHtoYXNJdGVtcyA/IChcbiAgICAgICAgICA8Qm94PlxuICAgICAgICAgICAge2RhdGEuaXRlbXMubWFwKChpdGVtOiBhbnksIGluZGV4OiBudW1iZXIpID0+IChcbiAgICAgICAgICAgICAgPEJveCBrZXk9e2luZGV4fSBtYj1cInhsXCIgcGI9XCJsZ1wiIGJvcmRlckJvdHRvbT17aW5kZXggPCBkYXRhLml0ZW1zLmxlbmd0aCAtIDEgPyBcIjFweCBzb2xpZCAjZWVlXCIgOiBcIm5vbmVcIn0+XG4gICAgICAgICAgICAgICAgeyghaXNGQVEgfHwgaW5kZXggPT09IDAgfHwgaXRlbS5zaG93VGl0bGUpICYmIGl0ZW0udGl0bGUgJiYgKFxuICAgICAgICAgICAgICAgICAgPFRleHQgdmFyaWFudD1cImxnXCIgZm9udFdlaWdodD1cImJvbGRcIiBtYj1cInNtXCIgY29sb3I9XCJwcmltYXJ5MTAwXCI+XG4gICAgICAgICAgICAgICAgICAgIHtpdGVtLnRpdGxlfVxuICAgICAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAge2lzRkFRICYmIGl0ZW0uc3VidGl0bGUgJiYgKFxuICAgICAgICAgICAgICAgICAgPFRleHQgdmFyaWFudD1cIm1kXCIgZm9udFdlaWdodD1cInNlbWlib2xkXCIgbWI9XCJ4c1wiIGNvbG9yPVwiZ3JleTgwXCI+XG4gICAgICAgICAgICAgICAgICAgIHtpdGVtLnN1YnRpdGxlfVxuICAgICAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAge2l0ZW0uZGVzY3JpcHRpb24gJiYgKFxuICAgICAgICAgICAgICAgICAgPFRleHQgdmFyaWFudD1cInNtXCIgY29sb3I9XCJncmV5NjBcIj5cbiAgICAgICAgICAgICAgICAgICAge2l0ZW0uZGVzY3JpcHRpb259XG4gICAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8VGV4dCBpdGFsaWMgY29sb3I9XCJncmV5NDBcIj5ObyBlbnRyaWVzIGFkZGVkIHlldC48L1RleHQ+XG4gICAgICAgICl9XG4gICAgICA8L0JveD5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94IHZhcmlhbnQ9XCJ3aGl0ZVwiIHA9XCJ4eGxcIiBib3JkZXI9XCIxcHggc29saWQgI2RkZFwiIGJvcmRlclJhZGl1cz1cImxnXCIgbXQ9XCJ4bFwiIGJveFNoYWRvdz1cImNhcmRcIj5cbiAgICAgIDxCb3ggbXQ9XCJsZ1wiPlxuICAgICAgICB7ZGF0YS5pdGVtcyAmJiBkYXRhLml0ZW1zLm1hcCgoaXRlbTogYW55LCBpbmRleDogbnVtYmVyKSA9PiAoXG4gICAgICAgICAgPEJveCBrZXk9e2luZGV4fSBtYj1cInhsXCIgcG9zaXRpb249XCJyZWxhdGl2ZVwiIHB0PVwibGdcIj5cbiAgICAgICAgICAgIDxCb3ggcG9zaXRpb249XCJhYnNvbHV0ZVwiIHRvcD1cIjEwcHhcIiByaWdodD1cIjBcIj5cbiAgICAgICAgICAgICAgPEJ1dHRvbiBcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCIgXG4gICAgICAgICAgICAgICAgdmFyaWFudD1cImRhbmdlclwiIFxuICAgICAgICAgICAgICAgIHNpemU9XCJpY29uXCIgXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gcmVtb3ZlSXRlbShpbmRleCl9XG4gICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzPVwiZnVsbFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8SWNvbiBpY29uPVwiVHJhc2hcIiAvPlxuICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgXG4gICAgICAgICAgICB7KCFpc0ZBUSB8fCBpbmRleCA9PT0gMCB8fCBpdGVtLnNob3dUaXRsZSkgJiYgKFxuICAgICAgICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgICAgICAgIDxMYWJlbD5UaXRsZTwvTGFiZWw+XG4gICAgICAgICAgICAgICAgPElucHV0XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17aXRlbS50aXRsZSB8fCAnJ31cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gaGFuZGxlSXRlbUNoYW5nZShpbmRleCwgJ3RpdGxlJywgZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciB0aXRsZVwiXG4gICAgICAgICAgICAgICAgICB3aWR0aD17MX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgIHtpc0ZBUSAmJiAoXG4gICAgICAgICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgICAgICAgPExhYmVsPlN1YnRpdGxlPC9MYWJlbD5cbiAgICAgICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtpdGVtLnN1YnRpdGxlIHx8ICcnfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBoYW5kbGVJdGVtQ2hhbmdlKGluZGV4LCAnc3VidGl0bGUnLCBlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIHN1YnRpdGxlXCJcbiAgICAgICAgICAgICAgICAgIHdpZHRoPXsxfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICAgICAgPExhYmVsPkRlc2NyaXB0aW9uPC9MYWJlbD5cbiAgICAgICAgICAgICAgPFRleHRBcmVhXG4gICAgICAgICAgICAgICAgdmFsdWU9e2l0ZW0uZGVzY3JpcHRpb24gfHwgJyd9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBoYW5kbGVJdGVtQ2hhbmdlKGluZGV4LCAnZGVzY3JpcHRpb24nLCBlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBkZXNjcmlwdGlvblwiXG4gICAgICAgICAgICAgICAgd2lkdGg9ezF9XG4gICAgICAgICAgICAgICAgcm93cz17M31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICApKX1cbiAgICAgIDwvQm94PlxuXG4gICAgICA8Qm94IG10PVwieGxcIiBmbGV4IGZsZXhEaXJlY3Rpb249XCJyb3dcIiBqdXN0aWZ5Q29udGVudD1cImNlbnRlclwiIHB0PXtoYXNJdGVtcyA/ICd4bCcgOiAnbm9uZSd9PlxuICAgICAgICA8QnV0dG9uIFxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIiBcbiAgICAgICAgICBvbkNsaWNrPXthZGRJdGVtfSBcbiAgICAgICAgICB2YXJpYW50PVwib3V0bGluZVwiIFxuICAgICAgICAgIGJvcmRlclJhZGl1cz1cImZ1bGxcIlxuICAgICAgICAgIGRpc3BsYXk9XCJmbGV4XCJcbiAgICAgICAgICBhbGlnbkl0ZW1zPVwiY2VudGVyXCJcbiAgICAgICAgICBtcj1cIm1kXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxJY29uIGljb249XCJQbHVzXCIgbXI9XCJ4c1wiIC8+IFxuICAgICAgICAgIHtpc0ZBUSA/ICdBZGQgRkFRIEl0ZW1zJyA6ICdBZGQgUmVndWxhbWVudG8gSXRlbXMnfVxuICAgICAgICA8L0J1dHRvbj5cblxuICAgICAgICB7aXNGQVEgJiYgKFxuICAgICAgICAgIDxCdXR0b24gXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCIgXG4gICAgICAgICAgICBvbkNsaWNrPXthZGRUaXRsZVNlY3Rpb259IFxuICAgICAgICAgICAgdmFyaWFudD1cInByaW1hcnlcIiBcbiAgICAgICAgICAgIGJvcmRlclJhZGl1cz1cImZ1bGxcIlxuICAgICAgICAgICAgZGlzcGxheT1cImZsZXhcIlxuICAgICAgICAgICAgYWxpZ25JdGVtcz1cImNlbnRlclwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPEljb24gaWNvbj1cIlBsdXNcIiBtcj1cInhzXCIgLz4gQWRkIFRpdGxlXG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICl9XG4gICAgICA8L0JveD5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEZBUUJ1aWxkZXI7XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCb3gsIExhYmVsLCBJbnB1dCwgRHJvcFpvbmUsIERyb3Bab25lUHJvcHMsIEJ1dHRvbiwgSWNvbiwgVGV4dCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuaW1wb3J0IHsgQmFzZVByb3BlcnR5UHJvcHMgfSBmcm9tICdhZG1pbmpzJztcblxuY29uc3QgSW1hZ2VVcGxvYWRlcjogUmVhY3QuRkM8QmFzZVByb3BlcnR5UHJvcHM+ID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgcHJvcGVydHksIHJlY29yZCwgb25DaGFuZ2UsIHdoZXJlIH0gPSBwcm9wcztcbiAgY29uc3QgW3ByZXZpZXcsIHNldFByZXZpZXddID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4ocmVjb3JkLnBhcmFtc1twcm9wZXJ0eS5uYW1lXSB8fCBudWxsKTtcblxuICBjb25zdCBoYW5kbGVGaWxlQ2hhbmdlOiBEcm9wWm9uZVByb3BzWydvbkNoYW5nZSddID0gKGZpbGVzKSA9PiB7XG4gICAgY29uc3QgZmlsZSA9IGZpbGVzWzBdO1xuICAgIGlmIChmaWxlKSB7XG4gICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgcmVhZGVyLm9ubG9hZGVuZCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgYmFzZTY0U3RyaW5nID0gcmVhZGVyLnJlc3VsdCBhcyBzdHJpbmc7XG4gICAgICAgIHNldFByZXZpZXcoYmFzZTY0U3RyaW5nKTtcbiAgICAgICAgb25DaGFuZ2UocHJvcGVydHkubmFtZSwgYmFzZTY0U3RyaW5nKTtcbiAgICAgIH07XG4gICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ2xlYXIgPSAoKSA9PiB7XG4gICAgc2V0UHJldmlldyhudWxsKTtcbiAgICBvbkNoYW5nZShwcm9wZXJ0eS5uYW1lLCAnJyk7XG4gIH07XG5cbiAgLy8gTGlzdCBWaWV3IChUaHVtYm5haWwpXG4gIGlmICh3aGVyZSA9PT0gJ2xpc3QnKSB7XG4gICAgY29uc3QgaW1nVXJsID0gcmVjb3JkLnBhcmFtc1twcm9wZXJ0eS5uYW1lXTtcbiAgICBpZiAoaW1nVXJsKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8aW1nIFxuICAgICAgICAgIHNyYz17aW1nVXJsfSBcbiAgICAgICAgICBhbHQ9XCJUaHVtYm5haWxcIiBcbiAgICAgICAgICBzdHlsZT17eyB3aWR0aDogJzQwcHgnLCBoZWlnaHQ6ICc0MHB4Jywgb2JqZWN0Rml0OiAnY292ZXInLCBib3JkZXJSYWRpdXM6ICc0cHgnLCBib3JkZXI6ICcxcHggc29saWQgI2RkZCcgfX0gXG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gPFRleHQgY29sb3I9XCJncmV5NDBcIj4tPC9UZXh0PjtcbiAgfVxuXG4gIC8vIFNob3cgVmlld1xuICBpZiAod2hlcmUgPT09ICdzaG93Jykge1xuICAgICBjb25zdCBpbWdVcmwgPSByZWNvcmQucGFyYW1zW3Byb3BlcnR5Lm5hbWVdO1xuICAgICByZXR1cm4gKFxuICAgICAgIDxCb3g+XG4gICAgICAgICA8TGFiZWw+e3Byb3BlcnR5LmxhYmVsfTwvTGFiZWw+XG4gICAgICAgICB7aW1nVXJsID8gKFxuICAgICAgICAgICA8aW1nIHNyYz17aW1nVXJsfSBhbHQ9XCJQcmV2aWV3XCIgc3R5bGU9e3sgbWF4V2lkdGg6ICczMDBweCcsIGJvcmRlclJhZGl1czogJzRweCcsIGJvcmRlcjogJzFweCBzb2xpZCAjZGRkJyB9fSAvPlxuICAgICAgICAgKSA6IChcbiAgICAgICAgICAgPFRleHQgY29sb3I9XCJncmV5NDBcIj5ObyBpbWFnZSB1cGxvYWRlZDwvVGV4dD5cbiAgICAgICAgICl9XG4gICAgICAgPC9Cb3g+XG4gICAgICk7XG4gIH1cblxuICAvLyBFZGl0L0NyZWF0ZSBWaWV3XG4gIHJldHVybiAoXG4gICAgPEJveCBtYj1cInhsXCI+XG4gICAgICA8TGFiZWw+e3Byb3BlcnR5LmxhYmVsfTwvTGFiZWw+XG4gICAgICB7cHJldmlldyA/IChcbiAgICAgICAgPEJveCBib3JkZXI9XCIxcHggc29saWQgI2RkZFwiIHA9XCJtZFwiIGJvcmRlclJhZGl1cz1cIm1kXCIgcG9zaXRpb249XCJyZWxhdGl2ZVwiIHRleHRBbGlnbj1cImNlbnRlclwiPlxuICAgICAgICAgIDxpbWcgc3JjPXtwcmV2aWV3fSBhbHQ9XCJQcmV2aWV3XCIgc3R5bGU9e3sgbWF4V2lkdGg6ICcxMDAlJywgbWF4SGVpZ2h0OiAnMjAwcHgnLCBib3JkZXJSYWRpdXM6ICc0cHgnIH19IC8+XG4gICAgICAgICAgPEJveCBtdD1cIm1kXCI+XG4gICAgICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJkYW5nZXJcIiBzaXplPVwic21cIiBvbkNsaWNrPXtoYW5kbGVDbGVhcn0gdHlwZT1cImJ1dHRvblwiPlxuICAgICAgICAgICAgICA8SWNvbiBpY29uPVwiVHJhc2hcIiBtcj1cInhzXCIgLz4gUmVtb3ZlIEltYWdlXG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgPC9Cb3g+XG4gICAgICApIDogKFxuICAgICAgICA8RHJvcFpvbmUgb25DaGFuZ2U9e2hhbmRsZUZpbGVDaGFuZ2V9IHZhbGlkYXRlPXt7IG1heFNpemU6IDUwMDAwMDAsIG1pbWVUeXBlczogWydpbWFnZS9wbmcnLCAnaW1hZ2UvanBlZycsICdpbWFnZS9qcGcnLCAnaW1hZ2Uvd2VicCddIH19IC8+XG4gICAgICApfVxuICAgICAgPFRleHQgdmFyaWFudD1cInNtXCIgY29sb3I9XCJncmV5NjBcIiBtdD1cInhzXCI+XG4gICAgICAgIFNlbGVjdCBhbiBpbWFnZS4gQmFzZTY0IGZvcm1hdCB3aWxsIGJlIHN0b3JlZCBpbiB0aGUgZGF0YWJhc2UuXG4gICAgICA8L1RleHQ+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBJbWFnZVVwbG9hZGVyO1xuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEJveCwgRm9ybUdyb3VwLCBMYWJlbCwgU2VsZWN0LCBTZWxlY3RBc3luYywgVGV4dCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xyXG5pbXBvcnQgeyBCYXNlUHJvcGVydHlQcm9wcywgQXBpQ2xpZW50IH0gZnJvbSAnYWRtaW5qcyc7XHJcblxyXG5jb25zdCBDYXRlZ29yeU11bHRpU2VsZWN0OiBSZWFjdC5GQzxCYXNlUHJvcGVydHlQcm9wcz4gPSAocHJvcHMpID0+IHtcclxuICBjb25zdCB7IHByb3BlcnR5LCByZWNvcmQsIG9uQ2hhbmdlLCB3aGVyZSB9ID0gcHJvcHM7XHJcbiAgY29uc3QgaXNMaXN0ID0gd2hlcmUgPT09ICdsaXN0JztcclxuICBjb25zdCBpc1Nob3cgPSB3aGVyZSA9PT0gJ3Nob3cnO1xyXG4gIGNvbnN0IGFwaSA9IG5ldyBBcGlDbGllbnQoKTtcclxuXHJcbiAgLy8gRm9yIExpc3QgdmlldywganVzdCBzaG93IGNvbW1hLXNlcGFyYXRlZCBuYW1lc1xyXG4gIGlmIChpc0xpc3QpIHtcclxuICAgIC8vIDEuIFRyeSB0byBnZXQgdGl0bGVzIGZyb20gcG9wdWxhdGVkIGRhdGEgKGJlc3Qgd2F5KVxyXG4gICAgY29uc3QgcG9wdWxhdGVkID0gcmVjb3JkLnBvcHVsYXRlZD8uW3Byb3BlcnR5Lm5hbWVdO1xyXG4gICAgaWYgKHBvcHVsYXRlZCkge1xyXG4gICAgICBjb25zdCBpdGVtcyA9IEFycmF5LmlzQXJyYXkocG9wdWxhdGVkKSA/IHBvcHVsYXRlZCA6IFtwb3B1bGF0ZWRdO1xyXG4gICAgICBjb25zdCB0aXRsZXMgPSBpdGVtcy5tYXAocCA9PiBwLnRpdGxlIHx8IHAucGFyYW1zPy50aXRsZSB8fCBwLmlkKS5maWx0ZXIoQm9vbGVhbikuam9pbignLCAnKTtcclxuICAgICAgaWYgKHRpdGxlcykgcmV0dXJuIDxUZXh0Pnt0aXRsZXN9PC9UZXh0PjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gMi4gRmFsbGJhY2s6IENoZWNrIGlmIG5hbWVzIGV4aXN0IGluIHBhcmFtcyAoc29tZXRpbWVzIGZsYXR0ZW5lZCBhcyBjYXRlZ29yaWVzLjAudGl0bGUpXHJcbiAgICBjb25zdCBwYXJhbXNUaXRsZXM6IHN0cmluZ1tdID0gW107XHJcbiAgICBPYmplY3Qua2V5cyhyZWNvcmQucGFyYW1zKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgIGlmIChrZXkuc3RhcnRzV2l0aChgJHtwcm9wZXJ0eS5uYW1lfS5gKSAmJiBrZXkuZW5kc1dpdGgoJy50aXRsZScpKSB7XHJcbiAgICAgICAgcGFyYW1zVGl0bGVzLnB1c2gocmVjb3JkLnBhcmFtc1trZXldKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZiAocGFyYW1zVGl0bGVzLmxlbmd0aCA+IDApIHJldHVybiA8VGV4dD57cGFyYW1zVGl0bGVzLmpvaW4oJywgJyl9PC9UZXh0PjtcclxuXHJcbiAgICByZXR1cm4gPFRleHQ+LTwvVGV4dD47XHJcbiAgfVxyXG4gIFxyXG4gIC8vIEN1cnJlbnQgdmFsdWVzIGFyZSB1c3VhbGx5IHN0b3JlZCBhcyBjYXRlZ29yaWVzLjAsIGNhdGVnb3JpZXMuMSwgZXRjIG9yIGFzIGEgcmF3IGFycmF5IGluIHNvbWUgY29udGV4dHNcclxuICBjb25zdCBbc2VsZWN0ZWRPcHRpb25zLCBzZXRTZWxlY3RlZE9wdGlvbnNdID0gdXNlU3RhdGU8YW55W10+KFtdKTtcclxuICBjb25zdCBbYWxsT3B0aW9ucywgc2V0QWxsT3B0aW9uc10gPSB1c2VTdGF0ZTxhbnlbXT4oW10pO1xyXG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGxvYWRDYXRlZ29yaWVzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnNlYXJjaFJlY29yZHMoe1xyXG4gICAgICAgICAgcmVzb3VyY2VJZDogJ05vdGljaWFzQ2F0ZWdvcnknLFxyXG4gICAgICAgICAgcXVlcnk6ICcnLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSByZXNwb25zZS5tYXAociA9PiAoe1xyXG4gICAgICAgICAgdmFsdWU6IHIuaWQsXHJcbiAgICAgICAgICBsYWJlbDogci50aXRsZSxcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc2V0QWxsT3B0aW9ucyhvcHRpb25zKTtcclxuXHJcbiAgICAgICAgLy8gR2V0IGN1cnJlbnRseSBzZWxlY3RlZCBJRHNcclxuICAgICAgICBjb25zdCBjdXJyZW50SWRzOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgICAgIE9iamVjdC5rZXlzKHJlY29yZC5wYXJhbXMpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAgIGlmIChrZXkuc3RhcnRzV2l0aChgJHtwcm9wZXJ0eS5uYW1lfS5gKSkge1xyXG4gICAgICAgICAgICBjb25zdCB2YWwgPSByZWNvcmQucGFyYW1zW2tleV07XHJcbiAgICAgICAgICAgIGlmICh2YWwpIGN1cnJlbnRJZHMucHVzaCh2YWwudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgcmF3VmFsdWUgPSByZWNvcmQucGFyYW1zW3Byb3BlcnR5Lm5hbWVdO1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJhd1ZhbHVlKSkge1xyXG4gICAgICAgICAgICByYXdWYWx1ZS5mb3JFYWNoKHYgPT4gY3VycmVudElkcy5wdXNoKHYudG9TdHJpbmcoKSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSBvcHRpb25zLmZpbHRlcihvcHQgPT4gY3VycmVudElkcy5pbmNsdWRlcyhvcHQudmFsdWUudG9TdHJpbmcoKSkpO1xyXG4gICAgICAgIHNldFNlbGVjdGVkT3B0aW9ucyhzZWxlY3RlZCk7XHJcbiAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gbG9hZCBjYXRlZ29yaWVzOicsIGVycm9yKTtcclxuICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGxvYWRDYXRlZ29yaWVzKCk7XHJcbiAgfSwgW3JlY29yZC5pZCwgcmVjb3JkLnBhcmFtc10pOyAvLyBVcGRhdGUgb24gcmVjb3JkIGNoYW5nZVxyXG5cclxuICBjb25zdCBoYW5kbGVDaGFuZ2UgPSAoc2VsZWN0ZWQ6IGFueSkgPT4ge1xyXG4gICAgY29uc3QgbmV3T3B0aW9ucyA9IHNlbGVjdGVkID8gKEFycmF5LmlzQXJyYXkoc2VsZWN0ZWQpID8gc2VsZWN0ZWQgOiBbc2VsZWN0ZWRdKSA6IFtdO1xyXG4gICAgc2V0U2VsZWN0ZWRPcHRpb25zKG5ld09wdGlvbnMpO1xyXG4gICAgY29uc3QgaWRzID0gbmV3T3B0aW9ucy5tYXAob3B0ID0+IG9wdC52YWx1ZSk7XHJcbiAgICBvbkNoYW5nZShwcm9wZXJ0eS5uYW1lLCBpZHMpO1xyXG4gIH07XHJcblxyXG4gIGlmIChpc1Nob3cpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxGb3JtR3JvdXA+XHJcbiAgICAgICAgPExhYmVsPntwcm9wZXJ0eS5sYWJlbH08L0xhYmVsPlxyXG4gICAgICAgIDxCb3ggdmFyaWFudD1cIndoaXRlXCIgcD1cIm1kXCIgYm9yZGVyPVwiMXB4IHNvbGlkICNkZGRcIiBib3JkZXJSYWRpdXM9XCJtZFwiPlxyXG4gICAgICAgICAge3NlbGVjdGVkT3B0aW9ucy5sZW5ndGggPiAwID8gKFxyXG4gICAgICAgICAgICA8Qm94IGZsZXggZmxleERpcmVjdGlvbj1cInJvd1wiIGZsZXhXcmFwPVwid3JhcFwiPlxyXG4gICAgICAgICAgICAgIHtzZWxlY3RlZE9wdGlvbnMubWFwKG9wdCA9PiAoXHJcbiAgICAgICAgICAgICAgICA8Qm94IGtleT17b3B0LnZhbHVlfSBiZz1cInByaW1hcnkxMDBcIiBjb2xvcj1cIndoaXRlXCIgcHg9XCJzbVwiIHB5PVwieHNcIiBtcj1cInhzXCIgbWI9XCJ4c1wiIGJvcmRlclJhZGl1cz1cIm1kXCI+XHJcbiAgICAgICAgICAgICAgICAgIHtvcHQubGFiZWx9XHJcbiAgICAgICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICA8VGV4dCBjb2xvcj1cImdyZXk0MFwiPk5vIGNhdGVnb3JpZXMgc2VsZWN0ZWQ8L1RleHQ+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgIDwvQm94PlxyXG4gICAgICA8L0Zvcm1Hcm91cD5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPEJveCBtYj1cInhsXCI+XHJcbiAgICAgIDxGb3JtR3JvdXA+XHJcbiAgICAgICAgPExhYmVsPntwcm9wZXJ0eS5sYWJlbH08L0xhYmVsPlxyXG4gICAgICAgIDxTZWxlY3RcclxuICAgICAgICAgIGlzTXVsdGlcclxuICAgICAgICAgIGlzTG9hZGluZz17aXNMb2FkaW5nfVxyXG4gICAgICAgICAgdmFsdWU9e3NlbGVjdGVkT3B0aW9uc31cclxuICAgICAgICAgIG9wdGlvbnM9e2FsbE9wdGlvbnN9XHJcbiAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfVxyXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWxlY3QgY2F0ZWdvcmllcy4uLlwiXHJcbiAgICAgICAgLz5cclxuICAgICAgICA8VGV4dCB2YXJpYW50PVwic21cIiBjb2xvcj1cImdyZXk2MFwiIG10PVwieHNcIj5cclxuICAgICAgICAgIFNlbGVjdCBvbmUgb3IgbW9yZSBjYXRlZ29yaWVzIGZvciB0aGlzIG5ld3MgaXRlbS5cclxuICAgICAgICA8L1RleHQ+XHJcbiAgICAgIDwvRm9ybUdyb3VwPlxyXG4gICAgPC9Cb3g+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENhdGVnb3J5TXVsdGlTZWxlY3Q7XHJcbiIsIkFkbWluSlMuVXNlckNvbXBvbmVudHMgPSB7fVxuaW1wb3J0IEZBUUJ1aWxkZXIgZnJvbSAnLi4vc3JjL2FkbWluL2NvbXBvbmVudHMvRkFRQnVpbGRlcidcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuRkFRQnVpbGRlciA9IEZBUUJ1aWxkZXJcbmltcG9ydCBJbWFnZVVwbG9hZGVyIGZyb20gJy4uL3NyYy9hZG1pbi9jb21wb25lbnRzL0ltYWdlVXBsb2FkZXInXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkltYWdlVXBsb2FkZXIgPSBJbWFnZVVwbG9hZGVyXG5pbXBvcnQgQ2F0ZWdvcnlNdWx0aVNlbGVjdCBmcm9tICcuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9DYXRlZ29yeU11bHRpU2VsZWN0J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5DYXRlZ29yeU11bHRpU2VsZWN0ID0gQ2F0ZWdvcnlNdWx0aVNlbGVjdCJdLCJuYW1lcyI6WyJGQVFCdWlsZGVyIiwicHJvcHMiLCJwcm9wZXJ0eSIsInJlY29yZCIsIm9uQ2hhbmdlIiwicmVzb3VyY2UiLCJhY3Rpb24iLCJwYWdlVHlwZSIsInBhcmFtcyIsImlzU2hvdyIsIm5hbWUiLCJnZXRJbml0aWFsRGF0YSIsImRpcmVjdFZhbHVlIiwiaXRlbXMiLCJwYXJzZWQiLCJKU09OIiwicGFyc2UiLCJlIiwiaSIsInVuZGVmaW5lZCIsInNob3dUaXRsZVZhbCIsInB1c2giLCJ0aXRsZSIsInN1YnRpdGxlIiwiZGVzY3JpcHRpb24iLCJzaG93VGl0bGUiLCJsZW5ndGgiLCJkYXRhIiwic2V0RGF0YSIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwidXBkYXRlQ29udGVudCIsIm5ld0RhdGEiLCJhZGRJdGVtIiwibmV3SXRlbXMiLCJhZGRUaXRsZVNlY3Rpb24iLCJyZW1vdmVJdGVtIiwiaW5kZXgiLCJmaWx0ZXIiLCJfIiwiaGFuZGxlSXRlbUNoYW5nZSIsImtleSIsInZhbCIsImlzRkFRIiwiaGFzSXRlbXMiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJCb3giLCJ2YXJpYW50IiwicCIsImJvcmRlciIsImJvcmRlclJhZGl1cyIsIm10IiwiYm94U2hhZG93IiwibWFwIiwiaXRlbSIsIm1iIiwicGIiLCJib3JkZXJCb3R0b20iLCJUZXh0IiwiZm9udFdlaWdodCIsImNvbG9yIiwiaXRhbGljIiwicG9zaXRpb24iLCJwdCIsInRvcCIsInJpZ2h0IiwiQnV0dG9uIiwidHlwZSIsInNpemUiLCJvbkNsaWNrIiwiSWNvbiIsImljb24iLCJGb3JtR3JvdXAiLCJMYWJlbCIsIklucHV0IiwidmFsdWUiLCJ0YXJnZXQiLCJwbGFjZWhvbGRlciIsIndpZHRoIiwiVGV4dEFyZWEiLCJyb3dzIiwiZmxleCIsImZsZXhEaXJlY3Rpb24iLCJqdXN0aWZ5Q29udGVudCIsImRpc3BsYXkiLCJhbGlnbkl0ZW1zIiwibXIiLCJJbWFnZVVwbG9hZGVyIiwid2hlcmUiLCJwcmV2aWV3Iiwic2V0UHJldmlldyIsImhhbmRsZUZpbGVDaGFuZ2UiLCJmaWxlcyIsImZpbGUiLCJyZWFkZXIiLCJGaWxlUmVhZGVyIiwib25sb2FkZW5kIiwiYmFzZTY0U3RyaW5nIiwicmVzdWx0IiwicmVhZEFzRGF0YVVSTCIsImhhbmRsZUNsZWFyIiwiaW1nVXJsIiwic3JjIiwiYWx0Iiwic3R5bGUiLCJoZWlnaHQiLCJvYmplY3RGaXQiLCJsYWJlbCIsIm1heFdpZHRoIiwidGV4dEFsaWduIiwibWF4SGVpZ2h0IiwiRHJvcFpvbmUiLCJ2YWxpZGF0ZSIsIm1heFNpemUiLCJtaW1lVHlwZXMiLCJDYXRlZ29yeU11bHRpU2VsZWN0IiwiaXNMaXN0IiwiYXBpIiwiQXBpQ2xpZW50IiwicG9wdWxhdGVkIiwiQXJyYXkiLCJpc0FycmF5IiwidGl0bGVzIiwiaWQiLCJCb29sZWFuIiwiam9pbiIsInBhcmFtc1RpdGxlcyIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwic3RhcnRzV2l0aCIsImVuZHNXaXRoIiwic2VsZWN0ZWRPcHRpb25zIiwic2V0U2VsZWN0ZWRPcHRpb25zIiwiYWxsT3B0aW9ucyIsInNldEFsbE9wdGlvbnMiLCJpc0xvYWRpbmciLCJzZXRJc0xvYWRpbmciLCJsb2FkQ2F0ZWdvcmllcyIsInJlc3BvbnNlIiwic2VhcmNoUmVjb3JkcyIsInJlc291cmNlSWQiLCJxdWVyeSIsIm9wdGlvbnMiLCJyIiwiY3VycmVudElkcyIsInRvU3RyaW5nIiwicmF3VmFsdWUiLCJ2Iiwic2VsZWN0ZWQiLCJvcHQiLCJpbmNsdWRlcyIsImVycm9yIiwiY29uc29sZSIsImhhbmRsZUNoYW5nZSIsIm5ld09wdGlvbnMiLCJpZHMiLCJmbGV4V3JhcCIsImJnIiwicHgiLCJweSIsIlNlbGVjdCIsImlzTXVsdGkiLCJBZG1pbkpTIiwiVXNlckNvbXBvbmVudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFJQSxNQUFNQSxVQUF1QyxHQUFJQyxLQUFLLElBQUs7SUFDekQsTUFBTTtNQUFFQyxRQUFRO01BQUVDLE1BQU07TUFBRUMsUUFBUTtFQUFFQyxJQUFBQTtFQUFT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

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
      onChange
    } = props;
    const api = new adminjs.ApiClient();

    // Current values are usually stored as categories.0, categories.1, etc or as a raw array in some contexts
    // For Many-to-Many editing, AdminJS expects an array of IDs
    const [selectedOptions, setSelectedOptions] = React.useState([]);
    const [allOptions, setAllOptions] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    React.useEffect(() => {
      const loadCategories = async () => {
        try {
          // Search for all categories (empty query)
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
          // When using Many-to-Many, AdminJS might pass them in various ways depending on the adapter
          // Usually, for many-to-many, we can look for keys like 'categories.0', 'categories.1'
          const currentIds = [];
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
    const handleChange = selected => {
      const newOptions = selected ? Array.isArray(selected) ? selected : [selected] : [];
      setSelectedOptions(newOptions);

      // We update the record params. 
      // In AdminJS, for Many-to-Many, it's often best to pass the array of IDs
      // The adapter will handle the flattening if needed
      const ids = newOptions.map(opt => opt.value);
      onChange(property.name, ids);
    };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9GQVFCdWlsZGVyLnRzeCIsIi4uL3NyYy9hZG1pbi9jb21wb25lbnRzL0ltYWdlVXBsb2FkZXIudHN4IiwiLi4vc3JjL2FkbWluL2NvbXBvbmVudHMvQ2F0ZWdvcnlNdWx0aVNlbGVjdC50c3giLCJlbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJveCwgQnV0dG9uLCBGb3JtR3JvdXAsIElucHV0LCBMYWJlbCwgVGV4dEFyZWEsIEljb24sIFRleHQgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IEJhc2VQcm9wZXJ0eVByb3BzIH0gZnJvbSAnYWRtaW5qcyc7XG5cbmNvbnN0IEZBUUJ1aWxkZXI6IFJlYWN0LkZDPEJhc2VQcm9wZXJ0eVByb3BzPiA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IHByb3BlcnR5LCByZWNvcmQsIG9uQ2hhbmdlLCByZXNvdXJjZSB9ID0gcHJvcHM7XG4gIGNvbnN0IGFjdGlvbiA9IChwcm9wcyBhcyBhbnkpLmFjdGlvbjtcbiAgY29uc3QgcGFnZVR5cGUgPSByZWNvcmQucGFyYW1zLnBhZ2VUeXBlIHx8ICdmYXEnO1xuICBcbiAgLy8gRGV0ZWN0IGlmIHdlIGFyZSBpbiBcIlNob3dcIiAocmVhZC1vbmx5KSBtb2RlXG4gIGNvbnN0IGlzU2hvdyA9IGFjdGlvbj8ubmFtZSA9PT0gJ3Nob3cnIHx8ICFvbkNoYW5nZTtcblxuICAvLyBGdW5jdGlvbiB0byByb2J1c3RseSBleHRyYWN0IGRhdGEgZnJvbSByZWNvcmQucGFyYW1zIChoYW5kbGVzIGZsYXR0ZW5lZCBrZXlzKVxuICBjb25zdCBnZXRJbml0aWFsRGF0YSA9ICgpID0+IHtcbiAgICAvLyAxLiBUcnkgZGlyZWN0IGFjY2Vzc1xuICAgIGNvbnN0IGRpcmVjdFZhbHVlID0gcmVjb3JkLnBhcmFtc1twcm9wZXJ0eS5uYW1lXTtcbiAgICBpZiAoZGlyZWN0VmFsdWUpIHtcbiAgICAgIGlmICh0eXBlb2YgZGlyZWN0VmFsdWUgPT09ICdvYmplY3QnICYmIGRpcmVjdFZhbHVlLml0ZW1zKSByZXR1cm4gZGlyZWN0VmFsdWU7XG4gICAgICBpZiAodHlwZW9mIGRpcmVjdFZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHBhcnNlZCA9IEpTT04ucGFyc2UoZGlyZWN0VmFsdWUpO1xuICAgICAgICAgIGlmIChwYXJzZWQgJiYgcGFyc2VkLml0ZW1zKSByZXR1cm4gcGFyc2VkO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gRmFsbCB0aHJvdWdoIHRvIGZsYXR0ZW5lZCBjaGVja1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gMi4gVHJ5IGZsYXR0ZW5lZCBhY2Nlc3MgKGUuZy4sIGNvbnRlbnQuaXRlbXMuMC50aXRsZSlcbiAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgIGxldCBpID0gMDtcbiAgICB3aGlsZSAoXG4gICAgICByZWNvcmQucGFyYW1zW2Ake3Byb3BlcnR5Lm5hbWV9Lml0ZW1zLiR7aX0uc3VidGl0bGVgXSAhPT0gdW5kZWZpbmVkIHx8IFxuICAgICAgcmVjb3JkLnBhcmFtc1tgJHtwcm9wZXJ0eS5uYW1lfS5pdGVtcy4ke2l9LnRpdGxlYF0gIT09IHVuZGVmaW5lZCB8fFxuICAgICAgcmVjb3JkLnBhcmFtc1tgJHtwcm9wZXJ0eS5uYW1lfS5pdGVtcy4ke2l9LmRlc2NyaXB0aW9uYF0gIT09IHVuZGVmaW5lZFxuICAgICkge1xuICAgICAgY29uc3Qgc2hvd1RpdGxlVmFsID0gcmVjb3JkLnBhcmFtc1tgJHtwcm9wZXJ0eS5uYW1lfS5pdGVtcy4ke2l9LnNob3dUaXRsZWBdO1xuICAgICAgaXRlbXMucHVzaCh7XG4gICAgICAgIHRpdGxlOiByZWNvcmQucGFyYW1zW2Ake3Byb3BlcnR5Lm5hbWV9Lml0ZW1zLiR7aX0udGl0bGVgXSB8fCAnJyxcbiAgICAgICAgc3VidGl0bGU6IHJlY29yZC5wYXJhbXNbYCR7cHJvcGVydHkubmFtZX0uaXRlbXMuJHtpfS5zdWJ0aXRsZWBdIHx8ICcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogcmVjb3JkLnBhcmFtc1tgJHtwcm9wZXJ0eS5uYW1lfS5pdGVtcy4ke2l9LmRlc2NyaXB0aW9uYF0gfHwgJycsXG4gICAgICAgIHNob3dUaXRsZTogc2hvd1RpdGxlVmFsID09PSB0cnVlIHx8IHNob3dUaXRsZVZhbCA9PT0gJ3RydWUnLFxuICAgICAgfSk7XG4gICAgICBpKys7XG4gICAgfVxuXG4gICAgcmV0dXJuIGl0ZW1zLmxlbmd0aCA+IDAgPyB7IGl0ZW1zIH0gOiB7IGl0ZW1zOiBbXSB9O1xuICB9O1xuXG4gIGNvbnN0IFtkYXRhLCBzZXREYXRhXSA9IHVzZVN0YXRlKGdldEluaXRpYWxEYXRhKCkpO1xuXG4gIC8vIEtlZXAgc3RhdGUgaW4gc3luYyBpZiByZWNvcmQgY2hhbmdlcyAoaW1wb3J0YW50IGZvciBTaG93IHZpZXcgdHJhbnNpdGlvbilcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXREYXRhKGdldEluaXRpYWxEYXRhKCkpO1xuICB9LCBbcmVjb3JkLnBhcmFtc10pO1xuXG4gIGNvbnN0IHVwZGF0ZUNvbnRlbnQgPSAobmV3RGF0YTogYW55KSA9PiB7XG4gICAgc2V0RGF0YShuZXdEYXRhKTtcbiAgICBpZiAob25DaGFuZ2UpIHtcbiAgICAgIG9uQ2hhbmdlKHByb3BlcnR5Lm5hbWUsIG5ld0RhdGEpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBhZGRJdGVtID0gKCkgPT4ge1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gWy4uLihkYXRhLml0ZW1zIHx8IFtdKSwgeyBzdWJ0aXRsZTogJycsIGRlc2NyaXB0aW9uOiAnJywgc2hvd1RpdGxlOiBmYWxzZSB9XTtcbiAgICB1cGRhdGVDb250ZW50KHsgLi4uZGF0YSwgaXRlbXM6IG5ld0l0ZW1zIH0pO1xuICB9O1xuXG4gIGNvbnN0IGFkZFRpdGxlU2VjdGlvbiA9ICgpID0+IHtcbiAgICBjb25zdCBuZXdJdGVtcyA9IFsuLi4oZGF0YS5pdGVtcyB8fCBbXSksIHsgdGl0bGU6ICcnLCBzdWJ0aXRsZTogJycsIGRlc2NyaXB0aW9uOiAnJywgc2hvd1RpdGxlOiB0cnVlIH1dO1xuICAgIHVwZGF0ZUNvbnRlbnQoeyAuLi5kYXRhLCBpdGVtczogbmV3SXRlbXMgfSk7XG4gIH07XG5cbiAgY29uc3QgcmVtb3ZlSXRlbSA9IChpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgbmV3SXRlbXMgPSBkYXRhLml0ZW1zLmZpbHRlcigoXywgaTogbnVtYmVyKSA9PiBpICE9PSBpbmRleCk7XG4gICAgdXBkYXRlQ29udGVudCh7IC4uLmRhdGEsIGl0ZW1zOiBuZXdJdGVtcyB9KTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVJdGVtQ2hhbmdlID0gKGluZGV4OiBudW1iZXIsIGtleTogc3RyaW5nLCB2YWw6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gWy4uLmRhdGEuaXRlbXNdO1xuICAgIG5ld0l0ZW1zW2luZGV4XSA9IHsgLi4ubmV3SXRlbXNbaW5kZXhdLCBba2V5XTogdmFsIH07XG4gICAgdXBkYXRlQ29udGVudCh7IC4uLmRhdGEsIGl0ZW1zOiBuZXdJdGVtcyB9KTtcbiAgfTtcblxuICBjb25zdCBpc0ZBUSA9IHBhZ2VUeXBlID09PSAnZmFxJztcbiAgY29uc3QgaGFzSXRlbXMgPSBkYXRhLml0ZW1zICYmIGRhdGEuaXRlbXMubGVuZ3RoID4gMDtcblxuICBpZiAoIXJlY29yZC5wYXJhbXMucGFnZVR5cGUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmIChpc1Nob3cpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPEJveCB2YXJpYW50PVwid2hpdGVcIiBwPVwieHhsXCIgYm9yZGVyPVwiMXB4IHNvbGlkICNkZGRcIiBib3JkZXJSYWRpdXM9XCJsZ1wiIG10PVwieGxcIiBib3hTaGFkb3c9XCJjYXJkXCI+XG4gICAgICAgIHtoYXNJdGVtcyA/IChcbiAgICAgICAgICA8Qm94PlxuICAgICAgICAgICAge2RhdGEuaXRlbXMubWFwKChpdGVtOiBhbnksIGluZGV4OiBudW1iZXIpID0+IChcbiAgICAgICAgICAgICAgPEJveCBrZXk9e2luZGV4fSBtYj1cInhsXCIgcGI9XCJsZ1wiIGJvcmRlckJvdHRvbT17aW5kZXggPCBkYXRhLml0ZW1zLmxlbmd0aCAtIDEgPyBcIjFweCBzb2xpZCAjZWVlXCIgOiBcIm5vbmVcIn0+XG4gICAgICAgICAgICAgICAgeyghaXNGQVEgfHwgaW5kZXggPT09IDAgfHwgaXRlbS5zaG93VGl0bGUpICYmIGl0ZW0udGl0bGUgJiYgKFxuICAgICAgICAgICAgICAgICAgPFRleHQgdmFyaWFudD1cImxnXCIgZm9udFdlaWdodD1cImJvbGRcIiBtYj1cInNtXCIgY29sb3I9XCJwcmltYXJ5MTAwXCI+XG4gICAgICAgICAgICAgICAgICAgIHtpdGVtLnRpdGxlfVxuICAgICAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAge2lzRkFRICYmIGl0ZW0uc3VidGl0bGUgJiYgKFxuICAgICAgICAgICAgICAgICAgPFRleHQgdmFyaWFudD1cIm1kXCIgZm9udFdlaWdodD1cInNlbWlib2xkXCIgbWI9XCJ4c1wiIGNvbG9yPVwiZ3JleTgwXCI+XG4gICAgICAgICAgICAgICAgICAgIHtpdGVtLnN1YnRpdGxlfVxuICAgICAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAge2l0ZW0uZGVzY3JpcHRpb24gJiYgKFxuICAgICAgICAgICAgICAgICAgPFRleHQgdmFyaWFudD1cInNtXCIgY29sb3I9XCJncmV5NjBcIj5cbiAgICAgICAgICAgICAgICAgICAge2l0ZW0uZGVzY3JpcHRpb259XG4gICAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8VGV4dCBpdGFsaWMgY29sb3I9XCJncmV5NDBcIj5ObyBlbnRyaWVzIGFkZGVkIHlldC48L1RleHQ+XG4gICAgICAgICl9XG4gICAgICA8L0JveD5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94IHZhcmlhbnQ9XCJ3aGl0ZVwiIHA9XCJ4eGxcIiBib3JkZXI9XCIxcHggc29saWQgI2RkZFwiIGJvcmRlclJhZGl1cz1cImxnXCIgbXQ9XCJ4bFwiIGJveFNoYWRvdz1cImNhcmRcIj5cbiAgICAgIDxCb3ggbXQ9XCJsZ1wiPlxuICAgICAgICB7ZGF0YS5pdGVtcyAmJiBkYXRhLml0ZW1zLm1hcCgoaXRlbTogYW55LCBpbmRleDogbnVtYmVyKSA9PiAoXG4gICAgICAgICAgPEJveCBrZXk9e2luZGV4fSBtYj1cInhsXCIgcG9zaXRpb249XCJyZWxhdGl2ZVwiIHB0PVwibGdcIj5cbiAgICAgICAgICAgIDxCb3ggcG9zaXRpb249XCJhYnNvbHV0ZVwiIHRvcD1cIjEwcHhcIiByaWdodD1cIjBcIj5cbiAgICAgICAgICAgICAgPEJ1dHRvbiBcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCIgXG4gICAgICAgICAgICAgICAgdmFyaWFudD1cImRhbmdlclwiIFxuICAgICAgICAgICAgICAgIHNpemU9XCJpY29uXCIgXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gcmVtb3ZlSXRlbShpbmRleCl9XG4gICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzPVwiZnVsbFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8SWNvbiBpY29uPVwiVHJhc2hcIiAvPlxuICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgXG4gICAgICAgICAgICB7KCFpc0ZBUSB8fCBpbmRleCA9PT0gMCB8fCBpdGVtLnNob3dUaXRsZSkgJiYgKFxuICAgICAgICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgICAgICAgIDxMYWJlbD5UaXRsZTwvTGFiZWw+XG4gICAgICAgICAgICAgICAgPElucHV0XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17aXRlbS50aXRsZSB8fCAnJ31cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gaGFuZGxlSXRlbUNoYW5nZShpbmRleCwgJ3RpdGxlJywgZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciB0aXRsZVwiXG4gICAgICAgICAgICAgICAgICB3aWR0aD17MX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgIHtpc0ZBUSAmJiAoXG4gICAgICAgICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgICAgICAgPExhYmVsPlN1YnRpdGxlPC9MYWJlbD5cbiAgICAgICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtpdGVtLnN1YnRpdGxlIHx8ICcnfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBoYW5kbGVJdGVtQ2hhbmdlKGluZGV4LCAnc3VidGl0bGUnLCBlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIHN1YnRpdGxlXCJcbiAgICAgICAgICAgICAgICAgIHdpZHRoPXsxfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICAgICAgPExhYmVsPkRlc2NyaXB0aW9uPC9MYWJlbD5cbiAgICAgICAgICAgICAgPFRleHRBcmVhXG4gICAgICAgICAgICAgICAgdmFsdWU9e2l0ZW0uZGVzY3JpcHRpb24gfHwgJyd9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBoYW5kbGVJdGVtQ2hhbmdlKGluZGV4LCAnZGVzY3JpcHRpb24nLCBlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBkZXNjcmlwdGlvblwiXG4gICAgICAgICAgICAgICAgd2lkdGg9ezF9XG4gICAgICAgICAgICAgICAgcm93cz17M31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICApKX1cbiAgICAgIDwvQm94PlxuXG4gICAgICA8Qm94IG10PVwieGxcIiBmbGV4IGZsZXhEaXJlY3Rpb249XCJyb3dcIiBqdXN0aWZ5Q29udGVudD1cImNlbnRlclwiIHB0PXtoYXNJdGVtcyA/ICd4bCcgOiAnbm9uZSd9PlxuICAgICAgICA8QnV0dG9uIFxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIiBcbiAgICAgICAgICBvbkNsaWNrPXthZGRJdGVtfSBcbiAgICAgICAgICB2YXJpYW50PVwib3V0bGluZVwiIFxuICAgICAgICAgIGJvcmRlclJhZGl1cz1cImZ1bGxcIlxuICAgICAgICAgIGRpc3BsYXk9XCJmbGV4XCJcbiAgICAgICAgICBhbGlnbkl0ZW1zPVwiY2VudGVyXCJcbiAgICAgICAgICBtcj1cIm1kXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxJY29uIGljb249XCJQbHVzXCIgbXI9XCJ4c1wiIC8+IFxuICAgICAgICAgIHtpc0ZBUSA/ICdBZGQgRkFRIEl0ZW1zJyA6ICdBZGQgUmVndWxhbWVudG8gSXRlbXMnfVxuICAgICAgICA8L0J1dHRvbj5cblxuICAgICAgICB7aXNGQVEgJiYgKFxuICAgICAgICAgIDxCdXR0b24gXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCIgXG4gICAgICAgICAgICBvbkNsaWNrPXthZGRUaXRsZVNlY3Rpb259IFxuICAgICAgICAgICAgdmFyaWFudD1cInByaW1hcnlcIiBcbiAgICAgICAgICAgIGJvcmRlclJhZGl1cz1cImZ1bGxcIlxuICAgICAgICAgICAgZGlzcGxheT1cImZsZXhcIlxuICAgICAgICAgICAgYWxpZ25JdGVtcz1cImNlbnRlclwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPEljb24gaWNvbj1cIlBsdXNcIiBtcj1cInhzXCIgLz4gQWRkIFRpdGxlXG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICl9XG4gICAgICA8L0JveD5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEZBUUJ1aWxkZXI7XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCb3gsIExhYmVsLCBJbnB1dCwgRHJvcFpvbmUsIERyb3Bab25lUHJvcHMsIEJ1dHRvbiwgSWNvbiwgVGV4dCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuaW1wb3J0IHsgQmFzZVByb3BlcnR5UHJvcHMgfSBmcm9tICdhZG1pbmpzJztcblxuY29uc3QgSW1hZ2VVcGxvYWRlcjogUmVhY3QuRkM8QmFzZVByb3BlcnR5UHJvcHM+ID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgcHJvcGVydHksIHJlY29yZCwgb25DaGFuZ2UgfSA9IHByb3BzO1xuICBjb25zdCBbcHJldmlldywgc2V0UHJldmlld10gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihyZWNvcmQucGFyYW1zW3Byb3BlcnR5Lm5hbWVdIHx8IG51bGwpO1xuXG4gIGNvbnN0IGhhbmRsZUZpbGVDaGFuZ2U6IERyb3Bab25lUHJvcHNbJ29uQ2hhbmdlJ10gPSAoZmlsZXMpID0+IHtcbiAgICBjb25zdCBmaWxlID0gZmlsZXNbMF07XG4gICAgaWYgKGZpbGUpIHtcbiAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICByZWFkZXIub25sb2FkZW5kID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBiYXNlNjRTdHJpbmcgPSByZWFkZXIucmVzdWx0IGFzIHN0cmluZztcbiAgICAgICAgc2V0UHJldmlldyhiYXNlNjRTdHJpbmcpO1xuICAgICAgICBvbkNoYW5nZShwcm9wZXJ0eS5uYW1lLCBiYXNlNjRTdHJpbmcpO1xuICAgICAgfTtcbiAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVDbGVhciA9ICgpID0+IHtcbiAgICBzZXRQcmV2aWV3KG51bGwpO1xuICAgIG9uQ2hhbmdlKHByb3BlcnR5Lm5hbWUsICcnKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxCb3ggbWI9XCJ4bFwiPlxuICAgICAgPExhYmVsPntwcm9wZXJ0eS5sYWJlbH08L0xhYmVsPlxuICAgICAge3ByZXZpZXcgPyAoXG4gICAgICAgIDxCb3ggYm9yZGVyPVwiMXB4IHNvbGlkICNkZGRcIiBwPVwibWRcIiBib3JkZXJSYWRpdXM9XCJtZFwiIHBvc2l0aW9uPVwicmVsYXRpdmVcIiB0ZXh0QWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICA8aW1nIHNyYz17cHJldmlld30gYWx0PVwiUHJldmlld1wiIHN0eWxlPXt7IG1heFdpZHRoOiAnMTAwJScsIG1heEhlaWdodDogJzIwMHB4JywgYm9yZGVyUmFkaXVzOiAnNHB4JyB9fSAvPlxuICAgICAgICAgIDxCb3ggbXQ9XCJtZFwiPlxuICAgICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwiZGFuZ2VyXCIgc2l6ZT1cInNtXCIgb25DbGljaz17aGFuZGxlQ2xlYXJ9IHR5cGU9XCJidXR0b25cIj5cbiAgICAgICAgICAgICAgPEljb24gaWNvbj1cIlRyYXNoXCIgbXI9XCJ4c1wiIC8+IFJlbW92ZSBJbWFnZVxuICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgIDwvQm94PlxuICAgICAgKSA6IChcbiAgICAgICAgPERyb3Bab25lIG9uQ2hhbmdlPXtoYW5kbGVGaWxlQ2hhbmdlfSB2YWxpZGF0ZT17eyBtYXhTaXplOiA1MDAwMDAwLCBtaW1lVHlwZXM6IFsnaW1hZ2UvcG5nJywgJ2ltYWdlL2pwZWcnLCAnaW1hZ2UvanBnJywgJ2ltYWdlL3dlYnAnXSB9fSAvPlxuICAgICAgKX1cbiAgICAgIDxUZXh0IHZhcmlhbnQ9XCJzbVwiIGNvbG9yPVwiZ3JleTYwXCIgbXQ9XCJ4c1wiPlxuICAgICAgICBTZWxlY3QgYW4gaW1hZ2UgdG8gdXNlIGFzIHRoZSBjYXJkIGJhY2tncm91bmQuIEJhc2U2NCBmb3JtYXQgd2lsbCBiZSBzdG9yZWQgaW4gdGhlIGRhdGFiYXNlLlxuICAgICAgPC9UZXh0PlxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSW1hZ2VVcGxvYWRlcjtcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQm94LCBGb3JtR3JvdXAsIExhYmVsLCBTZWxlY3QsIFNlbGVjdEFzeW5jLCBUZXh0IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5pbXBvcnQgeyBCYXNlUHJvcGVydHlQcm9wcywgQXBpQ2xpZW50IH0gZnJvbSAnYWRtaW5qcyc7XG5cbmNvbnN0IENhdGVnb3J5TXVsdGlTZWxlY3Q6IFJlYWN0LkZDPEJhc2VQcm9wZXJ0eVByb3BzPiA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IHByb3BlcnR5LCByZWNvcmQsIG9uQ2hhbmdlIH0gPSBwcm9wcztcbiAgY29uc3QgYXBpID0gbmV3IEFwaUNsaWVudCgpO1xuICBcbiAgLy8gQ3VycmVudCB2YWx1ZXMgYXJlIHVzdWFsbHkgc3RvcmVkIGFzIGNhdGVnb3JpZXMuMCwgY2F0ZWdvcmllcy4xLCBldGMgb3IgYXMgYSByYXcgYXJyYXkgaW4gc29tZSBjb250ZXh0c1xuICAvLyBGb3IgTWFueS10by1NYW55IGVkaXRpbmcsIEFkbWluSlMgZXhwZWN0cyBhbiBhcnJheSBvZiBJRHNcbiAgY29uc3QgW3NlbGVjdGVkT3B0aW9ucywgc2V0U2VsZWN0ZWRPcHRpb25zXSA9IHVzZVN0YXRlPGFueVtdPihbXSk7XG4gIGNvbnN0IFthbGxPcHRpb25zLCBzZXRBbGxPcHRpb25zXSA9IHVzZVN0YXRlPGFueVtdPihbXSk7XG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGxvYWRDYXRlZ29yaWVzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gU2VhcmNoIGZvciBhbGwgY2F0ZWdvcmllcyAoZW1wdHkgcXVlcnkpXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnNlYXJjaFJlY29yZHMoe1xuICAgICAgICAgIHJlc291cmNlSWQ6ICdOb3RpY2lhc0NhdGVnb3J5JyxcbiAgICAgICAgICBxdWVyeTogJycsXG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHJlc3BvbnNlLm1hcChyID0+ICh7XG4gICAgICAgICAgdmFsdWU6IHIuaWQsXG4gICAgICAgICAgbGFiZWw6IHIudGl0bGUsXG4gICAgICAgIH0pKTtcbiAgICAgICAgXG4gICAgICAgIHNldEFsbE9wdGlvbnMob3B0aW9ucyk7XG5cbiAgICAgICAgLy8gR2V0IGN1cnJlbnRseSBzZWxlY3RlZCBJRHNcbiAgICAgICAgLy8gV2hlbiB1c2luZyBNYW55LXRvLU1hbnksIEFkbWluSlMgbWlnaHQgcGFzcyB0aGVtIGluIHZhcmlvdXMgd2F5cyBkZXBlbmRpbmcgb24gdGhlIGFkYXB0ZXJcbiAgICAgICAgLy8gVXN1YWxseSwgZm9yIG1hbnktdG8tbWFueSwgd2UgY2FuIGxvb2sgZm9yIGtleXMgbGlrZSAnY2F0ZWdvcmllcy4wJywgJ2NhdGVnb3JpZXMuMSdcbiAgICAgICAgY29uc3QgY3VycmVudElkczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgT2JqZWN0LmtleXMocmVjb3JkLnBhcmFtcykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgIGlmIChrZXkuc3RhcnRzV2l0aChgJHtwcm9wZXJ0eS5uYW1lfS5gKSkge1xuICAgICAgICAgICAgY29uc3QgdmFsID0gcmVjb3JkLnBhcmFtc1trZXldO1xuICAgICAgICAgICAgaWYgKHZhbCkgY3VycmVudElkcy5wdXNoKHZhbC50b1N0cmluZygpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgLy8gSWYgaXQncyBhIG5ldyByZWNvcmQgb3Igbm90IGZsYXR0ZW5lZCB5ZXQsIGl0IG1pZ2h0IGJlIGluIGFuIGFycmF5XG4gICAgICAgIGNvbnN0IHJhd1ZhbHVlID0gcmVjb3JkLnBhcmFtc1twcm9wZXJ0eS5uYW1lXTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmF3VmFsdWUpKSB7XG4gICAgICAgICAgICByYXdWYWx1ZS5mb3JFYWNoKHYgPT4gY3VycmVudElkcy5wdXNoKHYudG9TdHJpbmcoKSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSBvcHRpb25zLmZpbHRlcihvcHQgPT4gY3VycmVudElkcy5pbmNsdWRlcyhvcHQudmFsdWUudG9TdHJpbmcoKSkpO1xuICAgICAgICBzZXRTZWxlY3RlZE9wdGlvbnMoc2VsZWN0ZWQpO1xuICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGxvYWQgY2F0ZWdvcmllczonLCBlcnJvcik7XG4gICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxvYWRDYXRlZ29yaWVzKCk7XG4gIH0sIFtyZWNvcmQuaWRdKTtcblxuICBjb25zdCBoYW5kbGVDaGFuZ2UgPSAoc2VsZWN0ZWQ6IGFueSkgPT4ge1xuICAgIGNvbnN0IG5ld09wdGlvbnMgPSBzZWxlY3RlZCA/IChBcnJheS5pc0FycmF5KHNlbGVjdGVkKSA/IHNlbGVjdGVkIDogW3NlbGVjdGVkXSkgOiBbXTtcbiAgICBzZXRTZWxlY3RlZE9wdGlvbnMobmV3T3B0aW9ucyk7XG4gICAgXG4gICAgLy8gV2UgdXBkYXRlIHRoZSByZWNvcmQgcGFyYW1zLiBcbiAgICAvLyBJbiBBZG1pbkpTLCBmb3IgTWFueS10by1NYW55LCBpdCdzIG9mdGVuIGJlc3QgdG8gcGFzcyB0aGUgYXJyYXkgb2YgSURzXG4gICAgLy8gVGhlIGFkYXB0ZXIgd2lsbCBoYW5kbGUgdGhlIGZsYXR0ZW5pbmcgaWYgbmVlZGVkXG4gICAgY29uc3QgaWRzID0gbmV3T3B0aW9ucy5tYXAob3B0ID0+IG9wdC52YWx1ZSk7XG4gICAgb25DaGFuZ2UocHJvcGVydHkubmFtZSwgaWRzKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxCb3ggbWI9XCJ4bFwiPlxuICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgPExhYmVsPntwcm9wZXJ0eS5sYWJlbH08L0xhYmVsPlxuICAgICAgICA8U2VsZWN0XG4gICAgICAgICAgaXNNdWx0aVxuICAgICAgICAgIGlzTG9hZGluZz17aXNMb2FkaW5nfVxuICAgICAgICAgIHZhbHVlPXtzZWxlY3RlZE9wdGlvbnN9XG4gICAgICAgICAgb3B0aW9ucz17YWxsT3B0aW9uc31cbiAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfVxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VsZWN0IGNhdGVnb3JpZXMuLi5cIlxuICAgICAgICAvPlxuICAgICAgICA8VGV4dCB2YXJpYW50PVwic21cIiBjb2xvcj1cImdyZXk2MFwiIG10PVwieHNcIj5cbiAgICAgICAgICBTZWxlY3Qgb25lIG9yIG1vcmUgY2F0ZWdvcmllcyBmb3IgdGhpcyBuZXdzIGl0ZW0uXG4gICAgICAgIDwvVGV4dD5cbiAgICAgIDwvRm9ybUdyb3VwPlxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2F0ZWdvcnlNdWx0aVNlbGVjdDtcbiIsIkFkbWluSlMuVXNlckNvbXBvbmVudHMgPSB7fVxuaW1wb3J0IEZBUUJ1aWxkZXIgZnJvbSAnLi4vc3JjL2FkbWluL2NvbXBvbmVudHMvRkFRQnVpbGRlcidcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuRkFRQnVpbGRlciA9IEZBUUJ1aWxkZXJcbmltcG9ydCBJbWFnZVVwbG9hZGVyIGZyb20gJy4uL3NyYy9hZG1pbi9jb21wb25lbnRzL0ltYWdlVXBsb2FkZXInXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkltYWdlVXBsb2FkZXIgPSBJbWFnZVVwbG9hZGVyXG5pbXBvcnQgQ2F0ZWdvcnlNdWx0aVNlbGVjdCBmcm9tICcuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9DYXRlZ29yeU11bHRpU2VsZWN0J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5DYXRlZ29yeU11bHRpU2VsZWN0ID0gQ2F0ZWdvcnlNdWx0aVNlbGVjdCJdLCJuYW1lcyI6WyJGQVFCdWlsZGVyIiwicHJvcHMiLCJwcm9wZXJ0eSIsInJlY29yZCIsIm9uQ2hhbmdlIiwicmVzb3VyY2UiLCJhY3Rpb24iLCJwYWdlVHlwZSIsInBhcmFtcyIsImlzU2hvdyIsIm5hbWUiLCJnZXRJbml0aWFsRGF0YSIsImRpcmVjdFZhbHVlIiwiaXRlbXMiLCJwYXJzZWQiLCJKU09OIiwicGFyc2UiLCJlIiwiaSIsInVuZGVmaW5lZCIsInNob3dUaXRsZVZhbCIsInB1c2giLCJ0aXRsZSIsInN1YnRpdGxlIiwiZGVzY3JpcHRpb24iLCJzaG93VGl0bGUiLCJsZW5ndGgiLCJkYXRhIiwic2V0RGF0YSIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwidXBkYXRlQ29udGVudCIsIm5ld0RhdGEiLCJhZGRJdGVtIiwibmV3SXRlbXMiLCJhZGRUaXRsZVNlY3Rpb24iLCJyZW1vdmVJdGVtIiwiaW5kZXgiLCJmaWx0ZXIiLCJfIiwiaGFuZGxlSXRlbUNoYW5nZSIsImtleSIsInZhbCIsImlzRkFRIiwiaGFzSXRlbXMiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJCb3giLCJ2YXJpYW50IiwicCIsImJvcmRlciIsImJvcmRlclJhZGl1cyIsIm10IiwiYm94U2hhZG93IiwibWFwIiwiaXRlbSIsIm1iIiwicGIiLCJib3JkZXJCb3R0b20iLCJUZXh0IiwiZm9udFdlaWdodCIsImNvbG9yIiwiaXRhbGljIiwicG9zaXRpb24iLCJwdCIsInRvcCIsInJpZ2h0IiwiQnV0dG9uIiwidHlwZSIsInNpemUiLCJvbkNsaWNrIiwiSWNvbiIsImljb24iLCJGb3JtR3JvdXAiLCJMYWJlbCIsIklucHV0IiwidmFsdWUiLCJ0YXJnZXQiLCJwbGFjZWhvbGRlciIsIndpZHRoIiwiVGV4dEFyZWEiLCJyb3dzIiwiZmxleCIsImZsZXhEaXJlY3Rpb24iLCJqdXN0aWZ5Q29udGVudCIsImRpc3BsYXkiLCJhbGlnbkl0ZW1zIiwibXIiLCJJbWFnZVVwbG9hZGVyIiwicHJldmlldyIsInNldFByZXZpZXciLCJoYW5kbGVGaWxlQ2hhbmdlIiwiZmlsZXMiLCJmaWxlIiwicmVhZGVyIiwiRmlsZVJlYWRlciIsIm9ubG9hZGVuZCIsImJhc2U2NFN0cmluZyIsInJlc3VsdCIsInJlYWRBc0RhdGFVUkwiLCJoYW5kbGVDbGVhciIsImxhYmVsIiwidGV4dEFsaWduIiwic3JjIiwiYWx0Iiwic3R5bGUiLCJtYXhXaWR0aCIsIm1heEhlaWdodCIsIkRyb3Bab25lIiwidmFsaWRhdGUiLCJtYXhTaXplIiwibWltZVR5cGVzIiwiQ2F0ZWdvcnlNdWx0aVNlbGVjdCIsImFwaSIsIkFwaUNsaWVudCIsInNlbGVjdGVkT3B0aW9ucyIsInNldFNlbGVjdGVkT3B0aW9ucyIsImFsbE9wdGlvbnMiLCJzZXRBbGxPcHRpb25zIiwiaXNMb2FkaW5nIiwic2V0SXNMb2FkaW5nIiwibG9hZENhdGVnb3JpZXMiLCJyZXNwb25zZSIsInNlYXJjaFJlY29yZHMiLCJyZXNvdXJjZUlkIiwicXVlcnkiLCJvcHRpb25zIiwiciIsImlkIiwiY3VycmVudElkcyIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwic3RhcnRzV2l0aCIsInRvU3RyaW5nIiwicmF3VmFsdWUiLCJBcnJheSIsImlzQXJyYXkiLCJ2Iiwic2VsZWN0ZWQiLCJvcHQiLCJpbmNsdWRlcyIsImVycm9yIiwiY29uc29sZSIsImhhbmRsZUNoYW5nZSIsIm5ld09wdGlvbnMiLCJpZHMiLCJTZWxlY3QiLCJpc011bHRpIiwiQWRtaW5KUyIsIlVzZXJDb21wb25lbnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBSUEsTUFBTUEsVUFBdUMsR0FBSUMsS0FBSyxJQUFLO0lBQ3pELE1BQU07TUFBRUMsUUFBUTtNQUFFQyxNQUFNO01BQUVDLFFBQVE7RUFBRUMsSUFBQUE7RUFBUyxHQUFDLEdBQUdKLEtBQUs7RUFDdEQsRUFBQSxNQUFNSyxNQUFNLEdBQUlMLEtBQUssQ0FBU0ssTUFBTTtJQUNwQyxNQUFNQyxRQUFRLEdBQUdKLE1BQU0sQ0FBQ0ssTUFBTSxDQUFDRCxRQUFRLElBQUksS0FBSzs7RUFFaEQ7SUFDQSxNQUFNRSxNQUFNLEdBQUdILE1BQU0sRUFBRUksSUFBSSxLQUFLLE1BQU0sSUFBSSxDQUFDTixRQUFROztFQUVuRDtJQUNBLE1BQU1PLGNBQWMsR0FBR0EsTUFBTTtFQUMzQjtNQUNBLE1BQU1DLFdBQVcsR0FBR1QsTUFBTSxDQUFDSyxNQUFNLENBQUNOLFFBQVEsQ0FBQ1EsSUFBSSxDQUFDO0VBQ2hELElBQUEsSUFBSUUsV0FBVyxFQUFFO1FBQ2YsSUFBSSxPQUFPQSxXQUFXLEtBQUssUUFBUSxJQUFJQSxXQUFXLENBQUNDLEtBQUssRUFBRSxPQUFPRCxXQUFXO0VBQzVFLE1BQUEsSUFBSSxPQUFPQSxXQUFXLEtBQUssUUFBUSxFQUFFO1VBQ25DLElBQUk7RUFDRixVQUFBLE1BQU1FLE1BQU0sR0FBR0MsSUFBSSxDQUFDQyxLQUFLLENBQUNKLFdBQVcsQ0FBQztFQUN0QyxVQUFBLElBQUlFLE1BQU0sSUFBSUEsTUFBTSxDQUFDRCxLQUFLLEVBQUUsT0FBT0MsTUFBTTtVQUMzQyxDQUFDLENBQUMs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

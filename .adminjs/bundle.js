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

  const RoleList = props => {
    const {
      record
    } = props;

    // Use the pre-processed role names from our 'after' hook
    const roleNames = record.params.roleNames || [];
    if (!roleNames || roleNames.length === 0) {
      // Check if we have populated roles as fallback
      const populated = record.populated?.roles;
      const populatedRoles = Array.isArray(populated) ? populated : populated ? [populated] : [];
      if (populatedRoles.length > 0) {
        return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          flex: true,
          flexDirection: "row",
          flexWrap: "wrap"
        }, populatedRoles.map((role, index) => /*#__PURE__*/React__default.default.createElement(designSystem.Badge, {
          key: role.id || index,
          mr: "xs",
          mb: "xs",
          variant: "primary"
        }, role.params?.name || role.name || 'Role')));
      }
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        color: "grey40",
        fontSize: "sm"
      }, "No roles assigned");
    }

    // Handle case where it might be a JSON string
    const roleArray = Array.isArray(roleNames) ? roleNames : [];
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      flex: true,
      flexDirection: "row",
      flexWrap: "wrap"
    }, roleArray.map((name, index) => /*#__PURE__*/React__default.default.createElement(designSystem.Badge, {
      key: index,
      mr: "xs",
      mb: "xs",
      variant: "primary"
    }, name)));
  };

  AdminJS.UserComponents = {};
  AdminJS.UserComponents.FAQBuilder = FAQBuilder;
  AdminJS.UserComponents.ImageUploader = ImageUploader;
  AdminJS.UserComponents.CategoryMultiSelect = CategoryMultiSelect;
  AdminJS.UserComponents.RoleList = RoleList;

})(React, AdminJSDesignSystem, AdminJS);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9GQVFCdWlsZGVyLnRzeCIsIi4uL3NyYy9hZG1pbi9jb21wb25lbnRzL0ltYWdlVXBsb2FkZXIudHN4IiwiLi4vc3JjL2FkbWluL2NvbXBvbmVudHMvQ2F0ZWdvcnlNdWx0aVNlbGVjdC50c3giLCIuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9yb2xlLWxpc3QudHN4IiwiZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCb3gsIEJ1dHRvbiwgRm9ybUdyb3VwLCBJbnB1dCwgTGFiZWwsIFRleHRBcmVhLCBJY29uLCBUZXh0IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5pbXBvcnQgeyBCYXNlUHJvcGVydHlQcm9wcyB9IGZyb20gJ2FkbWluanMnO1xuXG5jb25zdCBGQVFCdWlsZGVyOiBSZWFjdC5GQzxCYXNlUHJvcGVydHlQcm9wcz4gPSAocHJvcHMpID0+IHtcbiAgY29uc3QgeyBwcm9wZXJ0eSwgcmVjb3JkLCBvbkNoYW5nZSwgcmVzb3VyY2UgfSA9IHByb3BzO1xuICBjb25zdCBhY3Rpb24gPSAocHJvcHMgYXMgYW55KS5hY3Rpb247XG4gIGNvbnN0IHBhZ2VUeXBlID0gcmVjb3JkLnBhcmFtcy5wYWdlVHlwZSB8fCAnZmFxJztcbiAgXG4gIC8vIERldGVjdCBpZiB3ZSBhcmUgaW4gXCJTaG93XCIgKHJlYWQtb25seSkgbW9kZVxuICBjb25zdCBpc1Nob3cgPSBhY3Rpb24/Lm5hbWUgPT09ICdzaG93JyB8fCAhb25DaGFuZ2U7XG5cbiAgLy8gRnVuY3Rpb24gdG8gcm9idXN0bHkgZXh0cmFjdCBkYXRhIGZyb20gcmVjb3JkLnBhcmFtcyAoaGFuZGxlcyBmbGF0dGVuZWQga2V5cylcbiAgY29uc3QgZ2V0SW5pdGlhbERhdGEgPSAoKSA9PiB7XG4gICAgLy8gMS4gVHJ5IGRpcmVjdCBhY2Nlc3NcbiAgICBjb25zdCBkaXJlY3RWYWx1ZSA9IHJlY29yZC5wYXJhbXNbcHJvcGVydHkubmFtZV07XG4gICAgaWYgKGRpcmVjdFZhbHVlKSB7XG4gICAgICBpZiAodHlwZW9mIGRpcmVjdFZhbHVlID09PSAnb2JqZWN0JyAmJiBkaXJlY3RWYWx1ZS5pdGVtcykgcmV0dXJuIGRpcmVjdFZhbHVlO1xuICAgICAgaWYgKHR5cGVvZiBkaXJlY3RWYWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBwYXJzZWQgPSBKU09OLnBhcnNlKGRpcmVjdFZhbHVlKTtcbiAgICAgICAgICBpZiAocGFyc2VkICYmIHBhcnNlZC5pdGVtcykgcmV0dXJuIHBhcnNlZDtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIEZhbGwgdGhyb3VnaCB0byBmbGF0dGVuZWQgY2hlY2tcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIDIuIFRyeSBmbGF0dGVuZWQgYWNjZXNzIChlLmcuLCBjb250ZW50Lml0ZW1zLjAudGl0bGUpXG4gICAgY29uc3QgaXRlbXMgPSBbXTtcbiAgICBsZXQgaSA9IDA7XG4gICAgd2hpbGUgKFxuICAgICAgcmVjb3JkLnBhcmFtc1tgJHtwcm9wZXJ0eS5uYW1lfS5pdGVtcy4ke2l9LnN1YnRpdGxlYF0gIT09IHVuZGVmaW5lZCB8fCBcbiAgICAgIHJlY29yZC5wYXJhbXNbYCR7cHJvcGVydHkubmFtZX0uaXRlbXMuJHtpfS50aXRsZWBdICE9PSB1bmRlZmluZWQgfHxcbiAgICAgIHJlY29yZC5wYXJhbXNbYCR7cHJvcGVydHkubmFtZX0uaXRlbXMuJHtpfS5kZXNjcmlwdGlvbmBdICE9PSB1bmRlZmluZWRcbiAgICApIHtcbiAgICAgIGNvbnN0IHNob3dUaXRsZVZhbCA9IHJlY29yZC5wYXJhbXNbYCR7cHJvcGVydHkubmFtZX0uaXRlbXMuJHtpfS5zaG93VGl0bGVgXTtcbiAgICAgIGl0ZW1zLnB1c2goe1xuICAgICAgICB0aXRsZTogcmVjb3JkLnBhcmFtc1tgJHtwcm9wZXJ0eS5uYW1lfS5pdGVtcy4ke2l9LnRpdGxlYF0gfHwgJycsXG4gICAgICAgIHN1YnRpdGxlOiByZWNvcmQucGFyYW1zW2Ake3Byb3BlcnR5Lm5hbWV9Lml0ZW1zLiR7aX0uc3VidGl0bGVgXSB8fCAnJyxcbiAgICAgICAgZGVzY3JpcHRpb246IHJlY29yZC5wYXJhbXNbYCR7cHJvcGVydHkubmFtZX0uaXRlbXMuJHtpfS5kZXNjcmlwdGlvbmBdIHx8ICcnLFxuICAgICAgICBzaG93VGl0bGU6IHNob3dUaXRsZVZhbCA9PT0gdHJ1ZSB8fCBzaG93VGl0bGVWYWwgPT09ICd0cnVlJyxcbiAgICAgIH0pO1xuICAgICAgaSsrO1xuICAgIH1cblxuICAgIHJldHVybiBpdGVtcy5sZW5ndGggPiAwID8geyBpdGVtcyB9IDogeyBpdGVtczogW10gfTtcbiAgfTtcblxuICBjb25zdCBbZGF0YSwgc2V0RGF0YV0gPSB1c2VTdGF0ZShnZXRJbml0aWFsRGF0YSgpKTtcblxuICAvLyBLZWVwIHN0YXRlIGluIHN5bmMgaWYgcmVjb3JkIGNoYW5nZXMgKGltcG9ydGFudCBmb3IgU2hvdyB2aWV3IHRyYW5zaXRpb24pXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0RGF0YShnZXRJbml0aWFsRGF0YSgpKTtcbiAgfSwgW3JlY29yZC5wYXJhbXNdKTtcblxuICBjb25zdCB1cGRhdGVDb250ZW50ID0gKG5ld0RhdGE6IGFueSkgPT4ge1xuICAgIHNldERhdGEobmV3RGF0YSk7XG4gICAgaWYgKG9uQ2hhbmdlKSB7XG4gICAgICBvbkNoYW5nZShwcm9wZXJ0eS5uYW1lLCBuZXdEYXRhKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgYWRkSXRlbSA9ICgpID0+IHtcbiAgICBjb25zdCBuZXdJdGVtcyA9IFsuLi4oZGF0YS5pdGVtcyB8fCBbXSksIHsgc3VidGl0bGU6ICcnLCBkZXNjcmlwdGlvbjogJycsIHNob3dUaXRsZTogZmFsc2UgfV07XG4gICAgdXBkYXRlQ29udGVudCh7IC4uLmRhdGEsIGl0ZW1zOiBuZXdJdGVtcyB9KTtcbiAgfTtcblxuICBjb25zdCBhZGRUaXRsZVNlY3Rpb24gPSAoKSA9PiB7XG4gICAgY29uc3QgbmV3SXRlbXMgPSBbLi4uKGRhdGEuaXRlbXMgfHwgW10pLCB7IHRpdGxlOiAnJywgc3VidGl0bGU6ICcnLCBkZXNjcmlwdGlvbjogJycsIHNob3dUaXRsZTogdHJ1ZSB9XTtcbiAgICB1cGRhdGVDb250ZW50KHsgLi4uZGF0YSwgaXRlbXM6IG5ld0l0ZW1zIH0pO1xuICB9O1xuXG4gIGNvbnN0IHJlbW92ZUl0ZW0gPSAoaW5kZXg6IG51bWJlcikgPT4ge1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gZGF0YS5pdGVtcy5maWx0ZXIoKF8sIGk6IG51bWJlcikgPT4gaSAhPT0gaW5kZXgpO1xuICAgIHVwZGF0ZUNvbnRlbnQoeyAuLi5kYXRhLCBpdGVtczogbmV3SXRlbXMgfSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlSXRlbUNoYW5nZSA9IChpbmRleDogbnVtYmVyLCBrZXk6IHN0cmluZywgdmFsOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBuZXdJdGVtcyA9IFsuLi5kYXRhLml0ZW1zXTtcbiAgICBuZXdJdGVtc1tpbmRleF0gPSB7IC4uLm5ld0l0ZW1zW2luZGV4XSwgW2tleV06IHZhbCB9O1xuICAgIHVwZGF0ZUNvbnRlbnQoeyAuLi5kYXRhLCBpdGVtczogbmV3SXRlbXMgfSk7XG4gIH07XG5cbiAgY29uc3QgaXNGQVEgPSBwYWdlVHlwZSA9PT0gJ2ZhcSc7XG4gIGNvbnN0IGhhc0l0ZW1zID0gZGF0YS5pdGVtcyAmJiBkYXRhLml0ZW1zLmxlbmd0aCA+IDA7XG5cbiAgaWYgKCFyZWNvcmQucGFyYW1zLnBhZ2VUeXBlKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpZiAoaXNTaG93KSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxCb3ggdmFyaWFudD1cIndoaXRlXCIgcD1cInh4bFwiIGJvcmRlcj1cIjFweCBzb2xpZCAjZGRkXCIgYm9yZGVyUmFkaXVzPVwibGdcIiBtdD1cInhsXCIgYm94U2hhZG93PVwiY2FyZFwiPlxuICAgICAgICB7aGFzSXRlbXMgPyAoXG4gICAgICAgICAgPEJveD5cbiAgICAgICAgICAgIHtkYXRhLml0ZW1zLm1hcCgoaXRlbTogYW55LCBpbmRleDogbnVtYmVyKSA9PiAoXG4gICAgICAgICAgICAgIDxCb3gga2V5PXtpbmRleH0gbWI9XCJ4bFwiIHBiPVwibGdcIiBib3JkZXJCb3R0b209e2luZGV4IDwgZGF0YS5pdGVtcy5sZW5ndGggLSAxID8gXCIxcHggc29saWQgI2VlZVwiIDogXCJub25lXCJ9PlxuICAgICAgICAgICAgICAgIHsoIWlzRkFRIHx8IGluZGV4ID09PSAwIHx8IGl0ZW0uc2hvd1RpdGxlKSAmJiBpdGVtLnRpdGxlICYmIChcbiAgICAgICAgICAgICAgICAgIDxUZXh0IHZhcmlhbnQ9XCJsZ1wiIGZvbnRXZWlnaHQ9XCJib2xkXCIgbWI9XCJzbVwiIGNvbG9yPVwicHJpbWFyeTEwMFwiPlxuICAgICAgICAgICAgICAgICAgICB7aXRlbS50aXRsZX1cbiAgICAgICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHtpc0ZBUSAmJiBpdGVtLnN1YnRpdGxlICYmIChcbiAgICAgICAgICAgICAgICAgIDxUZXh0IHZhcmlhbnQ9XCJtZFwiIGZvbnRXZWlnaHQ9XCJzZW1pYm9sZFwiIG1iPVwieHNcIiBjb2xvcj1cImdyZXk4MFwiPlxuICAgICAgICAgICAgICAgICAgICB7aXRlbS5zdWJ0aXRsZX1cbiAgICAgICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHtpdGVtLmRlc2NyaXB0aW9uICYmIChcbiAgICAgICAgICAgICAgICAgIDxUZXh0IHZhcmlhbnQ9XCJzbVwiIGNvbG9yPVwiZ3JleTYwXCI+XG4gICAgICAgICAgICAgICAgICAgIHtpdGVtLmRlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPFRleHQgaXRhbGljIGNvbG9yPVwiZ3JleTQwXCI+Tm8gZW50cmllcyBhZGRlZCB5ZXQuPC9UZXh0PlxuICAgICAgICApfVxuICAgICAgPC9Cb3g+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPEJveCB2YXJpYW50PVwid2hpdGVcIiBwPVwieHhsXCIgYm9yZGVyPVwiMXB4IHNvbGlkICNkZGRcIiBib3JkZXJSYWRpdXM9XCJsZ1wiIG10PVwieGxcIiBib3hTaGFkb3c9XCJjYXJkXCI+XG4gICAgICA8Qm94IG10PVwibGdcIj5cbiAgICAgICAge2RhdGEuaXRlbXMgJiYgZGF0YS5pdGVtcy5tYXAoKGl0ZW06IGFueSwgaW5kZXg6IG51bWJlcikgPT4gKFxuICAgICAgICAgIDxCb3gga2V5PXtpbmRleH0gbWI9XCJ4bFwiIHBvc2l0aW9uPVwicmVsYXRpdmVcIiBwdD1cImxnXCI+XG4gICAgICAgICAgICA8Qm94IHBvc2l0aW9uPVwiYWJzb2x1dGVcIiB0b3A9XCIxMHB4XCIgcmlnaHQ9XCIwXCI+XG4gICAgICAgICAgICAgIDxCdXR0b24gXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiIFxuICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJkYW5nZXJcIiBcbiAgICAgICAgICAgICAgICBzaXplPVwiaWNvblwiIFxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHJlbW92ZUl0ZW0oaW5kZXgpfVxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1cz1cImZ1bGxcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPEljb24gaWNvbj1cIlRyYXNoXCIgLz5cbiAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgeyghaXNGQVEgfHwgaW5kZXggPT09IDAgfHwgaXRlbS5zaG93VGl0bGUpICYmIChcbiAgICAgICAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICAgICAgICA8TGFiZWw+VGl0bGU8L0xhYmVsPlxuICAgICAgICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2l0ZW0udGl0bGUgfHwgJyd9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IGhhbmRsZUl0ZW1DaGFuZ2UoaW5kZXgsICd0aXRsZScsIGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgdGl0bGVcIlxuICAgICAgICAgICAgICAgICAgd2lkdGg9ezF9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+XG4gICAgICAgICAgICApfVxuXG4gICAgICAgICAgICB7aXNGQVEgJiYgKFxuICAgICAgICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgICAgICAgIDxMYWJlbD5TdWJ0aXRsZTwvTGFiZWw+XG4gICAgICAgICAgICAgICAgPElucHV0XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17aXRlbS5zdWJ0aXRsZSB8fCAnJ31cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gaGFuZGxlSXRlbUNoYW5nZShpbmRleCwgJ3N1YnRpdGxlJywgZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBzdWJ0aXRsZVwiXG4gICAgICAgICAgICAgICAgICB3aWR0aD17MX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgICAgIDxMYWJlbD5EZXNjcmlwdGlvbjwvTGFiZWw+XG4gICAgICAgICAgICAgIDxUZXh0QXJlYVxuICAgICAgICAgICAgICAgIHZhbHVlPXtpdGVtLmRlc2NyaXB0aW9uIHx8ICcnfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gaGFuZGxlSXRlbUNoYW5nZShpbmRleCwgJ2Rlc2NyaXB0aW9uJywgZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgZGVzY3JpcHRpb25cIlxuICAgICAgICAgICAgICAgIHdpZHRoPXsxfVxuICAgICAgICAgICAgICAgIHJvd3M9ezN9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgKSl9XG4gICAgICA8L0JveD5cblxuICAgICAgPEJveCBtdD1cInhsXCIgZmxleCBmbGV4RGlyZWN0aW9uPVwicm93XCIganVzdGlmeUNvbnRlbnQ9XCJjZW50ZXJcIiBwdD17aGFzSXRlbXMgPyAneGwnIDogJ25vbmUnfT5cbiAgICAgICAgPEJ1dHRvbiBcbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCIgXG4gICAgICAgICAgb25DbGljaz17YWRkSXRlbX0gXG4gICAgICAgICAgdmFyaWFudD1cIm91dGxpbmVcIiBcbiAgICAgICAgICBib3JkZXJSYWRpdXM9XCJmdWxsXCJcbiAgICAgICAgICBkaXNwbGF5PVwiZmxleFwiXG4gICAgICAgICAgYWxpZ25JdGVtcz1cImNlbnRlclwiXG4gICAgICAgICAgbXI9XCJtZFwiXG4gICAgICAgID5cbiAgICAgICAgICA8SWNvbiBpY29uPVwiUGx1c1wiIG1yPVwieHNcIiAvPiBcbiAgICAgICAgICB7aXNGQVEgPyAnQWRkIEZBUSBJdGVtcycgOiAnQWRkIFJlZ3VsYW1lbnRvIEl0ZW1zJ31cbiAgICAgICAgPC9CdXR0b24+XG5cbiAgICAgICAge2lzRkFRICYmIChcbiAgICAgICAgICA8QnV0dG9uIFxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiIFxuICAgICAgICAgICAgb25DbGljaz17YWRkVGl0bGVTZWN0aW9ufSBcbiAgICAgICAgICAgIHZhcmlhbnQ9XCJwcmltYXJ5XCIgXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM9XCJmdWxsXCJcbiAgICAgICAgICAgIGRpc3BsYXk9XCJmbGV4XCJcbiAgICAgICAgICAgIGFsaWduSXRlbXM9XCJjZW50ZXJcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxJY29uIGljb249XCJQbHVzXCIgbXI9XCJ4c1wiIC8+IEFkZCBUaXRsZVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICApfVxuICAgICAgPC9Cb3g+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBGQVFCdWlsZGVyO1xuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQm94LCBMYWJlbCwgSW5wdXQsIERyb3Bab25lLCBEcm9wWm9uZVByb3BzLCBCdXR0b24sIEljb24sIFRleHQgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IEJhc2VQcm9wZXJ0eVByb3BzIH0gZnJvbSAnYWRtaW5qcyc7XG5cbmNvbnN0IEltYWdlVXBsb2FkZXI6IFJlYWN0LkZDPEJhc2VQcm9wZXJ0eVByb3BzPiA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IHByb3BlcnR5LCByZWNvcmQsIG9uQ2hhbmdlLCB3aGVyZSB9ID0gcHJvcHM7XG4gIGNvbnN0IFtwcmV2aWV3LCBzZXRQcmV2aWV3XSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KHJlY29yZC5wYXJhbXNbcHJvcGVydHkubmFtZV0gfHwgbnVsbCk7XG5cbiAgY29uc3QgaGFuZGxlRmlsZUNoYW5nZTogRHJvcFpvbmVQcm9wc1snb25DaGFuZ2UnXSA9IChmaWxlcykgPT4ge1xuICAgIGNvbnN0IGZpbGUgPSBmaWxlc1swXTtcbiAgICBpZiAoZmlsZSkge1xuICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgIHJlYWRlci5vbmxvYWRlbmQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGJhc2U2NFN0cmluZyA9IHJlYWRlci5yZXN1bHQgYXMgc3RyaW5nO1xuICAgICAgICBzZXRQcmV2aWV3KGJhc2U2NFN0cmluZyk7XG4gICAgICAgIG9uQ2hhbmdlKHByb3BlcnR5Lm5hbWUsIGJhc2U2NFN0cmluZyk7XG4gICAgICB9O1xuICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNsZWFyID0gKCkgPT4ge1xuICAgIHNldFByZXZpZXcobnVsbCk7XG4gICAgb25DaGFuZ2UocHJvcGVydHkubmFtZSwgJycpO1xuICB9O1xuXG4gIC8vIExpc3QgVmlldyAoVGh1bWJuYWlsKVxuICBpZiAod2hlcmUgPT09ICdsaXN0Jykge1xuICAgIGNvbnN0IGltZ1VybCA9IHJlY29yZC5wYXJhbXNbcHJvcGVydHkubmFtZV07XG4gICAgaWYgKGltZ1VybCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGltZyBcbiAgICAgICAgICBzcmM9e2ltZ1VybH0gXG4gICAgICAgICAgYWx0PVwiVGh1bWJuYWlsXCIgXG4gICAgICAgICAgc3R5bGU9e3sgd2lkdGg6ICc0MHB4JywgaGVpZ2h0OiAnNDBweCcsIG9iamVjdEZpdDogJ2NvdmVyJywgYm9yZGVyUmFkaXVzOiAnNHB4JywgYm9yZGVyOiAnMXB4IHNvbGlkICNkZGQnIH19IFxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIDxUZXh0IGNvbG9yPVwiZ3JleTQwXCI+LTwvVGV4dD47XG4gIH1cblxuICAvLyBTaG93IFZpZXdcbiAgaWYgKHdoZXJlID09PSAnc2hvdycpIHtcbiAgICAgY29uc3QgaW1nVXJsID0gcmVjb3JkLnBhcmFtc1twcm9wZXJ0eS5uYW1lXTtcbiAgICAgcmV0dXJuIChcbiAgICAgICA8Qm94PlxuICAgICAgICAgPExhYmVsPntwcm9wZXJ0eS5sYWJlbH08L0xhYmVsPlxuICAgICAgICAge2ltZ1VybCA/IChcbiAgICAgICAgICAgPGltZyBzcmM9e2ltZ1VybH0gYWx0PVwiUHJldmlld1wiIHN0eWxlPXt7IG1heFdpZHRoOiAnMzAwcHgnLCBib3JkZXJSYWRpdXM6ICc0cHgnLCBib3JkZXI6ICcxcHggc29saWQgI2RkZCcgfX0gLz5cbiAgICAgICAgICkgOiAoXG4gICAgICAgICAgIDxUZXh0IGNvbG9yPVwiZ3JleTQwXCI+Tm8gaW1hZ2UgdXBsb2FkZWQ8L1RleHQ+XG4gICAgICAgICApfVxuICAgICAgIDwvQm94PlxuICAgICApO1xuICB9XG5cbiAgLy8gRWRpdC9DcmVhdGUgVmlld1xuICByZXR1cm4gKFxuICAgIDxCb3ggbWI9XCJ4bFwiPlxuICAgICAgPExhYmVsPntwcm9wZXJ0eS5sYWJlbH08L0xhYmVsPlxuICAgICAge3ByZXZpZXcgPyAoXG4gICAgICAgIDxCb3ggYm9yZGVyPVwiMXB4IHNvbGlkICNkZGRcIiBwPVwibWRcIiBib3JkZXJSYWRpdXM9XCJtZFwiIHBvc2l0aW9uPVwicmVsYXRpdmVcIiB0ZXh0QWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICA8aW1nIHNyYz17cHJldmlld30gYWx0PVwiUHJldmlld1wiIHN0eWxlPXt7IG1heFdpZHRoOiAnMTAwJScsIG1heEhlaWdodDogJzIwMHB4JywgYm9yZGVyUmFkaXVzOiAnNHB4JyB9fSAvPlxuICAgICAgICAgIDxCb3ggbXQ9XCJtZFwiPlxuICAgICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwiZGFuZ2VyXCIgc2l6ZT1cInNtXCIgb25DbGljaz17aGFuZGxlQ2xlYXJ9IHR5cGU9XCJidXR0b25cIj5cbiAgICAgICAgICAgICAgPEljb24gaWNvbj1cIlRyYXNoXCIgbXI9XCJ4c1wiIC8+IFJlbW92ZSBJbWFnZVxuICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgIDwvQm94PlxuICAgICAgKSA6IChcbiAgICAgICAgPERyb3Bab25lIG9uQ2hhbmdlPXtoYW5kbGVGaWxlQ2hhbmdlfSB2YWxpZGF0ZT17eyBtYXhTaXplOiA1MDAwMDAwLCBtaW1lVHlwZXM6IFsnaW1hZ2UvcG5nJywgJ2ltYWdlL2pwZWcnLCAnaW1hZ2UvanBnJywgJ2ltYWdlL3dlYnAnXSB9fSAvPlxuICAgICAgKX1cbiAgICAgIDxUZXh0IHZhcmlhbnQ9XCJzbVwiIGNvbG9yPVwiZ3JleTYwXCIgbXQ9XCJ4c1wiPlxuICAgICAgICBTZWxlY3QgYW4gaW1hZ2UuIEJhc2U2NCBmb3JtYXQgd2lsbCBiZSBzdG9yZWQgaW4gdGhlIGRhdGFiYXNlLlxuICAgICAgPC9UZXh0PlxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSW1hZ2VVcGxvYWRlcjtcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBCb3gsIEZvcm1Hcm91cCwgTGFiZWwsIFNlbGVjdCwgU2VsZWN0QXN5bmMsIFRleHQgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcclxuaW1wb3J0IHsgQmFzZVByb3BlcnR5UHJvcHMsIEFwaUNsaWVudCB9IGZyb20gJ2FkbWluanMnO1xyXG5cclxuY29uc3QgQ2F0ZWdvcnlNdWx0aVNlbGVjdDogUmVhY3QuRkM8QmFzZVByb3BlcnR5UHJvcHM+ID0gKHByb3BzKSA9PiB7XHJcbiAgY29uc3QgeyBwcm9wZXJ0eSwgcmVjb3JkLCBvbkNoYW5nZSwgd2hlcmUgfSA9IHByb3BzO1xyXG4gIGNvbnN0IGlzTGlzdCA9IHdoZXJlID09PSAnbGlzdCc7XHJcbiAgY29uc3QgaXNTaG93ID0gd2hlcmUgPT09ICdzaG93JztcclxuICBjb25zdCBhcGkgPSBuZXcgQXBpQ2xpZW50KCk7XHJcblxyXG4gIC8vIEZvciBMaXN0IHZpZXcsIGp1c3Qgc2hvdyBjb21tYS1zZXBhcmF0ZWQgbmFtZXNcclxuICBpZiAoaXNMaXN0KSB7XHJcbiAgICAvLyAxLiBUcnkgdG8gZ2V0IHRpdGxlcyBmcm9tIHBvcHVsYXRlZCBkYXRhIChiZXN0IHdheSlcclxuICAgIGNvbnN0IHBvcHVsYXRlZCA9IHJlY29yZC5wb3B1bGF0ZWQ/Lltwcm9wZXJ0eS5uYW1lXTtcclxuICAgIGlmIChwb3B1bGF0ZWQpIHtcclxuICAgICAgY29uc3QgaXRlbXMgPSBBcnJheS5pc0FycmF5KHBvcHVsYXRlZCkgPyBwb3B1bGF0ZWQgOiBbcG9wdWxhdGVkXTtcclxuICAgICAgY29uc3QgdGl0bGVzID0gaXRlbXMubWFwKHAgPT4gcC50aXRsZSB8fCBwLnBhcmFtcz8udGl0bGUgfHwgcC5pZCkuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJywgJyk7XHJcbiAgICAgIGlmICh0aXRsZXMpIHJldHVybiA8VGV4dD57dGl0bGVzfTwvVGV4dD47XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIDIuIEZhbGxiYWNrOiBDaGVjayBpZiBuYW1lcyBleGlzdCBpbiBwYXJhbXMgKHNvbWV0aW1lcyBmbGF0dGVuZWQgYXMgY2F0ZWdvcmllcy4wLnRpdGxlKVxyXG4gICAgY29uc3QgcGFyYW1zVGl0bGVzOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgT2JqZWN0LmtleXMocmVjb3JkLnBhcmFtcykuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoYCR7cHJvcGVydHkubmFtZX0uYCkgJiYga2V5LmVuZHNXaXRoKCcudGl0bGUnKSkge1xyXG4gICAgICAgIHBhcmFtc1RpdGxlcy5wdXNoKHJlY29yZC5wYXJhbXNba2V5XSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgaWYgKHBhcmFtc1RpdGxlcy5sZW5ndGggPiAwKSByZXR1cm4gPFRleHQ+e3BhcmFtc1RpdGxlcy5qb2luKCcsICcpfTwvVGV4dD47XHJcblxyXG4gICAgcmV0dXJuIDxUZXh0Pi08L1RleHQ+O1xyXG4gIH1cclxuICBcclxuICAvLyBDdXJyZW50IHZhbHVlcyBhcmUgdXN1YWxseSBzdG9yZWQgYXMgY2F0ZWdvcmllcy4wLCBjYXRlZ29yaWVzLjEsIGV0YyBvciBhcyBhIHJhdyBhcnJheSBpbiBzb21lIGNvbnRleHRzXHJcbiAgY29uc3QgW3NlbGVjdGVkT3B0aW9ucywgc2V0U2VsZWN0ZWRPcHRpb25zXSA9IHVzZVN0YXRlPGFueVtdPihbXSk7XHJcbiAgY29uc3QgW2FsbE9wdGlvbnMsIHNldEFsbE9wdGlvbnNdID0gdXNlU3RhdGU8YW55W10+KFtdKTtcclxuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBsb2FkQ2F0ZWdvcmllcyA9IGFzeW5jICgpID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5zZWFyY2hSZWNvcmRzKHtcclxuICAgICAgICAgIHJlc291cmNlSWQ6ICdOb3RpY2lhc0NhdGVnb3J5JyxcclxuICAgICAgICAgIHF1ZXJ5OiAnJyxcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBvcHRpb25zID0gcmVzcG9uc2UubWFwKHIgPT4gKHtcclxuICAgICAgICAgIHZhbHVlOiByLmlkLFxyXG4gICAgICAgICAgbGFiZWw6IHIudGl0bGUsXHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHNldEFsbE9wdGlvbnMob3B0aW9ucyk7XHJcblxyXG4gICAgICAgIC8vIEdldCBjdXJyZW50bHkgc2VsZWN0ZWQgSURzXHJcbiAgICAgICAgY29uc3QgY3VycmVudElkczogc3RyaW5nW10gPSBbXTtcclxuICAgICAgICBPYmplY3Qua2V5cyhyZWNvcmQucGFyYW1zKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoYCR7cHJvcGVydHkubmFtZX0uYCkpIHtcclxuICAgICAgICAgICAgY29uc3QgdmFsID0gcmVjb3JkLnBhcmFtc1trZXldO1xyXG4gICAgICAgICAgICBpZiAodmFsKSBjdXJyZW50SWRzLnB1c2godmFsLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IHJhd1ZhbHVlID0gcmVjb3JkLnBhcmFtc1twcm9wZXJ0eS5uYW1lXTtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyYXdWYWx1ZSkpIHtcclxuICAgICAgICAgICAgcmF3VmFsdWUuZm9yRWFjaCh2ID0+IGN1cnJlbnRJZHMucHVzaCh2LnRvU3RyaW5nKCkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gb3B0aW9ucy5maWx0ZXIob3B0ID0+IGN1cnJlbnRJZHMuaW5jbHVkZXMob3B0LnZhbHVlLnRvU3RyaW5nKCkpKTtcclxuICAgICAgICBzZXRTZWxlY3RlZE9wdGlvbnMoc2VsZWN0ZWQpO1xyXG4gICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGxvYWQgY2F0ZWdvcmllczonLCBlcnJvcik7XHJcbiAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBsb2FkQ2F0ZWdvcmllcygpO1xyXG4gIH0sIFtyZWNvcmQuaWQsIHJlY29yZC5wYXJhbXNdKTsgLy8gVXBkYXRlIG9uIHJlY29yZCBjaGFuZ2VcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2hhbmdlID0gKHNlbGVjdGVkOiBhbnkpID0+IHtcclxuICAgIGNvbnN0IG5ld09wdGlvbnMgPSBzZWxlY3RlZCA/IChBcnJheS5pc0FycmF5KHNlbGVjdGVkKSA/IHNlbGVjdGVkIDogW3NlbGVjdGVkXSkgOiBbXTtcclxuICAgIHNldFNlbGVjdGVkT3B0aW9ucyhuZXdPcHRpb25zKTtcclxuICAgIGNvbnN0IGlkcyA9IG5ld09wdGlvbnMubWFwKG9wdCA9PiBvcHQudmFsdWUpO1xyXG4gICAgb25DaGFuZ2UocHJvcGVydHkubmFtZSwgaWRzKTtcclxuICB9O1xyXG5cclxuICBpZiAoaXNTaG93KSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8Rm9ybUdyb3VwPlxyXG4gICAgICAgIDxMYWJlbD57cHJvcGVydHkubGFiZWx9PC9MYWJlbD5cclxuICAgICAgICA8Qm94IHZhcmlhbnQ9XCJ3aGl0ZVwiIHA9XCJtZFwiIGJvcmRlcj1cIjFweCBzb2xpZCAjZGRkXCIgYm9yZGVyUmFkaXVzPVwibWRcIj5cclxuICAgICAgICAgIHtzZWxlY3RlZE9wdGlvbnMubGVuZ3RoID4gMCA/IChcclxuICAgICAgICAgICAgPEJveCBmbGV4IGZsZXhEaXJlY3Rpb249XCJyb3dcIiBmbGV4V3JhcD1cIndyYXBcIj5cclxuICAgICAgICAgICAgICB7c2VsZWN0ZWRPcHRpb25zLm1hcChvcHQgPT4gKFxyXG4gICAgICAgICAgICAgICAgPEJveCBrZXk9e29wdC52YWx1ZX0gYmc9XCJwcmltYXJ5MTAwXCIgY29sb3I9XCJ3aGl0ZVwiIHB4PVwic21cIiBweT1cInhzXCIgbXI9XCJ4c1wiIG1iPVwieHNcIiBib3JkZXJSYWRpdXM9XCJtZFwiPlxyXG4gICAgICAgICAgICAgICAgICB7b3B0LmxhYmVsfVxyXG4gICAgICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgPFRleHQgY29sb3I9XCJncmV5NDBcIj5ObyBjYXRlZ29yaWVzIHNlbGVjdGVkPC9UZXh0PlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICA8L0JveD5cclxuICAgICAgPC9Gb3JtR3JvdXA+XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxCb3ggbWI9XCJ4bFwiPlxyXG4gICAgICA8Rm9ybUdyb3VwPlxyXG4gICAgICAgIDxMYWJlbD57cHJvcGVydHkubGFiZWx9PC9MYWJlbD5cclxuICAgICAgICA8U2VsZWN0XHJcbiAgICAgICAgICBpc011bHRpXHJcbiAgICAgICAgICBpc0xvYWRpbmc9e2lzTG9hZGluZ31cclxuICAgICAgICAgIHZhbHVlPXtzZWxlY3RlZE9wdGlvbnN9XHJcbiAgICAgICAgICBvcHRpb25zPXthbGxPcHRpb25zfVxyXG4gICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cclxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VsZWN0IGNhdGVnb3JpZXMuLi5cIlxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPFRleHQgdmFyaWFudD1cInNtXCIgY29sb3I9XCJncmV5NjBcIiBtdD1cInhzXCI+XHJcbiAgICAgICAgICBTZWxlY3Qgb25lIG9yIG1vcmUgY2F0ZWdvcmllcyBmb3IgdGhpcyBuZXdzIGl0ZW0uXHJcbiAgICAgICAgPC9UZXh0PlxyXG4gICAgICA8L0Zvcm1Hcm91cD5cclxuICAgIDwvQm94PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDYXRlZ29yeU11bHRpU2VsZWN0O1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBCYWRnZSwgQm94IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSdcbmltcG9ydCB7IEJhc2VQcm9wZXJ0eVByb3BzIH0gZnJvbSAnYWRtaW5qcydcblxuY29uc3QgUm9sZUxpc3Q6IFJlYWN0LkZDPEJhc2VQcm9wZXJ0eVByb3BzPiA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IHJlY29yZCB9ID0gcHJvcHNcbiAgXG4gIC8vIFVzZSB0aGUgcHJlLXByb2Nlc3NlZCByb2xlIG5hbWVzIGZyb20gb3VyICdhZnRlcicgaG9va1xuICBjb25zdCByb2xlTmFtZXMgPSByZWNvcmQucGFyYW1zLnJvbGVOYW1lcyB8fCBbXVxuICBcbiAgaWYgKCFyb2xlTmFtZXMgfHwgcm9sZU5hbWVzLmxlbmd0aCA9PT0gMCkge1xuICAgIC8vIENoZWNrIGlmIHdlIGhhdmUgcG9wdWxhdGVkIHJvbGVzIGFzIGZhbGxiYWNrXG4gICAgY29uc3QgcG9wdWxhdGVkID0gcmVjb3JkLnBvcHVsYXRlZD8ucm9sZXNcbiAgICBjb25zdCBwb3B1bGF0ZWRSb2xlcyA9IEFycmF5LmlzQXJyYXkocG9wdWxhdGVkKSA/IHBvcHVsYXRlZCA6IChwb3B1bGF0ZWQgPyBbcG9wdWxhdGVkXSA6IFtdKVxuICAgIFxuICAgIGlmIChwb3B1bGF0ZWRSb2xlcy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Qm94IGZsZXggZmxleERpcmVjdGlvbj1cInJvd1wiIGZsZXhXcmFwPVwid3JhcFwiPlxuICAgICAgICAgIHtwb3B1bGF0ZWRSb2xlcy5tYXAoKHJvbGU6IGFueSwgaW5kZXg6IG51bWJlcikgPT4gKFxuICAgICAgICAgICAgPEJhZGdlIGtleT17cm9sZS5pZCB8fCBpbmRleH0gbXI9XCJ4c1wiIG1iPVwieHNcIiB2YXJpYW50PVwicHJpbWFyeVwiPlxuICAgICAgICAgICAgICB7cm9sZS5wYXJhbXM/Lm5hbWUgfHwgcm9sZS5uYW1lIHx8ICdSb2xlJ31cbiAgICAgICAgICAgIDwvQmFkZ2U+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvQm94PlxuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gPEJveCBjb2xvcj1cImdyZXk0MFwiIGZvbnRTaXplPVwic21cIj5ObyByb2xlcyBhc3NpZ25lZDwvQm94PlxuICB9XG5cbiAgLy8gSGFuZGxlIGNhc2Ugd2hlcmUgaXQgbWlnaHQgYmUgYSBKU09OIHN0cmluZ1xuICBjb25zdCByb2xlQXJyYXkgPSBBcnJheS5pc0FycmF5KHJvbGVOYW1lcykgPyByb2xlTmFtZXMgOiBbXVxuXG4gIHJldHVybiAoXG4gICAgPEJveCBmbGV4IGZsZXhEaXJlY3Rpb249XCJyb3dcIiBmbGV4V3JhcD1cIndyYXBcIj5cbiAgICAgIHtyb2xlQXJyYXkubWFwKChuYW1lOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpID0+IChcbiAgICAgICAgPEJhZGdlIGtleT17aW5kZXh9IG1yPVwieHNcIiBtYj1cInhzXCIgdmFyaWFudD1cInByaW1hcnlcIj5cbiAgICAgICAgICB7bmFtZX1cbiAgICAgICAgPC9CYWRnZT5cbiAgICAgICkpfVxuICAgIDwvQm94PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IFJvbGVMaXN0XG4iLCJBZG1pbkpTLlVzZXJDb21wb25lbnRzID0ge31cbmltcG9ydCBGQVFCdWlsZGVyIGZyb20gJy4uL3NyYy9hZG1pbi9jb21wb25lbnRzL0ZBUUJ1aWxkZXInXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkZBUUJ1aWxkZXIgPSBGQVFCdWlsZGVyXG5pbXBvcnQgSW1hZ2VVcGxvYWRlciBmcm9tICcuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9JbWFnZVVwbG9hZGVyJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5JbWFnZVVwbG9hZGVyID0gSW1hZ2VVcGxvYWRlclxuaW1wb3J0IENhdGVnb3J5TXVsdGlTZWxlY3QgZnJvbSAnLi4vc3JjL2FkbWluL2NvbXBvbmVudHMvQ2F0ZWdvcnlNdWx0aVNlbGVjdCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ2F0ZWdvcnlNdWx0aVNlbGVjdCA9IENhdGVnb3J5TXVsdGlTZWxlY3RcbmltcG9ydCBSb2xlTGlzdCBmcm9tICcuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9yb2xlLWxpc3QnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlJvbGVMaXN0ID0gUm9sZUxpc3QiXSwibmFtZXMiOlsiRkFRQnVpbGRlciIsInByb3BzIiwicHJvcGVydHkiLCJyZWNvcmQiLCJvbkNoYW5nZSIsInJlc291cmNlIiwiYWN0aW9uIiwicGFnZVR5cGUiLCJwYXJhbXMiLCJpc1Nob3ciLCJuYW1lIiwiZ2V0SW5pdGlhbERhdGEiLCJkaXJlY3RWYWx1ZSIsIml0ZW1zIiwicGFyc2VkIiwiSlNPTiIsInBhcnNlIiwiZSIsImkiLCJ1bmRlZmluZWQiLCJzaG93VGl0bGVWYWwiLCJwdXNoIiwidGl0bGUiLCJzdWJ0aXRsZSIsImRlc2NyaXB0aW9uIiwic2hvd1RpdGxlIiwibGVuZ3RoIiwiZGF0YSIsInNldERhdGEiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsInVwZGF0ZUNvbnRlbnQiLCJuZXdEYXRhIiwiYWRkSXRlbSIsIm5ld0l0ZW1zIiwiYWRkVGl0bGVTZWN0aW9uIiwicmVtb3ZlSXRlbSIsImluZGV4IiwiZmlsdGVyIiwiXyIsImhhbmRsZUl0ZW1DaGFuZ2UiLCJrZXkiLCJ2YWwiLCJpc0ZBUSIsImhhc0l0ZW1zIiwiUmVhY3QiLCJjcmVhdGVFbGVtZW50IiwiQm94IiwidmFyaWFudCIsInAiLCJib3JkZXIiLCJib3JkZXJSYWRpdXMiLCJtdCIsImJveFNoYWRvdyIsIm1hcCIsIml0ZW0iLCJtYiIsInBiIiwiYm9yZGVyQm90dG9tIiwiVGV4dCIsImZvbnRXZWlnaHQiLCJjb2xvciIsIml0YWxpYyIsInBvc2l0aW9uIiwicHQiLCJ0b3AiLCJyaWdodCIsIkJ1dHRvbiIsInR5cGUiLCJzaXplIiwib25DbGljayIsIkljb24iLCJpY29uIiwiRm9ybUdyb3VwIiwiTGFiZWwiLCJJbnB1dCIsInZhbHVlIiwidGFyZ2V0IiwicGxhY2Vob2xkZXIiLCJ3aWR0aCIsIlRleHRBcmVhIiwicm93cyIsImZsZXgiLCJmbGV4RGlyZWN0aW9uIiwianVzdGlmeUNvbnRlbnQiLCJkaXNwbGF5IiwiYWxpZ25JdGVtcyIsIm1yIiwiSW1hZ2VVcGxvYWRlciIsIndoZXJlIiwicHJldmlldyIsInNldFByZXZpZXciLCJoYW5kbGVGaWxlQ2hhbmdlIiwiZmlsZXMiLCJmaWxlIiwicmVhZGVyIiwiRmlsZVJlYWRlciIsIm9ubG9hZGVuZCIsImJhc2U2NFN0cmluZyIsInJlc3VsdCIsInJlYWRBc0RhdGFVUkwiLCJoYW5kbGVDbGVhciIsImltZ1VybCIsInNyYyIsImFsdCIsInN0eWxlIiwiaGVpZ2h0Iiwib2JqZWN0Rml0IiwibGFiZWwiLCJtYXhXaWR0aCIsInRleHRBbGlnbiIsIm1heEhlaWdodCIsIkRyb3Bab25lIiwidmFsaWRhdGUiLCJtYXhTaXplIiwibWltZVR5cGVzIiwiQ2F0ZWdvcnlNdWx0aVNlbGVjdCIsImlzTGlzdCIsImFwaSIsIkFwaUNsaWVudCIsInBvcHVsYXRlZCIsIkFycmF5IiwiaXNBcnJheSIsInRpdGxlcyIsImlkIiwiQm9vbGVhbiIsImpvaW4iLCJwYXJhbXNUaXRsZXMiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsInN0YXJ0c1dpdGgiLCJlbmRzV2l0aCIsInNlbGVjdGVkT3B0aW9ucyIsInNldFNlbGVjdGVkT3B0aW9ucyIsImFsbE9wdGlvbnMiLCJzZXRBbGxPcHRpb25zIiwiaXNMb2FkaW5nIiwic2V0SXNMb2FkaW5nIiwibG9hZENhdGVnb3JpZXMiLCJyZXNwb25zZSIsInNlYXJjaFJlY29yZHMiLCJyZXNvdXJjZUlkIiwicXVlcnkiLCJvcHRpb25zIiwiciIsImN1cnJlbnRJZHMiLCJ0b1N0cmluZyIsInJhd1ZhbHVlIiwidiIsInNlbGVjdGVkIiwib3B0IiwiaW5jbHVkZXMiLCJlcnJvciIsImNvbnNvbGUiLCJoYW5kbGVDaGFuZ2UiLCJuZXdPcHRpb25zIiwiaWRzIiwiZmxleFdyYXAiLCJiZyIsInB4IiwicHkiLCJTZWxlY3QiLCJpc011bHRpIiwiUm9sZUxpc3QiLCJyb2xlTmFtZXMiLCJyb2xlcyIsInBvcHVsYXRlZFJvbGVzIiwicm9sZSIsIkJhZGdlIiwiZm9udFNpemUiLCJyb2xlQXJyYXkiLCJBZG1pbkpTIiwiVXNlckNvbXBvbmVudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFJQSxNQUFNQSxVQUF1QyxHQUFJQyxLQUFLLElBQUs7SUFDekQsTUFBTTtNQUFFQyxRQUFRO01BQUVDLE1BQU07TUFBRUMsUUFBUTtFQUFFQyxJQUFBQTtFQUFTLEdBQUMsR0FBR0osS0FBSztFQUN0RCxFQUFBLE1BQU1LLE1BQU0sR0FBSUwsS0FBSyxDQUFTSyxNQUFNO0lBQ3BDLE1BQU1DLFFBQVEsR0FBR0osTUFBTSxDQUFDSyxNQUFNLENBQUNELFFBQVEsSUFBSSxLQUFLOztFQUVoRDtJQUNBLE1BQU1FLE1BQU0sR0FBR0gsTUFBTSxFQUFFSSxJQUFJLEtBQUssTUFBTSxJQUFJLENBQUNOLFFBQVE7O0VBRW5EO0lBQ0EsTUFBTU8sY0FBYyxHQUFHQSxNQUFNO0VBQzNCO01BQ0EsTUFBTUMsV0FBVyxHQUFHVCxNQUFNLENBQUNLLE1BQU0sQ0FBQ04sUUFBUSxDQUFDUSxJQUFJLENBQUM7RUFDaEQsSUFBQSxJQUFJRSxXQUFXLEVBQUU7UUFDZixJQUFJLE9BQU9BLFdBQVcsS0FBSyxRQUFRLElBQUlBLFdBQVcsQ0FBQ0MsS0FBSyxFQUFFLE9BQU9ELFdBQVc7RUFDNUUsTUFBQSxJQUFJLE9BQU9BLFdBQVcsS0FBSyxRQUFRLEVBQUU7VUFDbkMsSUFBSTtFQUNGLFVBQUEsTUFBTUUsTUFBTSxHQUFHQyxJQUFJLENBQUNDLEtBQUssQ0FBQ0osV0FBVyxDQUFDO0VBQ3RDLFVBQUEsSUFBSUUsTUFBTSxJQUFJQSxNQUFNLENBQUNELEtBQUssRUFBRSxPQUFPQyxNQUFNO1VBQzNDLENBQUMsQ0FBQyxPQUFPRyxDQUFDLEVBQUU7RUFDVjtFQUFBLFFBQUE7RUFFSixNQUFBO0VBQ0YsSUFBQTs7RUFFQTtNQUNBLE1BQU1KLEtBQUssR0FBRyxFQUFFO01BQ2hCLElBQUlLLENBQUMsR0FBRyxDQUFDO01BQ1QsT0FDRWYsTUFBTSxDQUFDSyxNQUFNLENBQUMsR0FBR04sUUFBUSxDQUFDUSxJQUFJLENBQUEsT0FBQSxFQUFVUSxDQUFDLFdBQVcsQ0FBQyxLQUFLQyxTQUFTLElBQ25FaEIsTUFBTSxDQUFDSyxNQUFNLENBQUMsR0FBR04sUUFBUSxDQUFDUSxJQUFJLENBQUEsT0FBQSxFQUFVUSxDQUFDLFFBQVEsQ0FBQyxLQUFLQyxTQUFTLElBQ2hFaEIsTUFBTSxDQUFDSyxNQUFNLENBQUMsR0FBR04sUUFBUSxDQUFDUSxJQUFJLENBQUEsT0FBQSxFQUFVUSxDQUFDLGNBQWMsQ0FBQyxLQUFLQyxTQUFTLEVBQ3RFO0VBQ0EsTUFBQSxNQUFNQyxZQUFZLEdBQUdqQixNQUFNLENBQUNLLE1BQU0sQ0FBQyxDQUFBLEVBQUdOLFFBQVEsQ0FBQ1EsSUFBSSxDQUFBLE9BQUEsRUFBVVEsQ0FBQyxZQUFZLENBQUM7UUFDM0VMLEtBQUssQ0FBQ1EsSUFBSSxDQUFDO0VBQ1RDLFFBQUFBLEtBQUssRUFBRW5CLE1BQU0sQ0FBQ0ssTUFBTSxDQUFDLENBQUEsRUFBR04sUUFBUSxDQUFDUSxJQUFJLENBQUEsT0FBQSxFQUFVUSxDQUFDLENBQUEsTUFBQSxDQUFRLENBQUMsSUFBSSxFQUFFO0VBQy9ESyxRQUFBQSxRQUFRLEVBQUVwQixNQUFNLENBQUNLLE1BQU0sQ0FBQyxDQUFBLEVBQUdOLFFBQVEsQ0FBQ1EsSUFBSSxDQUFBLE9BQUEsRUFBVVEsQ0FBQyxDQUFBLFNBQUEsQ0FBVyxDQUFDLElBQUksRUFBRTtFQUNyRU0sUUFBQUEsV0FBVyxFQUFFckIsTUFBTSxDQUFDSyxNQUFNLENBQUMsQ0FBQSxFQUFHTixRQUFRLENBQUNRLElBQUksQ0FBQSxPQUFBLEVBQVVRLENBQUMsQ0FBQSxZQUFBLENBQWMsQ0FBQyxJQUFJLEVBQUU7RUFDM0VPLFFBQUFBLFNBQVMsRUFBRUwsWUFBWSxLQUFLLElBQUksSUFBSUEsWUFBWSxLQUFLO0VBQ3ZELE9BQUMsQ0FBQztFQUNGRixNQUFBQSxDQUFDLEVBQUU7RUFDTCxJQUFBO0VBRUEsSUFBQSxPQUFPTCxLQUFLLENBQUNhLE1BQU0sR0FBRyxDQUFDLEdBQUc7RUFBRWIsTUFBQUE7RUFBTSxLQUFDLEdBQUc7RUFBRUEsTUFBQUEsS0FBSyxFQUFFO09BQUk7SUFDckQsQ0FBQztJQUVELE1BQU0sQ0FBQ2MsSUFBSSxFQUFFQyxPQUFPLENBQUMsR0FBR0MsY0FBUSxDQUFDbEIsY0FBYyxFQUFFLENBQUM7O0VBRWxEO0VBQ0FtQixFQUFBQSxlQUFTLENBQUMsTUFBTTtFQUNkRixJQUFBQSxPQUFPLENBQUNqQixjQUFjLEVBQUUsQ0FBQztFQUMzQixFQUFBLENBQUMsRUFBRSxDQUFDUixNQUFNLENBQUNLLE1BQU0sQ0FBQyxDQUFDO0lBRW5CLE1BQU11QixhQUFhLEdBQUlDLE9BQVksSUFBSztNQUN0Q0osT0FBTyxDQUFDSSxPQUFPLENBQUM7RUFDaEIsSUFBQSxJQUFJNUIsUUFBUSxFQUFFO0VBQ1pBLE1BQUFBLFFBQVEsQ0FBQ0YsUUFBUSxDQUFDUSxJQUFJLEVBQUVzQixPQUFPLENBQUM7RUFDbEMsSUFBQTtJQUNGLENBQUM7SUFFRCxNQUFNQyxPQUFPLEdBQUdBLE1BQU07TUFDcEIsTUFBTUMsUUFBUSxHQUFHLENBQUMsSUFBSVAsSUFBSSxDQUFDZCxLQUFLLElBQUksRUFBRSxDQUFDLEVBQUU7RUFBRVUsTUFBQUEsUUFBUSxFQUFFLEVBQUU7RUFBRUMsTUFBQUEsV0FBVyxFQUFFLEVBQUU7RUFBRUMsTUFBQUEsU0FBUyxFQUFFO0VBQU0sS0FBQyxDQUFDO0VBQzdGTSxJQUFBQSxhQUFhLENBQUM7RUFBRSxNQUFBLEdBQUdKLElBQUk7RUFBRWQsTUFBQUEsS0FBSyxFQUFFcUI7RUFBUyxLQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELE1BQU1DLGVBQWUsR0FBR0EsTUFBTTtNQUM1QixNQUFNRCxRQUFRLEdBQUcsQ0FBQyxJQUFJUCxJQUFJLENBQUNkLEtBQUssSUFBSSxFQUFFLENBQUMsRUFBRTtFQUFFUyxNQUFBQSxLQUFLLEVBQUUsRUFBRTtFQUFFQyxNQUFBQSxRQUFRLEVBQUUsRUFBRTtFQUFFQyxNQUFBQSxXQUFXLEVBQUUsRUFBRTtFQUFFQyxNQUFBQSxTQUFTLEVBQUU7RUFBSyxLQUFDLENBQUM7RUFDdkdNLElBQUFBLGFBQWEsQ0FBQztFQUFFLE1BQUEsR0FBR0osSUFBSTtFQUFFZCxNQUFBQSxLQUFLLEVBQUVxQjtFQUFTLEtBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsTUFBTUUsVUFBVSxHQUFJQyxLQUFhLElBQUs7RUFDcEMsSUFBQSxNQUFNSCxRQUFRLEdBQUdQLElBQUksQ0FBQ2QsS0FBSyxDQUFDeUIsTUFBTSxDQUFDLENBQUNDLENBQUMsRUFBRXJCLENBQVMsS0FBS0EsQ0FBQyxLQUFLbUIsS0FBSyxDQUFDO0VBQ2pFTixJQUFBQSxhQUFhLENBQUM7RUFBRSxNQUFBLEdBQUdKLElBQUk7RUFBRWQsTUFBQUEsS0FBSyxFQUFFcUI7RUFBUyxLQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELE1BQU1NLGdCQUFnQixHQUFHQSxDQUFDSCxLQUFhLEVBQUVJLEdBQVcsRUFBRUMsR0FBVyxLQUFLO0VBQ3BFLElBQUEsTUFBTVIsUUFBUSxHQUFHLENBQUMsR0FBR1AsSUFBSSxDQUFDZCxLQUFLLENBQUM7TUFDaENxQixRQUFRLENBQUNHLEtBQUssQ0FBQyxHQUFHO1FBQUUsR0FBR0gsUUFBUSxDQUFDRyxLQUFLLENBQUM7RUFBRSxNQUFBLENBQUNJLEdBQUcsR0FBR0M7T0FBSztFQUNwRFgsSUFBQUEsYUFBYSxDQUFDO0VBQUUsTUFBQSxHQUFHSixJQUFJO0VBQUVkLE1BQUFBLEtBQUssRUFBRXFCO0VBQVMsS0FBQyxDQUFDO0lBQzdDLENBQUM7RUFFRCxFQUFBLE1BQU1TLEtBQUssR0FBR3BDLFFBQVEsS0FBSyxLQUFLO0VBQ2hDLEVBQUEsTUFBTXFDLFFBQVEsR0FBR2pCLElBQUksQ0FBQ2QsS0FBSyxJQUFJYyxJQUFJLENBQUNkLEtBQUssQ0FBQ2EsTUFBTSxHQUFHLENBQUM7RUFFcEQsRUFBQSxJQUFJLENBQUN2QixNQUFNLENBQUNLLE1BQU0sQ0FBQ0QsUUFBUSxFQUFFO0VBQzNCLElBQUEsT0FBTyxJQUFJO0VBQ2IsRUFBQTtFQUVBLEVBQUEsSUFBSUUsTUFBTSxFQUFFO0VBQ1YsSUFBQSxvQkFDRW9DLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ0MsZ0JBQUcsRUFBQTtFQUFDQyxNQUFBQSxPQUFPLEVBQUMsT0FBTztFQUFDQyxNQUFBQSxDQUFDLEVBQUMsS0FBSztFQUFDQyxNQUFBQSxNQUFNLEVBQUMsZ0JBQWdCO0VBQUNDLE1BQUFBLFlBQVksRUFBQyxJQUFJO0VBQUNDLE1BQUFBLEVBQUUsRUFBQyxJQUFJO0VBQUNDLE1BQUFBLFNBQVMsRUFBQztPQUFNLEVBQzVGVCxRQUFRLGdCQUNQQyxzQkFBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUEsSUFBQSxFQUNEcEIsSUFBSSxDQUFDZCxLQUFLLENBQUN5QyxHQUFHLENBQUMsQ0FBQ0MsSUFBUyxFQUFFbEIsS0FBYSxrQkFDdkNRLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ0MsZ0JBQUcsRUFBQTtFQUFDTixNQUFBQSxHQUFHLEVBQUVKLEtBQU07RUFBQ21CLE1BQUFBLEVBQUUsRUFBQyxJQUFJO0VBQUNDLE1BQUFBLEVBQUUsRUFBQyxJQUFJO0VBQUNDLE1BQUFBLFlBQVksRUFBRXJCLEtBQUssR0FBR1YsSUFBSSxDQUFDZCxLQUFLLENBQUNhLE1BQU0sR0FBRyxDQUFDLEdBQUcsZ0JBQWdCLEdBQUc7T0FBTyxFQUN0RyxDQUFDLENBQUNpQixLQUFLLElBQUlOLEtBQUssS0FBSyxDQUFDLElBQUlrQixJQUFJLENBQUM5QixTQUFTLEtBQUs4QixJQUFJLENBQUNqQyxLQUFLLGlCQUN0RHVCLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ2EsaUJBQUksRUFBQTtFQUFDWCxNQUFBQSxPQUFPLEVBQUMsSUFBSTtFQUFDWSxNQUFBQSxVQUFVLEVBQUMsTUFBTTtFQUFDSixNQUFBQSxFQUFFLEVBQUMsSUFBSTtFQUFDSyxNQUFBQSxLQUFLLEVBQUM7RUFBWSxLQUFBLEVBQzVETixJQUFJLENBQUNqQyxLQUNGLENBQ1AsRUFDQXFCLEtBQUssSUFBSVksSUFBSSxDQUFDaEMsUUFBUSxpQkFDckJzQixzQkFBQSxDQUFBQyxhQUFBLENBQUNhLGlCQUFJLEVBQUE7RUFBQ1gsTUFBQUEsT0FBTyxFQUFDLElBQUk7RUFBQ1ksTUFBQUEsVUFBVSxFQUFDLFVBQVU7RUFBQ0osTUFBQUEsRUFBRSxFQUFDLElBQUk7RUFBQ0ssTUFBQUEsS0FBSyxFQUFDO0VBQVEsS0FBQSxFQUM1RE4sSUFBSSxDQUFDaEMsUUFDRixDQUNQLEVBQ0FnQyxJQUFJLENBQUMvQixXQUFXLGlCQUNmcUIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDYSxpQkFBSSxFQUFBO0VBQUNYLE1BQUFBLE9BQU8sRUFBQyxJQUFJO0VBQUNhLE1BQUFBLEtBQUssRUFBQztFQUFRLEtBQUEsRUFDOUJOLElBQUksQ0FBQy9CLFdBQ0YsQ0FFTCxDQUNOLENBQ0UsQ0FBQyxnQkFFTnFCLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ2EsaUJBQUksRUFBQTtRQUFDRyxNQUFNLEVBQUEsSUFBQTtFQUFDRCxNQUFBQSxLQUFLLEVBQUM7T0FBUSxFQUFDLHVCQUEyQixDQUV0RCxDQUFDO0VBRVYsRUFBQTtFQUVBLEVBQUEsb0JBQ0VoQixzQkFBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUE7RUFBQ0MsSUFBQUEsT0FBTyxFQUFDLE9BQU87RUFBQ0MsSUFBQUEsQ0FBQyxFQUFDLEtBQUs7RUFBQ0MsSUFBQUEsTUFBTSxFQUFDLGdCQUFnQjtFQUFDQyxJQUFBQSxZQUFZLEVBQUMsSUFBSTtFQUFDQyxJQUFBQSxFQUFFLEVBQUMsSUFBSTtFQUFDQyxJQUFBQSxTQUFTLEVBQUM7RUFBTSxHQUFBLGVBQzdGUixzQkFBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUE7RUFBQ0ssSUFBQUEsRUFBRSxFQUFDO0VBQUksR0FBQSxFQUNUekIsSUFBSSxDQUFDZCxLQUFLLElBQUljLElBQUksQ0FBQ2QsS0FBSyxDQUFDeUMsR0FBRyxDQUFDLENBQUNDLElBQVMsRUFBRWxCLEtBQWEsa0JBQ3JEUSxzQkFBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUE7RUFBQ04sSUFBQUEsR0FBRyxFQUFFSixLQUFNO0VBQUNtQixJQUFBQSxFQUFFLEVBQUMsSUFBSTtFQUFDTyxJQUFBQSxRQUFRLEVBQUMsVUFBVTtFQUFDQyxJQUFBQSxFQUFFLEVBQUM7RUFBSSxHQUFBLGVBQ2xEbkIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDQyxnQkFBRyxFQUFBO0VBQUNnQixJQUFBQSxRQUFRLEVBQUMsVUFBVTtFQUFDRSxJQUFBQSxHQUFHLEVBQUMsTUFBTTtFQUFDQyxJQUFBQSxLQUFLLEVBQUM7RUFBRyxHQUFBLGVBQzNDckIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDcUIsbUJBQU0sRUFBQTtFQUNMQyxJQUFBQSxJQUFJLEVBQUMsUUFBUTtFQUNicEIsSUFBQUEsT0FBTyxFQUFDLFFBQVE7RUFDaEJxQixJQUFBQSxJQUFJLEVBQUMsTUFBTTtFQUNYQyxJQUFBQSxPQUFPLEVBQUVBLE1BQU1sQyxVQUFVLENBQUNDLEtBQUssQ0FBRTtFQUNqQ2MsSUFBQUEsWUFBWSxFQUFDO0VBQU0sR0FBQSxlQUVuQk4sc0JBQUEsQ0FBQUMsYUFBQSxDQUFDeUIsaUJBQUksRUFBQTtFQUFDQyxJQUFBQSxJQUFJLEVBQUM7RUFBTyxHQUFFLENBQ2QsQ0FDTCxDQUFDLEVBRUwsQ0FBQyxDQUFDN0IsS0FBSyxJQUFJTixLQUFLLEtBQUssQ0FBQyxJQUFJa0IsSUFBSSxDQUFDOUIsU0FBUyxrQkFDdkNvQixzQkFBQSxDQUFBQyxhQUFBLENBQUMyQixzQkFBUyxFQUFBLElBQUEsZUFDUjVCLHNCQUFBLENBQUFDLGFBQUEsQ0FBQzRCLGtCQUFLLEVBQUEsSUFBQSxFQUFDLE9BQVksQ0FBQyxlQUNwQjdCLHNCQUFBLENBQUFDLGFBQUEsQ0FBQzZCLGtCQUFLLEVBQUE7RUFDSkMsSUFBQUEsS0FBSyxFQUFFckIsSUFBSSxDQUFDakMsS0FBSyxJQUFJLEVBQUc7RUFDeEJsQixJQUFBQSxRQUFRLEVBQUdhLENBQUMsSUFBS3VCLGdCQUFnQixDQUFDSCxLQUFLLEVBQUUsT0FBTyxFQUFFcEIsQ0FBQyxDQUFDNEQsTUFBTSxDQUFDRCxLQUFLLENBQUU7RUFDbEVFLElBQUFBLFdBQVcsRUFBQyxhQUFhO0VBQ3pCQyxJQUFBQSxLQUFLLEVBQUU7S0FDUixDQUNRLENBQ1osRUFFQXBDLEtBQUssaUJBQ0pFLHNCQUFBLENBQUFDLGFBQUEsQ0FBQzJCLHNCQUFTLEVBQUEsSUFBQSxlQUNSNUIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDNEIsa0JBQUssRUFBQSxJQUFBLEVBQUMsVUFBZSxDQUFDLGVBQ3ZCN0Isc0JBQUEsQ0FBQUMsYUFBQSxDQUFDNkIsa0JBQUssRUFBQTtFQUNKQyxJQUFBQSxLQUFLLEVBQUVyQixJQUFJLENBQUNoQyxRQUFRLElBQUksRUFBRztFQUMzQm5CLElBQUFBLFFBQVEsRUFBR2EsQ0FBQyxJQUFLdUIsZ0JBQWdCLENBQUNILEtBQUssRUFBRSxVQUFVLEVBQUVwQixDQUFDLENBQUM0RCxNQUFNLENBQUNELEtBQUssQ0FBRTtFQUNyRUUsSUFBQUEsV0FBVyxFQUFDLGdCQUFnQjtFQUM1QkMsSUFBQUEsS0FBSyxFQUFFO0tBQ1IsQ0FDUSxDQUNaLGVBRURsQyxzQkFBQSxDQUFBQyxhQUFBLENBQUMyQixzQkFBUyxFQUFBLElBQUEsZUFDUjVCLHNCQUFBLENBQUFDLGFBQUEsQ0FBQzRCLGtCQUFLLFFBQUMsYUFBa0IsQ0FBQyxlQUMxQjdCLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ2tDLHFCQUFRLEVBQUE7RUFDUEosSUFBQUEsS0FBSyxFQUFFckIsSUFBSSxDQUFDL0IsV0FBVyxJQUFJLEVBQUc7RUFDOUJwQixJQUFBQSxRQUFRLEVBQUdhLENBQUMsSUFBS3VCLGdCQUFnQixDQUFDSCxLQUFLLEVBQUUsYUFBYSxFQUFFcEIsQ0FBQyxDQUFDNEQsTUFBTSxDQUFDRCxLQUFLLENBQUU7RUFDeEVFLElBQUFBLFdBQVcsRUFBQyxtQkFBbUI7RUFDL0JDLElBQUFBLEtBQUssRUFBRSxDQUFFO0VBQ1RFLElBQUFBLElBQUksRUFBRTtLQUNQLENBQ1EsQ0FDUixDQUNOLENBQ0UsQ0FBQyxlQUVOcEMsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDQyxnQkFBRyxFQUFBO0VBQUNLLElBQUFBLEVBQUUsRUFBQyxJQUFJO01BQUM4QixJQUFJLEVBQUEsSUFBQTtFQUFDQyxJQUFBQSxhQUFhLEVBQUMsS0FBSztFQUFDQyxJQUFBQSxjQUFjLEVBQUMsUUFBUTtFQUFDcEIsSUFBQUEsRUFBRSxFQUFFcEIsUUFBUSxHQUFHLElBQUksR0FBRztFQUFPLEdBQUEsZUFDekZDLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ3FCLG1CQUFNLEVBQUE7RUFDTEMsSUFBQUEsSUFBSSxFQUFDLFFBQVE7RUFDYkUsSUFBQUEsT0FBTyxFQUFFckMsT0FBUTtFQUNqQmUsSUFBQUEsT0FBTyxFQUFDLFNBQVM7RUFDakJHLElBQUFBLFlBQVksRUFBQyxNQUFNO0VBQ25Ca0MsSUFBQUEsT0FBTyxFQUFDLE1BQU07RUFDZEMsSUFBQUEsVUFBVSxFQUFDLFFBQVE7RUFDbkJDLElBQUFBLEVBQUUsRUFBQztFQUFJLEdBQUEsZUFFUDFDLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ3lCLGlCQUFJLEVBQUE7RUFBQ0MsSUFBQUEsSUFBSSxFQUFDLE1BQU07RUFBQ2UsSUFBQUEsRUFBRSxFQUFDO0VBQUksR0FBRSxDQUFDLEVBQzNCNUMsS0FBSyxHQUFHLGVBQWUsR0FBRyx1QkFDckIsQ0FBQyxFQUVSQSxLQUFLLGlCQUNKRSxzQkFBQSxDQUFBQyxhQUFBLENBQUNxQixtQkFBTSxFQUFBO0VBQ0xDLElBQUFBLElBQUksRUFBQyxRQUFRO0VBQ2JFLElBQUFBLE9BQU8sRUFBRW5DLGVBQWdCO0VBQ3pCYSxJQUFBQSxPQUFPLEVBQUMsU0FBUztFQUNqQkcsSUFBQUEsWUFBWSxFQUFDLE1BQU07RUFDbkJrQyxJQUFBQSxPQUFPLEVBQUMsTUFBTTtFQUNkQyxJQUFBQSxVQUFVLEVBQUM7RUFBUSxHQUFBLGVBRW5CekMsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDeUIsaUJBQUksRUFBQTtFQUFDQyxJQUFBQSxJQUFJLEVBQUMsTUFBTTtFQUFDZSxJQUFBQSxFQUFFLEVBQUM7RUFBSSxHQUFFLENBQUMsRUFBQSxZQUN0QixDQUVQLENBQ0YsQ0FBQztFQUVWLENBQUM7O0VDM01ELE1BQU1DLGFBQTBDLEdBQUl2RixLQUFLLElBQUs7SUFDNUQsTUFBTTtNQUFFQyxRQUFRO01BQUVDLE1BQU07TUFBRUMsUUFBUTtFQUFFcUYsSUFBQUE7RUFBTSxHQUFDLEdBQUd4RixLQUFLO0VBQ25ELEVBQUEsTUFBTSxDQUFDeUYsT0FBTyxFQUFFQyxVQUFVLENBQUMsR0FBRzlELGNBQVEsQ0FBZ0IxQixNQUFNLENBQUNLLE1BQU0sQ0FBQ04sUUFBUSxDQUFDUSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUM7SUFFM0YsTUFBTWtGLGdCQUEyQyxHQUFJQyxLQUFLLElBQUs7RUFDN0QsSUFBQSxNQUFNQyxJQUFJLEdBQUdELEtBQUssQ0FBQyxDQUFDLENBQUM7RUFDckIsSUFBQSxJQUFJQyxJQUFJLEVBQUU7RUFDUixNQUFBLE1BQU1DLE1BQU0sR0FBRyxJQUFJQyxVQUFVLEVBQUU7UUFDL0JELE1BQU0sQ0FBQ0UsU0FBUyxHQUFHLE1BQU07RUFDdkIsUUFBQSxNQUFNQyxZQUFZLEdBQUdILE1BQU0sQ0FBQ0ksTUFBZ0I7VUFDNUNSLFVBQVUsQ0FBQ08sWUFBWSxDQUFDO0VBQ3hCOUYsUUFBQUEsUUFBUSxDQUFDRixRQUFRLENBQUNRLElBQUksRUFBRXdGLFlBQVksQ0FBQztRQUN2QyxDQUFDO0VBQ0RILE1BQUFBLE1BQU0sQ0FBQ0ssYUFBYSxDQUFDTixJQUFJLENBQUM7RUFDNUIsSUFBQTtJQUNGLENBQUM7SUFFRCxNQUFNTyxXQUFXLEdBQUdBLE1BQU07TUFDeEJWLFVBQVUsQ0FBQyxJQUFJLENBQUM7RUFDaEJ2RixJQUFBQSxRQUFRLENBQUNGLFFBQVEsQ0FBQ1EsSUFBSSxFQUFFLEVBQUUsQ0FBQztJQUM3QixDQUFDOztFQUVEO0lBQ0EsSUFBSStFLEtBQUssS0FBSyxNQUFNLEVBQUU7TUFDcEIsTUFBTWEsTUFBTSxHQUFHbkcsTUFBTSxDQUFDSyxNQUFNLENBQUNOLFFBQVEsQ0FBQ1EsSUFBSSxDQUFDO0VBQzNDLElBQUEsSUFBSTRGLE1BQU0sRUFBRTtRQUNWLG9CQUNFekQsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEtBQUEsRUFBQTtFQUNFeUQsUUFBQUEsR0FBRyxFQUFFRCxNQUFPO0VBQ1pFLFFBQUFBLEdBQUcsRUFBQyxXQUFXO0VBQ2ZDLFFBQUFBLEtBQUssRUFBRTtFQUFFMUIsVUFBQUEsS0FBSyxFQUFFLE1BQU07RUFBRTJCLFVBQUFBLE1BQU0sRUFBRSxNQUFNO0VBQUVDLFVBQUFBLFNBQVMsRUFBRSxPQUFPO0VBQUV4RCxVQUFBQSxZQUFZLEVBQUUsS0FBSztFQUFFRCxVQUFBQSxNQUFNLEVBQUU7RUFBaUI7RUFBRSxPQUM3RyxDQUFDO0VBRU4sSUFBQTtFQUNBLElBQUEsb0JBQU9MLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ2EsaUJBQUksRUFBQTtFQUFDRSxNQUFBQSxLQUFLLEVBQUM7RUFBUSxLQUFBLEVBQUMsR0FBTyxDQUFDO0VBQ3RDLEVBQUE7O0VBRUE7SUFDQSxJQUFJNEIsS0FBSyxLQUFLLE1BQU0sRUFBRTtNQUNuQixNQUFNYSxNQUFNLEdBQUduRyxNQUFNLENBQUNLLE1BQU0sQ0FBQ04sUUFBUSxDQUFDUSxJQUFJLENBQUM7TUFDM0Msb0JBQ0VtQyxzQkFBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUEsSUFBQSxlQUNGRixzQkFBQSxDQUFBQyxhQUFBLENBQUM0QixrQkFBSyxFQUFBLElBQUEsRUFBRXhFLFFBQVEsQ0FBQzBHLEtBQWEsQ0FBQyxFQUM5Qk4sTUFBTSxnQkFDTHpELHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS3lELE1BQUFBLEdBQUcsRUFBRUQsTUFBTztFQUFDRSxNQUFBQSxHQUFHLEVBQUMsU0FBUztFQUFDQyxNQUFBQSxLQUFLLEVBQUU7RUFBRUksUUFBQUEsUUFBUSxFQUFFLE9BQU87RUFBRTFELFFBQUFBLFlBQVksRUFBRSxLQUFLO0VBQUVELFFBQUFBLE1BQU0sRUFBRTtFQUFpQjtFQUFFLEtBQUUsQ0FBQyxnQkFFL0dMLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ2EsaUJBQUksRUFBQTtFQUFDRSxNQUFBQSxLQUFLLEVBQUM7T0FBUSxFQUFDLG1CQUF1QixDQUUzQyxDQUFDO0VBRVgsRUFBQTs7RUFFQTtFQUNBLEVBQUEsb0JBQ0VoQixzQkFBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUE7RUFBQ1MsSUFBQUEsRUFBRSxFQUFDO0VBQUksR0FBQSxlQUNWWCxzQkFBQSxDQUFBQyxhQUFBLENBQUM0QixrQkFBSyxRQUFFeEUsUUFBUSxDQUFDMEcsS0FBYSxDQUFDLEVBQzlCbEIsT0FBTyxnQkFDTjdDLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ0MsZ0JBQUcsRUFBQTtFQUFDRyxJQUFBQSxNQUFNLEVBQUMsZ0JBQWdCO0VBQUNELElBQUFBLENBQUMsRUFBQyxJQUFJO0VBQUNFLElBQUFBLFlBQVksRUFBQyxJQUFJO0VBQUNZLElBQUFBLFFBQVEsRUFBQyxVQUFVO0VBQUMrQyxJQUFBQSxTQUFTLEVBQUM7S0FBUSxlQUMxRmpFLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS3lELElBQUFBLEdBQUcsRUFBRWIsT0FBUTtFQUFDYyxJQUFBQSxHQUFHLEVBQUMsU0FBUztFQUFDQyxJQUFBQSxLQUFLLEVBQUU7RUFBRUksTUFBQUEsUUFBUSxFQUFFLE1BQU07RUFBRUUsTUFBQUEsU0FBUyxFQUFFLE9BQU87RUFBRTVELE1BQUFBLFlBQVksRUFBRTtFQUFNO0VBQUUsR0FBRSxDQUFDLGVBQ3pHTixzQkFBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUE7RUFBQ0ssSUFBQUEsRUFBRSxFQUFDO0VBQUksR0FBQSxlQUNWUCxzQkFBQSxDQUFBQyxhQUFBLENBQUNxQixtQkFBTSxFQUFBO0VBQUNuQixJQUFBQSxPQUFPLEVBQUMsUUFBUTtFQUFDcUIsSUFBQUEsSUFBSSxFQUFDLElBQUk7RUFBQ0MsSUFBQUEsT0FBTyxFQUFFK0IsV0FBWTtFQUFDakMsSUFBQUEsSUFBSSxFQUFDO0VBQVEsR0FBQSxlQUNwRXZCLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ3lCLGlCQUFJLEVBQUE7RUFBQ0MsSUFBQUEsSUFBSSxFQUFDLE9BQU87RUFBQ2UsSUFBQUEsRUFBRSxFQUFDO0tBQU0sQ0FBQyxFQUFBLGVBQ3ZCLENBQ0wsQ0FDRixDQUFDLGdCQUVOMUMsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDa0UscUJBQVEsRUFBQTtFQUFDNUcsSUFBQUEsUUFBUSxFQUFFd0YsZ0JBQWlCO0VBQUNxQixJQUFBQSxRQUFRLEVBQUU7RUFBRUMsTUFBQUEsT0FBTyxFQUFFLE9BQU87UUFBRUMsU0FBUyxFQUFFLENBQUMsV0FBVyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsWUFBWTtFQUFFO0VBQUUsR0FBRSxDQUMzSSxlQUNEdEUsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDYSxpQkFBSSxFQUFBO0VBQUNYLElBQUFBLE9BQU8sRUFBQyxJQUFJO0VBQUNhLElBQUFBLEtBQUssRUFBQyxRQUFRO0VBQUNULElBQUFBLEVBQUUsRUFBQztLQUFJLEVBQUMsZ0VBRXBDLENBQ0gsQ0FBQztFQUVWLENBQUM7O0VDekVELE1BQU1nRSxtQkFBZ0QsR0FBSW5ILEtBQUssSUFBSztJQUNsRSxNQUFNO01BQUVDLFFBQVE7TUFBRUMsTUFBTTtNQUFFQyxRQUFRO0VBQUVxRixJQUFBQTtFQUFNLEdBQUMsR0FBR3hGLEtBQUs7RUFDbkQsRUFBQSxNQUFNb0gsTUFBTSxHQUFHNUIsS0FBSyxLQUFLLE1BQU07RUFDL0IsRUFBQSxNQUFNaEYsTUFBTSxHQUFHZ0YsS0FBSyxLQUFLLE1BQU07RUFDL0IsRUFBQSxNQUFNNkIsR0FBRyxHQUFHLElBQUlDLGlCQUFTLEVBQUU7O0VBRTNCO0VBQ0EsRUFBQSxJQUFJRixNQUFNLEVBQUU7RUFDVjtNQUNBLE1BQU1HLFNBQVMsR0FBR3JILE1BQU0sQ0FBQ3FILFNBQVMsR0FBR3RILFFBQVEsQ0FBQ1EsSUFBSSxDQUFDO0VBQ25ELElBQUEsSUFBSThHLFNBQVMsRUFBRTtFQUNiLE1BQUEsTUFBTTNHLEtBQUssR0FBRzRHLEtBQUssQ0FBQ0MsT0FBTyxDQUFDRixTQUFTLENBQUMsR0FBR0EsU0FBUyxHQUFHLENBQUNBLFNBQVMsQ0FBQztFQUNoRSxNQUFBLE1BQU1HLE1BQU0sR0FBRzlHLEtBQUssQ0FBQ3lDLEdBQUcsQ0FBQ0wsQ0FBQyxJQUFJQSxDQUFDLENBQUMzQixLQUFLLElBQUkyQixDQUFDLENBQUN6QyxNQUFNLEVBQUVjLEtBQUssSUFBSTJCLENBQUMsQ0FBQzJFLEVBQUUsQ0FBQyxDQUFDdEYsTUFBTSxDQUFDdUYsT0FBTyxDQUFDLENBQUNDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDNUYsSUFBSUgsTUFBTSxFQUFFLG9CQUFPOUUsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDYSxpQkFBSSxFQUFBLElBQUEsRUFBRWdFLE1BQWEsQ0FBQztFQUMxQyxJQUFBOztFQUVBO01BQ0EsTUFBTUksWUFBc0IsR0FBRyxFQUFFO01BQ2pDQyxNQUFNLENBQUNDLElBQUksQ0FBQzlILE1BQU0sQ0FBQ0ssTUFBTSxDQUFDLENBQUMwSCxPQUFPLENBQUN6RixHQUFHLElBQUk7RUFDeEMsTUFBQSxJQUFJQSxHQUFHLENBQUMwRixVQUFVLENBQUMsQ0FBQSxFQUFHakksUUFBUSxDQUFDUSxJQUFJLENBQUEsQ0FBQSxDQUFHLENBQUMsSUFBSStCLEdBQUcsQ0FBQzJGLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtVQUNqRUwsWUFBWSxDQUFDMUcsSUFBSSxDQUFDbEIsTUFBTSxDQUFDSyxNQUFNLENBQUNpQyxHQUFHLENBQUMsQ0FBQztFQUN2QyxNQUFBO0VBQ0YsSUFBQSxDQUFDLENBQUM7RUFDRixJQUFBLElBQUlzRixZQUFZLENBQUNyRyxNQUFNLEdBQUcsQ0FBQyxFQUFFLG9CQUFPbUIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDYSxpQkFBSSxRQUFFb0UsWUFBWSxDQUFDRCxJQUFJLENBQUMsSUFBSSxDQUFRLENBQUM7RUFFMUUsSUFBQSxvQkFBT2pGLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ2EsaUJBQUksRUFBQSxJQUFBLEVBQUMsR0FBTyxDQUFDO0VBQ3ZCLEVBQUE7O0VBRUE7SUFDQSxNQUFNLENBQUMwRSxlQUFlLEVBQUVDLGtCQUFrQixDQUFDLEdBQUd6RyxjQUFRLENBQVEsRUFBRSxDQUFDO0lBQ2pFLE1BQU0sQ0FBQzBHLFVBQVUsRUFBRUMsYUFBYSxDQUFDLEdBQUczRyxjQUFRLENBQVEsRUFBRSxDQUFDO0lBQ3ZELE1BQU0sQ0FBQzRHLFNBQVMsRUFBRUMsWUFBWSxDQUFDLEdBQUc3RyxjQUFRLENBQUMsSUFBSSxDQUFDO0VBRWhEQyxFQUFBQSxlQUFTLENBQUMsTUFBTTtFQUNkLElBQUEsTUFBTTZHLGNBQWMsR0FBRyxZQUFZO1FBQ2pDLElBQUk7RUFDRixRQUFBLE1BQU1DLFFBQVEsR0FBRyxNQUFNdEIsR0FBRyxDQUFDdUIsYUFBYSxDQUFDO0VBQ3ZDQyxVQUFBQSxVQUFVLEVBQUUsa0JBQWtCO0VBQzlCQyxVQUFBQSxLQUFLLEVBQUU7RUFDVCxTQUFDLENBQUM7RUFFRixRQUFBLE1BQU1DLE9BQU8sR0FBR0osUUFBUSxDQUFDdEYsR0FBRyxDQUFDMkYsQ0FBQyxLQUFLO1lBQ2pDckUsS0FBSyxFQUFFcUUsQ0FBQyxDQUFDckIsRUFBRTtZQUNYaEIsS0FBSyxFQUFFcUMsQ0FBQyxDQUFDM0g7RUFDWCxTQUFDLENBQUMsQ0FBQztVQUVIa0gsYUFBYSxDQUFDUSxPQUFPLENBQUM7O0VBRXRCO1VBQ0EsTUFBTUUsVUFBb0IsR0FBRyxFQUFFO1VBQy9CbEIsTUFBTSxDQUFDQyxJQUFJLENBQUM5SCxNQUFNLENBQUNLLE1BQU0sQ0FBQyxDQUFDMEgsT0FBTyxDQUFDekYsR0FBRyxJQUFJO1lBQ3hDLElBQUlBLEdBQUcsQ0FBQzBGLFVBQVUsQ0FBQyxDQUFBLEVBQUdqSSxRQUFRLENBQUNRLElBQUksQ0FBQSxDQUFBLENBQUcsQ0FBQyxFQUFFO0VBQ3ZDLFlBQUEsTUFBTWdDLEdBQUcsR0FBR3ZDLE1BQU0sQ0FBQ0ssTUFBTSxDQUFDaUMsR0FBRyxDQUFDO2NBQzlCLElBQUlDLEdBQUcsRUFBRXdHLFVBQVUsQ0FBQzdILElBQUksQ0FBQ3FCLEdBQUcsQ0FBQ3lHLFFBQVEsRUFBRSxDQUFDO0VBQzFDLFVBQUE7RUFDRixRQUFBLENBQUMsQ0FBQztVQUVGLE1BQU1DLFFBQVEsR0FBR2pKLE1BQU0sQ0FBQ0ssTUFBTSxDQUFDTixRQUFRLENBQUNRLElBQUksQ0FBQztFQUM3QyxRQUFBLElBQUkrRyxLQUFLLENBQUNDLE9BQU8sQ0FBQzBCLFFBQVEsQ0FBQyxFQUFFO0VBQ3pCQSxVQUFBQSxRQUFRLENBQUNsQixPQUFPLENBQUNtQixDQUFDLElBQUlILFVBQVUsQ0FBQzdILElBQUksQ0FBQ2dJLENBQUMsQ0FBQ0YsUUFBUSxFQUFFLENBQUMsQ0FBQztFQUN4RCxRQUFBO1VBRUEsTUFBTUcsUUFBUSxHQUFHTixPQUFPLENBQUMxRyxNQUFNLENBQUNpSCxHQUFHLElBQUlMLFVBQVUsQ0FBQ00sUUFBUSxDQUFDRCxHQUFHLENBQUMzRSxLQUFLLENBQUN1RSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1VBQ2pGYixrQkFBa0IsQ0FBQ2dCLFFBQVEsQ0FBQztVQUM1QlosWUFBWSxDQUFDLEtBQUssQ0FBQztRQUNyQixDQUFDLENBQUMsT0FBT2UsS0FBSyxFQUFFO0VBQ2RDLFFBQUFBLE9BQU8sQ0FBQ0QsS0FBSyxDQUFDLDRCQUE0QixFQUFFQSxLQUFLLENBQUM7VUFDbERmLFlBQVksQ0FBQyxLQUFLLENBQUM7RUFDckIsTUFBQTtNQUNGLENBQUM7RUFFREMsSUFBQUEsY0FBYyxFQUFFO0VBQ2xCLEVBQUEsQ0FBQyxFQUFFLENBQUN4SSxNQUFNLENBQUN5SCxFQUFFLEVBQUV6SCxNQUFNLENBQUNLLE1BQU0sQ0FBQyxDQUFDLENBQUM7O0lBRS9CLE1BQU1tSixZQUFZLEdBQUlMLFFBQWEsSUFBSztFQUN0QyxJQUFBLE1BQU1NLFVBQVUsR0FBR04sUUFBUSxHQUFJN0IsS0FBSyxDQUFDQyxPQUFPLENBQUM0QixRQUFRLENBQUMsR0FBR0EsUUFBUSxHQUFHLENBQUNBLFFBQVEsQ0FBQyxHQUFJLEVBQUU7TUFDcEZoQixrQkFBa0IsQ0FBQ3NCLFVBQVUsQ0FBQztNQUM5QixNQUFNQyxHQUFHLEdBQUdELFVBQVUsQ0FBQ3RHLEdBQUcsQ0FBQ2lHLEdBQUcsSUFBSUEsR0FBRyxDQUFDM0UsS0FBSyxDQUFDO0VBQzVDeEUsSUFBQUEsUUFBUSxDQUFDRixRQUFRLENBQUNRLElBQUksRUFBRW1KLEdBQUcsQ0FBQztJQUM5QixDQUFDO0VBRUQsRUFBQSxJQUFJcEosTUFBTSxFQUFFO01BQ1Ysb0JBQ0VvQyxzQkFBQSxDQUFBQyxhQUFBLENBQUMyQixzQkFBUyxFQUFBLElBQUEsZUFDUjVCLHNCQUFBLENBQUFDLGFBQUEsQ0FBQzRCLGtCQUFLLEVBQUEsSUFBQSxFQUFFeEUsUUFBUSxDQUFDMEcsS0FBYSxDQUFDLGVBQy9CL0Qsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDQyxnQkFBRyxFQUFBO0VBQUNDLE1BQUFBLE9BQU8sRUFBQyxPQUFPO0VBQUNDLE1BQUFBLENBQUMsRUFBQyxJQUFJO0VBQUNDLE1BQUFBLE1BQU0sRUFBQyxnQkFBZ0I7RUFBQ0MsTUFBQUEsWUFBWSxFQUFDO09BQUksRUFDbEVrRixlQUFlLENBQUMzRyxNQUFNLEdBQUcsQ0FBQyxnQkFDekJtQixzQkFBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUE7UUFBQ21DLElBQUksRUFBQSxJQUFBO0VBQUNDLE1BQUFBLGFBQWEsRUFBQyxLQUFLO0VBQUMyRSxNQUFBQSxRQUFRLEVBQUM7T0FBTSxFQUMxQ3pCLGVBQWUsQ0FBQy9FLEdBQUcsQ0FBQ2lHLEdBQUcsaUJBQ3RCMUcsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDQyxnQkFBRyxFQUFBO1FBQUNOLEdBQUcsRUFBRThHLEdBQUcsQ0FBQzNFLEtBQU07RUFBQ21GLE1BQUFBLEVBQUUsRUFBQyxZQUFZO0VBQUNsRyxNQUFBQSxLQUFLLEVBQUMsT0FBTztFQUFDbUcsTUFBQUEsRUFBRSxFQUFDLElBQUk7RUFBQ0MsTUFBQUEsRUFBRSxFQUFDLElBQUk7RUFBQzFFLE1BQUFBLEVBQUUsRUFBQyxJQUFJO0VBQUMvQixNQUFBQSxFQUFFLEVBQUMsSUFBSTtFQUFDTCxNQUFBQSxZQUFZLEVBQUM7T0FBSSxFQUNqR29HLEdBQUcsQ0FBQzNDLEtBQ0YsQ0FDTixDQUNFLENBQUMsZ0JBRU4vRCxzQkFBQSxDQUFBQyxhQUFBLENBQUNhLGlCQUFJLEVBQUE7RUFBQ0UsTUFBQUEsS0FBSyxFQUFDO09BQVEsRUFBQyx3QkFBNEIsQ0FFaEQsQ0FDSSxDQUFDO0VBRWhCLEVBQUE7RUFFQSxFQUFBLG9CQUNFaEIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDQyxnQkFBRyxFQUFBO0VBQUNTLElBQUFBLEVBQUUsRUFBQztLQUFJLGVBQ1ZYLHNCQUFBLENBQUFDLGFBQUEsQ0FBQzJCLHNCQUFTLEVBQUEsSUFBQSxlQUNSNUIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDNEIsa0JBQUssRUFBQSxJQUFBLEVBQUV4RSxRQUFRLENBQUMwRyxLQUFhLENBQUMsZUFDL0IvRCxzQkFBQSxDQUFBQyxhQUFBLENBQUNvSCxtQkFBTSxFQUFBO01BQ0xDLE9BQU8sRUFBQSxJQUFBO0VBQ1AxQixJQUFBQSxTQUFTLEVBQUVBLFNBQVU7RUFDckI3RCxJQUFBQSxLQUFLLEVBQUV5RCxlQUFnQjtFQUN2QlcsSUFBQUEsT0FBTyxFQUFFVCxVQUFXO0VBQ3BCbkksSUFBQUEsUUFBUSxFQUFFdUosWUFBYTtFQUN2QjdFLElBQUFBLFdBQVcsRUFBQztFQUFzQixHQUNuQyxDQUFDLGVBQ0ZqQyxzQkFBQSxDQUFBQyxhQUFBLENBQUNhLGlCQUFJLEVBQUE7RUFBQ1gsSUFBQUEsT0FBTyxFQUFDLElBQUk7RUFBQ2EsSUFBQUEsS0FBSyxFQUFDLFFBQVE7RUFBQ1QsSUFBQUEsRUFBRSxFQUFDO0tBQUksRUFBQyxtREFFcEMsQ0FDRyxDQUNSLENBQUM7RUFFVixDQUFDOztFQ3hIRCxNQUFNZ0gsUUFBcUMsR0FBSW5LLEtBQUssSUFBSztJQUN2RCxNQUFNO0VBQUVFLElBQUFBO0VBQU8sR0FBQyxHQUFHRixLQUFLOztFQUV4QjtJQUNBLE1BQU1vSyxTQUFTLEdBQUdsSyxNQUFNLENBQUNLLE1BQU0sQ0FBQzZKLFNBQVMsSUFBSSxFQUFFO0lBRS9DLElBQUksQ0FBQ0EsU0FBUyxJQUFJQSxTQUFTLENBQUMzSSxNQUFNLEtBQUssQ0FBQyxFQUFFO0VBQ3hDO0VBQ0EsSUFBQSxNQUFNOEYsU0FBUyxHQUFHckgsTUFBTSxDQUFDcUgsU0FBUyxFQUFFOEMsS0FBSztFQUN6QyxJQUFBLE1BQU1DLGNBQWMsR0FBRzlDLEtBQUssQ0FBQ0MsT0FBTyxDQUFDRixTQUFTLENBQUMsR0FBR0EsU0FBUyxHQUFJQSxTQUFTLEdBQUcsQ0FBQ0EsU0FBUyxDQUFDLEdBQUcsRUFBRztFQUU1RixJQUFBLElBQUkrQyxjQUFjLENBQUM3SSxNQUFNLEdBQUcsQ0FBQyxFQUFFO0VBQzdCLE1BQUEsb0JBQ0VtQixzQkFBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUE7VUFBQ21DLElBQUksRUFBQSxJQUFBO0VBQUNDLFFBQUFBLGFBQWEsRUFBQyxLQUFLO0VBQUMyRSxRQUFBQSxRQUFRLEVBQUM7RUFBTSxPQUFBLEVBQzFDUyxjQUFjLENBQUNqSCxHQUFHLENBQUMsQ0FBQ2tILElBQVMsRUFBRW5JLEtBQWEsa0JBQzNDUSxzQkFBQSxDQUFBQyxhQUFBLENBQUMySCxrQkFBSyxFQUFBO0VBQUNoSSxRQUFBQSxHQUFHLEVBQUUrSCxJQUFJLENBQUM1QyxFQUFFLElBQUl2RixLQUFNO0VBQUNrRCxRQUFBQSxFQUFFLEVBQUMsSUFBSTtFQUFDL0IsUUFBQUEsRUFBRSxFQUFDLElBQUk7RUFBQ1IsUUFBQUEsT0FBTyxFQUFDO0VBQVMsT0FBQSxFQUM1RHdILElBQUksQ0FBQ2hLLE1BQU0sRUFBRUUsSUFBSSxJQUFJOEosSUFBSSxDQUFDOUosSUFBSSxJQUFJLE1BQzlCLENBQ1IsQ0FDRSxDQUFDO0VBRVYsSUFBQTtFQUNBLElBQUEsb0JBQU9tQyxzQkFBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUE7RUFBQ2MsTUFBQUEsS0FBSyxFQUFDLFFBQVE7RUFBQzZHLE1BQUFBLFFBQVEsRUFBQztFQUFJLEtBQUEsRUFBQyxtQkFBc0IsQ0FBQztFQUNsRSxFQUFBOztFQUVBO0lBQ0EsTUFBTUMsU0FBUyxHQUFHbEQsS0FBSyxDQUFDQyxPQUFPLENBQUMyQyxTQUFTLENBQUMsR0FBR0EsU0FBUyxHQUFHLEVBQUU7RUFFM0QsRUFBQSxvQkFDRXhILHNCQUFBLENBQUFDLGFBQUEsQ0FBQ0MsZ0JBQUcsRUFBQTtNQUFDbUMsSUFBSSxFQUFBLElBQUE7RUFBQ0MsSUFBQUEsYUFBYSxFQUFDLEtBQUs7RUFBQzJFLElBQUFBLFFBQVEsRUFBQztFQUFNLEdBQUEsRUFDMUNhLFNBQVMsQ0FBQ3JILEdBQUcsQ0FBQyxDQUFDNUMsSUFBWSxFQUFFMkIsS0FBYSxrQkFDekNRLHNCQUFBLENBQUFDLGFBQUEsQ0FBQzJILGtCQUFLLEVBQUE7RUFBQ2hJLElBQUFBLEdBQUcsRUFBRUosS0FBTTtFQUFDa0QsSUFBQUEsRUFBRSxFQUFDLElBQUk7RUFBQy9CLElBQUFBLEVBQUUsRUFBQyxJQUFJO0VBQUNSLElBQUFBLE9BQU8sRUFBQztLQUFTLEVBQ2pEdEMsSUFDSSxDQUNSLENBQ0UsQ0FBQztFQUVWLENBQUM7O0VDekNEa0ssT0FBTyxDQUFDQyxjQUFjLEdBQUcsRUFBRTtFQUUzQkQsT0FBTyxDQUFDQyxjQUFjLENBQUM3SyxVQUFVLEdBQUdBLFVBQVU7RUFFOUM0SyxPQUFPLENBQUNDLGNBQWMsQ0FBQ3JGLGFBQWEsR0FBR0EsYUFBYTtFQUVwRG9GLE9BQU8sQ0FBQ0MsY0FBYyxDQUFDekQsbUJBQW1CLEdBQUdBLG1CQUFtQjtFQUVoRXdELE9BQU8sQ0FBQ0MsY0FBYyxDQUFDVCxRQUFRLEdBQUdBLFFBQVE7Ozs7OzsifQ==

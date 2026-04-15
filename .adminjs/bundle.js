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

  const api = new adminjs.ApiClient();
  const AuthenticationBackgroundComponentOverride = () => {
    const [currentAdmin, setCurrentAdmin] = adminjs.useCurrentAdmin();
    React.useEffect(() => {
      // Only set up the interval if there's an admin logged in
      if (!currentAdmin) return;

      // Call refresh token API periodically, e.g., every 5 minutes (300000 ms)
      // Or adjust interval to your session expiration time.
      const interval = setInterval(async () => {
        try {
          const response = await api.refreshToken({});
          const {
            data
          } = response;
          if (data) {
            setCurrentAdmin(data);
          }
        } catch (error) {
          console.error('Failed to refresh admin session:', error);
        }
      }, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }, [currentAdmin, setCurrentAdmin]);
    return null;
  };

  AdminJS.UserComponents = {};
  AdminJS.UserComponents.FAQBuilder = FAQBuilder;
  AdminJS.UserComponents.ImageUploader = ImageUploader;
  AdminJS.UserComponents.CategoryMultiSelect = CategoryMultiSelect;
  AdminJS.UserComponents.RoleList = RoleList;
  AdminJS.UserComponents.AuthenticationBackgroundComponent = AuthenticationBackgroundComponentOverride;

})(React, AdminJSDesignSystem, AdminJS);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9GQVFCdWlsZGVyLnRzeCIsIi4uL3NyYy9hZG1pbi9jb21wb25lbnRzL0ltYWdlVXBsb2FkZXIudHN4IiwiLi4vc3JjL2FkbWluL2NvbXBvbmVudHMvQ2F0ZWdvcnlNdWx0aVNlbGVjdC50c3giLCIuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9yb2xlLWxpc3QudHN4IiwiLi4vc3JjL2FkbWluL2NvbXBvbmVudHMvQXV0aGVudGljYXRpb25CYWNrZ3JvdW5kLnRzeCIsImVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQm94LCBCdXR0b24sIEZvcm1Hcm91cCwgSW5wdXQsIExhYmVsLCBUZXh0QXJlYSwgSWNvbiwgVGV4dCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuaW1wb3J0IHsgQmFzZVByb3BlcnR5UHJvcHMgfSBmcm9tICdhZG1pbmpzJztcblxuY29uc3QgRkFRQnVpbGRlcjogUmVhY3QuRkM8QmFzZVByb3BlcnR5UHJvcHM+ID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgcHJvcGVydHksIHJlY29yZCwgb25DaGFuZ2UsIHJlc291cmNlIH0gPSBwcm9wcztcbiAgY29uc3QgYWN0aW9uID0gKHByb3BzIGFzIGFueSkuYWN0aW9uO1xuICBjb25zdCBwYWdlVHlwZSA9IHJlY29yZC5wYXJhbXMucGFnZVR5cGUgfHwgJ2ZhcSc7XG4gIFxuICAvLyBEZXRlY3QgaWYgd2UgYXJlIGluIFwiU2hvd1wiIChyZWFkLW9ubHkpIG1vZGVcbiAgY29uc3QgaXNTaG93ID0gYWN0aW9uPy5uYW1lID09PSAnc2hvdycgfHwgIW9uQ2hhbmdlO1xuXG4gIC8vIEZ1bmN0aW9uIHRvIHJvYnVzdGx5IGV4dHJhY3QgZGF0YSBmcm9tIHJlY29yZC5wYXJhbXMgKGhhbmRsZXMgZmxhdHRlbmVkIGtleXMpXG4gIGNvbnN0IGdldEluaXRpYWxEYXRhID0gKCkgPT4ge1xuICAgIC8vIDEuIFRyeSBkaXJlY3QgYWNjZXNzXG4gICAgY29uc3QgZGlyZWN0VmFsdWUgPSByZWNvcmQucGFyYW1zW3Byb3BlcnR5Lm5hbWVdO1xuICAgIGlmIChkaXJlY3RWYWx1ZSkge1xuICAgICAgaWYgKHR5cGVvZiBkaXJlY3RWYWx1ZSA9PT0gJ29iamVjdCcgJiYgZGlyZWN0VmFsdWUuaXRlbXMpIHJldHVybiBkaXJlY3RWYWx1ZTtcbiAgICAgIGlmICh0eXBlb2YgZGlyZWN0VmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgcGFyc2VkID0gSlNPTi5wYXJzZShkaXJlY3RWYWx1ZSk7XG4gICAgICAgICAgaWYgKHBhcnNlZCAmJiBwYXJzZWQuaXRlbXMpIHJldHVybiBwYXJzZWQ7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBGYWxsIHRocm91Z2ggdG8gZmxhdHRlbmVkIGNoZWNrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyAyLiBUcnkgZmxhdHRlbmVkIGFjY2VzcyAoZS5nLiwgY29udGVudC5pdGVtcy4wLnRpdGxlKVxuICAgIGNvbnN0IGl0ZW1zID0gW107XG4gICAgbGV0IGkgPSAwO1xuICAgIHdoaWxlIChcbiAgICAgIHJlY29yZC5wYXJhbXNbYCR7cHJvcGVydHkubmFtZX0uaXRlbXMuJHtpfS5zdWJ0aXRsZWBdICE9PSB1bmRlZmluZWQgfHwgXG4gICAgICByZWNvcmQucGFyYW1zW2Ake3Byb3BlcnR5Lm5hbWV9Lml0ZW1zLiR7aX0udGl0bGVgXSAhPT0gdW5kZWZpbmVkIHx8XG4gICAgICByZWNvcmQucGFyYW1zW2Ake3Byb3BlcnR5Lm5hbWV9Lml0ZW1zLiR7aX0uZGVzY3JpcHRpb25gXSAhPT0gdW5kZWZpbmVkXG4gICAgKSB7XG4gICAgICBjb25zdCBzaG93VGl0bGVWYWwgPSByZWNvcmQucGFyYW1zW2Ake3Byb3BlcnR5Lm5hbWV9Lml0ZW1zLiR7aX0uc2hvd1RpdGxlYF07XG4gICAgICBpdGVtcy5wdXNoKHtcbiAgICAgICAgdGl0bGU6IHJlY29yZC5wYXJhbXNbYCR7cHJvcGVydHkubmFtZX0uaXRlbXMuJHtpfS50aXRsZWBdIHx8ICcnLFxuICAgICAgICBzdWJ0aXRsZTogcmVjb3JkLnBhcmFtc1tgJHtwcm9wZXJ0eS5uYW1lfS5pdGVtcy4ke2l9LnN1YnRpdGxlYF0gfHwgJycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiByZWNvcmQucGFyYW1zW2Ake3Byb3BlcnR5Lm5hbWV9Lml0ZW1zLiR7aX0uZGVzY3JpcHRpb25gXSB8fCAnJyxcbiAgICAgICAgc2hvd1RpdGxlOiBzaG93VGl0bGVWYWwgPT09IHRydWUgfHwgc2hvd1RpdGxlVmFsID09PSAndHJ1ZScsXG4gICAgICB9KTtcbiAgICAgIGkrKztcbiAgICB9XG5cbiAgICByZXR1cm4gaXRlbXMubGVuZ3RoID4gMCA/IHsgaXRlbXMgfSA6IHsgaXRlbXM6IFtdIH07XG4gIH07XG5cbiAgY29uc3QgW2RhdGEsIHNldERhdGFdID0gdXNlU3RhdGUoZ2V0SW5pdGlhbERhdGEoKSk7XG5cbiAgLy8gS2VlcCBzdGF0ZSBpbiBzeW5jIGlmIHJlY29yZCBjaGFuZ2VzIChpbXBvcnRhbnQgZm9yIFNob3cgdmlldyB0cmFuc2l0aW9uKVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldERhdGEoZ2V0SW5pdGlhbERhdGEoKSk7XG4gIH0sIFtyZWNvcmQucGFyYW1zXSk7XG5cbiAgY29uc3QgdXBkYXRlQ29udGVudCA9IChuZXdEYXRhOiBhbnkpID0+IHtcbiAgICBzZXREYXRhKG5ld0RhdGEpO1xuICAgIGlmIChvbkNoYW5nZSkge1xuICAgICAgb25DaGFuZ2UocHJvcGVydHkubmFtZSwgbmV3RGF0YSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGFkZEl0ZW0gPSAoKSA9PiB7XG4gICAgY29uc3QgbmV3SXRlbXMgPSBbLi4uKGRhdGEuaXRlbXMgfHwgW10pLCB7IHN1YnRpdGxlOiAnJywgZGVzY3JpcHRpb246ICcnLCBzaG93VGl0bGU6IGZhbHNlIH1dO1xuICAgIHVwZGF0ZUNvbnRlbnQoeyAuLi5kYXRhLCBpdGVtczogbmV3SXRlbXMgfSk7XG4gIH07XG5cbiAgY29uc3QgYWRkVGl0bGVTZWN0aW9uID0gKCkgPT4ge1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gWy4uLihkYXRhLml0ZW1zIHx8IFtdKSwgeyB0aXRsZTogJycsIHN1YnRpdGxlOiAnJywgZGVzY3JpcHRpb246ICcnLCBzaG93VGl0bGU6IHRydWUgfV07XG4gICAgdXBkYXRlQ29udGVudCh7IC4uLmRhdGEsIGl0ZW1zOiBuZXdJdGVtcyB9KTtcbiAgfTtcblxuICBjb25zdCByZW1vdmVJdGVtID0gKGluZGV4OiBudW1iZXIpID0+IHtcbiAgICBjb25zdCBuZXdJdGVtcyA9IGRhdGEuaXRlbXMuZmlsdGVyKChfLCBpOiBudW1iZXIpID0+IGkgIT09IGluZGV4KTtcbiAgICB1cGRhdGVDb250ZW50KHsgLi4uZGF0YSwgaXRlbXM6IG5ld0l0ZW1zIH0pO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUl0ZW1DaGFuZ2UgPSAoaW5kZXg6IG51bWJlciwga2V5OiBzdHJpbmcsIHZhbDogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgbmV3SXRlbXMgPSBbLi4uZGF0YS5pdGVtc107XG4gICAgbmV3SXRlbXNbaW5kZXhdID0geyAuLi5uZXdJdGVtc1tpbmRleF0sIFtrZXldOiB2YWwgfTtcbiAgICB1cGRhdGVDb250ZW50KHsgLi4uZGF0YSwgaXRlbXM6IG5ld0l0ZW1zIH0pO1xuICB9O1xuXG4gIGNvbnN0IGlzRkFRID0gcGFnZVR5cGUgPT09ICdmYXEnO1xuICBjb25zdCBoYXNJdGVtcyA9IGRhdGEuaXRlbXMgJiYgZGF0YS5pdGVtcy5sZW5ndGggPiAwO1xuXG4gIGlmICghcmVjb3JkLnBhcmFtcy5wYWdlVHlwZSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgaWYgKGlzU2hvdykge1xuICAgIHJldHVybiAoXG4gICAgICA8Qm94IHZhcmlhbnQ9XCJ3aGl0ZVwiIHA9XCJ4eGxcIiBib3JkZXI9XCIxcHggc29saWQgI2RkZFwiIGJvcmRlclJhZGl1cz1cImxnXCIgbXQ9XCJ4bFwiIGJveFNoYWRvdz1cImNhcmRcIj5cbiAgICAgICAge2hhc0l0ZW1zID8gKFxuICAgICAgICAgIDxCb3g+XG4gICAgICAgICAgICB7ZGF0YS5pdGVtcy5tYXAoKGl0ZW06IGFueSwgaW5kZXg6IG51bWJlcikgPT4gKFxuICAgICAgICAgICAgICA8Qm94IGtleT17aW5kZXh9IG1iPVwieGxcIiBwYj1cImxnXCIgYm9yZGVyQm90dG9tPXtpbmRleCA8IGRhdGEuaXRlbXMubGVuZ3RoIC0gMSA/IFwiMXB4IHNvbGlkICNlZWVcIiA6IFwibm9uZVwifT5cbiAgICAgICAgICAgICAgICB7KCFpc0ZBUSB8fCBpbmRleCA9PT0gMCB8fCBpdGVtLnNob3dUaXRsZSkgJiYgaXRlbS50aXRsZSAmJiAoXG4gICAgICAgICAgICAgICAgICA8VGV4dCB2YXJpYW50PVwibGdcIiBmb250V2VpZ2h0PVwiYm9sZFwiIG1iPVwic21cIiBjb2xvcj1cInByaW1hcnkxMDBcIj5cbiAgICAgICAgICAgICAgICAgICAge2l0ZW0udGl0bGV9XG4gICAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7aXNGQVEgJiYgaXRlbS5zdWJ0aXRsZSAmJiAoXG4gICAgICAgICAgICAgICAgICA8VGV4dCB2YXJpYW50PVwibWRcIiBmb250V2VpZ2h0PVwic2VtaWJvbGRcIiBtYj1cInhzXCIgY29sb3I9XCJncmV5ODBcIj5cbiAgICAgICAgICAgICAgICAgICAge2l0ZW0uc3VidGl0bGV9XG4gICAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7aXRlbS5kZXNjcmlwdGlvbiAmJiAoXG4gICAgICAgICAgICAgICAgICA8VGV4dCB2YXJpYW50PVwic21cIiBjb2xvcj1cImdyZXk2MFwiPlxuICAgICAgICAgICAgICAgICAgICB7aXRlbS5kZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvQm94PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxUZXh0IGl0YWxpYyBjb2xvcj1cImdyZXk0MFwiPk5vIGVudHJpZXMgYWRkZWQgeWV0LjwvVGV4dD5cbiAgICAgICAgKX1cbiAgICAgIDwvQm94PlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxCb3ggdmFyaWFudD1cIndoaXRlXCIgcD1cInh4bFwiIGJvcmRlcj1cIjFweCBzb2xpZCAjZGRkXCIgYm9yZGVyUmFkaXVzPVwibGdcIiBtdD1cInhsXCIgYm94U2hhZG93PVwiY2FyZFwiPlxuICAgICAgPEJveCBtdD1cImxnXCI+XG4gICAgICAgIHtkYXRhLml0ZW1zICYmIGRhdGEuaXRlbXMubWFwKChpdGVtOiBhbnksIGluZGV4OiBudW1iZXIpID0+IChcbiAgICAgICAgICA8Qm94IGtleT17aW5kZXh9IG1iPVwieGxcIiBwb3NpdGlvbj1cInJlbGF0aXZlXCIgcHQ9XCJsZ1wiPlxuICAgICAgICAgICAgPEJveCBwb3NpdGlvbj1cImFic29sdXRlXCIgdG9wPVwiMTBweFwiIHJpZ2h0PVwiMFwiPlxuICAgICAgICAgICAgICA8QnV0dG9uIFxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIiBcbiAgICAgICAgICAgICAgICB2YXJpYW50PVwiZGFuZ2VyXCIgXG4gICAgICAgICAgICAgICAgc2l6ZT1cImljb25cIiBcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiByZW1vdmVJdGVtKGluZGV4KX1cbiAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM9XCJmdWxsXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxJY29uIGljb249XCJUcmFzaFwiIC8+XG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHsoIWlzRkFRIHx8IGluZGV4ID09PSAwIHx8IGl0ZW0uc2hvd1RpdGxlKSAmJiAoXG4gICAgICAgICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgICAgICAgPExhYmVsPlRpdGxlPC9MYWJlbD5cbiAgICAgICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtpdGVtLnRpdGxlIHx8ICcnfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBoYW5kbGVJdGVtQ2hhbmdlKGluZGV4LCAndGl0bGUnLCBlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIHRpdGxlXCJcbiAgICAgICAgICAgICAgICAgIHdpZHRoPXsxfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAge2lzRkFRICYmIChcbiAgICAgICAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICAgICAgICA8TGFiZWw+U3VidGl0bGU8L0xhYmVsPlxuICAgICAgICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2l0ZW0uc3VidGl0bGUgfHwgJyd9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IGhhbmRsZUl0ZW1DaGFuZ2UoaW5kZXgsICdzdWJ0aXRsZScsIGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgc3VidGl0bGVcIlxuICAgICAgICAgICAgICAgICAgd2lkdGg9ezF9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+XG4gICAgICAgICAgICApfVxuXG4gICAgICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgICAgICA8TGFiZWw+RGVzY3JpcHRpb248L0xhYmVsPlxuICAgICAgICAgICAgICA8VGV4dEFyZWFcbiAgICAgICAgICAgICAgICB2YWx1ZT17aXRlbS5kZXNjcmlwdGlvbiB8fCAnJ31cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IGhhbmRsZUl0ZW1DaGFuZ2UoaW5kZXgsICdkZXNjcmlwdGlvbicsIGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIGRlc2NyaXB0aW9uXCJcbiAgICAgICAgICAgICAgICB3aWR0aD17MX1cbiAgICAgICAgICAgICAgICByb3dzPXszfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9Gb3JtR3JvdXA+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgICkpfVxuICAgICAgPC9Cb3g+XG5cbiAgICAgIDxCb3ggbXQ9XCJ4bFwiIGZsZXggZmxleERpcmVjdGlvbj1cInJvd1wiIGp1c3RpZnlDb250ZW50PVwiY2VudGVyXCIgcHQ9e2hhc0l0ZW1zID8gJ3hsJyA6ICdub25lJ30+XG4gICAgICAgIDxCdXR0b24gXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiIFxuICAgICAgICAgIG9uQ2xpY2s9e2FkZEl0ZW19IFxuICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lXCIgXG4gICAgICAgICAgYm9yZGVyUmFkaXVzPVwiZnVsbFwiXG4gICAgICAgICAgZGlzcGxheT1cImZsZXhcIlxuICAgICAgICAgIGFsaWduSXRlbXM9XCJjZW50ZXJcIlxuICAgICAgICAgIG1yPVwibWRcIlxuICAgICAgICA+XG4gICAgICAgICAgPEljb24gaWNvbj1cIlBsdXNcIiBtcj1cInhzXCIgLz4gXG4gICAgICAgICAge2lzRkFRID8gJ0FkZCBGQVEgSXRlbXMnIDogJ0FkZCBSZWd1bGFtZW50byBJdGVtcyd9XG4gICAgICAgIDwvQnV0dG9uPlxuXG4gICAgICAgIHtpc0ZBUSAmJiAoXG4gICAgICAgICAgPEJ1dHRvbiBcbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIiBcbiAgICAgICAgICAgIG9uQ2xpY2s9e2FkZFRpdGxlU2VjdGlvbn0gXG4gICAgICAgICAgICB2YXJpYW50PVwicHJpbWFyeVwiIFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzPVwiZnVsbFwiXG4gICAgICAgICAgICBkaXNwbGF5PVwiZmxleFwiXG4gICAgICAgICAgICBhbGlnbkl0ZW1zPVwiY2VudGVyXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8SWNvbiBpY29uPVwiUGx1c1wiIG1yPVwieHNcIiAvPiBBZGQgVGl0bGVcbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKX1cbiAgICAgIDwvQm94PlxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRkFRQnVpbGRlcjtcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJveCwgTGFiZWwsIElucHV0LCBEcm9wWm9uZSwgRHJvcFpvbmVQcm9wcywgQnV0dG9uLCBJY29uLCBUZXh0IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5pbXBvcnQgeyBCYXNlUHJvcGVydHlQcm9wcyB9IGZyb20gJ2FkbWluanMnO1xuXG5jb25zdCBJbWFnZVVwbG9hZGVyOiBSZWFjdC5GQzxCYXNlUHJvcGVydHlQcm9wcz4gPSAocHJvcHMpID0+IHtcbiAgY29uc3QgeyBwcm9wZXJ0eSwgcmVjb3JkLCBvbkNoYW5nZSwgd2hlcmUgfSA9IHByb3BzO1xuICBjb25zdCBbcHJldmlldywgc2V0UHJldmlld10gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihyZWNvcmQucGFyYW1zW3Byb3BlcnR5Lm5hbWVdIHx8IG51bGwpO1xuXG4gIGNvbnN0IGhhbmRsZUZpbGVDaGFuZ2U6IERyb3Bab25lUHJvcHNbJ29uQ2hhbmdlJ10gPSAoZmlsZXMpID0+IHtcbiAgICBjb25zdCBmaWxlID0gZmlsZXNbMF07XG4gICAgaWYgKGZpbGUpIHtcbiAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICByZWFkZXIub25sb2FkZW5kID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBiYXNlNjRTdHJpbmcgPSByZWFkZXIucmVzdWx0IGFzIHN0cmluZztcbiAgICAgICAgc2V0UHJldmlldyhiYXNlNjRTdHJpbmcpO1xuICAgICAgICBvbkNoYW5nZShwcm9wZXJ0eS5uYW1lLCBiYXNlNjRTdHJpbmcpO1xuICAgICAgfTtcbiAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVDbGVhciA9ICgpID0+IHtcbiAgICBzZXRQcmV2aWV3KG51bGwpO1xuICAgIG9uQ2hhbmdlKHByb3BlcnR5Lm5hbWUsICcnKTtcbiAgfTtcblxuICAvLyBMaXN0IFZpZXcgKFRodW1ibmFpbClcbiAgaWYgKHdoZXJlID09PSAnbGlzdCcpIHtcbiAgICBjb25zdCBpbWdVcmwgPSByZWNvcmQucGFyYW1zW3Byb3BlcnR5Lm5hbWVdO1xuICAgIGlmIChpbWdVcmwpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxpbWcgXG4gICAgICAgICAgc3JjPXtpbWdVcmx9IFxuICAgICAgICAgIGFsdD1cIlRodW1ibmFpbFwiIFxuICAgICAgICAgIHN0eWxlPXt7IHdpZHRoOiAnNDBweCcsIGhlaWdodDogJzQwcHgnLCBvYmplY3RGaXQ6ICdjb3ZlcicsIGJvcmRlclJhZGl1czogJzRweCcsIGJvcmRlcjogJzFweCBzb2xpZCAjZGRkJyB9fSBcbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiA8VGV4dCBjb2xvcj1cImdyZXk0MFwiPi08L1RleHQ+O1xuICB9XG5cbiAgLy8gU2hvdyBWaWV3XG4gIGlmICh3aGVyZSA9PT0gJ3Nob3cnKSB7XG4gICAgIGNvbnN0IGltZ1VybCA9IHJlY29yZC5wYXJhbXNbcHJvcGVydHkubmFtZV07XG4gICAgIHJldHVybiAoXG4gICAgICAgPEJveD5cbiAgICAgICAgIDxMYWJlbD57cHJvcGVydHkubGFiZWx9PC9MYWJlbD5cbiAgICAgICAgIHtpbWdVcmwgPyAoXG4gICAgICAgICAgIDxpbWcgc3JjPXtpbWdVcmx9IGFsdD1cIlByZXZpZXdcIiBzdHlsZT17eyBtYXhXaWR0aDogJzMwMHB4JywgYm9yZGVyUmFkaXVzOiAnNHB4JywgYm9yZGVyOiAnMXB4IHNvbGlkICNkZGQnIH19IC8+XG4gICAgICAgICApIDogKFxuICAgICAgICAgICA8VGV4dCBjb2xvcj1cImdyZXk0MFwiPk5vIGltYWdlIHVwbG9hZGVkPC9UZXh0PlxuICAgICAgICAgKX1cbiAgICAgICA8L0JveD5cbiAgICAgKTtcbiAgfVxuXG4gIC8vIEVkaXQvQ3JlYXRlIFZpZXdcbiAgcmV0dXJuIChcbiAgICA8Qm94IG1iPVwieGxcIj5cbiAgICAgIDxMYWJlbD57cHJvcGVydHkubGFiZWx9PC9MYWJlbD5cbiAgICAgIHtwcmV2aWV3ID8gKFxuICAgICAgICA8Qm94IGJvcmRlcj1cIjFweCBzb2xpZCAjZGRkXCIgcD1cIm1kXCIgYm9yZGVyUmFkaXVzPVwibWRcIiBwb3NpdGlvbj1cInJlbGF0aXZlXCIgdGV4dEFsaWduPVwiY2VudGVyXCI+XG4gICAgICAgICAgPGltZyBzcmM9e3ByZXZpZXd9IGFsdD1cIlByZXZpZXdcIiBzdHlsZT17eyBtYXhXaWR0aDogJzEwMCUnLCBtYXhIZWlnaHQ6ICcyMDBweCcsIGJvcmRlclJhZGl1czogJzRweCcgfX0gLz5cbiAgICAgICAgICA8Qm94IG10PVwibWRcIj5cbiAgICAgICAgICAgIDxCdXR0b24gdmFyaWFudD1cImRhbmdlclwiIHNpemU9XCJzbVwiIG9uQ2xpY2s9e2hhbmRsZUNsZWFyfSB0eXBlPVwiYnV0dG9uXCI+XG4gICAgICAgICAgICAgIDxJY29uIGljb249XCJUcmFzaFwiIG1yPVwieHNcIiAvPiBSZW1vdmUgSW1hZ2VcbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICA8L0JveD5cbiAgICAgICkgOiAoXG4gICAgICAgIDxEcm9wWm9uZSBvbkNoYW5nZT17aGFuZGxlRmlsZUNoYW5nZX0gdmFsaWRhdGU9e3sgbWF4U2l6ZTogNTAwMDAwMCwgbWltZVR5cGVzOiBbJ2ltYWdlL3BuZycsICdpbWFnZS9qcGVnJywgJ2ltYWdlL2pwZycsICdpbWFnZS93ZWJwJ10gfX0gLz5cbiAgICAgICl9XG4gICAgICA8VGV4dCB2YXJpYW50PVwic21cIiBjb2xvcj1cImdyZXk2MFwiIG10PVwieHNcIj5cbiAgICAgICAgU2VsZWN0IGFuIGltYWdlLiBCYXNlNjQgZm9ybWF0IHdpbGwgYmUgc3RvcmVkIGluIHRoZSBkYXRhYmFzZS5cbiAgICAgIDwvVGV4dD5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEltYWdlVXBsb2FkZXI7XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQm94LCBGb3JtR3JvdXAsIExhYmVsLCBTZWxlY3QsIFNlbGVjdEFzeW5jLCBUZXh0IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XHJcbmltcG9ydCB7IEJhc2VQcm9wZXJ0eVByb3BzLCBBcGlDbGllbnQgfSBmcm9tICdhZG1pbmpzJztcclxuXHJcbmNvbnN0IENhdGVnb3J5TXVsdGlTZWxlY3Q6IFJlYWN0LkZDPEJhc2VQcm9wZXJ0eVByb3BzPiA9IChwcm9wcykgPT4ge1xyXG4gIGNvbnN0IHsgcHJvcGVydHksIHJlY29yZCwgb25DaGFuZ2UsIHdoZXJlIH0gPSBwcm9wcztcclxuICBjb25zdCBpc0xpc3QgPSB3aGVyZSA9PT0gJ2xpc3QnO1xyXG4gIGNvbnN0IGlzU2hvdyA9IHdoZXJlID09PSAnc2hvdyc7XHJcbiAgY29uc3QgYXBpID0gbmV3IEFwaUNsaWVudCgpO1xyXG5cclxuICAvLyBGb3IgTGlzdCB2aWV3LCBqdXN0IHNob3cgY29tbWEtc2VwYXJhdGVkIG5hbWVzXHJcbiAgaWYgKGlzTGlzdCkge1xyXG4gICAgLy8gMS4gVHJ5IHRvIGdldCB0aXRsZXMgZnJvbSBwb3B1bGF0ZWQgZGF0YSAoYmVzdCB3YXkpXHJcbiAgICBjb25zdCBwb3B1bGF0ZWQgPSByZWNvcmQucG9wdWxhdGVkPy5bcHJvcGVydHkubmFtZV07XHJcbiAgICBpZiAocG9wdWxhdGVkKSB7XHJcbiAgICAgIGNvbnN0IGl0ZW1zID0gQXJyYXkuaXNBcnJheShwb3B1bGF0ZWQpID8gcG9wdWxhdGVkIDogW3BvcHVsYXRlZF07XHJcbiAgICAgIGNvbnN0IHRpdGxlcyA9IGl0ZW1zLm1hcChwID0+IHAudGl0bGUgfHwgcC5wYXJhbXM/LnRpdGxlIHx8IHAuaWQpLmZpbHRlcihCb29sZWFuKS5qb2luKCcsICcpO1xyXG4gICAgICBpZiAodGl0bGVzKSByZXR1cm4gPFRleHQ+e3RpdGxlc308L1RleHQ+O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyAyLiBGYWxsYmFjazogQ2hlY2sgaWYgbmFtZXMgZXhpc3QgaW4gcGFyYW1zIChzb21ldGltZXMgZmxhdHRlbmVkIGFzIGNhdGVnb3JpZXMuMC50aXRsZSlcclxuICAgIGNvbnN0IHBhcmFtc1RpdGxlczogc3RyaW5nW10gPSBbXTtcclxuICAgIE9iamVjdC5rZXlzKHJlY29yZC5wYXJhbXMpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgaWYgKGtleS5zdGFydHNXaXRoKGAke3Byb3BlcnR5Lm5hbWV9LmApICYmIGtleS5lbmRzV2l0aCgnLnRpdGxlJykpIHtcclxuICAgICAgICBwYXJhbXNUaXRsZXMucHVzaChyZWNvcmQucGFyYW1zW2tleV0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGlmIChwYXJhbXNUaXRsZXMubGVuZ3RoID4gMCkgcmV0dXJuIDxUZXh0PntwYXJhbXNUaXRsZXMuam9pbignLCAnKX08L1RleHQ+O1xyXG5cclxuICAgIHJldHVybiA8VGV4dD4tPC9UZXh0PjtcclxuICB9XHJcbiAgXHJcbiAgLy8gQ3VycmVudCB2YWx1ZXMgYXJlIHVzdWFsbHkgc3RvcmVkIGFzIGNhdGVnb3JpZXMuMCwgY2F0ZWdvcmllcy4xLCBldGMgb3IgYXMgYSByYXcgYXJyYXkgaW4gc29tZSBjb250ZXh0c1xyXG4gIGNvbnN0IFtzZWxlY3RlZE9wdGlvbnMsIHNldFNlbGVjdGVkT3B0aW9uc10gPSB1c2VTdGF0ZTxhbnlbXT4oW10pO1xyXG4gIGNvbnN0IFthbGxPcHRpb25zLCBzZXRBbGxPcHRpb25zXSA9IHVzZVN0YXRlPGFueVtdPihbXSk7XHJcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgbG9hZENhdGVnb3JpZXMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuc2VhcmNoUmVjb3Jkcyh7XHJcbiAgICAgICAgICByZXNvdXJjZUlkOiAnTm90aWNpYXNDYXRlZ29yeScsXHJcbiAgICAgICAgICBxdWVyeTogJycsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHJlc3BvbnNlLm1hcChyID0+ICh7XHJcbiAgICAgICAgICB2YWx1ZTogci5pZCxcclxuICAgICAgICAgIGxhYmVsOiByLnRpdGxlLFxyXG4gICAgICAgIH0pKTtcclxuICAgICAgICBcclxuICAgICAgICBzZXRBbGxPcHRpb25zKG9wdGlvbnMpO1xyXG5cclxuICAgICAgICAvLyBHZXQgY3VycmVudGx5IHNlbGVjdGVkIElEc1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRJZHM6IHN0cmluZ1tdID0gW107XHJcbiAgICAgICAgT2JqZWN0LmtleXMocmVjb3JkLnBhcmFtcykuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgICAgaWYgKGtleS5zdGFydHNXaXRoKGAke3Byb3BlcnR5Lm5hbWV9LmApKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbCA9IHJlY29yZC5wYXJhbXNba2V5XTtcclxuICAgICAgICAgICAgaWYgKHZhbCkgY3VycmVudElkcy5wdXNoKHZhbC50b1N0cmluZygpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCByYXdWYWx1ZSA9IHJlY29yZC5wYXJhbXNbcHJvcGVydHkubmFtZV07XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmF3VmFsdWUpKSB7XHJcbiAgICAgICAgICAgIHJhd1ZhbHVlLmZvckVhY2godiA9PiBjdXJyZW50SWRzLnB1c2godi50b1N0cmluZygpKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IG9wdGlvbnMuZmlsdGVyKG9wdCA9PiBjdXJyZW50SWRzLmluY2x1ZGVzKG9wdC52YWx1ZS50b1N0cmluZygpKSk7XHJcbiAgICAgICAgc2V0U2VsZWN0ZWRPcHRpb25zKHNlbGVjdGVkKTtcclxuICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBsb2FkIGNhdGVnb3JpZXM6JywgZXJyb3IpO1xyXG4gICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgbG9hZENhdGVnb3JpZXMoKTtcclxuICB9LCBbcmVjb3JkLmlkLCByZWNvcmQucGFyYW1zXSk7IC8vIFVwZGF0ZSBvbiByZWNvcmQgY2hhbmdlXHJcblxyXG4gIGNvbnN0IGhhbmRsZUNoYW5nZSA9IChzZWxlY3RlZDogYW55KSA9PiB7XHJcbiAgICBjb25zdCBuZXdPcHRpb25zID0gc2VsZWN0ZWQgPyAoQXJyYXkuaXNBcnJheShzZWxlY3RlZCkgPyBzZWxlY3RlZCA6IFtzZWxlY3RlZF0pIDogW107XHJcbiAgICBzZXRTZWxlY3RlZE9wdGlvbnMobmV3T3B0aW9ucyk7XHJcbiAgICBjb25zdCBpZHMgPSBuZXdPcHRpb25zLm1hcChvcHQgPT4gb3B0LnZhbHVlKTtcclxuICAgIG9uQ2hhbmdlKHByb3BlcnR5Lm5hbWUsIGlkcyk7XHJcbiAgfTtcclxuXHJcbiAgaWYgKGlzU2hvdykge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPEZvcm1Hcm91cD5cclxuICAgICAgICA8TGFiZWw+e3Byb3BlcnR5LmxhYmVsfTwvTGFiZWw+XHJcbiAgICAgICAgPEJveCB2YXJpYW50PVwid2hpdGVcIiBwPVwibWRcIiBib3JkZXI9XCIxcHggc29saWQgI2RkZFwiIGJvcmRlclJhZGl1cz1cIm1kXCI+XHJcbiAgICAgICAgICB7c2VsZWN0ZWRPcHRpb25zLmxlbmd0aCA+IDAgPyAoXHJcbiAgICAgICAgICAgIDxCb3ggZmxleCBmbGV4RGlyZWN0aW9uPVwicm93XCIgZmxleFdyYXA9XCJ3cmFwXCI+XHJcbiAgICAgICAgICAgICAge3NlbGVjdGVkT3B0aW9ucy5tYXAob3B0ID0+IChcclxuICAgICAgICAgICAgICAgIDxCb3gga2V5PXtvcHQudmFsdWV9IGJnPVwicHJpbWFyeTEwMFwiIGNvbG9yPVwid2hpdGVcIiBweD1cInNtXCIgcHk9XCJ4c1wiIG1yPVwieHNcIiBtYj1cInhzXCIgYm9yZGVyUmFkaXVzPVwibWRcIj5cclxuICAgICAgICAgICAgICAgICAge29wdC5sYWJlbH1cclxuICAgICAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgIDxUZXh0IGNvbG9yPVwiZ3JleTQwXCI+Tm8gY2F0ZWdvcmllcyBzZWxlY3RlZDwvVGV4dD5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9Cb3g+XHJcbiAgICAgIDwvRm9ybUdyb3VwPlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8Qm94IG1iPVwieGxcIj5cclxuICAgICAgPEZvcm1Hcm91cD5cclxuICAgICAgICA8TGFiZWw+e3Byb3BlcnR5LmxhYmVsfTwvTGFiZWw+XHJcbiAgICAgICAgPFNlbGVjdFxyXG4gICAgICAgICAgaXNNdWx0aVxyXG4gICAgICAgICAgaXNMb2FkaW5nPXtpc0xvYWRpbmd9XHJcbiAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRPcHRpb25zfVxyXG4gICAgICAgICAgb3B0aW9ucz17YWxsT3B0aW9uc31cclxuICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVDaGFuZ2V9XHJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlbGVjdCBjYXRlZ29yaWVzLi4uXCJcclxuICAgICAgICAvPlxyXG4gICAgICAgIDxUZXh0IHZhcmlhbnQ9XCJzbVwiIGNvbG9yPVwiZ3JleTYwXCIgbXQ9XCJ4c1wiPlxyXG4gICAgICAgICAgU2VsZWN0IG9uZSBvciBtb3JlIGNhdGVnb3JpZXMgZm9yIHRoaXMgbmV3cyBpdGVtLlxyXG4gICAgICAgIDwvVGV4dD5cclxuICAgICAgPC9Gb3JtR3JvdXA+XHJcbiAgICA8L0JveD5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2F0ZWdvcnlNdWx0aVNlbGVjdDtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgQmFkZ2UsIEJveCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nXG5pbXBvcnQgeyBCYXNlUHJvcGVydHlQcm9wcyB9IGZyb20gJ2FkbWluanMnXG5cbmNvbnN0IFJvbGVMaXN0OiBSZWFjdC5GQzxCYXNlUHJvcGVydHlQcm9wcz4gPSAocHJvcHMpID0+IHtcbiAgY29uc3QgeyByZWNvcmQgfSA9IHByb3BzXG4gIFxuICAvLyBVc2UgdGhlIHByZS1wcm9jZXNzZWQgcm9sZSBuYW1lcyBmcm9tIG91ciAnYWZ0ZXInIGhvb2tcbiAgY29uc3Qgcm9sZU5hbWVzID0gcmVjb3JkLnBhcmFtcy5yb2xlTmFtZXMgfHwgW11cbiAgXG4gIGlmICghcm9sZU5hbWVzIHx8IHJvbGVOYW1lcy5sZW5ndGggPT09IDApIHtcbiAgICAvLyBDaGVjayBpZiB3ZSBoYXZlIHBvcHVsYXRlZCByb2xlcyBhcyBmYWxsYmFja1xuICAgIGNvbnN0IHBvcHVsYXRlZCA9IHJlY29yZC5wb3B1bGF0ZWQ/LnJvbGVzXG4gICAgY29uc3QgcG9wdWxhdGVkUm9sZXMgPSBBcnJheS5pc0FycmF5KHBvcHVsYXRlZCkgPyBwb3B1bGF0ZWQgOiAocG9wdWxhdGVkID8gW3BvcHVsYXRlZF0gOiBbXSlcbiAgICBcbiAgICBpZiAocG9wdWxhdGVkUm9sZXMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPEJveCBmbGV4IGZsZXhEaXJlY3Rpb249XCJyb3dcIiBmbGV4V3JhcD1cIndyYXBcIj5cbiAgICAgICAgICB7cG9wdWxhdGVkUm9sZXMubWFwKChyb2xlOiBhbnksIGluZGV4OiBudW1iZXIpID0+IChcbiAgICAgICAgICAgIDxCYWRnZSBrZXk9e3JvbGUuaWQgfHwgaW5kZXh9IG1yPVwieHNcIiBtYj1cInhzXCIgdmFyaWFudD1cInByaW1hcnlcIj5cbiAgICAgICAgICAgICAge3JvbGUucGFyYW1zPy5uYW1lIHx8IHJvbGUubmFtZSB8fCAnUm9sZSd9XG4gICAgICAgICAgICA8L0JhZGdlPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L0JveD5cbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIDxCb3ggY29sb3I9XCJncmV5NDBcIiBmb250U2l6ZT1cInNtXCI+Tm8gcm9sZXMgYXNzaWduZWQ8L0JveD5cbiAgfVxuXG4gIC8vIEhhbmRsZSBjYXNlIHdoZXJlIGl0IG1pZ2h0IGJlIGEgSlNPTiBzdHJpbmdcbiAgY29uc3Qgcm9sZUFycmF5ID0gQXJyYXkuaXNBcnJheShyb2xlTmFtZXMpID8gcm9sZU5hbWVzIDogW11cblxuICByZXR1cm4gKFxuICAgIDxCb3ggZmxleCBmbGV4RGlyZWN0aW9uPVwicm93XCIgZmxleFdyYXA9XCJ3cmFwXCI+XG4gICAgICB7cm9sZUFycmF5Lm1hcCgobmFtZTogc3RyaW5nLCBpbmRleDogbnVtYmVyKSA9PiAoXG4gICAgICAgIDxCYWRnZSBrZXk9e2luZGV4fSBtcj1cInhzXCIgbWI9XCJ4c1wiIHZhcmlhbnQ9XCJwcmltYXJ5XCI+XG4gICAgICAgICAge25hbWV9XG4gICAgICAgIDwvQmFkZ2U+XG4gICAgICApKX1cbiAgICA8L0JveD5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBSb2xlTGlzdFxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUN1cnJlbnRBZG1pbiwgQXBpQ2xpZW50IH0gZnJvbSAnYWRtaW5qcyc7XG5cbmNvbnN0IGFwaSA9IG5ldyBBcGlDbGllbnQoKTtcblxuY29uc3QgQXV0aGVudGljYXRpb25CYWNrZ3JvdW5kQ29tcG9uZW50T3ZlcnJpZGUgPSAoKSA9PiB7XG4gIGNvbnN0IFtjdXJyZW50QWRtaW4sIHNldEN1cnJlbnRBZG1pbl0gPSB1c2VDdXJyZW50QWRtaW4oKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIC8vIE9ubHkgc2V0IHVwIHRoZSBpbnRlcnZhbCBpZiB0aGVyZSdzIGFuIGFkbWluIGxvZ2dlZCBpblxuICAgIGlmICghY3VycmVudEFkbWluKSByZXR1cm47XG5cbiAgICAvLyBDYWxsIHJlZnJlc2ggdG9rZW4gQVBJIHBlcmlvZGljYWxseSwgZS5nLiwgZXZlcnkgNSBtaW51dGVzICgzMDAwMDAgbXMpXG4gICAgLy8gT3IgYWRqdXN0IGludGVydmFsIHRvIHlvdXIgc2Vzc2lvbiBleHBpcmF0aW9uIHRpbWUuXG4gICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5yZWZyZXNoVG9rZW4oe30pO1xuICAgICAgICBjb25zdCB7IGRhdGEgfSA9IHJlc3BvbnNlO1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgIHNldEN1cnJlbnRBZG1pbihkYXRhKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIHJlZnJlc2ggYWRtaW4gc2Vzc2lvbjonLCBlcnJvcik7XG4gICAgICB9XG4gICAgfSwgNSAqIDYwICogMTAwMCk7IFxuXG4gICAgcmV0dXJuICgpID0+IGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICB9LCBbY3VycmVudEFkbWluLCBzZXRDdXJyZW50QWRtaW5dKTtcblxuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgQXV0aGVudGljYXRpb25CYWNrZ3JvdW5kQ29tcG9uZW50T3ZlcnJpZGU7XG4iLCJBZG1pbkpTLlVzZXJDb21wb25lbnRzID0ge31cbmltcG9ydCBGQVFCdWlsZGVyIGZyb20gJy4uL3NyYy9hZG1pbi9jb21wb25lbnRzL0ZBUUJ1aWxkZXInXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkZBUUJ1aWxkZXIgPSBGQVFCdWlsZGVyXG5pbXBvcnQgSW1hZ2VVcGxvYWRlciBmcm9tICcuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9JbWFnZVVwbG9hZGVyJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5JbWFnZVVwbG9hZGVyID0gSW1hZ2VVcGxvYWRlclxuaW1wb3J0IENhdGVnb3J5TXVsdGlTZWxlY3QgZnJvbSAnLi4vc3JjL2FkbWluL2NvbXBvbmVudHMvQ2F0ZWdvcnlNdWx0aVNlbGVjdCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ2F0ZWdvcnlNdWx0aVNlbGVjdCA9IENhdGVnb3J5TXVsdGlTZWxlY3RcbmltcG9ydCBSb2xlTGlzdCBmcm9tICcuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9yb2xlLWxpc3QnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlJvbGVMaXN0ID0gUm9sZUxpc3RcbmltcG9ydCBBdXRoZW50aWNhdGlvbkJhY2tncm91bmRDb21wb25lbnQgZnJvbSAnLi4vc3JjL2FkbWluL2NvbXBvbmVudHMvQXV0aGVudGljYXRpb25CYWNrZ3JvdW5kJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5BdXRoZW50aWNhdGlvbkJhY2tncm91bmRDb21wb25lbnQgPSBBdXRoZW50aWNhdGlvbkJhY2tncm91bmRDb21wb25lbnQiXSwibmFtZXMiOlsiRkFRQnVpbGRlciIsInByb3BzIiwicHJvcGVydHkiLCJyZWNvcmQiLCJvbkNoYW5nZSIsInJlc291cmNlIiwiYWN0aW9uIiwicGFnZVR5cGUiLCJwYXJhbXMiLCJpc1Nob3ciLCJuYW1lIiwiZ2V0SW5pdGlhbERhdGEiLCJkaXJlY3RWYWx1ZSIsIml0ZW1zIiwicGFyc2VkIiwiSlNPTiIsInBhcnNlIiwiZSIsImkiLCJ1bmRlZmluZWQiLCJzaG93VGl0bGVWYWwiLCJwdXNoIiwidGl0bGUiLCJzdWJ0aXRsZSIsImRlc2NyaXB0aW9uIiwic2hvd1RpdGxlIiwibGVuZ3RoIiwiZGF0YSIsInNldERhdGEiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsInVwZGF0ZUNvbnRlbnQiLCJuZXdEYXRhIiwiYWRkSXRlbSIsIm5ld0l0ZW1zIiwiYWRkVGl0bGVTZWN0aW9uIiwicmVtb3ZlSXRlbSIsImluZGV4IiwiZmlsdGVyIiwiXyIsImhhbmRsZUl0ZW1DaGFuZ2UiLCJrZXkiLCJ2YWwiLCJpc0ZBUSIsImhhc0l0ZW1zIiwiUmVhY3QiLCJjcmVhdGVFbGVtZW50IiwiQm94IiwidmFyaWFudCIsInAiLCJib3JkZXIiLCJib3JkZXJSYWRpdXMiLCJtdCIsImJveFNoYWRvdyIsIm1hcCIsIml0ZW0iLCJtYiIsInBiIiwiYm9yZGVyQm90dG9tIiwiVGV4dCIsImZvbnRXZWlnaHQiLCJjb2xvciIsIml0YWxpYyIsInBvc2l0aW9uIiwicHQiLCJ0b3AiLCJyaWdodCIsIkJ1dHRvbiIsInR5cGUiLCJzaXplIiwib25DbGljayIsIkljb24iLCJpY29uIiwiRm9ybUdyb3VwIiwiTGFiZWwiLCJJbnB1dCIsInZhbHVlIiwidGFyZ2V0IiwicGxhY2Vob2xkZXIiLCJ3aWR0aCIsIlRleHRBcmVhIiwicm93cyIsImZsZXgiLCJmbGV4RGlyZWN0aW9uIiwianVzdGlmeUNvbnRlbnQiLCJkaXNwbGF5IiwiYWxpZ25JdGVtcyIsIm1yIiwiSW1hZ2VVcGxvYWRlciIsIndoZXJlIiwicHJldmlldyIsInNldFByZXZpZXciLCJoYW5kbGVGaWxlQ2hhbmdlIiwiZmlsZXMiLCJmaWxlIiwicmVhZGVyIiwiRmlsZVJlYWRlciIsIm9ubG9hZGVuZCIsImJhc2U2NFN0cmluZyIsInJlc3VsdCIsInJlYWRBc0RhdGFVUkwiLCJoYW5kbGVDbGVhciIsImltZ1VybCIsInNyYyIsImFsdCIsInN0eWxlIiwiaGVpZ2h0Iiwib2JqZWN0Rml0IiwibGFiZWwiLCJtYXhXaWR0aCIsInRleHRBbGlnbiIsIm1heEhlaWdodCIsIkRyb3Bab25lIiwidmFsaWRhdGUiLCJtYXhTaXplIiwibWltZVR5cGVzIiwiQ2F0ZWdvcnlNdWx0aVNlbGVjdCIsImlzTGlzdCIsImFwaSIsIkFwaUNsaWVudCIsInBvcHVsYXRlZCIsIkFycmF5IiwiaXNBcnJheSIsInRpdGxlcyIsImlkIiwiQm9vbGVhbiIsImpvaW4iLCJwYXJhbXNUaXRsZXMiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsInN0YXJ0c1dpdGgiLCJlbmRzV2l0aCIsInNlbGVjdGVkT3B0aW9ucyIsInNldFNlbGVjdGVkT3B0aW9ucyIsImFsbE9wdGlvbnMiLCJzZXRBbGxPcHRpb25zIiwiaXNMb2FkaW5nIiwic2V0SXNMb2FkaW5nIiwibG9hZENhdGVnb3JpZXMiLCJyZXNwb25zZSIsInNlYXJjaFJlY29yZHMiLCJyZXNvdXJjZUlkIiwicXVlcnkiLCJvcHRpb25zIiwiciIsImN1cnJlbnRJZHMiLCJ0b1N0cmluZyIsInJhd1ZhbHVlIiwidiIsInNlbGVjdGVkIiwib3B0IiwiaW5jbHVkZXMiLCJlcnJvciIsImNvbnNvbGUiLCJoYW5kbGVDaGFuZ2UiLCJuZXdPcHRpb25zIiwiaWRzIiwiZmxleFdyYXAiLCJiZyIsInB4IiwicHkiLCJTZWxlY3QiLCJpc011bHRpIiwiUm9sZUxpc3QiLCJyb2xlTmFtZXMiLCJyb2xlcyIsInBvcHVsYXRlZFJvbGVzIiwicm9sZSIsIkJhZGdlIiwiZm9udFNpemUiLCJyb2xlQXJyYXkiLCJBdXRoZW50aWNhdGlvbkJhY2tncm91bmRDb21wb25lbnRPdmVycmlkZSIsImN1cnJlbnRBZG1pbiIsInNldEN1cnJlbnRBZG1pbiIsInVzZUN1cnJlbnRBZG1pbiIsImludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJyZWZyZXNoVG9rZW4iLCJjbGVhckludGVydmFsIiwiQWRtaW5KUyIsIlVzZXJDb21wb25lbnRzIiwiQXV0aGVudGljYXRpb25CYWNrZ3JvdW5kQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBSUEsTUFBTUEsVUFBdUMsR0FBSUMsS0FBSyxJQUFLO0lBQ3pELE1BQU07TUFBRUMsUUFBUTtNQUFFQyxNQUFNO01BQUVDLFFBQVE7RUFBRUMsSUFBQUE7RUFBUyxHQUFDLEdBQUdKLEtBQUs7RUFDdEQsRUFBQSxNQUFNSyxNQUFNLEdBQUlMLEtBQUssQ0FBU0ssTUFBTTtJQUNwQyxNQUFNQyxRQUFRLEdBQUdKLE1BQU0sQ0FBQ0ssTUFBTSxDQUFDRCxRQUFRLElBQUksS0FBSzs7RUFFaEQ7SUFDQSxNQUFNRSxNQUFNLEdBQUdILE1BQU0sRUFBRUksSUFBSSxLQUFLLE1BQU0sSUFBSSxDQUFDTixRQUFROztFQUVuRDtJQUNBLE1BQU1PLGNBQWMsR0FBR0EsTUFBTTtFQUMzQjtNQUNBLE1BQU1DLFdBQVcsR0FBR1QsTUFBTSxDQUFDSyxNQUFNLENBQUNOLFFBQVEsQ0FBQ1EsSUFBSSxDQUFDO0VBQ2hELElBQUEsSUFBSUUsV0FBVyxFQUFFO1FBQ2YsSUFBSSxPQUFPQSxXQUFXLEtBQUssUUFBUSxJQUFJQSxXQUFXLENBQUNDLEtBQUssRUFBRSxPQUFPRCxXQUFXO0VBQzVFLE1BQUEsSUFBSSxPQUFPQSxXQUFXLEtBQUssUUFBUSxFQUFFO1VBQ25DLElBQUk7RUFDRixV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

import { useCallback } from "react";

const useSidebar = (selectedWidget, onWidgetUpdate) => {
  const handleFieldUpdate = useCallback(
    (field, value) => {
      if (!selectedWidget) return;

      const updatedWidget = {
        ...selectedWidget,
        [field]: value,
      };
      onWidgetUpdate(updatedWidget);
    },
    [selectedWidget, onWidgetUpdate]
  );

  const handleColorChange = useCallback(
    (colorType, color) => {
      if (!selectedWidget) return;

      const updatedWidget = {
        ...selectedWidget,
        [colorType]: color,
      };
      onWidgetUpdate(updatedWidget);
    },
    [selectedWidget, onWidgetUpdate]
  );

  const handleQuickColorApply = useCallback(
    (color, targetField = "titleColor") => {
      handleColorChange(targetField, color);
    },
    [handleColorChange]
  );

  const handleBackgroundTypeChange = useCallback(
    (backgroundType) => {
      if (!selectedWidget) return;

      const updatedWidget = {
        ...selectedWidget,
        backgroundType,

        ...(backgroundType === "solid" &&
          !selectedWidget.backgroundColor && {
            backgroundColor: "#ffffff",
          }),
      };
      onWidgetUpdate(updatedWidget);
    },
    [selectedWidget, onWidgetUpdate]
  );

  const handleBackgroundColorChange = useCallback(
    (color) => {
      if (!selectedWidget) return;

      const updatedWidget = {
        ...selectedWidget,
        backgroundColor: color,
        backgroundType: "solid",
      };
      onWidgetUpdate(updatedWidget);
    },
    [selectedWidget, onWidgetUpdate]
  );

  return {
    handleFieldUpdate,
    handleColorChange,
    handleQuickColorApply,
    handleBackgroundTypeChange,
    handleBackgroundColorChange,
  };
};

export default useSidebar;

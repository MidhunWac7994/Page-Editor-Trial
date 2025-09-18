import { useCallback } from "react";

export const useSidebar = (selectedWidget, onWidgetUpdate) => {
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

  return {
    handleFieldUpdate,
    handleColorChange,
    handleQuickColorApply,
  };
};


import { useState, useEffect } from "react";
import DummyWidgets from "../Components/DummyWidgets";
import { toast } from "sonner";

export const useWidgetEditor = () => {
  const [widgets, setWidgets] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [pendingAddPosition, setPendingAddPosition] = useState(null);
  console.log(DummyWidgets, "DummyWidgets");


  useEffect(() => {
    const savedWidgets = JSON.parse(localStorage.getItem("widgets"));
    if (savedWidgets) {
      setWidgets(savedWidgets);
    } else {
      setWidgets(DummyWidgets);
    }
  }, []);

  const selectedWidget = widgets.find((w) => w.id === selectedId);

  const updateLocalStorage = (updatedWidgets) => {
    localStorage.setItem("widgets", JSON.stringify(updatedWidgets));
  };

  const handleContentBlur = (id, field, e) => {
    const newValue = e.currentTarget.textContent;
    setWidgets((widgets) => {
      const updatedWidgets = widgets.map((w) =>
        w.id === id
          ? {
              ...w,
              [field]: newValue,
            }
          : w
      );
      updateLocalStorage(updatedWidgets);
      return updatedWidgets;
    });
  };

  const handleDelete = (id) => {
    setWidgets((widgets) => {
      const updatedWidgets = widgets.filter((w) => w.id !== id);
      if (selectedId === id) setSelectedId(null);
      updateLocalStorage(updatedWidgets);
      return updatedWidgets;
    });
  };

  const handleAddWidget = (position) => {
    setShowTemplateSelector(true);
    setPendingAddPosition(position);
  };

  const handleSelectTemplate = (template) => {
    const newWidget = {
      ...template,
      id: Date.now(),
      titleColor: template.titleColor || "#000000",
      subtitleColor: template.subtitleColor || "#4338ca",
      contentColor: template.contentColor || "#1f2937",
    };

    setWidgets((widgets) => {
      let updatedWidgets;
      if (pendingAddPosition === "top" && selectedId !== null) {
        const selectedIndex = widgets.findIndex((w) => w.id === selectedId);
        updatedWidgets = [
          ...widgets.slice(0, selectedIndex),
          newWidget,
          ...widgets.slice(selectedIndex),
        ];
      } else if (pendingAddPosition === "bottom" && selectedId !== null) {
        const selectedIndex = widgets.findIndex((w) => w.id === selectedId);
        updatedWidgets = [
          ...widgets.slice(0, selectedIndex + 1),
          newWidget,
          ...widgets.slice(selectedIndex + 1),
        ];
      } else {
        updatedWidgets = [...widgets, newWidget];
      }
      updateLocalStorage(updatedWidgets);
      return updatedWidgets;
    });

    setSelectedId(newWidget.id);
    setShowTemplateSelector(false);
    setPendingAddPosition(null);
  };

  const handleCancelTemplateSelection = () => {
    setShowTemplateSelector(false);
    setPendingAddPosition(null);
  };

  const handleDuplicate = (id) => {
    const widgetToDuplicate = widgets.find((w) => w.id === id);
    if (!widgetToDuplicate) return;

    const newWidget = {
      ...widgetToDuplicate,
      id: Date.now(),
    };

    setWidgets((widgets) => {
      const selectedIndex = widgets.findIndex((w) => w.id === id);
      const updatedWidgets = [
        ...widgets.slice(0, selectedIndex + 1),
        newWidget,
        ...widgets.slice(selectedIndex + 1),
      ];
      updateLocalStorage(updatedWidgets);
      return updatedWidgets;
    });

    setSelectedId(newWidget.id);
  };

  const handleSave = () => {
    updateLocalStorage(widgets);
    toast.success("Changes saved successfully!", {
      duration: 3000, 
      position: "top-right", 
    });
  };    

  const handleWidgetUpdate = (updatedWidget) => {
    setWidgets((widgets) => {
      const updatedWidgets = widgets.map((w) =>
        w.id === updatedWidget.id ? updatedWidget : w
      );
      updateLocalStorage(updatedWidgets);
      return updatedWidgets;
    });
  };

  return {
    widgets,
    selectedId,
    selectedWidget,
    showTemplateSelector,
    setSelectedId,
    handleContentBlur,
    handleDelete,
    handleAddWidget,  
    handleSelectTemplate,
    handleCancelTemplateSelection,
    handleDuplicate,
    handleSave,
    handleWidgetUpdate,
  };
};

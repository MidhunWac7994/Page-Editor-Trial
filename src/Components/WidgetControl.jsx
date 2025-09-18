import { Trash2, Plus, Copy } from "lucide-react";
import IconButton from "./IconButton";

const WidgetControls = ({ widgetId, onAddWidget, onDelete, onDuplicate }) => {
  const handleStopPropagation =
    (callback, ...args) =>
    (e) => {
      e.stopPropagation();
      callback(...args);
    };

  return (
    <>
      <IconButton
        icon={Plus}
        onClick={handleStopPropagation(onAddWidget, "top")}
        position="top-0 left-1/2 transform -translate-x-1/2"
        title="Add Widget Above"
      />

      <IconButton
        icon={Trash2}
        onClick={handleStopPropagation(onDelete, widgetId)}
        position="top-2 right-2"
        ariaLabel="Delete section"
        title="Delete"
      />

      <IconButton
        icon={Plus}
        onClick={handleStopPropagation(onAddWidget, "bottom")}
        position="bottom-0 left-1/2 transform -translate-x-1/2"
        title="Add Widget Below"
      />


      <IconButton
        icon={Copy}
        onClick={handleStopPropagation(onDuplicate, widgetId)}
        position="bottom-2 right-2"
        ariaLabel="Duplicate section"
        title="Duplicate"
      />
    </>
  );
};

export default WidgetControls;

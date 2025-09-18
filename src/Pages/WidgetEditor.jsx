
import Sidebar from "../Components/Sidebar";
import { useWidgetEditor } from "../CustomHooks/useWidgetEditor";
import EmptyState from "../Components/EmptyState";
import Widget from "../Components/Widgets";

export default function WidgetEditor() {
  const {
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
  } = useWidgetEditor();

  return (
    <div className="flex min-h-screen bg-gradient-to-tr from-white to-gray-200 pt-10">
      <main className="w-[calc(100%-320px)]">
        {widgets.length === 0 && <EmptyState />}

        {widgets.map((widget) => (
          <Widget
            key={widget.id}
            widget={widget}
            isSelected={selectedId === widget.id}
            onSelect={setSelectedId}
            onContentBlur={handleContentBlur}
            onAddWidget={handleAddWidget}
            onDelete={handleDelete}
            onDuplicate={handleDuplicate}
            onWidgetUpdate={handleWidgetUpdate}
          />
        ))}
      </main>

      <Sidebar
        selectedWidget={selectedWidget}
        onSave={handleSave}
        onWidgetUpdate={handleWidgetUpdate}
        showTemplateSelector={showTemplateSelector}
        onSelectTemplate={handleSelectTemplate}
        onCancelTemplateSelection={handleCancelTemplateSelection}
      />
    </div>
  );
}
import EmptyState from "./EmptyState";
import BackgroundColorPalette from "./Sidebar/BackgroundColorPalette";
import BackgroundTypeToggle from "./Sidebar/BackgroundTypeToggle";
import ColorPicker from "./Sidebar/ColorPicker";
import EditableField from "./Sidebar/EditableField";
import QuickColorPalette from "./Sidebar/QuickColorPalette";
import TemplateSelector from "./Sidebar/TemplateSelector";
import useSidebar from "../CustomHooks/useSidebar";

export default function Sidebar({
  selectedWidget,
  onSave,
  onWidgetUpdate,
  showTemplateSelector,
  onSelectTemplate,
  onCancelTemplateSelection,
}) {
  const {
    handleFieldUpdate,
    handleColorChange,
    handleQuickColorApply,
    handleBackgroundTypeChange,
    handleBackgroundColorChange,
  } = useSidebar(selectedWidget, onWidgetUpdate);

  if (showTemplateSelector) {
    return (
      <TemplateSelector
        onSelectTemplate={onSelectTemplate}
        onCancelTemplateSelection={onCancelTemplateSelection}
      />
    );
  }

  if (!selectedWidget) {
    return <EmptyState />;
  }

  const backgroundType = selectedWidget.backgroundType || "gradient";

  return (
    <aside className="fixed top-[80px] right-0 h-[calc(100vh-80px)] w-80 bg-white shadow-xl p-6 border-l border-gray-200 overflow-y-auto">
      <h2 className="text-2xl font-extrabold mb-6 text-gray-900 border-b border-gray-300 pb-3">
        Widget Details
      </h2>

      <div className="space-y-6">
        <EditableField
          label="Title"
          value={selectedWidget.title}
          onUpdate={(value) => handleFieldUpdate("title", value)}
        />

        <EditableField
          label="Subtitle"
          value={selectedWidget.subtitle}
          onUpdate={(value) => handleFieldUpdate("subtitle", value)}
        />

        <EditableField
          label="Content"
          value={selectedWidget.content || "Add your content here..."}
          onUpdate={(value) => handleFieldUpdate("content", value)}
          className="text-base min-h-[100px]"
          multiline={true}
        />

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Background Settings
          </h3>

          <BackgroundTypeToggle
            backgroundType={backgroundType}
            onToggle={handleBackgroundTypeChange}
          />

          {backgroundType === "solid" ? (
            <>
              <ColorPicker
                label="Background Color"
                value={selectedWidget.backgroundColor || "#ffffff"}
                onChange={handleBackgroundColorChange}
                placeholder="#ffffff"
              />
              <BackgroundColorPalette
                onColorSelect={handleBackgroundColorChange}
              />
            </>
          ) : (
            <div className="text-sm text-gray-600 p-3 bg-gray-50 rounded">
              Using gradient background from template. Switch to Solid Color to
              customize background color.
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Text Colors
          </h3>

          <div className="space-y-4">
            <ColorPicker
              label="Title Color"
              value={selectedWidget.titleColor || "#000000"}
              onChange={(color) => handleColorChange("titleColor", color)}
              placeholder="#000000"
            />
            <ColorPicker
              label="Subtitle Color"
              value={selectedWidget.subtitleColor || "#4338ca"}
              onChange={(color) => handleColorChange("subtitleColor", color)}
              placeholder="#4338ca"
            />
            <ColorPicker
              label="Content Color"
              value={selectedWidget.contentColor || "#1f2937"}
              onChange={(color) => handleColorChange("contentColor", color)}
              placeholder="#1f2937"
            />
          </div>

          <QuickColorPalette
            onColorSelect={(color) =>
              handleQuickColorApply(color, "titleColor")
            }
            title="Quick Text Colors"
          />
        </div>

        <button
          onClick={onSave}
          className="mt-6 ml-7 w-56 bg-red-700 text-white py-2 px-4 rounded-none focus:outline-none hover:bg-[#e94c79] transition-colors"
        >
          Save Changes
        </button>
      </div>
    </aside>
  );
}

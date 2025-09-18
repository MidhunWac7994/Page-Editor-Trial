import React from "react";
import { X } from "lucide-react";
import DummyWidgets from "./DummyWidgets";
import { useSidebar } from "../CustomHooks/useSidebar";

const QUICK_COLORS = [
  "#000000", "#ffffff", "#ef4444", "#f97316", "#eab308",
  "#22c55e", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899"
];

const ColorPicker = ({ label, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <div className="flex items-center space-x-3">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 px-3 py-2 border border-gray-200 rounded-none focus:border-[#F65A8E] transition-colors text-sm"
        placeholder={placeholder}
      />
    </div>
  </div>
);

const EditableField = ({ label, value, onUpdate, className = "", multiline = false }) => (
  <div>
    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
      {label}
    </h3>
    <div
      className={`text-lg font-medium text-gray-800 outline-none p-2 border border-gray-200 rounded-none focus:border-[#F65A8E] transition-colors ${className}`}
      contentEditable
      suppressContentEditableWarning={true}
      onBlur={(e) => onUpdate(e.currentTarget.textContent)}
      spellCheck={false}
    >
      {value}
    </div>
  </div>
);

const TemplateSelector = ({ onSelectTemplate, onCancelTemplateSelection }) => (
  <aside className="fixed top-[80px] right-0 h-[calc(100vh-80px)] w-80 bg-white shadow-xl p-6 border-l border-gray-200 overflow-y-auto">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-extrabold text-gray-900">
        Choose Template
      </h2>
      <button
        onClick={onCancelTemplateSelection}
        className="p-1 hover:bg-gray-100 rounded"
      >
        <X className="h-5 w-5 text-gray-500" />
      </button>
    </div>

    <div className="space-y-3">
      {DummyWidgets.map((template, index) => (
        <div
          key={index}
          onClick={() => onSelectTemplate(template)}
          className="cursor-pointer group"
        >
          <div
            className={`
              ${template.gradient}
              h-24 rounded-lg p-3 flex flex-col justify-between
              transition-all duration-200 hover:scale-105 hover:shadow-lg
              border-2 border-transparent group-hover:border-white
            `}
          >
            <h3 className="text-sm font-bold text-white truncate">
              {template.title}
            </h3>
            <p className="text-xs text-white/80 truncate">
              {template.subtitle}
            </p>
          </div>
          <p className="text-xs text-gray-500 mt-1 px-1">
            {template.content.substring(0, 50)}...
          </p>
        </div>
      ))}
    </div>
  </aside>
);

const EmptyState = () => (
  <aside className="fixed top-[80px] right-0 h-[calc(100vh-80px)] w-80 bg-white shadow-xl p-6 border-l border-gray-200 overflow-y-auto">
    <p className="text-center text-gray-400">
      Select a widget to edit or click + to add new.
    </p>
  </aside>
);

const QuickColorPalette = ({ onColorSelect }) => (
  <div className="mt-4">
    <h4 className="text-xs font-medium text-gray-600 mb-2">
      Quick Colors
    </h4>
    <div className="flex flex-wrap gap-2">
      {QUICK_COLORS.map((color) => (
        <button
          key={color}
          onClick={() => onColorSelect(color)}
          className="w-8 h-8 rounded border-2 border-gray-300 hover:border-gray-400 transition-colors"
          style={{ backgroundColor: color }}
          title={color}
        />
      ))}
    </div>
  </div>
);

export default function Sidebar({
  selectedWidget,
  onSave,
  onWidgetUpdate,
  showTemplateSelector,
  onSelectTemplate,
  onCancelTemplateSelection,
}) {
  const { handleFieldUpdate, handleColorChange, handleQuickColorApply } = useSidebar(
    selectedWidget,
    onWidgetUpdate
  );

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
            onColorSelect={(color) => handleQuickColorApply(color, "titleColor")}
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
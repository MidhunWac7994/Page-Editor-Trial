import React from "react";
import { X } from "lucide-react";
import DummyWidgets from "../DummyWidgets";

const TemplateSelector = ({ onSelectTemplate, onCancelTemplateSelection }) => (
  <aside className="fixed top-[80px] right-0 h-[calc(100vh-80px)] w-80 bg-white shadow-xl p-6 border-l border-gray-200 overflow-y-auto">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-extrabold text-gray-900">Choose Template</h2>
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
            {template.name.substring(0, 50)}
          </p>
        </div>
      ))}
    </div>
  </aside>
);

export default TemplateSelector;

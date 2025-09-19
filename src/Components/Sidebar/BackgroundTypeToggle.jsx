import React from "react";

const BackgroundTypeToggle = ({ backgroundType, onToggle }) => (
  <div className="mb-4">
    <h4 className="text-xs font-medium text-gray-600 mb-2">Background Type</h4>
    <div className="flex rounded-lg border border-gray-300 overflow-hidden">
      <button
        onClick={() => onToggle("gradient")}
        className={`px-4 py-2 text-sm font-medium transition-colors flex-1 ${
          backgroundType === "gradient"
            ? "bg-[#F65A8E] text-white"
            : "bg-white text-gray-700 hover:bg-gray-50"
        }`}
      >
        Gradient
      </button>
      <button
        onClick={() => onToggle("solid")}
        className={`px-4 py-2 text-sm font-medium transition-colors flex-1 border-l border-gray-300 ${
          backgroundType === "solid"
            ? "bg-[#F65A8E] text-white"
            : "bg-white text-gray-700 hover:bg-gray-50"
        }`}
      >
        Solid Color
      </button>
    </div>
  </div>
);

export default BackgroundTypeToggle;

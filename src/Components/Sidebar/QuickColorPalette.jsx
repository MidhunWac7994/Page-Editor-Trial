import React from "react";

const QUICK_COLORS = [
  "#000000", "#ffffff", "#ef4444", "#f97316", "#eab308",
  "#22c55e", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899",
];

const QuickColorPalette = ({ onColorSelect, title = "Quick Colors" }) => (
  <div className="mt-4">
    <h4 className="text-xs font-medium text-gray-600 mb-2">{title}</h4>
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

export default QuickColorPalette;

import React from "react";

const BACKGROUND_COLORS = [
  "#ffffff",
  "#f8fafc",
  "#f1f5f9",
  "#e2e8f0",
  "#cbd5e1",
  "#94a3b8",
  "#64748b",
  "#475569",
  "#334155",
  "#1e293b",
  "#fef2f2",
  "#fee2e2",
  "#fecaca",
  "#f87171",
  "#ef4444",
  "#fefce8",
  "#fef3c7",
  "#fde68a",
  "#facc15",
  "#eab308",
  "#f0fdf4",
  "#dcfce7",
  "#bbf7d0",
  "#4ade80",
  "#22c55e",
  "#ecfeff",
  "#cffafe",
  "#a5f3fc",
  "#22d3ee",
  "#06b6d4",
  "#eff6ff",
  "#dbeafe",
  "#93c5fd",
  "#3b82f6",
  "#1d4ed8",
  "#f3e8ff",
  "#e9d5ff",
  "#c084fc",
  "#8b5cf6",
  "#7c3aed",
];

const BackgroundColorPalette = ({ onColorSelect }) => (
  <div className="mt-4">
    <h4 className="text-xs font-medium text-gray-600 mb-2">
      Background Colors
    </h4>
    <div className="grid grid-cols-8 gap-2">
      {BACKGROUND_COLORS.map((color) => (
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

export default BackgroundColorPalette;

import React from "react";

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

export default ColorPicker;

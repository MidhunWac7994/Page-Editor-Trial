
const EditableField = ({
  label,
  value,
  onUpdate,
  className = "",
  multiline = false,
}) => (
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

export default EditableField;

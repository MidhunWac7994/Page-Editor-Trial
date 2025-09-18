
const EditableContent = ({
  content,
  className = "",
  style = {},
  onBlur,
  field,
  id,
  as: Component = "div",
}) => {
  return (
    <Component
      className={`outline-none ${className}`}
      style={style}
      contentEditable
      suppressContentEditableWarning={true}
      onBlur={(e) => onBlur(id, field, e)}
      spellCheck={false}
    >
      {content}
    </Component>
  );
};

export default EditableContent;

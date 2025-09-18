
const IconButton = ({
  icon: Icon,
  onClick,
  className = "",
  title,
  ariaLabel,
  position = "relative",
  ...props
}) => {
  const baseClasses =
    "bg-[#F65A8E] p-2 rounded-full text-white hover:bg-red-700 focus:outline-none";
  const positionClasses = position !== "relative" ? `absolute ${position}` : "";

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${baseClasses} ${positionClasses} ${className}`}
      title={title}
      {...props}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
};

export default IconButton;

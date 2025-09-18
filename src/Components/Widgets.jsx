import React, { useState } from "react";
import EditableContent from "./EditableContent";
import WidgetControls from "./WidgetControl";
import ImageModal from "./ImageModal";


const Widget = ({
  widget,
  isSelected,
  onSelect,
  onContentBlur,
  onAddWidget,
  onDelete,
  onDuplicate,
  onWidgetUpdate,
}) => {
  const [showImageModal, setShowImageModal] = useState(false);

  const handleImageClick = (e) => {
    e.stopPropagation();
    setShowImageModal(true);
  };

  const handleImageUpload = (imageUrl) => {
    const updatedWidget = {
      ...widget,
      image: imageUrl,
    };
    onWidgetUpdate(updatedWidget);
    setShowImageModal(false);
  };

  const handleImageRemove = () => {
    const updatedWidget = {
      ...widget,
      image: null,
    };
    onWidgetUpdate(updatedWidget);
    setShowImageModal(false);
  };

  return (
    <>
      <div
        onClick={() => onSelect(widget.id)}
        className={`
    ${widget.width}
    ${widget.height}
    ${widget.gradient}
    flex flex-col justify-between p-8 cursor-pointer
    transition-all duration-300 overflow-hidden
    ${isSelected ? "border-4 border-[#F65A8E] relative" : "border-transparent"}
  `}
      >
        {isSelected && (
          <WidgetControls
            widgetId={widget.id}
            onAddWidget={onAddWidget}
            onDelete={onDelete}
            onDuplicate={onDuplicate}
          />
        )}

        <div className="flex-shrink-0 mb-4">
          <EditableContent
            as="h2"
            content={widget.title}
            className={`mb-3 ${widget.titleStyle}`}
            style={{ color: widget.titleColor || "#000000" }}
            onBlur={onContentBlur}
            field="title"
            id={widget.id}
          />
        </div>

        <div className="flex-shrink-0 mb-4">
          <EditableContent
            as="p"
            content={widget.subtitle}
            className="text-lg"
            style={{ color: widget.subtitleColor || "#4338ca" }}
            onBlur={onContentBlur}
            field="subtitle"
            id={widget.id}
          />
        </div>

        {widget.image && (
          <div
            className="flex-shrink-0  mr-16 my-4 ml-auto"
            style={{ width: "400px", height: "300px" }} 
            onClick={handleImageClick}
          >
            <img
              src={widget.image}
              alt="Widget Image"
              className="w-full h-full object-cover rounded-none"
            />
          </div>
        )}

    
        {!widget.image && isSelected && (
          <div
            className="flex-shrink-0 my-4 h-40 w-64 border-2 border-dashed border-white/50 rounded-lg flex items-center justify-center cursor-pointer hover:border-white/80 transition-colors"
            onClick={handleImageClick}
          >
            <div className="text-white/80 text-center">
              <svg
                className="w-8 h-8 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="text-sm">Add Image</span>
            </div>
          </div>
        )}

        {widget.content && (
          <div className="flex-1 mt-4">
            <EditableContent
              content={widget.content}
              className="text-base"
              style={{ color: widget.contentColor || "#1f2937" }}
              onBlur={onContentBlur}
              field="content"
              id={widget.id}
            />
          </div>
        )}
      </div>

      {showImageModal && (
        <ImageModal
          isOpen={showImageModal}
          onClose={() => setShowImageModal(false)}
          currentImage={widget.image}
          onImageUpload={handleImageUpload}
          onImageRemove={handleImageRemove}
        />
      )}
    </>
  );
};

export default Widget;

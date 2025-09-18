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
      {/* Wrapper div centers the widget and ensures uniform width */}
      <div className="flex justify-center w-full">
        <div
          onClick={() => onSelect(widget.id)}
          className={`
            w-full max-w-6xl
            ${widget.height || "min-h-[500px]"}
            ${widget.gradient}
            flex flex-col p-8 cursor-pointer transition-all duration-300 overflow-hidden
            ${
              isSelected
                ? "border-4 border-[#F65A8E] relative"
                : "border-transparent"
            }
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

          {/* Main flex container: text left, image right */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 h-full">
            {/* Left side - Text content */}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <EditableContent
                as="h2"
                content={widget.title}
                className={`mb-4 ${widget.titleStyle}`}
                style={{ color: widget.titleColor || "#000000" }}
                onBlur={onContentBlur}
                field="title"
                id={widget.id}
              />

              <EditableContent
                as="p"
                content={widget.subtitle}
                className="mb-6 text-lg"
                style={{ color: widget.subtitleColor || "#4338ca" }}
                onBlur={onContentBlur}
                field="subtitle"
                id={widget.id}
              />

              {widget.content && (
                <EditableContent
                  content={widget.content}
                  className="text-base mb-6 whitespace-pre-line"
                  style={{ color: widget.contentColor || "#1f2937" }}
                  onBlur={onContentBlur}
                  field="content"
                  id={widget.id}
                />
              )}

              {widget.buttonText && (
                <div className="mt-auto pt-4">
                  <EditableContent
                    as="button"
                    content={widget.buttonText}
                    className="bg-[#F65A8E] hover:bg-red-700 text-white px-6 py-3 rounded-md font-medium focus:outline-none transition-colors"
                    onBlur={onContentBlur}
                    field="buttonText"
                    id={widget.id}
                  />
                </div>
              )}
            </div>

            {/* Right side - Image or add image placeholder */}
            <div className="flex-shrink-0 w-full lg:w-[400px] h-[250px] lg:h-[300px]">
              {widget.image ? (
                <img
                  src={widget.image}
                  alt="Widget Image"
                  onClick={handleImageClick}
                  className="w-full h-full object-cover rounded-md cursor-pointer shadow-lg"
                />
              ) : (
                isSelected && (
                  <div
                    className="h-full w-full border-2 border-dashed border-white/50 rounded-lg flex items-center justify-center cursor-pointer hover:border-white/80 transition-colors"
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
                )
              )}
            </div>
          </div>
        </div>
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

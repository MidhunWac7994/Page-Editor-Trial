import { X, Upload, Trash2 } from "lucide-react";
import useImageUpload from "../CustomHooks/useImageUpload";

const ImageModal = ({
  isOpen,
  onClose,
  currentImage,
  onImageUpload,
  onImageRemove,
}) => {
  const {
    dragActive,
    fileInputRef,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleFileInputChange,
  } = useImageUpload(onImageUpload);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-blur bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Manage Image</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-4">
          {currentImage && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Current Image
              </h3>
              <div className="relative">
                <img
                  src={currentImage}
                  alt="Current widget image"
                  className="w-full h-32 object-cover rounded-lg border border-gray-200"
                />
                <button
                  onClick={onImageRemove}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                  title="Remove Image"
                  aria-label="Remove image"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          <div className="border-b border-gray-200 mb-4">
            <button className="flex-1 py-2 px-4 text-sm font-medium border-b-2 transition-colors text-[#F65A8E] border-[#F65A8E]">
              <Upload className="w-4 h-4 inline mr-2" />
              Upload File
            </button>
          </div>

          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
              dragActive
                ? "border-[#F65A8E] bg-pink-50"
                : "border-gray-300 hover:border-[#F65A8E]"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            aria-label="Upload image"
          >
            <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-600 mb-2">
              Drop an image here, or{" "}
              <span className="text-[#F65A8E] font-medium">
                click to browse
              </span>
            </p>
            <p className="text-xs text-gray-400">
              Supports: JPG, PNG, GIF, WebP
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
              aria-label="Select image file"
            />
          </div>
        </div>

        <div className="border-t border-gray-200 p-4 bg-gray-50 rounded-b-lg">
          <button
            onClick={onClose}
            className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
            aria-label="Cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;

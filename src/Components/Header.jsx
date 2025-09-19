import { Eye, Edit3, Sparkles } from "lucide-react";

export default function Header({ isPreviewMode = false, onToggleMode }) {
  const handlePreview = () => {
    if (onToggleMode) {
      onToggleMode("preview");
    }
  };

  const handleEdit = () => {
    if (onToggleMode) {
      onToggleMode("edit");
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full py-4 px-6 bg-white text-gray-900 shadow-xl z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">

        <div className="flex items-center space-x-4">
          <div className="bg-gray-200 p-3 rounded-xl">
            <Sparkles className="h-8 w-8 text-gray-800" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Page Builder Pro
            </h1>
            <p className="text-sm text-gray-600 font-medium">
              Create stunning landing pages effortlessly
            </p>
          </div>
        </div>


        <div className="flex items-center space-x-4">
          <div className="flex bg-gray-100 rounded-xl p-1 border border-gray-300">
            <button
              onClick={handleEdit}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                !isPreviewMode
                  ? "bg-blue-600 text-white shadow-md transform scale-105"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Edit3 className="h-4 w-4" />
              <span>Edit</span>
            </button>

            <button
              onClick={handlePreview}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                isPreviewMode
                  ? "bg-blue-600 text-white shadow-md transform scale-105"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Eye className="h-4 w-4" />
              <span>Preview</span>
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1">
        <div
          className={`h-full transition-all duration-500 ${
            isPreviewMode ? "bg-blue-500" : "bg-orange-400"
          }`}
        />
      </div>

      <div className="absolute top-16 right-6">
        <div
          className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-300 ${
            isPreviewMode
              ? "bg-blue-500/20 text-blue-600 border-blue-500/30"
              : "bg-orange-500/20 text-orange-600 border-orange-400/30"
          }`}
        >
          {isPreviewMode ? "👁️ Preview Mode" : "✏️ Edit Mode"}
        </div>
      </div>
    </header>
  );
}

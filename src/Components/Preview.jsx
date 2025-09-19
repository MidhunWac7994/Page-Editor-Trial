const PreviewWidget = ({ widget }) => {
  const backgroundType = widget.backgroundType || "gradient"; // fallback to gradient if not set
  const isSolid = backgroundType === "solid";

  return (
    <div
      className={`
        w-full max-w-6xl ml-80
        ${widget.height || "min-h-[500px]"}
        flex flex-col justify-between p-8
        transition-all duration-300 overflow-hidden
        ${!isSolid ? widget.gradient || "bg-white" : ""}
      `}
      style={{
        backgroundColor: isSolid
          ? widget.backgroundColor || "#ffffff"
          : undefined,
      }}
    >
      <div className="flex-shrink-0 mb-4">
        <h2
          className={`mb-3 ${widget.titleStyle || "text-2xl"}`}
          style={{ color: widget.titleColor || "#FFFFFF" }}
        >
          {widget.title}
        </h2>
      </div>

      <div className="flex-shrink-0 mb-4">
        <p
          className="text-lg"
          style={{ color: widget.subtitleColor || "#4338ca" }}
        >
          {widget.subtitle}
        </p>
      </div>

      {widget.image && (
        <div
          className="flex-shrink-0 mr-16 my-4 ml-auto"
          style={{ width: "400px", height: "300px" }}
        >
          <img
            src={widget.image}
            alt="Widget"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      )}

      {widget.content && (
        <div className="flex-1 mt-4">
          <div
            className="text-base whitespace-pre-wrap"
            style={{ color: widget.contentColor || "#1f2937" }}
          >
            {widget.content}
          </div>
        </div>
      )}
    </div>
  );
};

import { useEffect, useState } from "react";

const Preview = () => {
  const [widgets, setWidgets] = useState([]);

  useEffect(() => {
    const savedWidgets = JSON.parse(localStorage.getItem("widgets"));
    if (savedWidgets) {
      setWidgets(savedWidgets);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-white to-gray-200 pt-20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Preview Mode
          </h1>
          <p className="text-gray-600">
            This is how your landing page will look
          </p>
        </div>
      </div>

      <main className="w-full">
        {widgets.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📄</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              No content to preview
            </h2>
            <p className="text-gray-500">
              Switch to Edit mode to start building your page
            </p>
          </div>
        ) : (
          widgets.map((widget) => (
            <PreviewWidget key={widget.id} widget={widget} />
          ))
        )}
      </main>

      <footer className="bg-gray-100 border-t border-gray-200 py-6 mt-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-500">
            Built with Page Builder Pro - Switch to Edit mode to make changes
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Preview;

import { Route, Routes, BrowserRouter, useNavigate } from "react-router-dom";
import { useState } from "react"; // Import useState for managing the mode
import Header from "./Components/Header";
import WidgetEditor from "./Pages/WidgetEditor";
import Preview from "./Components/Preview";
import { Toaster } from "sonner";

export default function App() {
  return (
    <BrowserRouter>
      <MainApp /> {/* This is where the main logic and routing should happen */}
    </BrowserRouter>
  );
}

function MainApp() {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const navigate = useNavigate(); // Now it's within the Router context

  const handleToggleMode = (mode) => {
    if (mode === "preview") {
      setIsPreviewMode(true);
      navigate("/preview"); // Navigate to the preview page
    } else {
      setIsPreviewMode(false);
      navigate("/"); // Navigate back to the home (edit) page
    }
  };

  return (
    <>
      <Header isPreviewMode={isPreviewMode} onToggleMode={handleToggleMode} />
      <div className="min-h-screen bg-gray-100 py-10">
        <Routes>
          <Route path="/" element={<WidgetEditor />} />
          <Route path="/preview" element={<Preview />} />
        </Routes>
      </div>
      <Toaster />
    </>
  );
}

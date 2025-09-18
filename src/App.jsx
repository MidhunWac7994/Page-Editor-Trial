import { Route, Routes, BrowserRouter, useNavigate } from "react-router-dom";
import { useState } from "react"; 
import Header from "./Components/Header";
import WidgetEditor from "./Pages/WidgetEditor";
import Preview from "./Components/Preview";
import { Toaster } from "sonner";

export default function App() {
  return (
    <BrowserRouter>
      <MainApp /> 
    </BrowserRouter>
  );
}

function MainApp() {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const navigate = useNavigate(); 

  const handleToggleMode = (mode) => {
    if (mode === "preview") {
      setIsPreviewMode(true);
      navigate("/preview"); 
    } else {
      setIsPreviewMode(false);
      navigate("/"); 
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

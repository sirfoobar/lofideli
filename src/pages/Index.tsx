
import { useState } from "react";
import WhiteboardCanvas from "@/components/WhiteboardCanvas";
import ComponentLibrary from "@/components/ComponentLibrary";
import PropertyPanel from "@/components/PropertyPanel";
import FramePropertyPanel from "@/components/FramePropertyPanel";
import FrameSizeControls from "@/components/FrameSizeControls";
import ZoomControls from "@/components/ZoomControls";
import TopBar from "@/components/TopBar";
import { WhiteboardProvider, useWhiteboard } from "@/context/WhiteboardContext";

// Component to manage selection and property panels
const WhiteboardManager = () => {
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [showComponentLibrary, setShowComponentLibrary] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const { state, dispatch } = useWhiteboard();
  
  const toggleComponentLibrary = () => {
    setShowComponentLibrary(!showComponentLibrary);
  };
  
  const toggleGrid = () => {
    setShowGrid(!showGrid);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-background">
      {/* Top Bar */}
      <TopBar onToggleComponentLibrary={toggleComponentLibrary} onToggleGrid={toggleGrid} showGrid={showGrid} />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar - Component Library */}
        <div className={`${showComponentLibrary ? 'w-64' : 'w-0'} border-r border-border bg-card overflow-y-auto transition-all duration-300 ease-in-out`}>
          {showComponentLibrary && <div className="p-3 py-[8px] px-[8px]">                
              {/* Frames section - Now at the top */}
              <FrameSizeControls />
              
              <div className="mt-6 border-t border-border pt-4">
                <h2 className="font-small mb-4 text-xs">Components</h2>
                <ComponentLibrary />
              </div>
            </div>}
        </div>

        {/* Main canvas area */}
        <div className="flex-1 overflow-hidden relative">
          <WhiteboardCanvas 
            onSelectComponent={setSelectedComponentId} 
            selectedComponentId={selectedComponentId} 
            showGrid={showGrid} 
          />
          <ZoomControls />
        </div>

        {/* Right sidebar - Properties - Only shown when a component or frame is selected */}
        <div 
          className={`w-64 border-l border-border bg-card overflow-y-auto p-4 transition-all duration-300 ease-in-out transform ${
            selectedComponentId || state.selectedFrameId ? 'translate-x-0' : 'translate-x-full'
          } absolute right-0 top-0 bottom-0 z-10`}
        >
          <h2 className="text-lg font-small mb-4">Properties</h2>
          
          {/* Show either component or frame properties based on what's selected */}
          {selectedComponentId && <PropertyPanel selectedComponentId={selectedComponentId} />}
          
          {!selectedComponentId && state.selectedFrameId && (
            <FramePropertyPanel 
              selectedFrameId={state.selectedFrameId} 
              onClose={() => dispatch({ type: "SELECT_FRAME", id: null })}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <WhiteboardProvider>
      <WhiteboardManager />
    </WhiteboardProvider>
  );
};

export default Index;

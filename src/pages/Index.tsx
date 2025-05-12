
import { useState } from "react";
import WhiteboardCanvas from "@/components/WhiteboardCanvas";
import ComponentLibrary from "@/components/ComponentLibrary";
import PropertyPanel from "@/components/PropertyPanel";
import FramePropertyPanel from "@/components/FramePropertyPanel";
import FrameSizeControls from "@/components/FrameSizeControls";
import ZoomControls from "@/components/ZoomControls";
import TopBar from "@/components/TopBar";
import AIDesignPanel from "@/components/AIDesignPanel";
import AIDesignButton from "@/components/AIDesignButton";
import { WhiteboardProvider, useWhiteboard } from "@/context/WhiteboardContext";

// Component to manage selection and property panels
const WhiteboardManager = () => {
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [showComponentLibrary, setShowComponentLibrary] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const {
    state,
    dispatch
  } = useWhiteboard();

  // Determine if any right panel is open - ensure boolean result
  const isRightPanelOpen = Boolean(showAIPanel || selectedComponentId || state.selectedFrameId);
  const toggleComponentLibrary = () => {
    setShowComponentLibrary(!showComponentLibrary);
  };
  const toggleGrid = () => {
    setShowGrid(!showGrid);
  };
  
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-background">
      {/* Top Bar with right panel status */}
      <TopBar 
        onToggleComponentLibrary={toggleComponentLibrary} 
        onToggleGrid={toggleGrid} 
        showGrid={showGrid} 
        rightPanelOpen={isRightPanelOpen} 
      />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar - Component Library - now hugs content */}
        <div className={`${showComponentLibrary ? 'w-auto max-w-48' : 'w-0'} border-r border-border bg-card overflow-y-auto transition-all duration-300 ease-in-out`}>
          {showComponentLibrary && (
            <div className="py-[8px] px-[8px]">                
              {/* Frames section - Now at the top */}
              <FrameSizeControls />
              
              <div className="mt-2 border-t border-border pt-4">
                <h2 className="font-small mb-4 text-xs">Components</h2>
                <ComponentLibrary />
              </div>
            </div>
          )}
        </div>

        {/* Main canvas area */}
        <div className="flex-1 overflow-hidden relative">
          <WhiteboardCanvas 
            onSelectComponent={setSelectedComponentId} 
            selectedComponentId={selectedComponentId} 
            showGrid={showGrid} 
          />
          <AIDesignButton onClick={() => setShowAIPanel(true)} />
          <ZoomControls />
        </div>

        {/* Right sidebar - Properties - Only shown when a component or frame is selected */}
        <div className={`w-64 border-l border-border bg-card overflow-y-auto p-4 transition-all duration-300 ease-in-out transform ${selectedComponentId || state.selectedFrameId ? 'translate-x-0' : 'translate-x-full'} absolute right-0 top-0 bottom-0 z-10`}>
          {/* Show either component or frame properties based on what's selected */}
          {selectedComponentId && <PropertyPanel selectedComponentId={selectedComponentId} />}
          
          {!selectedComponentId && state.selectedFrameId && (
            <FramePropertyPanel 
              selectedFrameId={state.selectedFrameId} 
              onClose={() => dispatch({
                type: "SELECT_FRAME",
                id: null
              })} 
            />
          )}
        </div>
        
        {/* AI Design Panel */}
        <AIDesignPanel isOpen={showAIPanel} onClose={() => setShowAIPanel(false)} />
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

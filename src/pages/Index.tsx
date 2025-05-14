
import { useState } from "react";
import WhiteboardCanvas from "@/components/WhiteboardCanvas";
import ComponentLibrary from "@/components/ComponentLibrary";
import PropertyPanel from "@/components/PropertyPanel";
import FramePropertyPanel from "@/components/FramePropertyPanel";
import FrameSizeControls from "@/components/FrameSizeControls";
import ZoomControls from "@/components/ZoomControls";
import TopBar from "@/components/TopBar";
import AIDesignPanel from "@/components/AIDesignPanel";
import FlowControlsPanel from "@/components/FlowControlsPanel";
import { WhiteboardProvider, useWhiteboard } from "@/context/WhiteboardContext";

// Component to manage selection and property panels
const WhiteboardManager = () => {
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [showComponentLibrary, setShowComponentLibrary] = useState(true);
  const [showFlowControls, setShowFlowControls] = useState(false);
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
  
  const toggleFlowControls = () => {
    setShowFlowControls(!showFlowControls);
    if (!showFlowControls) {
      setShowComponentLibrary(false); // Close component library if opening flow controls
    }
  };
  
  const toggleGrid = () => {
    setShowGrid(!showGrid);
  };
  
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-background">
      {/* Top Bar with right panel status */}
      <TopBar 
        onToggleComponentLibrary={toggleComponentLibrary} 
        onToggleFlowControls={toggleFlowControls}
        onToggleGrid={toggleGrid} 
        showGrid={showGrid} 
        showComponentLibrary={showComponentLibrary}
        showFlowControls={showFlowControls}
        rightPanelOpen={isRightPanelOpen}
        onOpenAIPanel={() => setShowAIPanel(true)}
      />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar - Component Library or Flow Controls */}
        {showComponentLibrary && (
          <div className="w-auto max-w-48 border-r border-border bg-card overflow-y-auto transition-all duration-300 ease-in-out">
            <div className="py-[8px] px-[8px]">                
              {/* Frames section - Now at the top */}
              <FrameSizeControls />
              
              <div className="mt-2 border-t border-border pt-4">
                <h2 className="font-small mb-4 text-xs">Components</h2>
                <ComponentLibrary />
              </div>
            </div>
          </div>
        )}
        
        {/* Flow Controls Panel */}
        <FlowControlsPanel isOpen={showFlowControls} />

        {/* Main canvas area */}
        <div className="flex-1 overflow-hidden relative">
          <WhiteboardCanvas 
            onSelectComponent={setSelectedComponentId} 
            selectedComponentId={selectedComponentId} 
            showGrid={showGrid} 
          />
          
          {/* Control elements - Note the z-index order */}
          <ZoomControls />
          
          {/* AI Design Panel - Now with higher z-index to appear above buttons */}
          <AIDesignPanel isOpen={showAIPanel} onClose={() => setShowAIPanel(false)} />
        </div>

        {/* Right sidebar - Properties - Only shown when a component or frame is selected */}
        <div className={`w-64 border-l border-border bg-card overflow-y-auto transition-all duration-300 ease-in-out transform ${selectedComponentId || state.selectedFrameId ? 'translate-x-0' : 'translate-x-full'} absolute right-0 top-0 bottom-0 z-10`}>
          {/* Show either component or frame properties based on what's selected */}
          {selectedComponentId && <PropertyPanel selectedComponentId={selectedComponentId} />}
          
          {!selectedComponentId && state.selectedFrameId && (
            <FramePropertyPanel 
              isOpen={Boolean(state.selectedFrameId)} 
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

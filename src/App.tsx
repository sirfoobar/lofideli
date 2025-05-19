import React, { useState, useEffect, useCallback } from 'react';
import { WhiteboardProvider } from './context/WhiteboardContext';
import TopBar from './components/TopBar';
import ComponentLibrary from './components/ComponentLibrary';
import WhiteboardCanvas from './components/WhiteboardCanvas';
import PropertyPanel from './components/PropertyPanel';
import FramePropertyPanel from './components/FramePropertyPanel';
import ZoomControls from './components/ZoomControls';
import GridControls from './components/GridControls';
import CanvasControls from './components/CanvasControls';
import FlowControlsPanel from './components/FlowControlsPanel';
import { MobileOverlay } from './components/MobileOverlay';
import { Toaster } from "./components/ui/toaster";
import AIDesignPanel from './components/AIDesignPanel';
import { useIsMobile } from './hooks/use-mobile';

function App() {
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const isMobile = useIsMobile();
  const [showComponentLibrary, setShowComponentLibrary] = useState<boolean>(true);
  const [showFlowControls, setShowFlowControls] = useState<boolean>(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState<boolean>(false);

  const handleSelectComponent = (id: string | null) => {
    setSelectedComponentId(id);
    setIsRightPanelOpen(!!id);
  };

  const toggleComponentLibrary = () => setShowComponentLibrary(prev => !prev);
  const toggleFlowControls = () => setShowFlowControls(prev => !prev);
  const toggleGrid = () => setShowGrid(prev => !prev);
  const openAIPanel = () => setIsRightPanelOpen(true);
  const closeRightPanel = () => setIsRightPanelOpen(false);

  return (
    <WhiteboardProvider>
      <div className="flex flex-col h-screen">
        <TopBar 
          onToggleComponentLibrary={toggleComponentLibrary}
          showComponentLibrary={showComponentLibrary}
          onToggleFlowControls={toggleFlowControls}
          showFlowControls={showFlowControls}
          onToggleGrid={toggleGrid}
          showGrid={showGrid}
          onOpenAIPanel={openAIPanel} 
        />
        
        <div className="flex flex-1 overflow-hidden">
          {/* Left sidebar */}
          <div className="w-64 flex-shrink-0 flex flex-col border-r border-border bg-sidebar-background text-sidebar-foreground">
            <div className="flex-1 overflow-y-auto p-4">
              {showComponentLibrary && (
                <ComponentLibrary />
              )}
              <div className="mt-6">
                <CanvasControls />
              </div>
              <div className="mt-6">
                <GridControls />
              </div>
              <div className="mt-6">
                <FlowControlsPanel isOpen={showFlowControls} />
              </div>
            </div>
          </div>
          
          {/* Main canvas */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="flex-1 relative">
              <WhiteboardCanvas 
                onSelectComponent={handleSelectComponent} 
                selectedComponentId={selectedComponentId} 
                showGrid={true} 
              />
              <ZoomControls />
            </div>
          </div>
          
          {/* Right Sidebar - Property Panel or AI Panel */}
          {isRightPanelOpen && (
            <div className="w-64 flex-shrink-0 border-l border-border bg-card text-card-foreground p-4 overflow-y-auto">
              {/* Conditionally render PropertyPanel or FramePropertyPanel based on selection */}
              {/* For now, let's assume PropertyPanel is for components and FramePropertyPanel for frames */}
              {selectedComponentId ? (
                <PropertyPanel selectedComponentId={selectedComponentId} />
              ) : (
                <FramePropertyPanel />
              )}
              
              {/* AI Design Panel (can be part of the right panel) */}
              <AIDesignPanel isOpen={isRightPanelOpen} onClose={closeRightPanel} />
            </div>
          )}
        </div>
        
        {/* Mobile overlay */}
        {isMobile && <MobileOverlay />}
        
        <Toaster />
      </div>
    </WhiteboardProvider>
  );
}

export default App;


import React, { useState } from 'react';
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
import MobileOverlay from './components/MobileOverlay';
import { Toaster } from "./components/ui/toaster";
import AIDesignPanel from './components/AIDesignPanel';
import { useMobile } from './hooks/use-mobile';

function App() {
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const isMobile = useMobile();

  const handleSelectComponent = (id: string | null) => {
    setSelectedComponentId(id);
  };

  return (
    <WhiteboardProvider>
      <div className="flex flex-col h-screen">
        <TopBar />
        
        <div className="flex flex-1 overflow-hidden">
          {/* Left sidebar */}
          <div className="w-64 flex-shrink-0 flex flex-col border-r border-border bg-sidebar-background text-sidebar-foreground">
            <div className="flex-1 overflow-y-auto p-4">
              <ComponentLibrary />
              <div className="mt-6">
                <CanvasControls />
              </div>
              <div className="mt-6">
                <GridControls />
              </div>
              <div className="mt-6">
                <FlowControlsPanel />
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
          
          {/* Right sidebar */}
          <div className="w-80 flex-shrink-0 flex flex-col border-l border-border bg-sidebar-background text-sidebar-foreground">
            <div className="flex-1 overflow-y-auto p-4">
              <PropertyPanel 
                selectedComponentId={selectedComponentId} 
                onPropertiesChanged={() => {}} 
              />
              <FramePropertyPanel />
              <AIDesignPanel />
            </div>
          </div>
        </div>
        
        {/* Mobile overlay */}
        {isMobile && <MobileOverlay />}
        
        <Toaster />
      </div>
    </WhiteboardProvider>
  );
}

export default App;


import { useState } from "react";
import WhiteboardCanvas from "@/components/WhiteboardCanvas";
import ComponentLibrary from "@/components/ComponentLibrary";
import PropertyPanel from "@/components/PropertyPanel";
import GridControls from "@/components/GridControls";
import FrameSizeControls from "@/components/FrameSizeControls";
import ZoomControls from "@/components/ZoomControls";
import CanvasControls from "@/components/CanvasControls";
import { WhiteboardProvider } from "@/context/WhiteboardContext";

const Index = () => {
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);

  return (
    <WhiteboardProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-background">
        {/* Left sidebar - Component Library */}
        <div className="w-64 border-r border-border bg-card overflow-y-auto p-4">
          <h2 className="text-lg font-medium mb-4">Components</h2>
          <ComponentLibrary />
          
          <div className="mt-6 border-t border-border pt-4">
            <GridControls />
          </div>
          
          <div className="mt-4 border-t border-border pt-4">
            <FrameSizeControls />
          </div>

          <div className="mt-4 border-t border-border pt-4">
            <CanvasControls />
          </div>
        </div>

        {/* Main canvas area */}
        <div className="flex-1 overflow-hidden relative">
          <WhiteboardCanvas 
            onSelectComponent={setSelectedComponentId} 
            selectedComponentId={selectedComponentId}
          />
          <ZoomControls />
        </div>

        {/* Right sidebar - Properties - Only shown when a component is selected */}
        <div 
          className={`w-64 border-l border-border bg-card overflow-y-auto p-4 transition-all duration-300 ease-in-out transform ${
            selectedComponentId ? 'translate-x-0' : 'translate-x-full'
          } absolute right-0 top-0 bottom-0 z-10`}
        >
          <h2 className="text-lg font-medium mb-4">Properties</h2>
          <PropertyPanel selectedComponentId={selectedComponentId} />
        </div>
      </div>
    </WhiteboardProvider>
  );
};

export default Index;


import { useState } from "react";
import TopBar from "@/components/TopBar";
import UrlFramePanel from "@/components/UrlFramePanel";
import { WhiteboardProvider } from "@/context/WhiteboardContext";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

// Simplified component to focus on URL frame developer tools
const DevToolsManager = () => {
  const [showUrlFrame, setShowUrlFrame] = useState(false);
  
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-background">
      {/* Top Bar with minimal controls */}
      <TopBar 
        onToggleComponentLibrary={() => {}} 
        onToggleFlowControls={() => {}}
        onToggleGrid={() => {}} 
        showGrid={false} 
        showComponentLibrary={false}
        showFlowControls={false}
        rightPanelOpen={false} 
      />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Main content area */}
        <div className="flex-1 overflow-hidden relative flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">Web Developer Tools</h1>
            <p className="text-muted-foreground">Load a website URL to inspect and generate design improvement prompts</p>
            <Button 
              size="lg"
              onClick={() => setShowUrlFrame(true)}
              className="inline-flex items-center gap-2"
            >
              <Globe className="h-5 w-5" />
              Open Developer Tools
            </Button>
          </div>
          
          {/* Control element */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-20">
            <Button 
              className="rounded-full h-12 w-12 flex items-center justify-center" 
              onClick={() => setShowUrlFrame(true)}
              variant="default"
            >
              <Globe className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* URL Frame Developer Tools Panel */}
      <UrlFramePanel isOpen={showUrlFrame} onClose={() => setShowUrlFrame(false)} />
    </div>
  );
};

const Index = () => {
  return (
    <WhiteboardProvider>
      <DevToolsManager />
    </WhiteboardProvider>
  );
};

export default Index;

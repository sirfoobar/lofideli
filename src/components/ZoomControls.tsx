
import React from "react";
import { useWhiteboard } from "@/context/WhiteboardContext";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ZoomIn, ZoomOut } from "lucide-react";

const ZoomControls: React.FC = () => {
  const { state, dispatch } = useWhiteboard();
  const { zoomLevel } = state;
  
  // Format zoom level as percentage
  const zoomPercentage = Math.round(zoomLevel * 100);
  
  const handleZoomIn = () => {
    const newZoom = Math.min(zoomLevel + 0.1, 3); // Max zoom 300%
    dispatch({ type: "SET_ZOOM_LEVEL", level: Number(newZoom.toFixed(1)) });
  };
  
  const handleZoomOut = () => {
    const newZoom = Math.max(zoomLevel - 0.1, 0.5); // Min zoom 50%
    dispatch({ type: "SET_ZOOM_LEVEL", level: Number(newZoom.toFixed(1)) });
  };
  
  const handleZoomChange = (value: number[]) => {
    dispatch({ type: "SET_ZOOM_LEVEL", level: Number((value[0] / 100).toFixed(1)) });
  };
  
  return (
    <div className="fixed bottom-4 right-4 bg-background border border-border rounded-lg shadow-md flex items-center gap-2 p-2 z-50">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleZoomOut} 
        disabled={zoomLevel <= 0.5}
      >
        <ZoomOut className="h-4 w-4" />
      </Button>
      
      <div className="flex items-center gap-2">
        <Slider
          className="w-24"
          value={[zoomPercentage]}
          min={50}
          max={300}
          step={10}
          onValueChange={handleZoomChange}
        />
        <span className="text-xs w-12 text-center">
          {zoomPercentage}%
        </span>
      </div>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleZoomIn} 
        disabled={zoomLevel >= 3}
      >
        <ZoomIn className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ZoomControls;

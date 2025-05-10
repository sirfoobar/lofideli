
import React from "react";
import { useWhiteboard } from "@/context/WhiteboardContext";
import { Button } from "@/components/ui/button";
import { Grid2X2, Component, FileDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TopBarProps {
  onToggleComponentLibrary: () => void;
  onToggleGrid: () => void;
  showGrid: boolean; // Added missing prop
}

const TopBar: React.FC<TopBarProps> = ({
  onToggleComponentLibrary,
  onToggleGrid,
  showGrid // Added missing prop
}) => {
  const {
    saveToJSON,
    state,
    dispatch
  } = useWhiteboard();

  const toggleGridSnap = () => {
    dispatch({ 
      type: "TOGGLE_GRID_SNAP", 
      enabled: !state.snapToGrid 
    });
  };
  
  const handleGridSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ 
      type: "SET_GRID_SIZE", 
      size: parseInt(e.target.value, 10) 
    });
  };

  const handleExport = () => {
    const jsonData = saveToJSON();

    // Create blob and download link
    const blob = new Blob([jsonData], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    // Setup and trigger download
    link.href = url;
    link.download = `whiteboard_export_${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <TooltipProvider>
      <div className="h-8 border-b border-border bg-card flex items-center px-4 justify-between">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold mr-6">Whiteboard</h1>
          
          <div className="flex gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={onToggleComponentLibrary} title="Toggle Component Library">
                  <Component size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Component Library</TooltipContent>
            </Tooltip>
            
            <Popover>
              <Tooltip>
                <TooltipTrigger asChild>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" title="Grid Settings">
                      <Grid2X2 size={18} />
                    </Button>
                  </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent>Grid Settings</TooltipContent>
              </Tooltip>
              
              <PopoverContent className="w-64 p-4">
                <div className="flex flex-col gap-3">
                  <h3 className="text-sm font-medium">Grid Settings</h3>
                  
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={state.snapToGrid}
                        onChange={toggleGridSnap}
                        className="h-4 w-4"
                      />
                      Snap to grid
                    </label>
                    
                    <select
                      value={state.gridSize}
                      onChange={handleGridSizeChange}
                      className="text-sm py-1 px-2 bg-background border border-border rounded-md"
                      disabled={!state.snapToGrid}
                    >
                      <option value="5">5px</option>
                      <option value="10">10px</option>
                      <option value="20">20px</option>
                      <option value="40">40px</option>
                    </select>
                  </div>
                  
                  <div className="mt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={onToggleGrid} 
                      className="w-full text-xs"
                    >
                      {showGrid ? "Hide Grid" : "Show Grid"}
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleExport} title="Export Canvas">
                  <FileDown size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Export Canvas</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default TopBar;

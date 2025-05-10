
import React from "react";
import { useWhiteboard } from "@/context/WhiteboardContext";
import { Button } from "@/components/ui/button";
import { Grid2X2, Component, FileDown } from "lucide-react";

interface TopBarProps {
  onToggleComponentLibrary: () => void;
  onToggleGrid: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ 
  onToggleComponentLibrary,
  onToggleGrid,
}) => {
  const { saveToJSON } = useWhiteboard();
  
  const handleExport = () => {
    const jsonData = saveToJSON();
    
    // Create blob and download link
    const blob = new Blob([jsonData], { type: "application/json" });
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
    <div className="h-12 border-b border-border bg-card flex items-center px-4 justify-between">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold mr-6">Whiteboard</h1>
        
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggleComponentLibrary} 
            title="Toggle Component Library"
          >
            <Component size={18} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggleGrid} 
            title="Toggle Grid"
          >
            <Grid2X2 size={18} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleExport} 
            title="Export Canvas"
          >
            <FileDown size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

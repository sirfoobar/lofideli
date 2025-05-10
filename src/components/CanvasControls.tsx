
import { Button } from "@/components/ui/button";
import { useWhiteboard } from "@/context/WhiteboardContext";
import { Download, Upload, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CanvasControls = () => {
  const { saveToJSON, loadFromJSON, clearCanvas } = useWhiteboard();
  const { toast } = useToast();

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
    
    toast({
      title: "Export Successful",
      description: "Your canvas has been exported as a JSON file.",
    });
  };

  const handleImport = () => {
    // Create file input element
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    
    // Handle file selection
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (!target.files?.length) return;
      
      const file = target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === "string") {
          loadFromJSON(result);
        }
      };
      
      reader.readAsText(file);
    };
    
    // Trigger file selection dialog
    input.click();
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear the canvas? This cannot be undone.")) {
      clearCanvas();
    }
  };

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-small mb-2">Canvas Data</h2>
      <div className="flex flex-col gap-2">
        <Button 
          variant="outline" 
          className="flex items-center gap-2 w-full justify-start" 
          onClick={handleExport}
        >
          <Download size={16} />
          Export Canvas
        </Button>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 w-full justify-start" 
          onClick={handleImport}
        >
          <Upload size={16} />
          Import Canvas
        </Button>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 w-full justify-start text-destructive hover:text-destructive" 
          onClick={handleClear}
        >
          <Trash2 size={16} />
          Clear Canvas
        </Button>
      </div>
    </div>
  );
};

export default CanvasControls;

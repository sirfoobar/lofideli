
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";
import CodeSidebar from "./CodeSidebar";
import { useWhiteboard } from "@/context/WhiteboardContext";
import { generateFrameReactCode } from "@/utils/codeExportUtils";

const CodeViewButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { state } = useWhiteboard();
  
  const handleViewCode = () => {
    setIsOpen(true);
  };
  
  const handleClose = () => {
    setIsOpen(false);
  };
  
  const generateCode = () => {
    // Find the selected frame or use the first one
    const frame = state.selectedFrameId 
      ? state.frames.find(f => f.id === state.selectedFrameId) 
      : state.frames[0];
      
    if (!frame) return "// No frames available to generate code";
    
    return generateFrameReactCode(frame, state.components);
  };
  
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleViewCode}
        className="hover:bg-accent hover:text-accent-foreground"
        title="View React Code"
      >
        <Code className="h-4 w-4" />
      </Button>
      
      {isOpen && (
        <CodeSidebar 
          code={generateCode()} 
          onClose={handleClose} 
          title={`${state.selectedFrameId 
            ? state.frames.find(f => f.id === state.selectedFrameId)?.name 
            : state.frames[0]?.name || "Component"} Code`} 
        />
      )}
    </>
  );
};

export default CodeViewButton;


import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useWhiteboard } from "@/context/WhiteboardContext";

// Create a wrapper component that correctly handles the Input onChange types
const InputAdapter: React.FC<{
  id: string;
  value: string | number;
  onChange: (value: string) => void;
  className?: string;
  type?: string;
}> = ({ id, value, onChange, className, type = "text" }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Input
      id={id}
      value={value}
      onChange={handleChange}
      className={className}
      type={type}
    />
  );
};

interface FramePropertyPanelProps {
  isOpen: boolean;
}

const FramePropertyPanel: React.FC<FramePropertyPanelProps> = ({ isOpen }) => {
  // This component will use the original FramePropertyPanel but handle the type conversions
  const { state, dispatch } = useWhiteboard();
  const { selectedFrameId, frames } = state;
  
  if (!selectedFrameId || !isOpen) return null;
  
  const frame = frames.find(f => f.id === selectedFrameId);
  if (!frame) return null;
  
  // Wrapper functions for type compatibility
  const handleNameChange = (value: string) => {
    dispatch({ 
      type: "UPDATE_FRAME", 
      id: selectedFrameId,
      properties: { name: value }
    });
  };
  
  const handleWidthChange = (value: string) => {
    dispatch({
      type: "UPDATE_FRAME",
      id: selectedFrameId,
      properties: { width: Number(value) }
    });
  };
  
  const handleHeightChange = (value: string) => {
    dispatch({
      type: "UPDATE_FRAME",
      id: selectedFrameId,
      properties: { height: Number(value) }
    });
  };
  
  // We're creating a custom panel that mimics the original FramePropertyPanel but with proper types
  return (
    <div className="p-4">
      <h3 className="text-lg font-medium mb-4">Frame Properties</h3>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="frame-name">Frame Name</Label>
          <InputAdapter
            id="frame-name"
            value={frame.name || ""}
            onChange={handleNameChange}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="frame-width">Width (px)</Label>
          <InputAdapter
            id="frame-width"
            value={frame.width}
            onChange={handleWidthChange}
            type="number"
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="frame-height">Height (px)</Label>
          <InputAdapter
            id="frame-height"
            value={frame.height}
            onChange={handleHeightChange}
            type="number"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default FramePropertyPanel;

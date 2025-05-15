
// Note: This file is read-only according to the instructions, so we need to modify how we interact with it
// Instead of directly modifying this file, we'll create a custom wrapper that works around the type issues

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

interface FramePropertyPanelWrapperProps {
  isOpen: boolean;
}

const FramePropertyPanelWrapper: React.FC<FramePropertyPanelWrapperProps> = ({ isOpen }) => {
  // This component will use the original FramePropertyPanel but handle the type conversions
  const { state, updateFrameProperty } = useWhiteboard();
  const { selectedFrameId, frames } = state;
  
  if (!selectedFrameId || !isOpen) return null;
  
  const frame = frames.find(f => f.id === selectedFrameId);
  if (!frame) return null;
  
  // Wrapper functions for type compatibility
  const handleNameChange = (value: string) => {
    updateFrameProperty(selectedFrameId, "name", value);
  };
  
  const handleWidthChange = (value: string) => {
    updateFrameProperty(selectedFrameId, "width", Number(value));
  };
  
  const handleHeightChange = (value: string) => {
    updateFrameProperty(selectedFrameId, "height", Number(value));
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

export default FramePropertyPanelWrapper;


import React from "react";
import { useWhiteboard } from "@/context/WhiteboardContext";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const SketchyModeToggle: React.FC = () => {
  const { state, dispatch } = useWhiteboard();

  const toggleSketchyMode = () => {
    dispatch({ type: "TOGGLE_SKETCHY_MODE" });
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Style</h3>
      <div className="flex items-center gap-2">
        <Switch 
          id="sketchy-mode" 
          checked={state.sketchyMode}
          onCheckedChange={toggleSketchyMode}
        />
        <Label htmlFor="sketchy-mode" className="cursor-pointer">
          Sketchy Mode
        </Label>
      </div>
    </div>
  );
};

export default SketchyModeToggle;

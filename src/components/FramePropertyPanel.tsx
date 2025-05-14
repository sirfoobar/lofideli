
import React from "react";
import { useWhiteboard } from "@/context/WhiteboardContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FramePropertyPanelProps {
  selectedFrameId: string | null;
  onClose: () => void;
}

const FramePropertyPanel: React.FC<FramePropertyPanelProps> = ({
  selectedFrameId,
  onClose
}) => {
  const {
    state,
    dispatch
  } = useWhiteboard();
  
  const selectedFrame = state.frames.find(frame => frame.id === selectedFrameId);
  
  if (!selectedFrame) {
    return <div className="text-sm text-muted-foreground">
        Select a frame to edit its properties
      </div>;
  }
  
  const handleFrameNameChange = (value: string) => {
    dispatch({
      type: "UPDATE_FRAME",
      id: selectedFrameId!,
      updates: {
        name: value
      }
    });
  };
  
  const handleFrameSizeChange = (dimension: "width" | "height", value: number) => {
    dispatch({
      type: "UPDATE_FRAME",
      id: selectedFrameId!,
      updates: {
        [dimension]: value
      }
    });
  };
  
  const handleDeleteFrame = () => {
    dispatch({
      type: "DELETE_FRAME",
      id: selectedFrameId!
    });
    onClose();
    toast("Frame deleted");
  };

  // Count components in this frame
  const componentsInFrame = state.components.filter(component => component.frameId === selectedFrameId).length;
  
  return <div className="flex flex-col gap-4 mt-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-small">Frame Properties</span>
        <button className="text-xs text-white bg-destructive px-2 py-1 rounded" onClick={handleDeleteFrame}>
          Delete Frame
        </button>
      </div>
      
      <div className="space-y-4">
        {/* Frame name */}
        <div className="space-y-1">
          <Label className="text-xs">Frame Name</Label>
          <Input type="text" value={selectedFrame.name} onChange={e => handleFrameNameChange(e.target.value)} className="h-8" />
        </div>

        {/* Position */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label className="text-xs">X Position</Label>
            <Input type="number" value={Math.round(selectedFrame.x)} onChange={e => dispatch({
            type: "UPDATE_FRAME",
            id: selectedFrameId!,
            updates: {
              x: Number(e.target.value)
            }
          })} className="h-8" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Y Position</Label>
            <Input type="number" value={Math.round(selectedFrame.y)} onChange={e => dispatch({
            type: "UPDATE_FRAME",
            id: selectedFrameId!,
            updates: {
              y: Number(e.target.value)
            }
          })} className="h-8" />
          </div>
        </div>

        {/* Size */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label className="text-xs">Width</Label>
            <Input type="number" value={Math.round(selectedFrame.width)} onChange={e => handleFrameSizeChange("width", Number(e.target.value))} className="h-8" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Height</Label>
            <Input type="number" value={Math.round(selectedFrame.height)} onChange={e => handleFrameSizeChange("height", Number(e.target.value))} className="h-8" />
          </div>
        </div>

        {/* Components count */}
        <div className="text-xs text-muted-foreground">
          Contains {componentsInFrame} component{componentsInFrame !== 1 ? 's' : ''}
        </div>

        {/* Note about active frame status */}
        {state.activeFrameId === selectedFrameId && (
          <div className="text-xs text-blue-500 font-medium">
            This is the active frame
          </div>
        )}
      </div>
    </div>;
};

export default FramePropertyPanel;

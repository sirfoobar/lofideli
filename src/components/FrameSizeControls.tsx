
import React from "react";
import { useWhiteboard } from "@/context/WhiteboardContext";
import { Laptop, Smartphone, Plus } from "lucide-react";

interface FrameSize {
  name: string;
  width: number;
  height: number;
  icon: React.ReactNode;
}

const frameSizes: FrameSize[] = [
  {
    name: "Laptop",
    width: 1366,
    height: 768,
    icon: <Laptop className="w-4 h-4" />
  }, 
  {
    name: "Mobile",
    width: 375,
    height: 667,
    icon: <Smartphone className="w-4 h-4" />
  }
];

const FrameSizeControls: React.FC = () => {
  const { dispatch, state } = useWhiteboard();

  const handleAddFrame = (width: number, height: number, name: string) => {
    dispatch({
      type: "ADD_FRAME",
      frame: {
        width,
        height,
        name,
        x: 20,
        y: 20 + state.frames.length * 40 // Stack frames with some offset
      }
    });
  };

  const handleAddCustomFrame = () => {
    handleAddFrame(800, 600, `Frame ${state.frames.length + 1}`);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-small text-xs">Frames</h2>
        <button 
          onClick={handleAddCustomFrame} 
          title="Add new frame" 
          className="flex items-center justify-center w-6 h-6 rounded-full text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex gap-2 mb-2 flex-wrap">
        {frameSizes.map(size => (
          <button 
            key={size.name} 
            className="flex items-center gap-1 px-2 py-1 text-xs rounded-md transition-colors bg-secondary hover:bg-accent" 
            onClick={() => handleAddFrame(size.width, size.height, size.name)} 
            title={`${size.name} (${size.width}x${size.height})`}
          >
            {size.icon}
            <span>{size.name}</span>
          </button>
        ))}
      </div>
      
      <div>
        {state.frames.length > 0 && (
          <div className="text-xs text-muted-foreground mb-1">
            {state.frames.length} frame{state.frames.length !== 1 ? 's' : ''} on canvas
          </div>
        )}
      </div>
    </div>
  );
};

export default FrameSizeControls;

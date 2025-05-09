
import React from "react";
import { useWhiteboard } from "@/context/WhiteboardContext";
import { Laptop, Smartphone } from "lucide-react";

interface FrameSize {
  name: string;
  width: number;
  height: number;
  icon: React.ReactNode;
}

const frameSizes: FrameSize[] = [
  { name: "Laptop", width: 1366, height: 768, icon: <Laptop className="w-4 h-4" /> },
  { name: "Mobile", width: 375, height: 667, icon: <Smartphone className="w-4 h-4" /> },
];

const FrameSizeControls: React.FC = () => {
  const { dispatch, state } = useWhiteboard();
  
  const handleFrameSizeChange = (width: number, height: number) => {
    dispatch({ 
      type: "SET_FRAME_SIZE", 
      width, 
      height 
    });
  };
  
  return (
    <div className="flex flex-col gap-2 p-2">
      <h3 className="text-sm font-medium mb-1">Frame Size</h3>
      <div className="flex gap-2">
        {frameSizes.map((size) => (
          <button
            key={size.name}
            className={`flex items-center gap-1 px-2 py-1 text-xs rounded-md transition-colors ${
              state.frameSize?.width === size.width && state.frameSize?.height === size.height
                ? "bg-primary text-primary-foreground"
                : "bg-secondary hover:bg-accent"
            }`}
            onClick={() => handleFrameSizeChange(size.width, size.height)}
            title={`${size.name} (${size.width}x${size.height})`}
          >
            {size.icon}
            <span>{size.name}</span>
          </button>
        ))}
        <button
          className={`flex items-center gap-1 px-2 py-1 text-xs rounded-md transition-colors ${
            !state.frameSize ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-accent"
          }`}
          onClick={() => handleFrameSizeChange(0, 0)}
          title="Infinite canvas"
        >
          <span>∞</span>
          <span>Canvas</span>
        </button>
      </div>
    </div>
  );
};

export default FrameSizeControls;

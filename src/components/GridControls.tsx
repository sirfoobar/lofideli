
import React from "react";
import { useWhiteboard } from "@/context/WhiteboardContext";

const GridControls: React.FC = () => {
  const { dispatch, state } = useWhiteboard();
  
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
  
  return (
    <div className="flex flex-col gap-2 p-2">
      <h3 className="text-sm font-small mb-1">Grid Settings</h3>
      <div className="flex items-center gap-2">
        <label className="flex items-center gap-1.5 text-xs">
          <input
            type="checkbox"
            checked={state.snapToGrid}
            onChange={toggleGridSnap}
            className="w-3.5 h-3.5"
          />
          Snap to grid
        </label>
        
        <select
          value={state.gridSize}
          onChange={handleGridSizeChange}
          className="text-xs py-1 px-1.5 bg-background border border-border rounded-md"
          disabled={!state.snapToGrid}
        >
          <option value="5">5px</option>
          <option value="10">10px</option>
          <option value="20">20px</option>
          <option value="40">40px</option>
        </select>
      </div>
    </div>
  );
};

export default GridControls;

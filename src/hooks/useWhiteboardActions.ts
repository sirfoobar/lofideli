
import { useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { WhiteboardState } from "../types/whiteboard";
import { STORAGE_KEY } from "../utils/whiteboardUtils";

export const useWhiteboardActions = (state: WhiteboardState, dispatch: React.Dispatch<any>) => {
  const { toast } = useToast();

  // Function to export whiteboard data as JSON
  const saveToJSON = useCallback(() => {
    const dataToSave = {
      components: state.components,
      frames: state.frames,
      snapToGrid: state.snapToGrid,
      gridSize: state.gridSize,
      zoomLevel: state.zoomLevel,
    };
    return JSON.stringify(dataToSave, null, 2);
  }, [state.components, state.frames, state.snapToGrid, state.gridSize, state.zoomLevel]);

  // Function to import whiteboard data from JSON
  const loadFromJSON = useCallback((jsonData: string) => {
    try {
      const parsedData = JSON.parse(jsonData);
      dispatch({ type: "LOAD_FROM_STORAGE", state: parsedData });
      
      // Also update localStorage
      localStorage.setItem(STORAGE_KEY, jsonData);
      
      toast({
        title: "Import Successful",
        description: "Your canvas has been loaded from the imported data.",
      });
    } catch (error) {
      console.error("Failed to parse imported JSON:", error);
      toast({
        title: "Import Failed",
        description: "There was an error loading the imported data.",
        variant: "destructive",
      });
    }
  }, [dispatch, toast]);

  // Function to clear the canvas
  const clearCanvas = useCallback(() => {
    dispatch({ 
      type: "LOAD_FROM_STORAGE", 
      state: {
        components: [],
        frames: [],
      }
    });
    
    // Clear localStorage
    localStorage.removeItem(STORAGE_KEY);
    
    toast({
      title: "Canvas Cleared",
      description: "All components and frames have been removed.",
    });
  }, [dispatch, toast]);

  return {
    saveToJSON,
    loadFromJSON,
    clearCanvas
  };
};

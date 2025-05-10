
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { WhiteboardState, WhiteboardAction } from "../types/whiteboard";
import { whiteboardReducer, initialState } from "../reducers/whiteboardReducer";
import { loadStateFromLocalStorage } from "../utils/whiteboardUtils";
import { useWhiteboardActions } from "../hooks/useWhiteboardActions";

// Re-export types from the types module for backward compatibility
export type { ComponentType, CanvasComponent, FrameSize, WhiteboardState, WhiteboardAction } from "../types/whiteboard";

// Create context
interface WhiteboardContextValue {
  state: WhiteboardState;
  dispatch: React.Dispatch<WhiteboardAction>;
  saveToJSON: () => string;
  loadFromJSON: (jsonData: string) => void;
  clearCanvas: () => void;
  selectFrame: (id: string | null) => void;
}

const WhiteboardContext = createContext<WhiteboardContextValue | undefined>(undefined);

// Provider component
export const WhiteboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(whiteboardReducer, initialState);
  const { toast } = useToast();
  const { saveToJSON, loadFromJSON, clearCanvas } = useWhiteboardActions(state, dispatch);

  // Load from localStorage on initial mount
  useEffect(() => {
    try {
      const savedData = loadStateFromLocalStorage();
      if (savedData) {
        dispatch({ type: "LOAD_FROM_STORAGE", state: savedData });
        toast({
          title: "Canvas Restored",
          description: "Your previously saved canvas has been loaded.",
        });
      }
    } catch (error) {
      console.error("Failed to load whiteboard from localStorage:", error);
    }
  }, [toast]);

  // Helper function to select a frame
  const selectFrame = (id: string | null) => {
    dispatch({ type: "SELECT_FRAME", id });
  };

  return (
    <WhiteboardContext.Provider value={{ 
      state, 
      dispatch, 
      saveToJSON, 
      loadFromJSON, 
      clearCanvas,
      selectFrame
    }}>
      {children}
    </WhiteboardContext.Provider>
  );
};

// Custom hook to use the whiteboard context
export const useWhiteboard = () => {
  const context = useContext(WhiteboardContext);
  if (context === undefined) {
    throw new Error("useWhiteboard must be used within a WhiteboardProvider");
  }
  return context;
};


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
  generateUIFromPrompt: (prompt: string) => Promise<void>;
  copySelectedComponent: () => void;
  pasteComponent: (x?: number, y?: number) => void;
  deselectAll: () => void;
}

const WhiteboardContext = createContext<WhiteboardContextValue | undefined>(undefined);

// Provider component
export const WhiteboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(whiteboardReducer, initialState);
  const { toast } = useToast();
  const { saveToJSON, loadFromJSON, clearCanvas, generateUIFromPrompt } = useWhiteboardActions(state, dispatch);

  // Update selectedFrame whenever selectedFrameId changes
  useEffect(() => {
    if (state.selectedFrameId) {
      const frame = state.frames.find(f => f.id === state.selectedFrameId);
      if (frame) {
        // This will be handled by the reducer
        dispatch({ type: "SELECT_FRAME", id: state.selectedFrameId });
      }
    }
  }, [state.selectedFrameId, state.frames]);

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

  // Helper function to select a frame with improved logging
  const selectFrame = (id: string | null) => {
    console.log("selectFrame called with id:", id);
    
    // Update frame selection in state
    dispatch({ type: "SELECT_FRAME", id });
    
    // When selecting a frame, make sure to deselect any component
    if (id !== null) {
      dispatch({ type: "SELECT_COMPONENT", id: null });
    }
  };

  // Helper function to deselect everything
  const deselectAll = () => {
    console.log("deselectAll called - clearing all selections");
    dispatch({ type: "SELECT_COMPONENT", id: null });
    dispatch({ type: "SELECT_FRAME", id: null });
  };

  // Copy selected component to clipboard
  const copySelectedComponent = () => {
    const selectedComponent = state.components.find(c => 
      c.id === state.selectedComponentId);
    
    if (!selectedComponent) {
      toast({
        title: "Nothing to Copy",
        description: "Please select a component first.",
        variant: "destructive"
      });
      return;
    }
    
    // Store component in clipboard state
    dispatch({ 
      type: "SET_CLIPBOARD", 
      component: selectedComponent 
    });
    
    toast({
      title: "Component Copied",
      description: "Component copied to clipboard. Use Ctrl+V or right-click to paste."
    });
  };
  
  // Paste component from clipboard
  const pasteComponent = (x?: number, y?: number) => {
    if (!state.clipboard) {
      toast({
        title: "Nothing to Paste",
        description: "Clipboard is empty.",
        variant: "destructive"
      });
      return;
    }
    
    // Create a duplicate with an offset if coordinates aren't provided
    const offsetX = x !== undefined ? x : state.clipboard.x + 20;
    const offsetY = y !== undefined ? y : state.clipboard.y + 20;
    
    dispatch({
      type: "PASTE_COMPONENT",
      x: offsetX,
      y: offsetY
    });
    
    toast({
      title: "Component Pasted",
      description: "Component pasted from clipboard."
    });
  };

  return (
    <WhiteboardContext.Provider value={{ 
      state, 
      dispatch, 
      saveToJSON, 
      loadFromJSON, 
      clearCanvas,
      selectFrame,
      generateUIFromPrompt,
      copySelectedComponent,
      pasteComponent,
      deselectAll
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

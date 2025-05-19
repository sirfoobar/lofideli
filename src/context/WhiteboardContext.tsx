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

  // Function to create a welcome frame with content
  const createWelcomeFrame = () => {
    console.log("Creating welcome frame");
    
    // Create the frame first
    const frameAction: WhiteboardAction = {
      type: "ADD_FRAME",
      frame: {
        width: 375,
        height: 667,
        name: "Mobile",
        x: 20,
        y: 20
      }
    };
    
    // Dispatch the action first
    dispatch(frameAction);
    
    // Extract the frame ID after the reducer has processed it
    // We need to find the latest frame that was just created
    setTimeout(() => {
      const newFrames = state.frames;
      if (newFrames.length > 0) {
        const newFrame = newFrames[newFrames.length - 1];
        addWelcomeContent(newFrame.id, 375, 667);
        toast({
          title: "Welcome Frame Created",
          description: "A mobile frame with welcome content has been added to your canvas."
        });
      }
    }, 100);
  };
  
  // Function to add welcome content to a frame
  const addWelcomeContent = (frameId: string, frameWidth: number, frameHeight: number) => {
    console.log("Adding welcome content to frameId:", frameId);
    
    // Calculate positions based on frame dimensions
    const padding = 20;
    const contentWidth = frameWidth - (padding * 2);
    
    // Add title
    dispatch({
      type: "ADD_COMPONENT",
      component: {
        type: "heading",
        x: padding,
        y: padding,
        width: contentWidth,
        height: 40,
        content: "Introducing lofideli: Where Wireframes Go to Party!",
        properties: {
          fontSize: 20,
          textAlign: "center",
          fontWeight: "bold",
          textColor: "#1A1F2C"
        },
        frameId
      }
    });
    
    // Add first paragraph
    dispatch({
      type: "ADD_COMPONENT",
      component: {
        type: "paragraph",
        x: padding,
        y: padding + 50,
        width: contentWidth,
        height: 100,
        content: "Ever tried explaining your brilliant app idea with stick figures on a napkin? Well, put down that ketchup-stained paper and step into the 21st century with lofideli – the open source UI design tool that makes low-fidelity designing and diagramming more fun!",
        properties: {
          fontSize: 14,
          textAlign: "left",
          textColor: "#403E43"
        },
        frameId
      }
    });
    
    // Add subheading
    dispatch({
      type: "ADD_COMPONENT",
      component: {
        type: "heading",
        x: padding,
        y: padding + 160,
        width: contentWidth,
        height: 30,
        content: "Why lofideli? Because Your Ideas Deserve Better",
        properties: {
          fontSize: 16,
          textAlign: "left",
          fontWeight: "bold",
          textColor: "#1A1F2C"
        },
        frameId
      }
    });
    
    // Add bullet points as separate paragraph components
    const bulletPoints = [
      "Create frames and utilize pre-baked components faster than you can say \"I swear this box represents a button\"",
      "Build wireframes that actually make sense to other humans (shocking, we know)",
      "Use flow tools to communicate user journeys without resorting to interpretive dance"
    ];
    
    bulletPoints.forEach((point, index) => {
      dispatch({
        type: "ADD_COMPONENT",
        component: {
          type: "paragraph",
          x: padding + 10,
          y: padding + 200 + (index * 70),
          width: contentWidth - 10,
          height: 60,
          content: "• " + point,
          properties: {
            fontSize: 14,
            textAlign: "left",
            textColor: "#403E43"
          },
          frameId
        }
      });
    });
    
    // Add conclusion
    dispatch({
      type: "ADD_COMPONENT",
      component: {
        type: "paragraph",
        x: padding,
        y: padding + 410,
        width: contentWidth,
        height: 100,
        content: "Open source, user-friendly, and judgment-free – lofideli is here to transform your rough ideas into slightly-less-rough visual concepts!",
        properties: {
          fontSize: 14,
          textAlign: "left",
          textColor: "#403E43"
        },
        frameId
      }
    });
    
    // Add tagline
    dispatch({
      type: "ADD_COMPONENT",
      component: {
        type: "paragraph",
        x: padding,
        y: padding + 520,
        width: contentWidth,
        height: 40,
        content: "Lofideli: Making your low-fi designs look intentionally simplistic, not accidentally unfinished.",
        properties: {
          fontSize: 14,
          fontStyle: "italic",
          textAlign: "center",
          textColor: "#8B5CF6"
        },
        frameId
      }
    });
  };

  // Load from localStorage on initial mount or create welcome frame if no data
  useEffect(() => {
    try {
      const savedData = loadStateFromLocalStorage();
      if (savedData && savedData.frames && savedData.frames.length > 0) {
        dispatch({ type: "LOAD_FROM_STORAGE", state: savedData });
        toast({
          title: "Canvas Restored",
          description: "Your previously saved canvas has been loaded.",
        });
      } else {
        // No saved data, create welcome frame
        createWelcomeFrame();
      }
    } catch (error) {
      console.error("Failed to load whiteboard from localStorage:", error);
      // If loading fails, create welcome frame
      createWelcomeFrame();
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

  // Create a wrapper for clearCanvas that creates a welcome frame after clearing
  const handleClearCanvas = () => {
    // Call original clearCanvas
    clearCanvas();
    
    // Create welcome frame after clearing
    setTimeout(() => {
      createWelcomeFrame();
    }, 200);
  };

  return (
    <WhiteboardContext.Provider value={{ 
      state, 
      dispatch, 
      saveToJSON, 
      loadFromJSON, 
      clearCanvas: handleClearCanvas,
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

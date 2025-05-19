
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
    
    // Dispatch the action to create the frame
    dispatch(frameAction);
    
    // We need a slight delay to ensure the frame is created before adding content
    setTimeout(() => {
      // Find the most recently created frame
      const frameId = state.frames.length > 0 ? state.frames[state.frames.length - 1].id : null;
      
      if (frameId) {
        console.log("Adding welcome content to frame:", frameId);
        addWelcomeContent(frameId, 375, 667);
        toast({
          title: "Welcome Frame Created",
          description: "A mobile frame with welcome content has been added to your canvas."
        });
      } else {
        console.error("Failed to find newly created frame");
      }
    }, 500); // Increased timeout for better reliability
  };
  
  // Function to add welcome content to a frame - updated to fit better in one window
  const addWelcomeContent = (frameId: string, frameWidth: number, frameHeight: number) => {
    console.log("Adding welcome content to frameId:", frameId);
    
    // Calculate positions based on frame dimensions
    const padding = 15;
    const contentWidth = frameWidth - (padding * 2);
    
    // Add title - adjusted height and positioning
    dispatch({
      type: "ADD_COMPONENT",
      component: {
        type: "heading",
        x: padding,
        y: padding,
        width: contentWidth,
        height: 35,
        content: "Introducing lofideli: Where Wireframes Go to Party!",
        properties: {
          fontSize: 18,
          textAlign: "center",
          fontWeight: "bold",
          textColor: "#1A1F2C",
          borderWidth: 0
        },
        frameId
      }
    });
    
    // Add first paragraph - adjusted height and positioning
    dispatch({
      type: "ADD_COMPONENT",
      component: {
        type: "paragraph",
        x: padding,
        y: padding + 45,
        width: contentWidth,
        height: 80,
        content: "Ever tried explaining your brilliant app idea with stick figures on a napkin? Well, put down that ketchup-stained paper and step into the 21st century with lofideli – the open source UI design tool!",
        properties: {
          fontSize: 14,
          textAlign: "left",
          textColor: "#403E43",
          borderWidth: 0
        },
        frameId
      }
    });
    
    // Add subheading - adjusted height and positioning
    dispatch({
      type: "ADD_COMPONENT",
      component: {
        type: "heading",
        x: padding,
        y: padding + 135,
        width: contentWidth,
        height: 25,
        content: "Why lofideli? Because Your Ideas Deserve Better",
        properties: {
          fontSize: 16,
          textAlign: "left",
          fontWeight: "bold",
          textColor: "#8B5CF6",
          borderWidth: 0
        },
        frameId
      }
    });
    
    // Add bullet points as separate paragraph components - adjusted heights and spacing
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
          x: padding + 5,
          y: padding + 170 + (index * 60),
          width: contentWidth - 10,
          height: 50,
          content: "• " + point,
          properties: {
            fontSize: 14,
            textAlign: "left",
            textColor: "#403E43",
            borderWidth: 0
          },
          frameId
        }
      });
    });
    
    // Add conclusion - adjusted height and positioning
    dispatch({
      type: "ADD_COMPONENT",
      component: {
        type: "paragraph",
        x: padding,
        y: padding + 350,
        width: contentWidth,
        height: 70,
        content: "Open source, user-friendly, and judgment-free – lofideli is here to transform your rough ideas into slightly-less-rough visual concepts!",
        properties: {
          fontSize: 14,
          textAlign: "left",
          textColor: "#403E43",
          borderWidth: 0
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

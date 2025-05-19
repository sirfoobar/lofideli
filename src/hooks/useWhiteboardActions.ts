
import { useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { WhiteboardState, ComponentType, CanvasComponent } from "../types/whiteboard";
import { STORAGE_KEY } from "../utils/whiteboardUtils";
import { v4 as uuidv4 } from "uuid";
import { getDefaultContentForComponent, getDefaultPropertiesForComponent } from "@/utils/whiteboardUtils";

// Simplified AI UI patterns for demonstration
const uiPatterns = {
  login: [
    { type: "heading", content: "Login", x: 10, y: 10, width: 200, height: 40 },
    { type: "input", properties: { placeholder: "Email" }, x: 10, y: 60, width: 280, height: 40 },
    { type: "input", properties: { placeholder: "Password", type: "password" }, x: 10, y: 110, width: 280, height: 40 },
    { type: "button", content: "Sign In", x: 10, y: 160, width: 120, height: 40 },
  ],
  signup: [
    { type: "heading", content: "Sign Up", x: 10, y: 10, width: 200, height: 40 },
    { type: "input", properties: { placeholder: "Name" }, x: 10, y: 60, width: 280, height: 40 },
    { type: "input", properties: { placeholder: "Email" }, x: 10, y: 110, width: 280, height: 40 },
    { type: "input", properties: { placeholder: "Password", type: "password" }, x: 10, y: 160, width: 280, height: 40 },
    { type: "checkbox", properties: { label: "I agree to terms", checked: false }, x: 10, y: 210, width: 280, height: 30 },
    { type: "button", content: "Create Account", x: 10, y: 250, width: 160, height: 40 },
  ],
  product: [
    { type: "card", x: 10, y: 10, width: 280, height: 350 },
    { type: "image", x: 25, y: 25, width: 250, height: 180 },
    { type: "heading", content: "Product Title", x: 25, y: 215, width: 250, height: 30 },
    { type: "text", content: "Product description goes here...", x: 25, y: 250, width: 250, height: 60 },
    { type: "text", content: "$99.99", x: 25, y: 310, width: 100, height: 30, properties: { fontSize: 20 } },
    { type: "button", content: "Add to Cart", x: 150, y: 310, width: 125, height: 35 },
  ],
  navbar: [
    { type: "card", x: 10, y: 10, width: 500, height: 60, properties: { backgroundColor: "#ffffff" } },
    { type: "heading", content: "Logo", x: 25, y: 20, width: 100, height: 40 },
    { type: "button", content: "Home", x: 150, y: 20, width: 80, height: 40, properties: { backgroundColor: "transparent", textColor: "#000000" } },
    { type: "button", content: "About", x: 240, y: 20, width: 80, height: 40, properties: { backgroundColor: "transparent", textColor: "#000000" } },
    { type: "button", content: "Contact", x: 330, y: 20, width: 80, height: 40, properties: { backgroundColor: "transparent", textColor: "#000000" } },
    { type: "button", content: "Profile", x: 420, y: 20, width: 80, height: 40 },
  ],
};

// Helper function to analyze prompt and determine UI pattern
const analyzePrompt = (prompt: string) => {
  prompt = prompt.toLowerCase();
  
  if (prompt.includes("login") || prompt.includes("sign in")) {
    return "login";
  } else if (prompt.includes("signup") || prompt.includes("register") || prompt.includes("create account")) {
    return "signup";
  } else if (prompt.includes("product") || prompt.includes("item") || prompt.includes("card")) {
    return "product";
  } else if (prompt.includes("navbar") || prompt.includes("navigation") || prompt.includes("header")) {
    return "navbar";
  }
  
  // Default to login if no match
  return "login";
};

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
    
    // Note: The welcome frame will be added by WhiteboardContext after this function returns
  }, [dispatch, toast]);

  // Generate UI components based on text prompt
  const generateUIFromPrompt = useCallback(async (prompt: string) => {
    try {
      // Analyze the prompt to determine what UI pattern to generate
      const patternType = analyzePrompt(prompt);
      const pattern = uiPatterns[patternType as keyof typeof uiPatterns];
      
      if (!pattern) {
        throw new Error("Could not determine UI pattern from prompt");
      }
      
      // Create a new frame for the generated UI
      const frameId = uuidv4();
      const frameWidth = 320;
      const frameHeight = patternType === "signup" ? 300 : patternType === "product" ? 370 : 220;
      
      // Create frame with space around components
      dispatch({
        type: "ADD_FRAME",
        frame: {
          name: `${patternType.charAt(0).toUpperCase() + patternType.slice(1)} UI`,
          width: frameWidth,
          height: frameHeight,
          x: 50,
          y: 50,
        }
      });

      // Add components with delay to show animation
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Generate components based on the pattern
      pattern.forEach(async (componentTemplate: any, index: number) => {
        const component: Omit<CanvasComponent, "id"> = {
          type: componentTemplate.type as ComponentType,
          x: 50 + componentTemplate.x, // Offset by frame position
          y: 50 + componentTemplate.y, // Offset by frame position
          width: componentTemplate.width,
          height: componentTemplate.height,
          content: componentTemplate.content || getDefaultContentForComponent(componentTemplate.type as ComponentType),
          properties: {
            ...getDefaultPropertiesForComponent(componentTemplate.type as ComponentType),
            ...componentTemplate.properties,
          },
          frameId: frameId,
        };

        // Add small delay between components for visual effect
        await new Promise(resolve => setTimeout(resolve, 100 * index));
        dispatch({ type: "ADD_COMPONENT", component });
      });
      
      // Set this frame as active
      dispatch({ type: "SET_ACTIVE_FRAME", id: frameId });

      return Promise.resolve();
    } catch (error) {
      console.error("Error generating UI:", error);
      return Promise.reject(error);
    }
  }, [dispatch]);

  return {
    saveToJSON,
    loadFromJSON,
    clearCanvas,
    generateUIFromPrompt
  };
};

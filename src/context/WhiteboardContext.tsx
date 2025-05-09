
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";

// Component types
export type ComponentType = 
  | "button" 
  | "input" 
  | "text" 
  | "card" 
  | "checkbox"
  | "select"
  | "radio"
  | "image"
  | "heading"
  | "paragraph"
  | "divider";

// Component data structure
export interface CanvasComponent {
  id: string;
  type: ComponentType;
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string;
  properties: {
    [key: string]: any;
  };
  frameId?: string; // Add frameId to track which frame the component belongs to
}

// Frame size for viewport constraints
export interface FrameSize {
  id: string;
  width: number;
  height: number;
  name: string;
  x: number;
  y: number;
}

// State type
interface WhiteboardState {
  components: CanvasComponent[];
  isDragging: boolean;
  isResizing: boolean;
  gridSize: number;
  snapToGrid: boolean;
  frames: FrameSize[];
  activeFrameId: string | null;
  zoomLevel: number;
  draggedFrameId: string | null;
}

// Actions
type WhiteboardAction =
  | { type: "ADD_COMPONENT"; component: Omit<CanvasComponent, "id"> }
  | { type: "MOVE_COMPONENT"; id: string; x: number; y: number }
  | { type: "RESIZE_COMPONENT"; id: string; width: number; height: number }
  | { type: "UPDATE_COMPONENT"; id: string; properties: Partial<CanvasComponent["properties"]> }
  | { type: "DELETE_COMPONENT"; id: string }
  | { type: "SET_DRAGGING"; isDragging: boolean }
  | { type: "SET_RESIZING"; isResizing: boolean }
  | { type: "UPDATE_CONTENT"; id: string; content: string }
  | { type: "TOGGLE_GRID_SNAP"; enabled: boolean }
  | { type: "SET_GRID_SIZE"; size: number }
  | { type: "ADD_FRAME"; frame: Omit<FrameSize, "id"> }
  | { type: "UPDATE_FRAME"; id: string; updates: Partial<Omit<FrameSize, "id">> }
  | { type: "DELETE_FRAME"; id: string }
  | { type: "SET_ACTIVE_FRAME"; id: string | null }
  | { type: "SET_ZOOM_LEVEL"; level: number }
  | { type: "SET_DRAGGED_FRAME"; id: string | null }
  | { type: "MOVE_FRAME"; id: string; x: number; y: number; moveAttachedComponents?: boolean }
  | { type: "ASSIGN_COMPONENT_TO_FRAME"; componentId: string; frameId: string | undefined }
  | { type: "LOAD_FROM_STORAGE"; state: Partial<WhiteboardState> };

// Initial state
const initialState: WhiteboardState = {
  components: [],
  isDragging: false,
  isResizing: false,
  gridSize: 20,
  snapToGrid: false,
  frames: [],
  activeFrameId: null,
  zoomLevel: 0.8,
  draggedFrameId: null,
};

// Local storage key
const STORAGE_KEY = "whiteboard_canvas_state";

// Helper function for snapping to grid
const snapToGrid = (value: number, gridSize: number): number => {
  return Math.round(value / gridSize) * gridSize;
};

// Helper function to check if a component is within a frame
const isComponentInFrame = (component: CanvasComponent, frame: FrameSize): boolean => {
  return (
    component.x >= frame.x &&
    component.y >= frame.y &&
    component.x + component.width <= frame.x + frame.width &&
    component.y + component.height <= frame.y + frame.height
  );
};

// Reducer
const whiteboardReducer = (state: WhiteboardState, action: WhiteboardAction): WhiteboardState => {
  let newState: WhiteboardState;

  switch (action.type) {
    case "ADD_COMPONENT": {
      const newComponent = {
        ...action.component,
        id: uuidv4(),
        x: state.snapToGrid 
          ? snapToGrid(action.component.x, state.gridSize)
          : action.component.x,
        y: state.snapToGrid
          ? snapToGrid(action.component.y, state.gridSize)
          : action.component.y,
      };
      
      // Automatically assign the component to a frame if it's within one
      // Prioritize the active frame if it exists
      let frameId: string | undefined = undefined;
      
      // First check if it's in the active frame
      if (state.activeFrameId) {
        const activeFrame = state.frames.find(frame => frame.id === state.activeFrameId);
        if (activeFrame && isComponentInFrame(newComponent, activeFrame)) {
          frameId = activeFrame.id;
        }
      }
      
      // If not in active frame, check other frames
      if (!frameId) {
        for (const frame of state.frames) {
          if (isComponentInFrame(newComponent, frame)) {
            frameId = frame.id;
            break;
          }
        }
      }
      
      newState = {
        ...state,
        components: [
          ...state.components,
          {
            ...newComponent,
            frameId,
          },
        ],
      };
      break;
    }
    
    case "MOVE_COMPONENT": {
      const updatedX = state.snapToGrid 
        ? snapToGrid(action.x, state.gridSize) 
        : action.x;
      const updatedY = state.snapToGrid 
        ? snapToGrid(action.y, state.gridSize) 
        : action.y;
      
      const updatedComponents = state.components.map(component => {
        if (component.id === action.id) {
          const updatedComponent = { 
            ...component, 
            x: updatedX, 
            y: updatedY,
          };
          
          // Check if the component is now inside a different frame
          let newFrameId: string | undefined = undefined;
          
          // First check if it's in the active frame
          if (state.activeFrameId) {
            const activeFrame = state.frames.find(frame => frame.id === state.activeFrameId);
            if (activeFrame && isComponentInFrame(updatedComponent, activeFrame)) {
              newFrameId = activeFrame.id;
            }
          }
          
          // If not in active frame, check other frames
          if (!newFrameId) {
            for (const frame of state.frames) {
              if (isComponentInFrame(updatedComponent, frame)) {
                newFrameId = frame.id;
                break;
              }
            }
          }
          
          // Update frame assignment
          return {
            ...updatedComponent,
            frameId: newFrameId
          };
        }
        return component;
      });
      
      newState = {
        ...state,
        components: updatedComponents,
      };
      break;
    }
    
    case "RESIZE_COMPONENT":
      newState = {
        ...state,
        components: state.components.map((component) =>
          component.id === action.id
            ? { 
                ...component, 
                width: state.snapToGrid 
                  ? snapToGrid(action.width, state.gridSize) 
                  : action.width, 
                height: state.snapToGrid 
                  ? snapToGrid(action.height, state.gridSize) 
                  : action.height 
              }
            : component
        ),
      };
      break;

    case "UPDATE_COMPONENT":
      newState = {
        ...state,
        components: state.components.map((component) =>
          component.id === action.id
            ? { 
                ...component, 
                properties: { ...component.properties, ...action.properties } 
              }
            : component
        ),
      };
      break;

    case "DELETE_COMPONENT":
      newState = {
        ...state,
        components: state.components.filter(
          (component) => component.id !== action.id
        ),
      };
      break;

    case "SET_DRAGGING":
      newState = {
        ...state,
        isDragging: action.isDragging,
      };
      break;

    case "SET_RESIZING":
      newState = {
        ...state,
        isResizing: action.isResizing,
      };
      break;

    case "UPDATE_CONTENT":
      newState = {
        ...state,
        components: state.components.map((component) =>
          component.id === action.id
            ? { ...component, content: action.content }
            : component
        ),
      };
      break;

    case "TOGGLE_GRID_SNAP":
      newState = {
        ...state,
        snapToGrid: action.enabled,
      };
      break;

    case "SET_GRID_SIZE":
      newState = {
        ...state,
        gridSize: action.size,
      };
      break;

    case "ADD_FRAME":
      const newFrameId = uuidv4();
      newState = {
        ...state,
        frames: [
          ...state.frames,
          {
            ...action.frame,
            id: newFrameId,
          },
        ],
        activeFrameId: state.frames.length === 0 ? newFrameId : state.activeFrameId,
      };
      break;

    case "UPDATE_FRAME":
      newState = {
        ...state,
        frames: state.frames.map((frame) =>
          frame.id === action.id
            ? { ...frame, ...action.updates }
            : frame
        ),
      };
      break;

    case "DELETE_FRAME":
      // Remove frame and also remove frameId from components
      newState = {
        ...state,
        frames: state.frames.filter((frame) => frame.id !== action.id),
        activeFrameId: state.activeFrameId === action.id ? null : state.activeFrameId,
        components: state.components.map(component => 
          component.frameId === action.id ? { ...component, frameId: undefined } : component
        ),
      };
      break;

    case "SET_ACTIVE_FRAME":
      newState = {
        ...state,
        activeFrameId: action.id,
      };
      break;

    case "SET_ZOOM_LEVEL":
      newState = {
        ...state,
        zoomLevel: action.level,
      };
      break;

    case "SET_DRAGGED_FRAME":
      newState = {
        ...state,
        draggedFrameId: action.id,
      };
      break;

    case "MOVE_FRAME": {
      const newX = state.snapToGrid 
        ? snapToGrid(action.x, state.gridSize) 
        : action.x;
      const newY = state.snapToGrid 
        ? snapToGrid(action.y, state.gridSize) 
        : action.y;
      
      // Find the frame that's being moved
      const frame = state.frames.find(f => f.id === action.id);
      if (!frame) return state;
      
      // Calculate the movement delta
      const deltaX = newX - frame.x;
      const deltaY = newY - frame.y;
      
      // Update frames
      const updatedFrames = state.frames.map(f => 
        f.id === action.id ? { ...f, x: newX, y: newY } : f
      );
      
      // Also move components that are attached to this frame
      const updatedComponents = state.components.map(component => {
        if (component.frameId === action.id) {
          // Move component by the same delta
          return {
            ...component,
            x: component.x + deltaX,
            y: component.y + deltaY
          };
        }
        return component;
      });
      
      newState = {
        ...state,
        frames: updatedFrames,
        components: updatedComponents
      };
      break;
    }
    
    case "ASSIGN_COMPONENT_TO_FRAME":
      newState = {
        ...state,
        components: state.components.map(component =>
          component.id === action.componentId 
            ? { ...component, frameId: action.frameId }
            : component
        ),
      };
      break;

    case "LOAD_FROM_STORAGE":
      newState = {
        ...state,
        ...action.state,
      };
      break;

    default:
      newState = state;
  }

  // Save to localStorage after each action (except in initial load)
  if (action.type !== "LOAD_FROM_STORAGE") {
    const stateToSave = {
      components: newState.components,
      frames: newState.frames,
      snapToGrid: newState.snapToGrid,
      gridSize: newState.gridSize,
      zoomLevel: newState.zoomLevel,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (error) {
      console.error("Failed to save whiteboard to localStorage:", error);
    }
  }

  return newState;
};

// Create context
interface WhiteboardContextValue {
  state: WhiteboardState;
  dispatch: React.Dispatch<WhiteboardAction>;
  saveToJSON: () => string;
  loadFromJSON: (jsonData: string) => void;
  clearCanvas: () => void;
}

const WhiteboardContext = createContext<WhiteboardContextValue | undefined>(undefined);

// Provider component
export const WhiteboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(whiteboardReducer, initialState);
  const { toast } = useToast();

  // Load from localStorage on initial mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: "LOAD_FROM_STORAGE", state: parsedData });
        toast({
          title: "Canvas Restored",
          description: "Your previously saved canvas has been loaded.",
        });
      }
    } catch (error) {
      console.error("Failed to load whiteboard from localStorage:", error);
    }
  }, [toast]);

  // Function to export whiteboard data as JSON
  const saveToJSON = () => {
    const dataToSave = {
      components: state.components,
      frames: state.frames,
      snapToGrid: state.snapToGrid,
      gridSize: state.gridSize,
      zoomLevel: state.zoomLevel,
    };
    return JSON.stringify(dataToSave, null, 2);
  };

  // Function to import whiteboard data from JSON
  const loadFromJSON = (jsonData: string) => {
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
  };

  // Function to clear the canvas
  const clearCanvas = () => {
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
  };

  return (
    <WhiteboardContext.Provider value={{ state, dispatch, saveToJSON, loadFromJSON, clearCanvas }}>
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

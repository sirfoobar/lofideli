
import React, { createContext, useContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

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
  | { type: "ASSIGN_COMPONENT_TO_FRAME"; componentId: string; frameId: string | undefined };

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
      
      return {
        ...state,
        components: [
          ...state.components,
          {
            ...newComponent,
            frameId,
          },
        ],
      };
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
      
      return {
        ...state,
        components: updatedComponents,
      };
    }
    
    case "RESIZE_COMPONENT":
      return {
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

    case "UPDATE_COMPONENT":
      return {
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

    case "DELETE_COMPONENT":
      return {
        ...state,
        components: state.components.filter(
          (component) => component.id !== action.id
        ),
      };

    case "SET_DRAGGING":
      return {
        ...state,
        isDragging: action.isDragging,
      };

    case "SET_RESIZING":
      return {
        ...state,
        isResizing: action.isResizing,
      };

    case "UPDATE_CONTENT":
      return {
        ...state,
        components: state.components.map((component) =>
          component.id === action.id
            ? { ...component, content: action.content }
            : component
        ),
      };

    case "TOGGLE_GRID_SNAP":
      return {
        ...state,
        snapToGrid: action.enabled,
      };

    case "SET_GRID_SIZE":
      return {
        ...state,
        gridSize: action.size,
      };

    case "ADD_FRAME":
      const newFrameId = uuidv4();
      return {
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

    case "UPDATE_FRAME":
      return {
        ...state,
        frames: state.frames.map((frame) =>
          frame.id === action.id
            ? { ...frame, ...action.updates }
            : frame
        ),
      };

    case "DELETE_FRAME":
      // Remove frame and also remove frameId from components
      return {
        ...state,
        frames: state.frames.filter((frame) => frame.id !== action.id),
        activeFrameId: state.activeFrameId === action.id ? null : state.activeFrameId,
        components: state.components.map(component => 
          component.frameId === action.id ? { ...component, frameId: undefined } : component
        ),
      };

    case "SET_ACTIVE_FRAME":
      return {
        ...state,
        activeFrameId: action.id,
      };

    case "SET_ZOOM_LEVEL":
      return {
        ...state,
        zoomLevel: action.level,
      };

    case "SET_DRAGGED_FRAME":
      return {
        ...state,
        draggedFrameId: action.id,
      };

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
      
      return {
        ...state,
        frames: updatedFrames,
        components: updatedComponents
      };
    }
    
    case "ASSIGN_COMPONENT_TO_FRAME":
      return {
        ...state,
        components: state.components.map(component =>
          component.id === action.componentId 
            ? { ...component, frameId: action.frameId }
            : component
        ),
      };

    default:
      return state;
  }
};

// Create context
interface WhiteboardContextValue {
  state: WhiteboardState;
  dispatch: React.Dispatch<WhiteboardAction>;
}

const WhiteboardContext = createContext<WhiteboardContextValue | undefined>(undefined);

// Provider component
export const WhiteboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(whiteboardReducer, initialState);
  
  return (
    <WhiteboardContext.Provider value={{ state, dispatch }}>
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

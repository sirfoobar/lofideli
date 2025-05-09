
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
}

// State type
interface WhiteboardState {
  components: CanvasComponent[];
  isDragging: boolean;
  isResizing: boolean;
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
  | { type: "UPDATE_CONTENT"; id: string; content: string };

// Initial state
const initialState: WhiteboardState = {
  components: [],
  isDragging: false,
  isResizing: false,
};

// Reducer
const whiteboardReducer = (state: WhiteboardState, action: WhiteboardAction): WhiteboardState => {
  switch (action.type) {
    case "ADD_COMPONENT":
      return {
        ...state,
        components: [
          ...state.components,
          {
            ...action.component,
            id: uuidv4(),
          },
        ],
      };
    case "MOVE_COMPONENT":
      return {
        ...state,
        components: state.components.map((component) =>
          component.id === action.id
            ? { ...component, x: action.x, y: action.y }
            : component
        ),
      };
    case "RESIZE_COMPONENT":
      return {
        ...state,
        components: state.components.map((component) =>
          component.id === action.id
            ? { ...component, width: action.width, height: action.height }
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

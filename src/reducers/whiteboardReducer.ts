
import { v4 as uuidv4 } from "uuid";
import { WhiteboardState, WhiteboardAction } from "../types/whiteboard";
import { snapToGrid, isComponentInFrame, saveStateToLocalStorage } from "../utils/whiteboardUtils";

// Initial state
export const initialState: WhiteboardState = {
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

// Whiteboard reducer
export const whiteboardReducer = (state: WhiteboardState, action: WhiteboardAction): WhiteboardState => {
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
    saveStateToLocalStorage(newState);
  }

  return newState;
};

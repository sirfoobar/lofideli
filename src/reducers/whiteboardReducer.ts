import { v4 as uuidv4 } from "uuid";
import { WhiteboardState, WhiteboardAction, FrameSize } from "../types/whiteboard";
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
  selectedFrameId: null, // Initialize selectedFrameId as null
};

// Helper function to check if two frames overlap
const doFramesOverlap = (frame1: FrameSize, frame2: FrameSize, gap: number = 0): boolean => {
  // Add a small gap between frames to prevent exact edge touching
  return !(
    frame1.x + frame1.width + gap < frame2.x ||
    frame1.x > frame2.x + frame2.width + gap ||
    frame1.y + frame1.height + gap < frame2.y ||
    frame1.y > frame2.y + frame2.height + gap
  );
};

// Helper function to find nearby frames for snapping
const findNearbyFrameEdges = (frame: FrameSize, otherFrames: FrameSize[], threshold: number): { x: number | null, y: number | null } => {
  let snapX: number | null = null;
  let snapY: number | null = null;
  
  for (const otherFrame of otherFrames) {
    if (otherFrame.id === frame.id) continue;
    
    // Check for horizontal snapping (left edge of frame to right edge of other)
    if (Math.abs(frame.x - (otherFrame.x + otherFrame.width)) <= threshold) {
      snapX = otherFrame.x + otherFrame.width;
    }
    // Check for horizontal snapping (right edge of frame to left edge of other)
    else if (Math.abs((frame.x + frame.width) - otherFrame.x) <= threshold) {
      snapX = otherFrame.x - frame.width;
    }
    
    // Check for vertical snapping (top edge of frame to bottom edge of other)
    if (Math.abs(frame.y - (otherFrame.y + otherFrame.height)) <= threshold) {
      snapY = otherFrame.y + otherFrame.height;
    }
    // Check for vertical snapping (bottom edge of frame to top edge of other)
    else if (Math.abs((frame.y + frame.height) - otherFrame.y) <= threshold) {
      snapY = otherFrame.y - frame.height;
    }
  }
  
  return { x: snapX, y: snapY };
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
    
    case "RESIZE_COMPONENT": {
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
    }

    case "UPDATE_COMPONENT":
    case "DELETE_COMPONENT":
    case "SET_DRAGGING":
    case "SET_RESIZING":
    case "UPDATE_CONTENT":
    case "TOGGLE_GRID_SNAP":
    case "SET_GRID_SIZE": {
      newState = state;
      switch (action.type) {
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
      }
      break;
    }

    case "ADD_FRAME": {
      const newFrameId = uuidv4();
      const newFrame = {
        ...action.frame,
        id: newFrameId,
      };
      
      // Check if the new frame overlaps with existing frames
      let isOverlapping = false;
      let adjustedFrame = { ...newFrame };
      
      // Add a small gap between frames (10px)
      const gap = 10;
      
      for (const existingFrame of state.frames) {
        if (doFramesOverlap(newFrame, existingFrame, gap)) {
          isOverlapping = true;
          // Find the rightmost edge of all frames
          const rightmostEdge = Math.max(
            ...state.frames.map(frame => frame.x + frame.width)
          ) + gap;
          
          // Position the new frame to the right of all existing frames
          adjustedFrame = {
            ...newFrame,
            x: rightmostEdge,
          };
          break;
        }
      }
      
      newState = {
        ...state,
        frames: [
          ...state.frames,
          isOverlapping ? adjustedFrame : newFrame
        ],
        activeFrameId: state.frames.length === 0 ? newFrameId : state.activeFrameId,
        selectedFrameId: newFrameId, // Select the newly created frame
      };
      break;
    }

    case "UPDATE_FRAME": {
      newState = {
        ...state,
        frames: state.frames.map((frame) =>
          frame.id === action.id
            ? { ...frame, ...action.updates }
            : frame
        ),
      };
      break;
    }

    case "DELETE_FRAME": {
      // Remove frame and also remove frameId from components
      newState = {
        ...state,
        frames: state.frames.filter((frame) => frame.id !== action.id),
        activeFrameId: state.activeFrameId === action.id ? null : state.activeFrameId,
        selectedFrameId: state.selectedFrameId === action.id ? null : state.selectedFrameId,
        components: state.components.map(component => 
          component.frameId === action.id ? { ...component, frameId: undefined } : component
        ),
      };
      break;
    }

    case "SET_ACTIVE_FRAME": {
      newState = {
        ...state,
        activeFrameId: action.id,
      };
      break;
    }

    case "SET_ZOOM_LEVEL": {
      newState = {
        ...state,
        zoomLevel: action.level,
      };
      break;
    }

    case "SET_DRAGGED_FRAME": {
      newState = {
        ...state,
        draggedFrameId: action.id,
      };
      break;
    }

    case "MOVE_FRAME": {
      const frameToMove = state.frames.find(f => f.id === action.id);
      if (!frameToMove) return state;
      
      // Apply grid snapping if enabled
      let newX = state.snapToGrid ? snapToGrid(action.x, state.gridSize) : action.x;
      let newY = state.snapToGrid ? snapToGrid(action.y, state.gridSize) : action.y;
      
      // Find other frames for edge snapping (with 15px threshold)
      const otherFrames = state.frames.filter(f => f.id !== action.id);
      const snapThreshold = 15;
      
      // Create a temporary frame object with the new position
      const movedFrame = { ...frameToMove, x: newX, y: newY };
      
      // Find nearby edges for snapping
      const nearbyEdges = findNearbyFrameEdges(movedFrame, otherFrames, snapThreshold);
      
      // Apply snapping if edges are found
      if (nearbyEdges.x !== null) {
        newX = nearbyEdges.x;
      }
      
      if (nearbyEdges.y !== null) {
        newY = nearbyEdges.y;
      }
      
      // Calculate the movement delta
      const deltaX = newX - frameToMove.x;
      const deltaY = newY - frameToMove.y;
      
      // Check if the new position would cause an overlap
      let wouldOverlap = false;
      const updatedFrame = { ...frameToMove, x: newX, y: newY };
      
      for (const otherFrame of otherFrames) {
        if (doFramesOverlap(updatedFrame, otherFrame)) {
          wouldOverlap = true;
          break;
        }
      }
      
      // Don't move the frame if it would cause an overlap
      if (wouldOverlap) {
        return state;
      }
      
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
    
    case "ASSIGN_COMPONENT_TO_FRAME": {
      newState = {
        ...state,
        components: state.components.map(component =>
          component.id === action.componentId 
            ? { ...component, frameId: action.frameId }
            : component
        ),
      };
      break;
    }
    
    case "SELECT_FRAME": {
      newState = {
        ...state,
        selectedFrameId: action.id,
        // Clear selected component when selecting a frame
        // This ensures only one type of element is selected at a time
      };
      break;
    }

    case "LOAD_FROM_STORAGE": {
      newState = {
        ...state,
        ...action.state,
      };
      break;
    }

    default:
      newState = state;
  }

  // Save to localStorage after each action (except in initial load)
  if (action.type !== "LOAD_FROM_STORAGE") {
    saveStateToLocalStorage(newState);
  }

  return newState;
};

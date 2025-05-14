
import { ReactNode } from "react";

export type ComponentType =
  | "button"
  | "input"
  | "text"
  | "heading"
  | "paragraph"
  | "checkbox"
  | "radio"
  | "select"
  | "card"
  | "image"
  | "divider"
  | "table"
  | "flow"
  | "shape"; 

export interface ComponentProperties {
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  textColor?: string;
  fontSize?: number;
  textAlign?: "left" | "center" | "right";
  placeholder?: string;
  type?: string;
  label?: string;
  checked?: boolean;
  options?: string[];
  selected?: number;
  shadow?: "none" | "sm" | "md" | "lg";
  padding?: string | number;
  flowType?: string; // For flow components to specify shape type
  [key: string]: any;
}

export interface CanvasComponent {
  id: string;
  type: ComponentType;
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string;
  properties: ComponentProperties;
  frameId?: string;
}

export interface FrameSize {
  id: string;
  name: string;
  width: number;
  height: number;
  x: number;
  y: number;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
}

export interface WhiteboardState {
  components: CanvasComponent[];
  isDragging: boolean;
  isResizing: boolean;
  snapToGrid: boolean;
  gridSize: number;
  frames: FrameSize[];
  activeFrameId: string | null;
  zoomLevel: number;
  draggedFrameId: string | null;
  selectedFrameId: string | null;
  selectedFrame: FrameSize | null;
  selectedComponent: CanvasComponent | null;
  clipboard: CanvasComponent | null;
  selectedComponentId: string | null;
  // Add new grid properties
  masterGridColumns: number;
  masterGridRows: number;
  masterGridGap: number;
  // Structure grid properties
  useStructureGrid: boolean;
  gridColumns: number;
  gridRows: number;
  gridGap: number;
  snapToStructure: boolean;
}

export type WhiteboardAction =
  | { type: "ADD_COMPONENT"; component: Omit<CanvasComponent, "id"> }
  | { type: "MOVE_COMPONENT"; id: string; x: number; y: number }
  | { type: "RESIZE_COMPONENT"; id: string; width: number; height: number }
  | {
      type: "UPDATE_COMPONENT";
      id: string;
      properties: Partial<ComponentProperties>;
    }
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
  | { type: "SELECT_FRAME"; id: string | null }
  | { type: "SET_CLIPBOARD"; component: CanvasComponent }
  | { type: "PASTE_COMPONENT"; x: number; y: number }
  | { type: "SELECT_COMPONENT"; id: string | null }
  | { type: "LOAD_FROM_STORAGE"; state: Partial<WhiteboardState> }
  // Add new action types for structure grid
  | { type: "TOGGLE_STRUCTURE_GRID"; enabled: boolean }
  | { type: "SET_GRID_COLUMNS"; columns: number }
  | { type: "SET_GRID_ROWS"; rows: number }
  | { type: "SET_GRID_GAP"; gap: number }
  | { type: "TOGGLE_STRUCTURE_SNAP"; enabled: boolean };

export interface CanvasProps {
  children?: ReactNode;
}

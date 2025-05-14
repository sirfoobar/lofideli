import { CanvasComponent, FrameSize } from "../types/whiteboard";

// Local storage key
export const STORAGE_KEY = "whiteboard_canvas_state";

// Helper function for snapping to grid
export const snapToGrid = (value: number, gridSize: number): number => {
  return Math.round(value / gridSize) * gridSize;
};

// Helper function to check if a component is within a frame
export const isComponentInFrame = (component: CanvasComponent, frame: FrameSize): boolean => {
  return (
    component.x >= frame.x &&
    component.y >= frame.y &&
    component.x + component.width <= frame.x + frame.width &&
    component.y + component.height <= frame.y + frame.height
  );
};

// Function to render the structure grid
export const renderStructureGrid = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  columns: number,
  rows: number,
  zoomLevel: number
) => {
  const cellWidth = width / columns;
  const cellHeight = height / rows;
  
  ctx.strokeStyle = "rgba(120, 140, 255, 0.3)"; // Light blue for structure grid
  ctx.lineWidth = 1;
  ctx.beginPath();
  
  // Draw vertical lines
  for (let i = 1; i < columns; i++) {
    const x = i * cellWidth;
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }
  
  // Draw horizontal lines
  for (let i = 1; i < rows; i++) {
    const y = i * cellHeight;
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }
  
  ctx.stroke();
};

// Function to get the default properties for a component type
export const getDefaultPropertiesForComponent = (type: string): Record<string, any> => {
  const baseProperties = {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 4,
    textColor: "#000000",
    textAlign: "left",
    fontSize: 16,
  };
  
  switch (type) {
    case "button":
      return {
        ...baseProperties,
        textAlign: "center",
        padding: "8px 16px",
      };
    case "input":
      return {
        ...baseProperties,
        placeholder: "Enter text...",
        padding: "8px 12px",
      };
    case "checkbox":
      return {
        ...baseProperties,
        checked: false,
        label: "Checkbox",
      };
    case "radio":
      return {
        ...baseProperties,
        options: ["Option 1", "Option 2", "Option 3"],
        selected: 0,
      };
    case "select":
      return {
        ...baseProperties,
        options: ["Option 1", "Option 2", "Option 3"],
        selected: 0,
      };
    case "card":
      return {
        ...baseProperties,
        padding: 16,
      };
    default:
      return baseProperties;
  }
};

// Function to get the default content for a component type
export const getDefaultContentForComponent = (type: string): string => {
  switch (type) {
    case "button":
      return "Button";
    case "input":
      return "Input";
    case "text":
      return "Text";
    case "heading":
      return "Heading";
    case "paragraph":
      return "This is a paragraph of text. Double click to edit.";
    default:
      return "";
  }
};

// Helper function to save state to localStorage
export const saveStateToLocalStorage = (state: any) => {
  const stateToSave = {
    components: state.components,
    frames: state.frames,
    snapToGrid: state.snapToGrid,
    gridSize: state.gridSize,
    zoomLevel: state.zoomLevel,
    showStructureGrid: state.showStructureGrid,
    structureGridColumns: state.structureGridColumns,
    structureGridRows: state.structureGridRows,
    snapToStructureGrid: state.snapToStructureGrid,
  };
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  } catch (error) {
    console.error("Failed to save whiteboard to localStorage:", error);
  }
};

// Helper function to load state from localStorage
export const loadStateFromLocalStorage = () => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch (error) {
    console.error("Failed to load whiteboard from localStorage:", error);
  }
  return null;
};

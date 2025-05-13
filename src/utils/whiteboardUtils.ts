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

// Function to get the default properties for a component type
export const getDefaultPropertiesForComponent = (type: string): ComponentProperties => {
  switch (type) {
    case "button":
      return {
        backgroundColor: "#ffffff",
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 4,
        textColor: "#000000",
        fontSize: 14,
        textAlign: "center",
        padding: 8
      };
    case "input":
      return {
        backgroundColor: "#ffffff",
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 4,
        textColor: "#000000",
        fontSize: 14,
        textAlign: "left",
        padding: 8,
        placeholder: "Input field"
      };
    case "text":
    case "paragraph":
    case "heading":
      return {
        backgroundColor: "transparent",
        textColor: "#000000",
        fontSize: 14,
        textAlign: "left",
        padding: 4
      };
    case "checkbox":
      return {
        backgroundColor: "transparent",
        textColor: "#000000",
        fontSize: 14,
        label: "Checkbox",
        checked: false
      };
    case "radio":
      return {
        backgroundColor: "transparent",
        textColor: "#000000",
        fontSize: 14,
        options: ["Option 1", "Option 2", "Option 3"],
        selected: 0
      };
    case "select":
      return {
        backgroundColor: "#ffffff",
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 4,
        textColor: "#000000",
        fontSize: 14,
        padding: 8,
        options: ["Option 1", "Option 2", "Option 3"],
        selected: 0
      };
    case "card":
      return {
        backgroundColor: "#ffffff",
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 4,
        shadow: "sm",
        padding: 16
      };
    case "image":
      return {
        backgroundColor: "#f3f4f6",
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 4
      };
    case "divider":
      return {
        borderColor: "#000000",
        borderWidth: 1
      };
    case "table":
      return {
        backgroundColor: "#ffffff",
        borderColor: "#000000",
        borderWidth: 1,
        textColor: "#000000",
        fontSize: 12,
        padding: 4
      };
    case "breadcrumbs":
      return {
        backgroundColor: "transparent",
        textColor: "#000000",
        fontSize: 14,
        padding: 4
      };
    case "calendar":
      return {
        backgroundColor: "#ffffff",
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 4,
        textColor: "#000000",
        fontSize: 12,
        padding: 8
      };
    case "combobox":
      return {
        backgroundColor: "#ffffff",
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 4,
        textColor: "#000000",
        fontSize: 14,
        padding: 8,
        options: ["Option 1", "Option 2", "Option 3"],
        selected: 0
      };
    case "datepicker":
      return {
        backgroundColor: "#ffffff",
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 4,
        textColor: "#000000",
        fontSize: 14,
        padding: 8
      };
    case "dialog":
      return {
        backgroundColor: "#ffffff",
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 4,
        textColor: "#000000",
        fontSize: 14,
        padding: 16,
        shadow: "md"
      };
    case "gridlist":
      return {
        backgroundColor: "#ffffff",
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 4,
        textColor: "#000000",
        fontSize: 14,
        padding: 8
      };
    case "listbox":
      return {
        backgroundColor: "#ffffff",
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 4,
        textColor: "#000000",
        fontSize: 14,
        padding: 4,
        options: ["Option 1", "Option 2", "Option 3"],
        selected: 0
      };
    case "menu":
      return {
        backgroundColor: "#ffffff",
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 4,
        textColor: "#000000",
        fontSize: 14,
        padding: 4
      };
    case "meter":
      return {
        backgroundColor: "#f3f4f6",
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 4,
        textColor: "#000000",
        fontSize: 14,
        padding: 8
      };
    case "modal":
      return {
        backgroundColor: "#ffffff",
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 4,
        textColor: "#000000",
        fontSize: 14,
        padding: 16,
        shadow: "md"
      };
    case "popover":
      return {
        backgroundColor: "#ffffff",
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 4,
        textColor: "#000000",
        fontSize: 14,
        padding: 8,
        shadow: "sm"
      };
    case "progressbar":
      return {
        backgroundColor: "#f3f4f6",
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 4,
        textColor: "#000000",
        fontSize: 14,
        padding: 8
      };
    case "searchfield":
      return {
        backgroundColor: "#ffffff",
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 4,
        textColor: "#000000",
        fontSize: 14,
        padding: 8,
        placeholder: "Search..."
      };
    case "slider":
      return {
        backgroundColor: "#f3f4f6",
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 4,
        textColor: "#000000",
        fontSize: 14,
        padding: 8
      };
    case "switch":
      return {
        backgroundColor: "#f3f4f6",
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 9999,
        textColor: "#000000",
        fontSize: 14,
        padding: 4
      };
    case "tabs":
      return {
        backgroundColor: "#ffffff",
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 4,
        textColor: "#000000",
        fontSize: 14,
        padding: 8
      };
    case "taggroup":
      return {
        backgroundColor: "#ffffff",
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 4,
        textColor: "#000000",
        fontSize: 12,
        padding: 4
      };
    case "togglebutton":
      return {
        backgroundColor: "#f3f4f6",
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 4,
        textColor: "#000000",
        fontSize: 14,
        padding: 8
      };
    case "tooltip":
      return {
        backgroundColor: "#ffffff",
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 4,
        textColor: "#000000",
        fontSize: 14,
        padding: 8,
        shadow: "sm"
      };
    default:
      return {
        backgroundColor: "#ffffff",
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 4,
        textColor: "#000000",
        fontSize: 14,
        padding: 8
      };
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
    case "breadcrumbs":
      return "Home / Section / Current";
    case "calendar":
      return "Calendar";
    case "combobox":
      return "Select option...";
    case "datepicker":
      return "Select date...";
    case "dialog":
      return "Dialog Title";
    case "gridlist":
      return "Grid List";
    case "listbox":
      return "List Box";
    case "menu":
      return "Menu";
    case "meter":
      return "60%";
    case "modal":
      return "Modal Title";
    case "popover":
      return "Popover content";
    case "progressbar":
      return "75%";
    case "searchfield":
      return "Search...";
    case "slider":
      return "50%";
    case "switch":
      return "Toggle";
    case "tabs":
      return "Tab 1";
    case "taggroup":
      return "Tag 1";
    case "togglebutton":
      return "Toggle";
    case "tooltip":
      return "Hover for tooltip";
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

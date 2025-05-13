import { useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { WhiteboardState, ComponentType, CanvasComponent } from "../types/whiteboard";
import { STORAGE_KEY } from "../utils/whiteboardUtils";
import { v4 as uuidv4 } from "uuid";
import { getDefaultContentForComponent, getDefaultPropertiesForComponent } from "@/utils/whiteboardUtils";

// Enhanced UI patterns with more complex layouts and variations
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
  dashboard: [
    { type: "card", x: 10, y: 10, width: 200, height: 120, properties: { backgroundColor: "#f8fafc" } },
    { type: "heading", content: "Total Users", x: 20, y: 20, width: 180, height: 30 },
    { type: "text", content: "1,234", x: 20, y: 50, width: 180, height: 40, properties: { fontSize: 24, textAlign: "center" } },
    { type: "card", x: 220, y: 10, width: 200, height: 120, properties: { backgroundColor: "#f8fafc" } },
    { type: "heading", content: "Revenue", x: 230, y: 20, width: 180, height: 30 },
    { type: "text", content: "$12,345", x: 230, y: 50, width: 180, height: 40, properties: { fontSize: 24, textAlign: "center" } },
    { type: "card", x: 430, y: 10, width: 200, height: 120, properties: { backgroundColor: "#f8fafc" } },
    { type: "heading", content: "Active Projects", x: 440, y: 20, width: 180, height: 30 },
    { type: "text", content: "42", x: 440, y: 50, width: 180, height: 40, properties: { fontSize: 24, textAlign: "center" } },
  ],
  checkout: [
    { type: "heading", content: "Checkout", x: 10, y: 10, width: 200, height: 40 },
    { type: "input", properties: { placeholder: "Full Name" }, x: 10, y: 60, width: 280, height: 40 },
    { type: "input", properties: { placeholder: "Card Number" }, x: 10, y: 110, width: 280, height: 40 },
    { type: "div", x: 10, y: 160, width: 280, height: 40, properties: { display: "flex", gap: "10px" } },
    { type: "input", properties: { placeholder: "MM/YY" }, x: 10, y: 160, width: 135, height: 40 },
    { type: "input", properties: { placeholder: "CVC" }, x: 155, y: 160, width: 135, height: 40 },
    { type: "input", properties: { placeholder: "Billing Address" }, x: 10, y: 210, width: 280, height: 40 },
    { type: "button", content: "Pay Now", x: 10, y: 260, width: 280, height: 40 },
  ],
  settings: [
    { type: "heading", content: "Settings", x: 10, y: 10, width: 200, height: 40 },
    { type: "text", content: "Profile Settings", x: 10, y: 60, width: 280, height: 30, properties: { fontSize: 16 } },
    { type: "input", properties: { placeholder: "Display Name" }, x: 10, y: 100, width: 280, height: 40 },
    { type: "input", properties: { placeholder: "Email" }, x: 10, y: 150, width: 280, height: 40 },
    { type: "switch", properties: { label: "Email Notifications" }, x: 10, y: 200, width: 280, height: 40 },
    { type: "switch", properties: { label: "Dark Mode" }, x: 10, y: 250, width: 280, height: 40 },
    { type: "button", content: "Save Changes", x: 10, y: 300, width: 280, height: 40 },
  ],
  search: [
    { type: "searchfield", x: 10, y: 10, width: 280, height: 40 },
    { type: "taggroup", x: 10, y: 60, width: 280, height: 40 },
    { type: "listbox", x: 10, y: 110, width: 280, height: 200 },
  ],
  calendar: [
    { type: "calendar", x: 10, y: 10, width: 280, height: 300 },
    { type: "listbox", x: 10, y: 320, width: 280, height: 150 },
  ],
  form: [
    { type: "heading", content: "Contact Form", x: 10, y: 10, width: 200, height: 40 },
    { type: "input", properties: { placeholder: "Name" }, x: 10, y: 60, width: 280, height: 40 },
    { type: "input", properties: { placeholder: "Email" }, x: 10, y: 110, width: 280, height: 40 },
    { type: "textarea", properties: { placeholder: "Message" }, x: 10, y: 160, width: 280, height: 120 },
    { type: "button", content: "Send Message", x: 10, y: 290, width: 280, height: 40 },
  ],
  advancedDashboard: [
    // Header section
    { type: "card", x: 10, y: 10, width: 780, height: 60, properties: { backgroundColor: "#ffffff" } },
    { type: "heading", content: "Dashboard", x: 25, y: 20, width: 200, height: 40 },
    { type: "searchfield", x: 500, y: 20, width: 280, height: 40 },
    
    // Stats cards row
    { type: "card", x: 10, y: 80, width: 180, height: 120, properties: { backgroundColor: "#f8fafc" } },
    { type: "heading", content: "Total Users", x: 20, y: 90, width: 160, height: 30 },
    { type: "text", content: "1,234", x: 20, y: 120, width: 160, height: 40, properties: { fontSize: 24, textAlign: "center" } },
    { type: "text", content: "+12% from last month", x: 20, y: 160, width: 160, height: 20, properties: { fontSize: 12, textAlign: "center", textColor: "#22c55e" } },
    
    { type: "card", x: 200, y: 80, width: 180, height: 120, properties: { backgroundColor: "#f8fafc" } },
    { type: "heading", content: "Revenue", x: 210, y: 90, width: 160, height: 30 },
    { type: "text", content: "$12,345", x: 210, y: 120, width: 160, height: 40, properties: { fontSize: 24, textAlign: "center" } },
    { type: "text", content: "+8% from last month", x: 210, y: 160, width: 160, height: 20, properties: { fontSize: 12, textAlign: "center", textColor: "#22c55e" } },
    
    { type: "card", x: 390, y: 80, width: 180, height: 120, properties: { backgroundColor: "#f8fafc" } },
    { type: "heading", content: "Active Projects", x: 400, y: 90, width: 160, height: 30 },
    { type: "text", content: "42", x: 400, y: 120, width: 160, height: 40, properties: { fontSize: 24, textAlign: "center" } },
    { type: "text", content: "5 new this week", x: 400, y: 160, width: 160, height: 20, properties: { fontSize: 12, textAlign: "center", textColor: "#22c55e" } },
    
    { type: "card", x: 580, y: 80, width: 180, height: 120, properties: { backgroundColor: "#f8fafc" } },
    { type: "heading", content: "Tasks", x: 590, y: 90, width: 160, height: 30 },
    { type: "text", content: "24/36", x: 590, y: 120, width: 160, height: 40, properties: { fontSize: 24, textAlign: "center" } },
    { type: "progressbar", x: 590, y: 160, width: 160, height: 20, properties: { value: 66 } },
    
    // Main content area
    { type: "card", x: 10, y: 210, width: 480, height: 300, properties: { backgroundColor: "#ffffff" } },
    { type: "heading", content: "Recent Activity", x: 25, y: 220, width: 200, height: 30 },
    { type: "listbox", x: 25, y: 260, width: 450, height: 240 },
    
    { type: "card", x: 500, y: 210, width: 280, height: 300, properties: { backgroundColor: "#ffffff" } },
    { type: "heading", content: "Upcoming Events", x: 515, y: 220, width: 200, height: 30 },
    { type: "calendar", x: 515, y: 260, width: 250, height: 240 },
  ],
  productPage: [
    // Product gallery
    { type: "card", x: 10, y: 10, width: 400, height: 400, properties: { backgroundColor: "#ffffff" } },
    { type: "image", x: 25, y: 25, width: 370, height: 300 },
    { type: "div", x: 25, y: 335, width: 370, height: 60, properties: { display: "flex", gap: "10px" } },
    { type: "image", x: 25, y: 335, width: 80, height: 60, properties: { borderRadius: "4px" } },
    { type: "image", x: 115, y: 335, width: 80, height: 60, properties: { borderRadius: "4px" } },
    { type: "image", x: 205, y: 335, width: 80, height: 60, properties: { borderRadius: "4px" } },
    { type: "image", x: 295, y: 335, width: 80, height: 60, properties: { borderRadius: "4px" } },
    
    // Product details
    { type: "card", x: 420, y: 10, width: 360, height: 400, properties: { backgroundColor: "#ffffff" } },
    { type: "heading", content: "Premium Wireless Headphones", x: 435, y: 20, width: 330, height: 40 },
    { type: "text", content: "$299.99", x: 435, y: 70, width: 330, height: 40, properties: { fontSize: 32, fontWeight: "bold" } },
    { type: "text", content: "4.8/5 (128 reviews)", x: 435, y: 120, width: 330, height: 30 },
    { type: "text", content: "Experience crystal-clear sound with our premium wireless headphones. Features include active noise cancellation, 30-hour battery life, and premium comfort.", x: 435, y: 160, width: 330, height: 80 },
    
    // Color selection
    { type: "text", content: "Color:", x: 435, y: 250, width: 330, height: 30 },
    { type: "div", x: 435, y: 290, width: 330, height: 40, properties: { display: "flex", gap: "10px" } },
    { type: "button", content: "", x: 435, y: 290, width: 40, height: 40, properties: { backgroundColor: "#000000", borderRadius: "50%" } },
    { type: "button", content: "", x: 485, y: 290, width: 40, height: 40, properties: { backgroundColor: "#ffffff", borderColor: "#000000", borderWidth: "1px", borderRadius: "50%" } },
    { type: "button", content: "", x: 535, y: 290, width: 40, height: 40, properties: { backgroundColor: "#c0c0c0", borderRadius: "50%" } },
    
    // Add to cart section
    { type: "div", x: 435, y: 340, width: 330, height: 60, properties: { display: "flex", gap: "10px" } },
    { type: "input", properties: { type: "number", value: "1", min: "1" }, x: 435, y: 340, width: 80, height: 40 },
    { type: "button", content: "Add to Cart", x: 525, y: 340, width: 240, height: 40 },
  ],
  dataTable: [
    // Header with filters
    { type: "card", x: 10, y: 10, width: 780, height: 60, properties: { backgroundColor: "#ffffff" } },
    { type: "heading", content: "User Management", x: 25, y: 20, width: 200, height: 40 },
    { type: "searchfield", x: 500, y: 20, width: 280, height: 40 },
    
    // Filter bar
    { type: "card", x: 10, y: 80, width: 780, height: 60, properties: { backgroundColor: "#f8fafc" } },
    { type: "text", content: "Status:", x: 25, y: 95, width: 60, height: 30 },
    { type: "select", x: 85, y: 95, width: 120, height: 30, properties: { options: ["All", "Active", "Inactive", "Pending"] } },
    { type: "text", content: "Role:", x: 215, y: 95, width: 60, height: 30 },
    { type: "select", x: 275, y: 95, width: 120, height: 30, properties: { options: ["All", "Admin", "User", "Guest"] } },
    { type: "text", content: "Date Range:", x: 405, y: 95, width: 80, height: 30 },
    { type: "datepicker", x: 485, y: 95, width: 120, height: 30 },
    { type: "button", content: "Apply Filters", x: 615, y: 95, width: 120, height: 30 },
    { type: "button", content: "Reset", x: 745, y: 95, width: 35, height: 30, properties: { backgroundColor: "transparent" } },
    
    // Table
    { type: "card", x: 10, y: 150, width: 780, height: 400, properties: { backgroundColor: "#ffffff" } },
    { type: "table", x: 25, y: 165, width: 750, height: 370, properties: {
      columns: [
        { header: "Name", width: "200px" },
        { header: "Email", width: "200px" },
        { header: "Role", width: "100px" },
        { header: "Status", width: "100px" },
        { header: "Last Active", width: "150px" }
      ],
      rows: [
        ["John Doe", "john@example.com", "Admin", "Active", "2024-03-15"],
        ["Jane Smith", "jane@example.com", "User", "Active", "2024-03-14"],
        ["Bob Johnson", "bob@example.com", "Guest", "Inactive", "2024-03-13"]
      ]
    }},
    
    // Pagination
    { type: "div", x: 10, y: 560, width: 780, height: 40, properties: { display: "flex", justifyContent: "center", gap: "10px" } },
    { type: "button", content: "Previous", x: 350, y: 560, width: 80, height: 40 },
    { type: "button", content: "1", x: 440, y: 560, width: 40, height: 40, properties: { backgroundColor: "#000000", textColor: "#ffffff" } },
    { type: "button", content: "2", x: 490, y: 560, width: 40, height: 40 },
    { type: "button", content: "3", x: 540, y: 560, width: 40, height: 40 },
    { type: "button", content: "Next", x: 590, y: 560, width: 80, height: 40 },
  ]
};

// Enhanced prompt analysis with context and modifiers
const analyzePrompt = (prompt: string) => {
  prompt = prompt.toLowerCase();
  
  // Define pattern keywords and their weights
  const patterns = {
    login: ["login", "sign in", "signin", "log in", "authentication"],
    signup: ["signup", "sign up", "register", "registration", "create account", "new account"],
    product: ["product", "item", "card", "goods", "merchandise", "store", "shop", "ecommerce"],
    navbar: ["navbar", "navigation", "header", "menu", "nav", "top bar"],
    dashboard: ["dashboard", "stats", "statistics", "metrics", "overview", "summary", "analytics"],
    checkout: ["checkout", "payment", "billing", "purchase", "order", "cart"],
    settings: ["settings", "preferences", "configuration", "options", "profile"],
    search: ["search", "find", "lookup", "query", "filter"],
    calendar: ["calendar", "schedule", "events", "appointments", "dates"],
    form: ["form", "contact", "feedback", "survey", "questionnaire", "input"],
    advancedDashboard: ["advanced dashboard", "complex dashboard", "detailed dashboard", "comprehensive dashboard"],
    productPage: ["product page", "product detail", "product view", "item page", "product listing"],
    dataTable: ["data table", "user table", "data grid", "user list", "user management", "data management"]
  };

  // Context modifiers that can affect the pattern
  const modifiers = {
    dark: ["dark", "dark mode", "dark theme"],
    light: ["light", "light mode", "light theme"],
    compact: ["compact", "condensed", "dense"],
    spacious: ["spacious", "roomy", "expanded"],
    modern: ["modern", "contemporary", "current"],
    classic: ["classic", "traditional", "standard"]
  };

  // Calculate pattern scores with context
  const scores = Object.entries(patterns).map(([pattern, keywords]) => {
    const score = keywords.reduce((acc, keyword) => {
      return acc + (prompt.includes(keyword) ? 1 : 0);
    }, 0);
    return { pattern, score };
  });

  // Find pattern with highest score
  const bestMatch = scores.reduce((best, current) => {
    return current.score > best.score ? current : best;
  }, { pattern: "form", score: 0 });

  // Check for modifiers
  const activeModifiers = Object.entries(modifiers).reduce((acc, [modifier, keywords]) => {
    if (keywords.some(keyword => prompt.includes(keyword))) {
      acc.push(modifier);
    }
    return acc;
  }, [] as string[]);

  return {
    pattern: bestMatch.pattern,
    modifiers: activeModifiers
  };
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
  }, [dispatch, toast]);

  // Enhanced UI generation with modifiers
  const generateUIFromPrompt = useCallback(async (prompt: string) => {
    try {
      // Analyze the prompt to determine UI pattern and modifiers
      const { pattern, modifiers } = analyzePrompt(prompt);
      const patternTemplate = uiPatterns[pattern as keyof typeof uiPatterns];
      
      if (!patternTemplate) {
        throw new Error("Could not determine UI pattern from prompt");
      }
      
      // Create a new frame for the generated UI
      const frameId = uuidv4();
      const frameWidth = pattern === "advancedDashboard" || pattern === "dataTable" ? 800 : 
                        pattern === "productPage" ? 790 : 320;
      const frameHeight = pattern === "advancedDashboard" ? 610 :
                         pattern === "productPage" ? 420 :
                         pattern === "dataTable" ? 610 : 220;
      
      // Create frame with space around components
      dispatch({
        type: "ADD_FRAME",
        frame: {
          name: `${pattern.charAt(0).toUpperCase() + pattern.slice(1)} UI`,
          width: frameWidth,
          height: frameHeight,
          x: 50,
          y: 50,
        }
      });

      // Add components with delay to show animation
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Generate components based on the pattern and apply modifiers
      patternTemplate.forEach(async (componentTemplate: any, index: number) => {
        const component: Omit<CanvasComponent, "id"> = {
          type: componentTemplate.type as ComponentType,
          x: 50 + componentTemplate.x,
          y: 50 + componentTemplate.y,
          width: componentTemplate.width,
          height: componentTemplate.height,
          content: componentTemplate.content || getDefaultContentForComponent(componentTemplate.type as ComponentType),
          properties: {
            ...getDefaultPropertiesForComponent(componentTemplate.type as ComponentType),
            ...componentTemplate.properties,
            // Apply modifiers
            ...(modifiers.includes("dark") && {
              backgroundColor: componentTemplate.type === "card" ? "#1a1a1a" : "#2a2a2a",
              textColor: "#ffffff",
              borderColor: "#404040"
            }),
            ...(modifiers.includes("light") && {
              backgroundColor: componentTemplate.type === "card" ? "#ffffff" : "#f8fafc",
              textColor: "#000000",
              borderColor: "#e2e8f0"
            }),
            ...(modifiers.includes("compact") && {
              padding: "8px",
              fontSize: "14px"
            }),
            ...(modifiers.includes("spacious") && {
              padding: "16px",
              fontSize: "16px"
            }),
            ...(modifiers.includes("modern") && {
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }),
            ...(modifiers.includes("classic") && {
              borderRadius: "4px",
              boxShadow: "none"
            })
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

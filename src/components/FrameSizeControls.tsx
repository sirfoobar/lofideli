import React from "react";
import { useWhiteboard } from "@/context/WhiteboardContext";
import { Laptop, Smartphone, Plus } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface FrameSize {
  name: string;
  width: number;
  height: number;
  icon: React.ReactNode;
}

const frameSizes: FrameSize[] = [{
  name: "Laptop",
  width: 1366,
  height: 768,
  icon: <Laptop className="w-4 h-4" />
}, {
  name: "Mobile",
  width: 375,
  height: 667,
  icon: <Smartphone className="w-4 h-4" />
}];

const FrameSizeControls: React.FC = () => {
  const {
    dispatch,
    state
  } = useWhiteboard();
  const isMobile = useIsMobile();
  
  const handleAddFrame = (width: number, height: number, name: string) => {
    // Dispatch action and get the returned action object with ID
    const action = dispatch({
      type: "ADD_FRAME",
      frame: {
        width,
        height,
        name,
        x: 20,
        y: 20 + state.frames.length * 40 // Stack frames with some offset
      }
    });
    
    // Add welcome message components for mobile frames
    if (name === "Mobile") {
      // Now action.id should be available because we added it in the reducer
      if (action.type === "ADD_FRAME" && action.id) {
        addWelcomeContent(action.id, width, height);
      }
    }
  };
  
  const handleAddCustomFrame = () => {
    handleAddFrame(800, 600, `Frame ${state.frames.length + 1}`);
  };
  
  // Function to add welcome content to a mobile frame
  const addWelcomeContent = (frameId: string, frameWidth: number, frameHeight: number) => {
    // Calculate positions based on frame dimensions
    const padding = 20;
    const contentWidth = frameWidth - (padding * 2);
    
    // Add title
    dispatch({
      type: "ADD_COMPONENT",
      component: {
        type: "heading",
        x: padding,
        y: padding,
        width: contentWidth,
        height: 40,
        content: "Introducing lofideli: Where Wireframes Go to Party!",
        properties: {
          fontSize: 20,
          textAlign: "center",
          fontWeight: "bold",
          textColor: "#1A1F2C"
        },
        frameId
      }
    });
    
    // Add first paragraph
    dispatch({
      type: "ADD_COMPONENT",
      component: {
        type: "paragraph",
        x: padding,
        y: padding + 50,
        width: contentWidth,
        height: 100,
        content: "Ever tried explaining your brilliant app idea with stick figures on a napkin? Well, put down that ketchup-stained paper and step into the 21st century with lofideli – the open source UI design tool that makes low-fidelity designing and diagramming more fun!",
        properties: {
          fontSize: 14,
          textAlign: "left",
          textColor: "#403E43"
        },
        frameId
      }
    });
    
    // Add subheading
    dispatch({
      type: "ADD_COMPONENT",
      component: {
        type: "heading",
        x: padding,
        y: padding + 160,
        width: contentWidth,
        height: 30,
        content: "Why lofideli? Because Your Ideas Deserve Better",
        properties: {
          fontSize: 16,
          textAlign: "left",
          fontWeight: "bold",
          textColor: "#1A1F2C"
        },
        frameId
      }
    });
    
    // Add bullet points as separate paragraph components
    const bulletPoints = [
      "Create frames and utilize pre-baked components faster than you can say \"I swear this box represents a button\"",
      "Build wireframes that actually make sense to other humans (shocking, we know)",
      "Use flow tools to communicate user journeys without resorting to interpretive dance"
    ];
    
    bulletPoints.forEach((point, index) => {
      dispatch({
        type: "ADD_COMPONENT",
        component: {
          type: "paragraph",
          x: padding + 10,
          y: padding + 200 + (index * 70),
          width: contentWidth - 10,
          height: 60,
          content: "• " + point,
          properties: {
            fontSize: 14,
            textAlign: "left",
            textColor: "#403E43"
          },
          frameId
        }
      });
    });
    
    // Add conclusion
    dispatch({
      type: "ADD_COMPONENT",
      component: {
        type: "paragraph",
        x: padding,
        y: padding + 410,
        width: contentWidth,
        height: 100,
        content: "Open source, user-friendly, and judgment-free – lofideli is here to transform your rough ideas into slightly-less-rough visual concepts!",
        properties: {
          fontSize: 14,
          textAlign: "left",
          textColor: "#403E43"
        },
        frameId
      }
    });
    
    // Add tagline
    dispatch({
      type: "ADD_COMPONENT",
      component: {
        type: "paragraph",
        x: padding,
        y: padding + 520,
        width: contentWidth,
        height: 40,
        content: "Lofideli: Making your low-fi designs look intentionally simplistic, not accidentally unfinished.",
        properties: {
          fontSize: 14,
          fontStyle: "italic",
          textAlign: "center",
          textColor: "#8B5CF6"
        },
        frameId
      }
    });
  };
  
  return <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-small text-xs">Frames</h2>
        <button onClick={handleAddCustomFrame} title="Add new frame" className="flex items-center justify-center w-6 h-6 rounded-full text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex gap-2 mb-2 flex-wrap">
        {frameSizes.map(size => <button key={size.name} className="flex items-center gap-1 px-2 py-1 text-xs rounded-md transition-colors bg-secondary hover:bg-accent" onClick={() => handleAddFrame(size.width, size.height, size.name)} title={`${size.name} (${size.width}x${size.height})`}>
            {size.icon}
            
          </button>)}
      </div>
      
      <div>
        {state.frames.length > 0 && <div className="text-xs text-muted-foreground mb-1">
            {state.frames.length} frame{state.frames.length !== 1 ? 's' : ''} on canvas
          </div>}
      </div>
    </div>;
};

export default FrameSizeControls;

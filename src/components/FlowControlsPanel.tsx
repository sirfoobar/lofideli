
import React from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Square, Triangle } from 'lucide-react';
import { useWhiteboard } from '@/context/WhiteboardContext';
import { Button } from '@/components/ui/button';

// Custom Diamond component since Lucide doesn't have one
const Diamond = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polygon points="12 2 22 12 12 22 2 12" />
  </svg>
);

interface FlowControlsPanelProps {
  isOpen: boolean;
}

const FlowControlsPanel: React.FC<FlowControlsPanelProps> = ({ isOpen }) => {
  const { dispatch } = useWhiteboard();

  const handleAddFlowComponent = (type: string) => {
    // Add component to canvas as a flow element
    dispatch({
      type: "ADD_COMPONENT",
      component: {
        type: "flow",
        x: 100,
        y: 100,
        width: 80, 
        height: 80,
        properties: {
          flowType: type,
          backgroundColor: "transparent",
          borderColor: "#000000",
          borderWidth: 2
        }
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="w-auto max-w-48 border-r border-border bg-card overflow-y-auto transition-all duration-300 ease-in-out h-full">
      <div className="py-[8px] px-[8px]">
        <h2 className="font-small mb-4 text-xs">User Flow Elements</h2>
        
        <div className="grid grid-cols-2 gap-2">
          {/* Arrows */}
          <Button 
            variant="outline" 
            className="flex flex-col items-center justify-center p-2 h-16"
            onClick={() => handleAddFlowComponent("arrow-right")}
          >
            <ArrowRight className="h-6 w-6" />
            <span className="text-xs mt-1">Right</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex flex-col items-center justify-center p-2 h-16"
            onClick={() => handleAddFlowComponent("arrow-left")}
          >
            <ArrowLeft className="h-6 w-6" />
            <span className="text-xs mt-1">Left</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex flex-col items-center justify-center p-2 h-16"
            onClick={() => handleAddFlowComponent("arrow-up")}
          >
            <ArrowUp className="h-6 w-6" />
            <span className="text-xs mt-1">Up</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex flex-col items-center justify-center p-2 h-16"
            onClick={() => handleAddFlowComponent("arrow-down")}
          >
            <ArrowDown className="h-6 w-6" />
            <span className="text-xs mt-1">Down</span>
          </Button>
          
          {/* Shapes */}
          <Button 
            variant="outline" 
            className="flex flex-col items-center justify-center p-2 h-16"
            onClick={() => handleAddFlowComponent("square")}
          >
            <Square className="h-6 w-6" />
            <span className="text-xs mt-1">Square</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex flex-col items-center justify-center p-2 h-16"
            onClick={() => handleAddFlowComponent("diamond")}
          >
            <Diamond className="h-6 w-6" />
            <span className="text-xs mt-1">Diamond</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex flex-col items-center justify-center p-2 h-16"
            onClick={() => handleAddFlowComponent("triangle")}
          >
            <Triangle className="h-6 w-6" />
            <span className="text-xs mt-1">Triangle</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FlowControlsPanel;

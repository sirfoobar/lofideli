
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

  // Flow controls array for easier mapping and management
  const flowControls = [
    { type: "arrow-right", name: "Right Arrow", icon: <ArrowRight className="h-6 w-6" /> },
    { type: "arrow-left", name: "Left Arrow", icon: <ArrowLeft className="h-6 w-6" /> },
    { type: "arrow-up", name: "Up Arrow", icon: <ArrowUp className="h-6 w-6" /> },
    { type: "arrow-down", name: "Down Arrow", icon: <ArrowDown className="h-6 w-6" /> },
    { type: "square", name: "Square", icon: <Square className="h-6 w-6" /> },
    { type: "diamond", name: "Diamond", icon: <Diamond className="h-6 w-6" /> },
    { type: "triangle", name: "Triangle", icon: <Triangle className="h-6 w-6" /> }
  ];

  const handleDragStart = (e: React.DragEvent, flowType: string) => {
    e.dataTransfer.setData("componentType", "flow");
    e.dataTransfer.setData("flowType", flowType);
    e.dataTransfer.effectAllowed = "copy";
  };

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
          {flowControls.map(control => (
            <Button 
              key={control.type}
              variant="outline" 
              className="flex flex-col items-center justify-center p-2 h-16 cursor-grab"
              draggable
              onDragStart={(e) => handleDragStart(e, control.type)}
              onClick={() => handleAddFlowComponent(control.type)}
            >
              {control.icon}
              <span className="text-xs mt-1">{control.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlowControlsPanel;

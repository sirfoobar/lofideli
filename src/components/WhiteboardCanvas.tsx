
import React, { useRef, useState, useEffect } from "react";
import { useWhiteboard } from "@/context/WhiteboardContext";
import CanvasComponent from "@/components/CanvasComponent";

interface WhiteboardCanvasProps {
  onSelectComponent: (id: string | null) => void;
  selectedComponentId: string | null;
}

const WhiteboardCanvas: React.FC<WhiteboardCanvasProps> = ({
  onSelectComponent,
  selectedComponentId
}) => {
  const { state, dispatch } = useWhiteboard();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });

  // Handle canvas size changes
  useEffect(() => {
    if (canvasRef.current) {
      const updateSize = () => {
        setCanvasSize({
          width: canvasRef.current?.clientWidth || 0,
          height: canvasRef.current?.clientHeight || 0,
        });
      };

      updateSize();
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    }
  }, []);

  // Center the frame when frame size changes
  useEffect(() => {
    if (state.frameSize && canvasRef.current) {
      const containerWidth = canvasRef.current.parentElement?.clientWidth || 0;
      const containerHeight = canvasRef.current.parentElement?.clientHeight || 0;
      
      // Center the frame in the viewport
      const newOffsetX = (containerWidth / 2) - (state.frameSize.width / 2);
      const newOffsetY = (containerHeight / 2) - (state.frameSize.height / 2);
      
      setOffset({ x: newOffsetX, y: newOffsetY });
    }
  }, [state.frameSize]);

  // Handle clicks on empty canvas areas
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      onSelectComponent(null);
    }
  };

  // Handle dragging the canvas
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current && e.button === 1) {  // Middle mouse button
      setIsDragging(true);
      setDragStartPos({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setOffset({
        x: e.clientX - dragStartPos.x,
        y: e.clientY - dragStartPos.y
      });
    }
  };

  const handleCanvasMouseUp = () => {
    setIsDragging(false);
  };

  // Handle component drop from the library
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const componentType = e.dataTransfer.getData("componentType");
    
    if (componentType) {
      const canvasRect = canvasRef.current?.getBoundingClientRect();
      if (canvasRect) {
        const x = e.clientX - canvasRect.left - offset.x;
        const y = e.clientY - canvasRect.top - offset.y;
        
        // Add new component
        dispatch({
          type: "ADD_COMPONENT",
          component: {
            type: componentType as any,
            x,
            y,
            width: 120,
            height: 40,
            content: getDefaultContentForComponent(componentType as any),
            properties: getDefaultPropertiesForComponent(componentType as any),
          },
        });
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleSelectComponent = (id: string) => {
    onSelectComponent(id);
  };

  return (
    <div 
      className="relative w-full h-full overflow-hidden bg-canvas-background cursor-default"
      onMouseDown={handleCanvasMouseDown}
      onMouseMove={handleCanvasMouseMove}
      onMouseUp={handleCanvasMouseUp}
      onMouseLeave={handleCanvasMouseUp}
    >
      {/* SVG Filters for Balsamiq-like sketchy effect */}
      <svg width="0" height="0" className="absolute">
        <defs>
          {/* Balsamiq-style sketchy filter for lines only */}
          <filter id="sketchy-lines-only">
            {/* More pronounced displacement for Balsamiq look */}
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="5" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" result="displacedLines" />
            {/* Thicken the lines slightly */}
            <feMorphology operator="dilate" radius="0.2" in="displacedLines" result="thickenedLines" />
            {/* Ensure the effect only applies to lines/borders */}
            <feComponentTransfer>
              <feFuncA type="linear" slope="1" intercept="0" />
            </feComponentTransfer>
          </filter>
          
          {/* Balsamiq-style sketchy filter for the frame outline */}
          <filter id="sketchy-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
            {/* Thicken the frame border */}
            <feMorphology operator="dilate" radius="0.3" result="thickenedFrame" />
          </filter>
        </defs>
      </svg>
      
      {/* Canvas grid */}
      <div className="absolute inset-0 bg-canvas-background"
        style={{
          backgroundSize: `${state.gridSize}px ${state.gridSize}px`,
          backgroundImage: state.sketchyMode 
            ? "linear-gradient(to right, rgba(142, 145, 150, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(142, 145, 150, 0.2) 1px, transparent 1px)"
            : "linear-gradient(to right, #E9ECEF 1px, transparent 1px), linear-gradient(to bottom, #E9ECEF 1px, transparent 1px)"
        }}
      />
      
      {/* Frame if selected */}
      {state.frameSize && (
        <div 
          className={`absolute border-2 ${state.sketchyMode ? 'border-gray-600' : 'border-blue-400'} bg-white/5 pointer-events-none z-10 shadow-md`}
          style={{
            width: state.frameSize.width,
            height: state.frameSize.height,
            left: offset.x,
            top: offset.y,
            ...(state.sketchyMode ? { filter: 'url(#sketchy-filter)' } : {})
          }}
        >
          <div className={`absolute top-0 left-0 ${state.sketchyMode ? 'bg-gray-600' : 'bg-blue-400'} text-white text-xs px-2 py-0.5 rounded-br`}>
            {state.frameSize.width} × {state.frameSize.height}
          </div>
        </div>
      )}
      
      {/* Canvas content */}
      <div 
        ref={canvasRef}
        className="absolute w-[4000px] h-[4000px] transform"
        style={{ 
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          cursor: isDragging ? "grabbing" : "default"
        }}
        onClick={handleCanvasClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {/* Render components */}
        {state.components.map((component) => (
          <CanvasComponent
            key={component.id}
            component={component}
            isSelected={component.id === selectedComponentId}
            onSelect={() => handleSelectComponent(component.id)}
          />
        ))}
      </div>
    </div>
  );
};

// Helper functions to set default content and properties
function getDefaultContentForComponent(type: string): string {
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
}

function getDefaultPropertiesForComponent(type: string): Record<string, any> {
  const baseProperties = {
    backgroundColor: "#ffffff",
    borderColor: "#d1d5db",
    borderWidth: 1,
    borderRadius: 4,
    textColor: "#000000",
    textAlign: "left",
    fontSize: 16,
  };
  
  switch (type) {
    case "button":
      return {
        ...baseProperties,
        backgroundColor: "#e5e7eb",
        textAlign: "center",
        padding: "8px 16px",
        borderRadius: 4,
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
        shadow: "sm",
      };
    default:
      return baseProperties;
  }
}

export default WhiteboardCanvas;

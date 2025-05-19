import React, { useState, useRef, useEffect } from "react";
import { useWhiteboard } from "@/context/WhiteboardContext";
import { CanvasComponent as ComponentType } from "@/types/whiteboard";

interface CanvasComponentProps {
  component: ComponentType;
  isSelected: boolean;
  onSelect: () => void;
}

const CanvasComponent: React.FC<CanvasComponentProps> = ({
  component,
  isSelected,
  onSelect,
}) => {
  const { dispatch, state, copySelectedComponent, pasteComponent } = useWhiteboard();
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const componentRef = useRef<HTMLDivElement>(null);

  // Handle component dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from bubbling up to canvas
    onSelect();
    
    // Set this component as selected in the state
    dispatch({ type: "SELECT_COMPONENT", id: component.id });
    
    if (!isEditing) {
      setIsDragging(true);
      // Account for zoom level when calculating drag offset
      setDragOffset({
        x: e.clientX - component.x * state.zoomLevel,
        y: e.clientY - component.y * state.zoomLevel
      });
      dispatch({ type: "SET_DRAGGING", isDragging: true });
    }
  };

  // Handle component resizing
  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: component.width,
      height: component.height
    });
    dispatch({ type: "SET_RESIZING", isResizing: true });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      // Calculate the new position, accounting for zoom level
      const newX = (e.clientX - dragOffset.x) / state.zoomLevel;
      const newY = (e.clientY - dragOffset.y) / state.zoomLevel;
      
      // Move the component
      dispatch({
        type: "MOVE_COMPONENT",
        id: component.id,
        x: newX,
        y: newY
      });
    } else if (isResizing) {
      // Apply zoom level to resize calculations as well for consistency
      const deltaX = (e.clientX - resizeStart.x) / state.zoomLevel;
      const deltaY = (e.clientY - resizeStart.y) / state.zoomLevel;
      
      const newWidth = Math.max(50, resizeStart.width + deltaX);
      const newHeight = Math.max(30, resizeStart.height + deltaY);
      
      dispatch({
        type: "RESIZE_COMPONENT",
        id: component.id,
        width: newWidth,
        height: newHeight
      });
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      dispatch({ type: "SET_DRAGGING", isDragging: false });
    }
    if (isResizing) {
      setIsResizing(false);
      dispatch({ type: "SET_RESIZING", isResizing: false });
    }
  };

  // Handle text editing
  const handleDoubleClick = () => {
    if (["text", "button", "heading", "paragraph"].includes(component.type)) {
      setIsEditing(true);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch({
      type: "UPDATE_CONTENT",
      id: component.id,
      content: e.target.value
    });
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      setIsEditing(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove as any);
    window.addEventListener("mouseup", handleMouseUp as any);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove as any);
      window.removeEventListener("mouseup", handleMouseUp as any);
    };
  }, [isDragging, isResizing, state.zoomLevel]);

  // Check if component is in its assigned frame
  const isComponentInCorrectFrame = () => {
    if (!component.frameId) return true;
    
    const frame = state.frames.find(f => f.id === component.frameId);
    if (!frame) return false;
    
    return (
      component.x >= frame.x &&
      component.y >= frame.y &&
      component.x + component.width <= frame.x + frame.width &&
      component.y + component.height <= frame.y + frame.height
    );
  };

  const isInFrame = component.frameId !== undefined;
  const isCorrectlyPositioned = isComponentInCorrectFrame();
  
  // Calculate border color based on selection and frame attachment state
  let borderColor = isSelected ? "border-blue-500" : "border-gray-400";
  
  if (component.frameId !== undefined) {
    borderColor = isSelected ? "border-blue-500" : "border-dashed border-gray-400";
  }

  // Get component style with an optional indicator for frame attachment
  const getComponentStyle = () => {
    const { properties } = component;
    
    return {
      backgroundColor: properties.backgroundColor || "#FFFFFF", // Default to white
      borderColor: properties.borderColor || "#000000", // Default to black
      borderWidth: `${properties.borderWidth || 1}px`, // Default to 1px border
      borderRadius: `${properties.borderRadius || 4}px`,
      color: properties.textColor || "#000000",
      textAlign: properties.textAlign || "left",
      fontSize: `${properties.fontSize || 16}px`,
      padding: properties.padding ? `${properties.padding}px` : undefined,
      boxShadow: properties.shadow === "sm" ? "0 1px 2px rgba(0, 0, 0, 0.05)" : 
                properties.shadow === "md" ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : undefined,
    } as React.CSSProperties;
  };

  // Render the component based on its type
  const renderComponent = () => {
    switch (component.type) {
      case "button":
        return isEditing ? (
          <input
            type="text"
            value={component.content || ""}
            onChange={handleContentChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="w-full h-full bg-transparent text-center outline-none"
            autoFocus
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {component.content}
          </div>
        );
        
      case "input":
        return (
          <div className="w-full h-full flex items-center px-2">
            <div className="w-full text-gray-400">
              {component.properties.placeholder || "Input field"}
            </div>
          </div>
        );
        
      case "text":
      case "paragraph":
      case "heading":
        return isEditing ? (
          <textarea
            value={component.content || ""}
            onChange={handleContentChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="w-full h-full resize-none bg-transparent outline-none"
            autoFocus
          />
        ) : (
          <div className="w-full h-full overflow-hidden">
            {component.content}
          </div>
        );
        
      case "checkbox":
        return (
          <div className="w-full h-full flex items-center">
            <div className="w-4 h-4 border border-gray-400 mr-2 flex-shrink-0">
              {component.properties.checked && (
                <div className="w-full h-full bg-blue-500 flex items-center justify-center">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M9 1L3.5 6.5L1 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
            <div>{component.properties.label || "Checkbox"}</div>
          </div>
        );
        
      case "radio":
        return (
          <div className="w-full h-full flex flex-col justify-center">
            {(component.properties.options || []).map((option: string, index: number) => (
              <div key={index} className="flex items-center mb-1">
                <div className="w-4 h-4 rounded-full border border-gray-400 mr-2 flex-shrink-0">
                  {component.properties.selected === index && (
                    <div className="w-2 h-2 rounded-full bg-blue-500 m-auto mt-1"></div>
                  )}
                </div>
                <div>{option}</div>
              </div>
            ))}
          </div>
        );
        
      case "select":
        return (
          <div className="w-full h-full flex items-center justify-between px-2">
            <div>
              {component.properties.options?.[component.properties.selected] || "Select option"}
            </div>
            <div>▼</div>
          </div>
        );
        
      case "card":
        return (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Card Content
          </div>
        );
        
      case "image":
        return (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        );
        
      case "divider":
        return (
          <div className="w-full h-full flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
        );
        
      case "table":
        return (
          <div className="w-full h-full flex items-center justify-center bg-white">
            <div className="w-full h-full border border-gray-300 overflow-hidden">
              <table className="min-w-full table-fixed border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-1 text-xs text-left">Header 1</th>
                    <th className="border border-gray-300 p-1 text-xs text-left">Header 2</th>
                    <th className="border border-gray-300 p-1 text-xs text-left">Header 3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-1 text-xs">Data 1</td>
                    <td className="border border-gray-300 p-1 text-xs">Data 2</td>
                    <td className="border border-gray-300 p-1 text-xs">Data 3</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-1 text-xs">Data 4</td>
                    <td className="border border-gray-300 p-1 text-xs">Data 5</td>
                    <td className="border border-gray-300 p-1 text-xs">Data 6</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
        
      case "flow":
        return renderFlowComponent(component.properties.flowType);
        
      default:
        return <div className="w-full h-full">Unknown component</div>;
    }
  };

  // Helper function to render flow components based on type
  const renderFlowComponent = (flowType: string | undefined) => {
    if (!flowType) return <div>Invalid flow component</div>;
    
    // Set up common styles
    const commonStyle: React.CSSProperties = {
      stroke: component.properties.borderColor || "#000",
      strokeWidth: component.properties.borderWidth || 2,
      fill: component.properties.backgroundColor || "transparent"
    };
    
    // Render based on flow type
    switch (flowType) {
      case "arrow-right":
        return (
          <div className="w-full h-full flex items-center justify-center">
            <svg width="100%" height="100%" viewBox="0 0 24 24">
              <line x1="3" y1="12" x2="21" y2="12" style={commonStyle} />
              <polyline points="15,6 21,12 15,18" style={commonStyle} />
            </svg>
          </div>
        );
      
      case "arrow-left":
        return (
          <div className="w-full h-full flex items-center justify-center">
            <svg width="100%" height="100%" viewBox="0 0 24 24">
              <line x1="21" y1="12" x2="3" y2="12" style={commonStyle} />
              <polyline points="9,6 3,12 9,18" style={commonStyle} />
            </svg>
          </div>
        );
      
      case "arrow-up":
        return (
          <div className="w-full h-full flex items-center justify-center">
            <svg width="100%" height="100%" viewBox="0 0 24 24">
              <line x1="12" y1="21" x2="12" y2="3" style={commonStyle} />
              <polyline points="6,9 12,3 18,9" style={commonStyle} />
            </svg>
          </div>
        );
      
      case "arrow-down":
        return (
          <div className="w-full h-full flex items-center justify-center">
            <svg width="100%" height="100%" viewBox="0 0 24 24">
              <line x1="12" y1="3" x2="12" y2="21" style={commonStyle} />
              <polyline points="6,15 12,21 18,15" style={commonStyle} />
            </svg>
          </div>
        );
      
      case "square":
        return (
          <div className="w-full h-full flex items-center justify-center">
            <svg width="100%" height="100%" viewBox="0 0 24 24">
              <rect x="4" y="4" width="16" height="16" style={commonStyle} />
            </svg>
          </div>
        );
      
      case "diamond":
        return (
          <div className="w-full h-full flex items-center justify-center">
            <svg width="100%" height="100%" viewBox="0 0 24 24">
              <polygon points="12,2 22,12 12,22 2,12" style={commonStyle} />
            </svg>
          </div>
        );
      
      case "triangle":
        return (
          <div className="w-full h-full flex items-center justify-center">
            <svg width="100%" height="100%" viewBox="0 0 24 24">
              <polygon points="12,3 22,21 2,21" style={commonStyle} />
            </svg>
          </div>
        );
      
      default:
        return <div>Unknown flow type</div>;
    }
  };

  // Determine if we should show a border based on component type
  const shouldShowBorder = !["flow", "divider"].includes(component.type);

  return (
    <div
      ref={componentRef}
      className={`absolute ${shouldShowBorder ? `border-2 ${borderColor}` : ""} ${shouldShowBorder ? 'hand-drawn-border' : ''}`}
      style={{
        left: component.x,
        top: component.y,
        width: component.width,
        height: component.height,
        cursor: isDragging ? "grabbing" : "grab",
        zIndex: isSelected ? 100 : 10,
        // Add a visual indicator if the component is attached to a frame
        opacity: component.frameId !== undefined && !isComponentInCorrectFrame() ? 0.6 : 1,
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      <div
        className="w-full h-full overflow-hidden"
        style={getComponentStyle()}
      >
        {renderComponent()}
      </div>
      
      {/* Resize handle */}
      {isSelected && (
        <>
          <div
            className="absolute w-3 h-3 bg-blue-500 border border-white right-0 bottom-0 cursor-nwse-resize"
            onMouseDown={handleResizeStart}
          />
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-500 border border-white" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 border border-white" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-500 border border-white" />
        </>
      )}
    </div>
  );
};

export default CanvasComponent;

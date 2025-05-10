
import React, { useState, useRef } from "react";
import { useWhiteboard, CanvasComponent as ComponentType } from "@/context/WhiteboardContext";

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
  const { dispatch, state } = useWhiteboard();
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const componentRef = useRef<HTMLDivElement>(null);

  // Handle component dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
    
    if (!isEditing) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - component.x,
        y: e.clientY - component.y
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
      // Calculate the new position
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // Move the component
      dispatch({
        type: "MOVE_COMPONENT",
        id: component.id,
        x: newX,
        y: newY
      });
    } else if (isResizing) {
      const newWidth = Math.max(50, resizeStart.width + (e.clientX - resizeStart.x));
      const newHeight = Math.max(30, resizeStart.height + (e.clientY - resizeStart.y));
      
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

  // Handle deleting component with Delete key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (isSelected && e.key === "Delete") {
      e.preventDefault();
      dispatch({
        type: "DELETE_COMPONENT",
        id: component.id
      });
    }
  };

  React.useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove as any);
    window.addEventListener("mouseup", handleMouseUp as any);
    if (isSelected) {
      window.addEventListener("keydown", handleKeyPress as any);
    }
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove as any);
      window.removeEventListener("mouseup", handleMouseUp as any);
      window.removeEventListener("keydown", handleKeyPress as any);
    };
  }, [isDragging, isResizing, isSelected]);

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
  let borderColor = "border-transparent";
  
  if (isSelected) {
    borderColor = "border-blue-500";
  } else if (isInFrame) {
    borderColor = "border-dashed border-gray-400";
  }

  // Get component style with an optional indicator for frame attachment
  const getComponentStyle = () => {
    const { properties } = component;
    
    return {
      backgroundColor: properties.backgroundColor || "transparent",
      borderColor: properties.borderColor || "transparent",
      borderWidth: `${properties.borderWidth || 0}px`,
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
        
      default:
        return <div className="w-full h-full">Unknown component</div>;
    }
  };

  return (
    <div
      ref={componentRef}
      className={`absolute border hand-drawn-border ${borderColor}`}
      style={{
        left: component.x,
        top: component.y,
        width: component.width,
        height: component.height,
        cursor: isDragging ? "grabbing" : "grab",
        zIndex: isSelected ? 100 : 10,
        // Add a visual indicator if the component is attached to a frame
        opacity: isInFrame && !isCorrectlyPositioned ? 0.6 : 1,
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

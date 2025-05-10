
import React, { useRef, useState, useEffect } from "react";
import { useWhiteboard } from "@/context/WhiteboardContext";
import CanvasComponent from "@/components/CanvasComponent";
import { 
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator
} from "@/components/ui/context-menu";
import { FileImage, Bot } from "lucide-react";
import { toast } from "sonner";
import { getDefaultContentForComponent, getDefaultPropertiesForComponent } from "@/utils/whiteboardUtils";

interface WhiteboardCanvasProps {
  onSelectComponent: (id: string | null) => void;
  selectedComponentId: string | null;
  showGrid: boolean;
}

const WhiteboardCanvas: React.FC<WhiteboardCanvasProps> = ({
  onSelectComponent,
  selectedComponentId,
  showGrid
}) => {
  const { state, dispatch } = useWhiteboard();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [frameStartPos, setFrameStartPos] = useState({ x: 0, y: 0 });

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
    if (state.frames.length > 0 && canvasRef.current) {
      const containerWidth = canvasRef.current.parentElement?.clientWidth || 0;
      const containerHeight = canvasRef.current.parentElement?.clientHeight || 0;
      
      // Center the first frame in the viewport if no offset has been set
      if (offset.x === 0 && offset.y === 0) {
        const firstFrame = state.frames[0];
        const newOffsetX = (containerWidth / 2) - (firstFrame.width / 2);
        const newOffsetY = (containerHeight / 2) - (firstFrame.height / 2);
        
        setOffset({ x: newOffsetX, y: newOffsetY });
      }
    }
  }, [state.frames]);

  // Handle clicks on empty canvas areas
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      onSelectComponent(null);
    }
  };

  // Handle dragging the canvas
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    // Allow dragging with left mouse button or middle mouse button
    if (e.target === canvasRef.current && (e.button === 0 || e.button === 1)) {
      setIsDragging(true);
      setDragStartPos({ x: e.clientX - offset.x, y: e.clientY - offset.y });
      
      // Change cursor during drag
      if (canvasRef.current) {
        canvasRef.current.style.cursor = "grabbing";
      }
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setOffset({
        x: e.clientX - dragStartPos.x,
        y: e.clientY - dragStartPos.y
      });
    } else if (state.draggedFrameId !== null) {
      // Handle frame dragging
      const canvasRect = canvasRef.current?.getBoundingClientRect();
      if (canvasRect) {
        // Calculate the new position based on mouse movement and zoom level
        const newX = (e.clientX - canvasRect.left - offset.x) / state.zoomLevel;
        const newY = (e.clientY - canvasRect.top - offset.y) / state.zoomLevel;
        
        // Dispatch action to move the frame with its attached components
        dispatch({
          type: "MOVE_FRAME",
          id: state.draggedFrameId,
          x: newX - frameStartPos.x,
          y: newY - frameStartPos.y,
          moveAttachedComponents: true
        });
      }
    }
  };

  const handleCanvasMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      // Restore cursor
      if (canvasRef.current) {
        canvasRef.current.style.cursor = "default";
      }
    }
    
    // Release dragged frame if any
    if (state.draggedFrameId !== null) {
      dispatch({ type: "SET_DRAGGED_FRAME", id: null });
    }
  };

  // Handle component drop from the library
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const componentType = e.dataTransfer.getData("componentType");
    
    if (componentType) {
      const canvasRect = canvasRef.current?.getBoundingClientRect();
      if (canvasRect) {
        // Adjust for zoom level when dropping
        const x = (e.clientX - canvasRect.left - offset.x) / state.zoomLevel;
        const y = (e.clientY - canvasRect.top - offset.y) / state.zoomLevel;
        
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

  const handleFrameClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: "SET_ACTIVE_FRAME", id });
  };

  // Handle frame mouse down event for drag initiation
  const handleFrameMouseDown = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Set this frame as active
    dispatch({ type: "SET_ACTIVE_FRAME", id });
    
    // Start frame drag
    if (e.button === 0) { // Left mouse button
      dispatch({ type: "SET_DRAGGED_FRAME", id });
      
      const frame = state.frames.find(f => f.id === id);
      if (frame) {
        const canvasRect = canvasRef.current?.getBoundingClientRect();
        if (canvasRect) {
          // Calculate cursor position relative to frame position
          const cursorX = (e.clientX - canvasRect.left - offset.x) / state.zoomLevel;
          const cursorY = (e.clientY - canvasRect.top - offset.y) / state.zoomLevel;
          setFrameStartPos({
            x: cursorX - frame.x,
            y: cursorY - frame.y
          });
        }
      }
    }
  };

  // Add visual indicator for components that are attached to frames
  const getComponentsInFrame = (frameId: string) => {
    return state.components.filter(component => component.frameId === frameId);
  };

  // Export frame as image
  const exportFrameAsImage = (frameId: string) => {
    const frame = state.frames.find(f => f.id === frameId);
    if (!frame || !canvasRef.current) return;

    try {
      // Create a new canvas for the export
      const exportCanvas = document.createElement('canvas');
      const ctx = exportCanvas.getContext('2d');
      if (!ctx) {
        toast.error("Failed to create canvas context");
        return;
      }

      // Set canvas size to match the frame
      exportCanvas.width = frame.width;
      exportCanvas.height = frame.height;
      
      // Fill with white background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, frame.width, frame.height);
      
      // Find components inside the frame
      const componentsInFrame = state.components.filter(component => {
        return (
          component.x >= frame.x &&
          component.y >= frame.y &&
          component.x + component.width <= frame.x + frame.width &&
          component.y + component.height <= frame.y + frame.height
        );
      });
      
      // Draw components
      componentsInFrame.forEach(component => {
        // Draw component background if it has one
        if (component.properties.backgroundColor && component.properties.backgroundColor !== 'transparent') {
          ctx.fillStyle = component.properties.backgroundColor;
          ctx.fillRect(
            component.x - frame.x,
            component.y - frame.y,
            component.width,
            component.height
          );
        }
        
        // Draw border if it has one
        if (component.properties.borderColor && component.properties.borderColor !== 'transparent' && component.properties.borderWidth > 0) {
          ctx.strokeStyle = component.properties.borderColor;
          ctx.lineWidth = component.properties.borderWidth;
          ctx.strokeRect(
            component.x - frame.x,
            component.y - frame.y,
            component.width,
            component.height
          );
        }
        
        // Draw content/text
        if (component.content) {
          ctx.fillStyle = component.properties.textColor || "#000000";
          ctx.font = `${component.properties.fontSize || 16}px sans-serif`;
          ctx.textAlign = component.properties.textAlign as CanvasTextAlign || "left";
          
          let textX = component.x - frame.x;
          if (component.properties.textAlign === "center") {
            textX += component.width / 2;
          } else if (component.properties.textAlign === "right") {
            textX += component.width;
          }
          
          // Add padding
          const padding = component.properties.padding ? parseInt(component.properties.padding) : 0;
          
          ctx.fillText(
            component.content,
            textX + padding,
            component.y - frame.y + component.properties.fontSize + padding
          );
        }
      });
      
      // Convert to image and trigger download
      const dataUrl = exportCanvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${frame.name || 'frame'}.png`;
      link.href = dataUrl;
      link.click();
      
      toast.success("Image exported successfully!");
    } catch (error) {
      console.error("Error exporting image:", error);
      toast.error("Failed to export image");
    }
  };

  // Generate AI prompt from frame content
  const generateAIPrompt = (frameId: string) => {
    const frame = state.frames.find(f => f.id === frameId);
    if (!frame) return;
    
    try {
      // Find components inside the frame
      const componentsInFrame = state.components.filter(component => {
        return (
          component.x >= frame.x &&
          component.y >= frame.y &&
          component.x + component.width <= frame.x + frame.width &&
          component.y + component.height <= frame.y + frame.height
        );
      });
      
      // Start building the prompt
      let prompt = `UI Frame Description (${frame.width}x${frame.height}):\n\n`;
      
      // Add frame information
      prompt += `Frame name: ${frame.name}\n`;
      prompt += `Frame size: ${frame.width} × ${frame.height}\n\n`;
      
      // Add component descriptions
      prompt += `Components (from top-left to bottom-right):\n\n`;
      
      // Sort components by position (top to bottom, left to right)
      const sortedComponents = [...componentsInFrame].sort((a, b) => {
        // If components are roughly on the same row
        if (Math.abs(a.y - b.y) < 20) {
          return a.x - b.x; // Sort by x position
        }
        return a.y - b.y; // Otherwise sort by y position
      });
      
      sortedComponents.forEach((component, index) => {
        prompt += `${index + 1}. ${component.type.charAt(0).toUpperCase() + component.type.slice(1)}:\n`;
        prompt += `   - Position: (${Math.round(component.x - frame.x)}, ${Math.round(component.y - frame.y)})\n`;
        prompt += `   - Size: ${component.width} × ${component.height}\n`;
        
        if (component.content) {
          prompt += `   - Content: "${component.content}"\n`;
        }
        
        const styleProps = [];
        if (component.properties.backgroundColor && component.properties.backgroundColor !== 'transparent') {
          styleProps.push(`background: ${component.properties.backgroundColor}`);
        }
        if (component.properties.borderColor && component.properties.borderColor !== 'transparent' && component.properties.borderWidth > 0) {
          styleProps.push(`border: ${component.properties.borderWidth}px ${component.properties.borderColor}`);
        }
        if (component.properties.textColor) {
          styleProps.push(`text color: ${component.properties.textColor}`);
        }
        if (component.properties.fontSize) {
          styleProps.push(`font size: ${component.properties.fontSize}px`);
        }
        if (component.properties.textAlign) {
          styleProps.push(`text align: ${component.properties.textAlign}`);
        }
        
        if (styleProps.length > 0) {
          prompt += `   - Styles: ${styleProps.join(', ')}\n`;
        }
        
        prompt += '\n';
      });
      
      // Add usage instructions
      prompt += "Instructions for AI:\n";
      prompt += "Based on the UI frame description above, please provide a detailed analysis or code implementation for this interface. Consider the layout, component relationships, and visual styling in your response.\n";
      
      // Create textarea element to copy the prompt
      const textArea = document.createElement('textarea');
      textArea.value = prompt;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      toast.success("AI prompt copied to clipboard!");
    } catch (error) {
      console.error("Error generating prompt:", error);
      toast.error("Failed to generate AI prompt");
    }
  };

  return (
    <div 
      className="relative w-full h-full overflow-hidden bg-background dark:bg-gray-900 cursor-default"
      onMouseDown={handleCanvasMouseDown}
      onMouseMove={handleCanvasMouseMove}
      onMouseUp={handleCanvasMouseUp}
      onMouseLeave={handleCanvasMouseUp}
    >
      {/* Canvas grid */}
      <div className="absolute inset-0 bg-canvas-background dark:bg-gray-900"
        style={{
          backgroundSize: `${state.gridSize * state.zoomLevel}px ${state.gridSize * state.zoomLevel}px`,
          backgroundImage: showGrid ? "linear-gradient(to right, var(--canvas-grid) 1px, transparent 1px), linear-gradient(to bottom, var(--canvas-grid) 1px, transparent 1px)" : "none"
        }}
      />
      
      {/* Canvas content */}
      <div 
        ref={canvasRef}
        className="absolute w-[4000px] h-[4000px] transform"
        style={{ 
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${state.zoomLevel})`,
          transformOrigin: "0 0",
          cursor: isDragging ? "grabbing" : "default"
        }}
        onClick={handleCanvasClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {/* Render frames with context menu */}
        {state.frames.map((frame) => (
          <ContextMenu key={frame.id}>
            <ContextMenuTrigger asChild>
              <div 
                className={`absolute border-2 ${frame.id === state.activeFrameId ? 'border-blue-400' : 'border-gray-300'} bg-white z-10 shadow-md hand-drawn-frame`}
                style={{
                  width: frame.width,
                  height: frame.height,
                  left: frame.x,
                  top: frame.y,
                  cursor: state.draggedFrameId === frame.id ? 'grabbing' : 'grab',
                }}
                onClick={(e) => handleFrameClick(frame.id, e)}
                onMouseDown={(e) => handleFrameMouseDown(frame.id, e)}
              >
                <div className={`absolute top-0 left-0 ${frame.id === state.activeFrameId ? 'bg-blue-400' : 'bg-gray-300'} text-white text-xs px-2 py-0.5 rounded-br`}>
                  {frame.name} - {frame.width} × {frame.height}
                </div>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem onClick={() => exportFrameAsImage(frame.id)} className="cursor-pointer">
                <FileImage className="mr-2 h-4 w-4" />
                <span>Export as Image</span>
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem onClick={() => generateAIPrompt(frame.id)} className="cursor-pointer">
                <Bot className="mr-2 h-4 w-4" />
                <span>Copy AI Prompt</span>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ))}

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

export default WhiteboardCanvas;

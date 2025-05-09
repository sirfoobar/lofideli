
import React from "react";

const ComponentLibrary: React.FC = () => {
  const components = [
    { type: "button", name: "Button", icon: "□" },
    { type: "input", name: "Input", icon: "▭" },
    { type: "text", name: "Text", icon: "T" },
    { type: "heading", name: "Heading", icon: "H" },
    { type: "paragraph", name: "Paragraph", icon: "¶" },
    { type: "checkbox", name: "Checkbox", icon: "☐" },
    { type: "radio", name: "Radio", icon: "◉" },
    { type: "select", name: "Dropdown", icon: "▼" },
    { type: "card", name: "Card", icon: "▱" },
    { type: "image", name: "Image", icon: "🖼" },
    { type: "divider", name: "Divider", icon: "—" },
  ];

  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData("componentType", type);
    e.dataTransfer.effectAllowed = "copy";
  };

  return (
    <div className="flex flex-col gap-2">
      {components.map((component) => (
        <div
          key={component.type}
          className="flex items-center gap-2 p-2 bg-background hover:bg-accent rounded-md cursor-grab transition-colors"
          draggable
          onDragStart={(e) => handleDragStart(e, component.type)}
        >
          <div className="flex items-center justify-center w-8 h-8 bg-muted rounded text-xl">
            {component.icon}
          </div>
          <span className="text-sm">{component.name}</span>
        </div>
      ))}
      
      <div className="mt-6">
        <p className="text-xs text-muted-foreground mb-2">Instructions:</p>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Drag components onto the canvas</li>
          <li>• Click to select a component</li>
          <li>• Double-click text to edit</li>
          <li>• Press Delete to remove a component</li>
          <li>• Use middle mouse to pan the canvas</li>
        </ul>
      </div>
    </div>
  );
};

export default ComponentLibrary;

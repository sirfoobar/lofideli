
import React from "react";
const ComponentLibrary: React.FC = () => {
  const components = [{
    type: "button",
    name: "Button",
    icon: "□"
  }, {
    type: "input",
    name: "Input",
    icon: "▭"
  }, {
    type: "text",
    name: "Text",
    icon: "T"
  }, {
    type: "heading",
    name: "Heading",
    icon: "H"
  }, {
    type: "paragraph",
    name: "Paragraph",
    icon: "¶"
  }, {
    type: "checkbox",
    name: "Checkbox",
    icon: "☐"
  }, {
    type: "radio",
    name: "Radio",
    icon: "◉"
  }, {
    type: "select",
    name: "Dropdown",
    icon: "▼"
  }, {
    type: "card",
    name: "Card",
    icon: "▱"
  }, {
    type: "image",
    name: "Image",
    icon: "🖼"
  }, {
    type: "divider",
    name: "Divider",
    icon: "—"
  }, {
    type: "table",
    name: "Table",
    icon: "▤"
  }];
  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData("componentType", type);
    e.dataTransfer.effectAllowed = "copy";
  };
  return <div className="flex flex-col gap-2">
      <div className="grid grid-cols-1 gap-2">
        {components.map(component => <div key={component.type} draggable onDragStart={e => handleDragStart(e, component.type)} className="flex items-center gap-1.5 p-1.5 bg-background hover:bg-accent rounded-md cursor-grab transition-colors px-0 py-0">
            <div className="flex items-center justify-center w-6 h-6 bg-muted rounded text-sm">
              {component.icon}
            </div>
            <span className="text-xs truncate">{component.name}</span>
          </div>)}
      </div>
    </div>;
};
export default ComponentLibrary;

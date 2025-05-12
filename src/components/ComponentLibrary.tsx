
import React from "react";
import { Collection, Section } from "@/components/compass/Collection";
import { BaseButton } from "@/components/compass/Buttons";
import { theme } from "@/components/compass/theme";

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
  
  return (
    <Collection className="flex flex-col gap-2 w-full">
      <Section className="p-2 border-none bg-transparent">
        {components.map(component => (
          <div 
            key={component.type} 
            draggable 
            onDragStart={e => handleDragStart(e, component.type)} 
            className="flex items-center gap-2 mb-2"
          >
            <BaseButton 
              className="flex items-center justify-start p-2 w-full rounded-md hover:bg-gray-200 cursor-grab transition-colors"
            >
              <div className="flex items-center justify-center w-6 h-6 bg-gray-200 rounded text-sm mr-2">
                {component.icon}
              </div>
              <span className="text-sm">{component.name}</span>
            </BaseButton>
          </div>
        ))}
      </Section>
    </Collection>
  );
};

export default ComponentLibrary;

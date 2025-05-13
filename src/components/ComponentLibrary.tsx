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
  }, {
    type: "breadcrumbs",
    name: "Breadcrumbs",
    icon: "⋮"
  }, {
    type: "calendar",
    name: "Calendar",
    icon: "📅"
  }, {
    type: "combobox",
    name: "ComboBox",
    icon: "⌨"
  }, {
    type: "datepicker",
    name: "Date Picker",
    icon: "📆"
  }, {
    type: "dialog",
    name: "Dialog",
    icon: "💬"
  }, {
    type: "gridlist",
    name: "Grid List",
    icon: "⊞"
  }, {
    type: "listbox",
    name: "List Box",
    icon: "☰"
  }, {
    type: "menu",
    name: "Menu",
    icon: "≡"
  }, {
    type: "meter",
    name: "Meter",
    icon: "📊"
  }, {
    type: "modal",
    name: "Modal",
    icon: "⊡"
  }, {
    type: "popover",
    name: "Popover",
    icon: "💭"
  }, {
    type: "progressbar",
    name: "Progress Bar",
    icon: "▰"
  }, {
    type: "searchfield",
    name: "Search Field",
    icon: "🔍"
  }, {
    type: "slider",
    name: "Slider",
    icon: "⏚"
  }, {
    type: "switch",
    name: "Switch",
    icon: "⇄"
  }, {
    type: "tabs",
    name: "Tabs",
    icon: "⊟"
  }, {
    type: "taggroup",
    name: "Tag Group",
    icon: "🏷"
  }, {
    type: "togglebutton",
    name: "Toggle Button",
    icon: "⏻"
  }, {
    type: "tooltip",
    name: "Tooltip",
    icon: "💡"
  }];
  
  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData("componentType", type);
    e.dataTransfer.effectAllowed = "copy";
  };
  
  return (
    <div className="flex flex-col gap-2 w-fit">
      <div className="grid grid-cols-1 gap-2">
        {components.map(component => (
          <div 
            key={component.type} 
            draggable 
            onDragStart={e => handleDragStart(e, component.type)} 
            className="flex items-center gap-1.5 p-1.5 bg-background hover:bg-accent rounded-md cursor-grab transition-colors"
          >
            <div className="flex items-center justify-center w-6 h-6 bg-muted rounded text-sm">
              {component.icon}
            </div>
            <span className="text-xs truncate">{component.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentLibrary;

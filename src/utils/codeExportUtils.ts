
import { CanvasComponent, ComponentType, FrameSize } from "../types/whiteboard";

// Map component types to their React equivalents
const componentTypeToReactComponent: Record<ComponentType, string> = {
  button: "Button",
  input: "Input",
  text: "Text",
  heading: "Heading",
  paragraph: "Paragraph",
  checkbox: "Checkbox",
  radio: "Radio",
  select: "Select",
  card: "Card",
  image: "Image",
  divider: "Divider",
  table: "Table",
  flow: "FlowElement"
};

// Generate props string from component properties
const generatePropsString = (component: CanvasComponent): string => {
  const propsArray: string[] = [];
  
  // Process common style props
  if (component.properties.backgroundColor && component.properties.backgroundColor !== 'transparent') {
    propsArray.push(`style={{ backgroundColor: "${component.properties.backgroundColor}" }}`);
  }
  
  if (component.properties.textColor) {
    propsArray.push(`textColor="${component.properties.textColor}"`);
  }
  
  if (component.properties.fontSize) {
    propsArray.push(`fontSize={${component.properties.fontSize}}`);
  }
  
  // Handle component-specific props
  switch(component.type) {
    case 'input':
      if (component.properties.placeholder) {
        propsArray.push(`placeholder="${component.properties.placeholder}"`);
      }
      if (component.properties.type) {
        propsArray.push(`type="${component.properties.type}"`);
      }
      break;
    case 'checkbox':
    case 'radio':
      if (component.properties.checked !== undefined) {
        propsArray.push(`checked={${component.properties.checked}}`);
      }
      if (component.properties.label) {
        propsArray.push(`label="${component.properties.label}"`);
      }
      break;
    case 'select':
      if (component.properties.options && Array.isArray(component.properties.options)) {
        const optionsString = JSON.stringify(component.properties.options);
        propsArray.push(`options={${optionsString}}`);
      }
      break;
    case 'flow':
      if (component.properties.flowType) {
        propsArray.push(`flowType="${component.properties.flowType}"`);
      }
      break;
  }
  
  return propsArray.join(' ');
};

// Generate position styles for a component
const generatePositionStyles = (component: CanvasComponent, framePosition: { x: number, y: number }): string => {
  return `
  style={{
    position: "absolute",
    left: ${Math.round(component.x - framePosition.x)}px,
    top: ${Math.round(component.y - framePosition.y)}px,
    width: ${component.width}px,
    height: ${component.height}px,
    ${component.properties.backgroundColor ? `backgroundColor: "${component.properties.backgroundColor}",` : ''}
    ${component.properties.textColor ? `color: "${component.properties.textColor}",` : ''}
    ${component.properties.borderColor ? `borderColor: "${component.properties.borderColor}",` : ''}
    ${component.properties.borderWidth ? `borderWidth: ${component.properties.borderWidth}px,` : ''}
    ${component.properties.borderRadius ? `borderRadius: ${component.properties.borderRadius}px,` : ''}
    ${component.properties.shadow ? `boxShadow: "${component.properties.shadow === 'sm' ? '0 1px 2px rgba(0,0,0,0.05)' : 
      component.properties.shadow === 'md' ? '0 4px 6px rgba(0,0,0,0.1)' : 
      component.properties.shadow === 'lg' ? '0 10px 15px rgba(0,0,0,0.1)' : 'none'}",` : ''}
    ${component.properties.textAlign ? `textAlign: "${component.properties.textAlign}",` : ''}
  }}`;
};

// Generate React component for a specific component
const generateComponentCode = (component: CanvasComponent, framePosition: { x: number, y: number }): string => {
  const reactComponentName = componentTypeToReactComponent[component.type] || "div";
  
  let code = `<${reactComponentName} ${generatePositionStyles(component, framePosition)}`;
  
  // Add component content
  if (component.content) {
    code += `>\n  ${component.content}\n</${reactComponentName}>`;
  } else {
    code += " />";
  }
  
  return code;
};

// Generate React code for a frame
export const generateFrameReactCode = (frame: FrameSize, components: CanvasComponent[]): string => {
  const componentsInFrame = components.filter(component => {
    return component.frameId === frame.id || (
      component.x >= frame.x &&
      component.y >= frame.y &&
      component.x + component.width <= frame.x + frame.width &&
      component.y + component.height <= frame.y + frame.height
    );
  });
  
  // Sort components by position (top to bottom, left to right)
  const sortedComponents = [...componentsInFrame].sort((a, b) => {
    // If components are roughly on the same row
    if (Math.abs(a.y - b.y) < 20) {
      return a.x - b.x; // Sort by x position
    }
    return a.y - b.y; // Otherwise sort by y position
  });
  
  // Generate imports based on component types
  const uniqueComponentTypes = new Set<string>();
  sortedComponents.forEach(component => {
    uniqueComponentTypes.add(componentTypeToReactComponent[component.type]);
  });
  
  const importStatements = Array.from(uniqueComponentTypes).length > 0 ? 
    `import { ${Array.from(uniqueComponentTypes).join(', ')} } from "./components";\n\n` : '';
  
  // Generate the React component
  const componentCode = `${importStatements}import React from "react";

export const ${frame.name.replace(/\s+/g, '')} = () => {
  return (
    <div 
      className="relative" 
      style={{ 
        width: ${frame.width}px, 
        height: ${frame.height}px, 
        position: "relative",
        overflow: "hidden" 
      }}
    >
      ${sortedComponents.map(component => `  ${generateComponentCode(component, { x: frame.x, y: frame.y })}`).join('\n      ')}
    </div>
  );
};
`;

  return componentCode;
};

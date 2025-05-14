
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

// Calculate the grid area for a component
const calculateGridArea = (
  component: CanvasComponent, 
  frame: FrameSize, 
  gridColumns: number, 
  gridRows: number
): { gridColumn: string, gridRow: string } => {
  // Use component's gridCell if available
  if (component.gridCell) {
    return {
      gridColumn: `${component.gridCell.column} / span ${component.gridCell.columnSpan}`,
      gridRow: `${component.gridCell.row} / span ${component.gridCell.rowSpan}`
    };
  }

  // Otherwise calculate based on position
  // Calculate the relative position within the frame
  const relX = component.x - frame.x;
  const relY = component.y - frame.y;
  
  // Calculate the column and row spans
  const colWidth = frame.width / gridColumns;
  const rowHeight = frame.height / gridRows;
  
  // Calculate start and end grid lines
  const colStart = Math.floor(relX / colWidth) + 1;
  const colEnd = Math.ceil((relX + component.width) / colWidth) + 1;
  const rowStart = Math.floor(relY / rowHeight) + 1;
  const rowEnd = Math.ceil((relY + component.height) / rowHeight) + 1;
  
  // Ensure the component spans at least one cell
  const colSpan = Math.max(1, colEnd - colStart);
  const rowSpan = Math.max(1, rowEnd - rowStart);
  
  return {
    gridColumn: `${colStart} / span ${colSpan}`,
    gridRow: `${rowStart} / span ${rowSpan}`
  };
};

// Generate position styles for a component
const generatePositionStyles = (
  component: CanvasComponent, 
  frame: FrameSize, 
  useGrid: boolean = false
): string => {
  if (useGrid && frame.gridColumns && frame.gridRows) {
    const { gridColumn, gridRow } = calculateGridArea(
      component, 
      frame, 
      frame.gridColumns, 
      frame.gridRows
    );
    
    return `
  style={{
    gridColumn: "${gridColumn}",
    gridRow: "${gridRow}",
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
  }
  
  return `
  style={{
    position: "absolute",
    left: ${Math.round(component.x - frame.x)}px,
    top: ${Math.round(component.y - frame.y)}px,
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
const generateComponentCode = (
  component: CanvasComponent, 
  frame: FrameSize, 
  useGrid: boolean = false
): string => {
  const reactComponentName = componentTypeToReactComponent[component.type] || "div";
  
  let code = `<${reactComponentName} ${generatePositionStyles(component, frame, useGrid)}`;
  
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
  
  // Check if we should use grid - fixed this line by converting the number to a boolean
  const useGrid = Boolean(frame.useInternalGrid) && frame.gridColumns && frame.gridRows;
  
  // Generate grid template if needed
  const gridStyles = useGrid ? `
    display: "grid",
    gridTemplateColumns: "repeat(${frame.gridColumns}, 1fr)",
    gridTemplateRows: "repeat(${frame.gridRows}, 1fr)",
    gridGap: "${frame.gridGap || 10}px",` : '';
  
  // Generate the React component
  const componentCode = `${importStatements}import React from "react";

export const ${frame.name.replace(/\s+/g, '')} = () => {
  return (
    <div 
      className="relative" 
      style={{ 
        width: ${frame.width}px, 
        height: ${frame.height}px, ${gridStyles}
        position: "relative",
        overflow: "hidden",
        ${frame.backgroundColor ? `backgroundColor: "${frame.backgroundColor}",` : ''}
        ${frame.borderColor ? `borderColor: "${frame.borderColor}",` : ''}
        ${frame.borderWidth ? `borderWidth: ${frame.borderWidth}px,` : ''}
        ${frame.borderRadius ? `borderRadius: ${frame.borderRadius}px,` : ''}
      }}
    >
      ${sortedComponents.map(component => `  ${generateComponentCode(component, frame, useGrid)}`).join('\n      ')}
    </div>
  );
};
`;

  return componentCode;
};

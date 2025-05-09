
import React from "react";
import { useWhiteboard } from "@/context/WhiteboardContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface PropertyPanelProps {
  selectedComponentId: string | null;
}

const PropertyPanel: React.FC<PropertyPanelProps> = ({
  selectedComponentId,
}) => {
  const { state, dispatch } = useWhiteboard();
  
  const selectedComponent = state.components.find(
    (component) => component.id === selectedComponentId
  );

  if (!selectedComponent) {
    return (
      <div className="text-sm text-muted-foreground">
        Select a component to edit its properties
      </div>
    );
  }

  const handlePropertyChange = (
    property: string,
    value: any
  ) => {
    dispatch({
      type: "UPDATE_COMPONENT",
      id: selectedComponentId!,
      properties: {
        [property]: value,
      },
    });
  };

  const handleDeleteComponent = () => {
    dispatch({
      type: "DELETE_COMPONENT",
      id: selectedComponentId!,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium capitalize">{selectedComponent.type}</span>
        <button
          className="text-xs text-white bg-destructive px-2 py-1 rounded"
          onClick={handleDeleteComponent}
        >
          Delete
        </button>
      </div>
      
      <div className="space-y-4">
        {/* Position */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label className="text-xs">X Position</Label>
            <Input
              type="number"
              value={Math.round(selectedComponent.x)}
              onChange={(e) =>
                dispatch({
                  type: "MOVE_COMPONENT",
                  id: selectedComponentId!,
                  x: Number(e.target.value),
                  y: selectedComponent.y,
                })
              }
              className="h-8"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Y Position</Label>
            <Input
              type="number"
              value={Math.round(selectedComponent.y)}
              onChange={(e) =>
                dispatch({
                  type: "MOVE_COMPONENT",
                  id: selectedComponentId!,
                  x: selectedComponent.x,
                  y: Number(e.target.value),
                })
              }
              className="h-8"
            />
          </div>
        </div>

        {/* Size */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label className="text-xs">Width</Label>
            <Input
              type="number"
              value={Math.round(selectedComponent.width)}
              onChange={(e) =>
                dispatch({
                  type: "RESIZE_COMPONENT",
                  id: selectedComponentId!,
                  width: Number(e.target.value),
                  height: selectedComponent.height,
                })
              }
              className="h-8"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Height</Label>
            <Input
              type="number"
              value={Math.round(selectedComponent.height)}
              onChange={(e) =>
                dispatch({
                  type: "RESIZE_COMPONENT",
                  id: selectedComponentId!,
                  width: selectedComponent.width,
                  height: Number(e.target.value),
                })
              }
              className="h-8"
            />
          </div>
        </div>

        {/* Style */}
        <div className="space-y-1">
          <Label className="text-xs">Background Color</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={selectedComponent.properties.backgroundColor || "#ffffff"}
              onChange={(e) =>
                handlePropertyChange("backgroundColor", e.target.value)
              }
              className="w-10 h-8 p-0"
            />
            <Input
              type="text"
              value={selectedComponent.properties.backgroundColor || "#ffffff"}
              onChange={(e) =>
                handlePropertyChange("backgroundColor", e.target.value)
              }
              className="flex-1 h-8"
            />
          </div>
        </div>

        {/* Border */}
        <div className="space-y-1">
          <Label className="text-xs">Border Color</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={selectedComponent.properties.borderColor || "#d1d5db"}
              onChange={(e) =>
                handlePropertyChange("borderColor", e.target.value)
              }
              className="w-10 h-8 p-0"
            />
            <Input
              type="text"
              value={selectedComponent.properties.borderColor || "#d1d5db"}
              onChange={(e) =>
                handlePropertyChange("borderColor", e.target.value)
              }
              className="flex-1 h-8"
            />
          </div>
        </div>

        <div className="space-y-1">
          <Label className="text-xs">Border Width</Label>
          <div className="flex gap-2">
            <Slider
              value={[selectedComponent.properties.borderWidth || 1]}
              min={0}
              max={10}
              step={1}
              onValueChange={(val) => handlePropertyChange("borderWidth", val[0])}
              className="flex-1"
            />
            <span className="w-8 text-center text-sm">
              {selectedComponent.properties.borderWidth || 1}px
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <Label className="text-xs">Border Radius</Label>
          <div className="flex gap-2">
            <Slider
              value={[selectedComponent.properties.borderRadius || 0]}
              min={0}
              max={20}
              step={1}
              onValueChange={(val) => handlePropertyChange("borderRadius", val[0])}
              className="flex-1"
            />
            <span className="w-8 text-center text-sm">
              {selectedComponent.properties.borderRadius || 0}px
            </span>
          </div>
        </div>

        {/* Text */}
        {["text", "button", "heading", "paragraph"].includes(selectedComponent.type) && (
          <>
            <div className="space-y-1">
              <Label className="text-xs">Text Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={selectedComponent.properties.textColor || "#000000"}
                  onChange={(e) =>
                    handlePropertyChange("textColor", e.target.value)
                  }
                  className="w-10 h-8 p-0"
                />
                <Input
                  type="text"
                  value={selectedComponent.properties.textColor || "#000000"}
                  onChange={(e) =>
                    handlePropertyChange("textColor", e.target.value)
                  }
                  className="flex-1 h-8"
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Font Size</Label>
              <div className="flex gap-2">
                <Slider
                  value={[selectedComponent.properties.fontSize || 16]}
                  min={8}
                  max={36}
                  step={1}
                  onValueChange={(val) =>
                    handlePropertyChange("fontSize", val[0])
                  }
                  className="flex-1"
                />
                <span className="w-8 text-center text-sm">
                  {selectedComponent.properties.fontSize || 16}px
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Text Align</Label>
              <div className="grid grid-cols-3 gap-1">
                {["left", "center", "right"].map((align) => (
                  <button
                    key={align}
                    className={`py-1 text-xs border ${
                      selectedComponent.properties.textAlign === align
                        ? "bg-primary text-primary-foreground"
                        : "bg-background"
                    }`}
                    onClick={() => handlePropertyChange("textAlign", align)}
                  >
                    {align.charAt(0).toUpperCase() + align.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Component-specific properties */}
        {selectedComponent.type === "input" && (
          <div className="space-y-1">
            <Label className="text-xs">Placeholder</Label>
            <Input
              type="text"
              value={selectedComponent.properties.placeholder || ""}
              onChange={(e) =>
                handlePropertyChange("placeholder", e.target.value)
              }
              className="h-8"
            />
          </div>
        )}

        {selectedComponent.type === "checkbox" && (
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label className="text-xs">Checked</Label>
              <input
                type="checkbox"
                checked={selectedComponent.properties.checked || false}
                onChange={(e) =>
                  handlePropertyChange("checked", e.target.checked)
                }
              />
            </div>
            <Label className="text-xs">Label</Label>
            <Input
              type="text"
              value={selectedComponent.properties.label || ""}
              onChange={(e) =>
                handlePropertyChange("label", e.target.value)
              }
              className="h-8"
            />
          </div>
        )}

        {/* Options for radio and select */}
        {["radio", "select"].includes(selectedComponent.type) && (
          <div className="space-y-2">
            <Label className="text-xs">Options</Label>
            {(selectedComponent.properties.options || []).map(
              (option: string, index: number) => (
                <div key={index} className="flex gap-1">
                  <Input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [
                        ...(selectedComponent.properties.options || []),
                      ];
                      newOptions[index] = e.target.value;
                      handlePropertyChange("options", newOptions);
                    }}
                    className="h-8 flex-1"
                  />
                  <button
                    className="px-2 bg-destructive text-destructive-foreground rounded-sm"
                    onClick={() => {
                      const newOptions = [
                        ...(selectedComponent.properties.options || []),
                      ];
                      newOptions.splice(index, 1);
                      handlePropertyChange("options", newOptions);
                    }}
                  >
                    ×
                  </button>
                </div>
              )
            )}
            <button
              className="text-xs bg-accent px-2 py-1 rounded w-full"
              onClick={() => {
                const newOptions = [
                  ...(selectedComponent.properties.options || []),
                  `Option ${
                    (selectedComponent.properties.options || []).length + 1
                  }`,
                ];
                handlePropertyChange("options", newOptions);
              }}
            >
              Add Option
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyPanel;

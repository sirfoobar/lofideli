
import React, { useState } from 'react';
import { useWhiteboard } from '@/context/WhiteboardContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { 
  AlignCenter, 
  AlignLeft, 
  AlignRight, 
  Bold, 
  Italic, 
  Underline,
  Type,
  Image,
  Square,
  Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import ColorPicker from './ColorPicker';

interface FramePropertyPanelProps {
  isOpen?: boolean;
}

const FramePropertyPanel: React.FC<FramePropertyPanelProps> = ({ isOpen }) => {
  const { state, dispatch } = useWhiteboard();
  const { selectedFrameId, frames, selectedComponentId } = state;
  
  // Find the selected frame from the frames array using selectedFrameId
  const selectedFrame = frames.find(f => f.id === selectedFrameId);
  
  // Find the selected component from the components array using selectedComponentId
  const selectedComponent = state.components.find(c => c.id === selectedComponentId);
  
  const [activeTab, setActiveTab] = useState('style');
  
  if (!isOpen && !selectedFrame && !selectedComponent) return null;
  
  if (!selectedFrame && !selectedComponent) {
    return (
      <div className="w-64 border-l border-border bg-card p-4 overflow-y-auto">
        <div className="text-center text-muted-foreground p-4">
          Select a frame or component to edit its properties
        </div>
      </div>
    );
  }
  
  // Frame properties
  if (selectedFrame) {
    const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: "UPDATE_FRAME",
        id: selectedFrame.id,
        updates: {
          width: parseInt(e.target.value, 10) || selectedFrame.width
        }
      });
    };
    
    const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: "UPDATE_FRAME",
        id: selectedFrame.id,
        updates: {
          height: parseInt(e.target.value, 10) || selectedFrame.height
        }
      });
    };
    
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: "UPDATE_FRAME",
        id: selectedFrame.id,
        updates: {
          name: e.target.value
        }
      });
    };
    
    const handleBackgroundColorChange = (color: string) => {
      dispatch({
        type: "UPDATE_FRAME",
        id: selectedFrame.id,
        updates: {
          backgroundColor: color
        }
      });
    };
    
    const handleBorderColorChange = (color: string) => {
      dispatch({
        type: "UPDATE_FRAME",
        id: selectedFrame.id,
        updates: {
          borderColor: color
        }
      });
    };
    
    const handleBorderWidthChange = (value: number[]) => {
      dispatch({
        type: "UPDATE_FRAME",
        id: selectedFrame.id,
        updates: {
          borderWidth: value[0]
        }
      });
    };
    
    const handleBorderRadiusChange = (value: number[]) => {
      dispatch({
        type: "UPDATE_FRAME",
        id: selectedFrame.id,
        updates: {
          borderRadius: value[0]
        }
      });
    };
    
    const handleDeleteFrame = () => {
      dispatch({
        type: "DELETE_FRAME",
        id: selectedFrame.id
      });
    };
    
    return (
      <div className="w-64 border-l border-border bg-card overflow-y-auto h-full">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium">Frame Properties</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-destructive"
              onClick={handleDeleteFrame}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="frame-name">Name</Label>
              <Input 
                id="frame-name" 
                value={selectedFrame.name || ''} 
                onChange={handleNameChange}
                className="h-8"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="frame-width">Width</Label>
                <Input 
                  id="frame-width" 
                  type="number" 
                  value={selectedFrame.width.toString()} 
                  onChange={handleWidthChange}
                  className="h-8"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="frame-height">Height</Label>
                <Input 
                  id="frame-height" 
                  type="number" 
                  value={selectedFrame.height.toString()} 
                  onChange={handleHeightChange}
                  className="h-8"
                />
              </div>
            </div>
            
            <Separator />
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="style" className="flex-1">Style</TabsTrigger>
                <TabsTrigger value="export" className="flex-1">Export</TabsTrigger>
              </TabsList>
              
              <TabsContent value="style" className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label>Background Color</Label>
                  <ColorPicker 
                    color={selectedFrame.backgroundColor || '#ffffff'} 
                    onChange={handleBackgroundColorChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Border Color</Label>
                  <ColorPicker 
                    color={selectedFrame.borderColor || '#000000'} 
                    onChange={handleBorderColorChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Border Width</Label>
                    <span className="text-xs text-muted-foreground">
                      {selectedFrame.borderWidth || 0}px
                    </span>
                  </div>
                  <Slider
                    value={[selectedFrame.borderWidth || 0]}
                    min={0}
                    max={10}
                    step={1}
                    onValueChange={handleBorderWidthChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Border Radius</Label>
                    <span className="text-xs text-muted-foreground">
                      {selectedFrame.borderRadius || 0}px
                    </span>
                  </div>
                  <Slider
                    value={[selectedFrame.borderRadius || 0]}
                    min={0}
                    max={20}
                    step={1}
                    onValueChange={handleBorderRadiusChange}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="export" className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label>Export Options</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="w-full">
                      PNG
                    </Button>
                    <Button variant="outline" className="w-full">
                      SVG
                    </Button>
                  </div>
                </div>
                
                <Button className="w-full">
                  Export Frame
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
  
  // Component properties
  if (selectedComponent) {
    const handleDeleteComponent = () => {
      dispatch({
        type: "DELETE_COMPONENT",
        id: selectedComponent.id
      });
    };
    
    // Text component properties
    if (selectedComponent.type === 'text') {
      const handleTextChange = (value: string) => {
        dispatch({
          type: "UPDATE_COMPONENT",
          id: selectedComponent.id,
          properties: {
            text: value
          }
        });
      };
      
      const handleFontSizeChange = (value: number[]) => {
        dispatch({
          type: "UPDATE_COMPONENT",
          id: selectedComponent.id,
          properties: {
            fontSize: value[0]
          }
        });
      };
      
      const handleFontColorChange = (color: string) => {
        dispatch({
          type: "UPDATE_COMPONENT",
          id: selectedComponent.id,
          properties: {
            color: color
          }
        });
      };
      
      const handleFontWeightChange = () => {
        dispatch({
          type: "UPDATE_COMPONENT",
          id: selectedComponent.id,
          properties: {
            fontWeight: selectedComponent.properties?.fontWeight === 'bold' ? 'normal' : 'bold'
          }
        });
      };
      
      const handleFontStyleChange = () => {
        dispatch({
          type: "UPDATE_COMPONENT",
          id: selectedComponent.id,
          properties: {
            fontStyle: selectedComponent.properties?.fontStyle === 'italic' ? 'normal' : 'italic'
          }
        });
      };
      
      const handleTextDecorationChange = () => {
        dispatch({
          type: "UPDATE_COMPONENT",
          id: selectedComponent.id,
          properties: {
            textDecoration: selectedComponent.properties?.textDecoration === 'underline' ? 'none' : 'underline'
          }
        });
      };
      
      const handleTextAlignChange = (align: 'left' | 'center' | 'right') => {
        dispatch({
          type: "UPDATE_COMPONENT",
          id: selectedComponent.id,
          properties: {
            textAlign: align
          }
        });
      };
      
      return (
        <div className="w-64 border-l border-border bg-card overflow-y-auto h-full">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Type className="h-4 w-4" />
                <h2 className="font-medium">Text</h2>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-destructive"
                onClick={handleDeleteComponent}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="text-content">Text</Label>
                <Input 
                  id="text-content" 
                  value={selectedComponent.properties?.text || ''} 
                  onChange={handleTextChange}
                  className="h-8"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Font Size</Label>
                  <span className="text-xs text-muted-foreground">
                    {selectedComponent.properties?.fontSize || 16}px
                  </span>
                </div>
                <Slider
                  value={[selectedComponent.properties?.fontSize || 16]}
                  min={8}
                  max={72}
                  step={1}
                  onValueChange={handleFontSizeChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Font Color</Label>
                <ColorPicker 
                  color={selectedComponent.properties?.color || '#000000'} 
                  onChange={handleFontColorChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Text Style</Label>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className={cn(
                      "h-8 w-8",
                      selectedComponent.properties?.fontWeight === 'bold' && "bg-accent text-accent-foreground"
                    )}
                    onClick={handleFontWeightChange}
                  >
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className={cn(
                      "h-8 w-8",
                      selectedComponent.properties?.fontStyle === 'italic' && "bg-accent text-accent-foreground"
                    )}
                    onClick={handleFontStyleChange}
                  >
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className={cn(
                      "h-8 w-8",
                      selectedComponent.properties?.textDecoration === 'underline' && "bg-accent text-accent-foreground"
                    )}
                    onClick={handleTextDecorationChange}
                  >
                    <Underline className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Text Alignment</Label>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className={cn(
                      "h-8 w-8 flex-1",
                      selectedComponent.properties?.textAlign === 'left' && "bg-accent text-accent-foreground"
                    )}
                    onClick={() => handleTextAlignChange('left')}
                  >
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className={cn(
                      "h-8 w-8 flex-1",
                      selectedComponent.properties?.textAlign === 'center' && "bg-accent text-accent-foreground"
                    )}
                    onClick={() => handleTextAlignChange('center')}
                  >
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className={cn(
                      "h-8 w-8 flex-1",
                      selectedComponent.properties?.textAlign === 'right' && "bg-accent text-accent-foreground"
                    )}
                    onClick={() => handleTextAlignChange('right')}
                  >
                    <AlignRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    // Image component properties
    if (selectedComponent.type === 'image') {
      const handleImageUrlChange = (value: string) => {
        dispatch({
          type: "UPDATE_COMPONENT",
          id: selectedComponent.id,
          properties: {
            url: value
          }
        });
      };
      
      const handleAltTextChange = (value: string) => {
        dispatch({
          type: "UPDATE_COMPONENT",
          id: selectedComponent.id,
          properties: {
            alt: value
          }
        });
      };
      
      const handleBorderRadiusChange = (value: number[]) => {
        dispatch({
          type: "UPDATE_COMPONENT",
          id: selectedComponent.id,
          properties: {
            borderRadius: value[0]
          }
        });
      };
      
      return (
        <div className="w-64 border-l border-border bg-card overflow-y-auto h-full">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                <h2 className="font-medium">Image</h2>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-destructive"
                onClick={handleDeleteComponent}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image-url">Image URL</Label>
                <Input 
                  id="image-url" 
                  value={selectedComponent.properties?.url || ''} 
                  onChange={handleImageUrlChange}
                  className="h-8"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="alt-text">Alt Text</Label>
                <Input 
                  id="alt-text" 
                  value={selectedComponent.properties?.alt || ''} 
                  onChange={handleAltTextChange}
                  className="h-8"
                  placeholder="Image description"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Border Radius</Label>
                  <span className="text-xs text-muted-foreground">
                    {selectedComponent.properties?.borderRadius || 0}px
                  </span>
                </div>
                <Slider
                  value={[selectedComponent.properties?.borderRadius || 0]}
                  min={0}
                  max={50}
                  step={1}
                  onValueChange={handleBorderRadiusChange}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    // Shape component properties
    if (selectedComponent.type === 'shape') {
      const handleShapeColorChange = (color: string) => {
        dispatch({
          type: "UPDATE_COMPONENT",
          id: selectedComponent.id,
          properties: {
            backgroundColor: color
          }
        });
      };
      
      const handleBorderColorChange = (color: string) => {
        dispatch({
          type: "UPDATE_COMPONENT",
          id: selectedComponent.id,
          properties: {
            borderColor: color
          }
        });
      };
      
      const handleBorderWidthChange = (value: number[]) => {
        dispatch({
          type: "UPDATE_COMPONENT",
          id: selectedComponent.id,
          properties: {
            borderWidth: value[0]
          }
        });
      };
      
      return (
        <div className="w-64 border-l border-border bg-card overflow-y-auto h-full">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Square className="h-4 w-4" />
                <h2 className="font-medium">Shape</h2>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-destructive"
                onClick={handleDeleteComponent}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Fill Color</Label>
                <ColorPicker 
                  color={selectedComponent.properties?.backgroundColor || '#ffffff'} 
                  onChange={handleShapeColorChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Border Color</Label>
                <ColorPicker 
                  color={selectedComponent.properties?.borderColor || '#000000'} 
                  onChange={handleBorderColorChange}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Border Width</Label>
                  <span className="text-xs text-muted-foreground">
                    {selectedComponent.properties?.borderWidth || 0}px
                  </span>
                </div>
                <Slider
                  value={[selectedComponent.properties?.borderWidth || 0]}
                  min={0}
                  max={10}
                  step={1}
                  onValueChange={handleBorderWidthChange}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    // Default component properties
    return (
      <div className="w-64 border-l border-border bg-card overflow-y-auto h-full">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium">Component Properties</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-destructive"
              onClick={handleDeleteComponent}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-muted-foreground">
            Properties for {selectedComponent.type} component
          </div>
        </div>
      </div>
    );
  }
  
  return null;
};

export default FramePropertyPanel;

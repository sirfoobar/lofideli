
import React from "react";
import { useWhiteboard } from "@/context/WhiteboardContext";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const GridControls: React.FC = () => {
  const { dispatch, state } = useWhiteboard();
  
  const toggleGridSnap = (checked: boolean) => {
    dispatch({ 
      type: "TOGGLE_GRID_SNAP", 
      enabled: checked 
    });
  };
  
  const handleGridSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ 
      type: "SET_GRID_SIZE", 
      size: parseInt(e.target.value, 10) 
    });
  };
  
  return (
    <div className="flex flex-col gap-2 p-2">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="structure">Structure</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-2 pt-2">
          <h3 className="text-sm font-small mb-1">Grid Settings</h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <Checkbox
                id="snap-to-grid"
                checked={state.snapToGrid}
                onCheckedChange={toggleGridSnap}
                className="w-3.5 h-3.5"
              />
              <Label htmlFor="snap-to-grid" className="text-xs">
                Snap to grid
              </Label>
            </div>
            
            <select
              value={state.gridSize}
              onChange={handleGridSizeChange}
              className="text-xs py-1 px-1.5 bg-background border border-border rounded-md"
              disabled={!state.snapToGrid}
            >
              <option value="5">5px</option>
              <option value="10">10px</option>
              <option value="20">20px</option>
              <option value="40">40px</option>
            </select>
          </div>
        </TabsContent>
        
        <TabsContent value="structure" className="space-y-2 pt-2">
          <h3 className="text-sm font-small mb-1">Structure Grid</h3>
          <div className="flex items-center gap-1.5 mb-2">
            <Checkbox
              id="use-structure-grid"
              checked={state.useStructureGrid || false}
              onCheckedChange={(checked) => {
                dispatch({ 
                  type: "TOGGLE_STRUCTURE_GRID", 
                  enabled: !!checked 
                });
              }}
              className="w-3.5 h-3.5"
            />
            <Label htmlFor="use-structure-grid" className="text-xs">
              Use structure grid
            </Label>
          </div>
          
          {state.useStructureGrid && (
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="grid-columns" className="text-xs">Columns</Label>
                  <select
                    id="grid-columns"
                    value={state.gridColumns || 12}
                    onChange={(e) => {
                      dispatch({
                        type: "SET_GRID_COLUMNS",
                        columns: parseInt(e.target.value, 10)
                      });
                    }}
                    className="w-full text-xs py-1 px-1.5 bg-background border border-border rounded-md"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="6">6</option>
                    <option value="8">8</option>
                    <option value="12">12</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="grid-rows" className="text-xs">Rows</Label>
                  <select
                    id="grid-rows"
                    value={state.gridRows || 6}
                    onChange={(e) => {
                      dispatch({
                        type: "SET_GRID_ROWS",
                        rows: parseInt(e.target.value, 10)
                      });
                    }}
                    className="w-full text-xs py-1 px-1.5 bg-background border border-border rounded-md"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="6">6</option>
                    <option value="8">8</option>
                    <option value="12">12</option>
                  </select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="grid-gap" className="text-xs">Gap (px)</Label>
                <input
                  id="grid-gap"
                  type="number"
                  min="0"
                  max="40"
                  value={state.gridGap || 8}
                  onChange={(e) => {
                    dispatch({
                      type: "SET_GRID_GAP",
                      gap: parseInt(e.target.value, 10)
                    });
                  }}
                  className="w-full text-xs py-1 px-1.5 bg-background border border-border rounded-md"
                />
              </div>
              
              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="snap-to-structure"
                  checked={state.snapToStructure || false}
                  onCheckedChange={(checked) => {
                    dispatch({ 
                      type: "TOGGLE_STRUCTURE_SNAP", 
                      enabled: !!checked 
                    });
                  }}
                  className="w-3.5 h-3.5"
                />
                <Label htmlFor="snap-to-structure" className="text-xs">
                  Snap to structure
                </Label>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GridControls;

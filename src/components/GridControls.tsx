
import React, { useState } from "react";
import { useWhiteboard } from "@/context/WhiteboardContext";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { LayoutGrid, Columns, RowsIcon } from "lucide-react";

const GridControls: React.FC = () => {
  const { dispatch, state } = useWhiteboard();
  const [activeTab, setActiveTab] = useState<string>("canvas");
  
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
  
  const handleMasterGridColumnsChange = (value: number[]) => {
    dispatch({
      type: "SET_MASTER_GRID",
      columns: value[0],
      rows: state.masterGridRows || 6,
      gap: state.masterGridGap || 10
    });
  };
  
  const handleMasterGridRowsChange = (value: number[]) => {
    dispatch({
      type: "SET_MASTER_GRID",
      columns: state.masterGridColumns || 12,
      rows: value[0],
      gap: state.masterGridGap || 10
    });
  };
  
  const handleMasterGridGapChange = (value: number[]) => {
    dispatch({
      type: "SET_MASTER_GRID",
      columns: state.masterGridColumns || 12,
      rows: state.masterGridRows || 6,
      gap: value[0]
    });
  };
  
  const applyGridToSelectedFrame = () => {
    if (!state.selectedFrameId) return;
    
    dispatch({
      type: "SET_FRAME_GRID",
      frameId: state.selectedFrameId,
      columns: state.masterGridColumns || 12,
      rows: state.masterGridRows || 6,
      gap: state.masterGridGap || 10,
      enabled: true
    });
  };
  
  return (
    <div className="flex flex-col gap-2 p-2">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="canvas" className="text-xs">
            <LayoutGrid className="h-3.5 w-3.5 mr-1" />
            Canvas Grid
          </TabsTrigger>
          <TabsTrigger value="frame" className="text-xs">
            <Columns className="h-3.5 w-3.5 mr-1" />
            Frame Grid
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="canvas" className="space-y-2 pt-2">
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
        
        <TabsContent value="frame" className="space-y-3 pt-2">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-xs">Columns</Label>
              <span className="text-xs">{state.masterGridColumns || 12}</span>
            </div>
            <Slider
              value={[state.masterGridColumns || 12]}
              min={1}
              max={24}
              step={1}
              onValueChange={handleMasterGridColumnsChange}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-xs">Rows</Label>
              <span className="text-xs">{state.masterGridRows || 6}</span>
            </div>
            <Slider
              value={[state.masterGridRows || 6]}
              min={1}
              max={24}
              step={1}
              onValueChange={handleMasterGridRowsChange}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-xs">Gap (px)</Label>
              <span className="text-xs">{state.masterGridGap || 10}px</span>
            </div>
            <Slider
              value={[state.masterGridGap || 10]}
              min={0}
              max={40}
              step={1}
              onValueChange={handleMasterGridGapChange}
            />
          </div>
          
          <Button 
            size="sm" 
            className="w-full text-xs" 
            onClick={applyGridToSelectedFrame}
            disabled={!state.selectedFrameId}
          >
            Apply Grid to Selected Frame
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GridControls;


import React from "react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { useWhiteboard } from "@/context/WhiteboardContext";
import { Settings, PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import FramePropertyPanel from "./FramePropertyPanel";

interface FrameSettingsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const FrameSettingsSidebar: React.FC<FrameSettingsSidebarProps> = ({ isOpen, onClose }) => {
  const { state, dispatch, selectFrame } = useWhiteboard();
  const { frames, selectedFrameId } = state;

  // Handle selecting a frame
  const handleSelectFrame = (id: string) => {
    selectFrame(id);
    // Also dispatch action to update state
    dispatch({ type: "SELECT_FRAME", id });
  };

  // Get the selected frame (if any)
  const selectedFrame = frames.find(f => f.id === selectedFrameId);

  return (
    <SidebarProvider defaultOpen={isOpen}>
      <Sidebar 
        className={isOpen ? "w-72" : "w-0"} 
        side="right"
        variant="floating"
      >
        <SidebarHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings size={18} />
            <h2 className="text-lg font-medium">Frame Settings</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <PanelLeft size={18} />
          </Button>
        </SidebarHeader>

        <SidebarContent>
          {/* Frame Selection Group */}
          <SidebarGroup>
            <SidebarGroupLabel>Available Frames</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {frames.length > 0 ? (
                  frames.map(frame => (
                    <SidebarMenuItem key={frame.id}>
                      <SidebarMenuButton 
                        isActive={frame.id === selectedFrameId}
                        onClick={() => handleSelectFrame(frame.id)}
                      >
                        <span>{frame.name || `Frame (${frame.width}×${frame.height})`}</span>
                        {frame.id === state.activeFrameId && (
                          <span className="ml-2 text-xs bg-blue-500 text-white px-1 rounded">Active</span>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                ) : (
                  <div className="p-4 text-sm text-gray-500">
                    No frames available. Create a frame first.
                  </div>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <Separator className="my-4" />

          {/* Frame Properties Panel */}
          {selectedFrameId && (
            <div className="px-2">
              <FramePropertyPanel isOpen={true} />
            </div>
          )}
        </SidebarContent>
        
        <SidebarFooter>
          <div className="w-full p-2">
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => {
                if (frames.length > 0) {
                  const newFrameData = JSON.stringify(frames, null, 2);
                  navigator.clipboard.writeText(newFrameData);
                  toast.success("Frame data copied to clipboard");
                } else {
                  toast.error("No frames to export");
                }
              }}
            >
              Export Frame Data
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
};

export default FrameSettingsSidebar;

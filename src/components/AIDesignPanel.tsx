import React, { useState } from "react";
import { useWhiteboard } from "@/context/WhiteboardContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wand2, Lightbulb, Loader2, PanelLeft, X } from "lucide-react";
import { toast } from "sonner";
interface AIDesignPanelProps {
  isOpen: boolean;
  onClose: () => void;
}
const AIDesignPanel: React.FC<AIDesignPanelProps> = ({
  isOpen,
  onClose
}) => {
  const {
    generateUIFromPrompt
  } = useWhiteboard();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("text");
  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a description");
      return;
    }
    setIsGenerating(true);
    try {
      await generateUIFromPrompt(prompt);
      toast.success("UI components generated successfully!");
      setPrompt("");
    } catch (error) {
      console.error("Generation error:", error);
      toast.error("Failed to generate UI components");
    } finally {
      setIsGenerating(false);
    }
  };
  if (!isOpen) return null;
  return <div className="absolute right-0 top-0 bottom-0 w-80 bg-card border-l border-border shadow-lg z-20 overflow-hidden flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Wand2 className="h-4 w-4" />
          <h2 className="text-sm font-medium">AI Design Generator</h2>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-2 mx-4 mt-2">
          <TabsTrigger value="text">Text to UI</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>
        
        <TabsContent value="text" className="flex-1 p-4 overflow-y-auto flex flex-col pb-16">
          <Card className="flex-1 flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Describe Your UI</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <Textarea placeholder="Describe the UI you want to create... (e.g., 'A login form with email and password fields, and a submit button')" value={prompt} onChange={e => setPrompt(e.target.value)} className="flex-1 min-h-[200px] resize-none" />
            </CardContent>
            <CardFooter>
              <Button onClick={handleGenerate} disabled={isGenerating || !prompt.trim()} className="w-full">
                {isGenerating ? <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </> : <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Generate UI
                  </>}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="examples" className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Example Prompts</h3>
            <div className="space-y-2">
              {["A signup form with name, email, password fields and a submit button", "A product card with image, title, price, and add to cart button", "A dashboard with sidebar navigation and 3 statistics cards", "A checkout form with billing information fields", "A responsive navbar with logo, links, and a profile dropdown"].map((example, index) => <Card key={index} className="p-3 cursor-pointer hover:bg-accent transition-colors" onClick={() => setPrompt(example)}>
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-xs">{example}</p>
                  </div>
                </Card>)}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>;
};
export default AIDesignPanel;
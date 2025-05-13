
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface UrlFramePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const UrlFramePanel = ({ isOpen, onClose }: UrlFramePanelProps) => {
  const [url, setUrl] = useState<string>("");
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [generating, setGenerating] = useState(false);

  const handleLoadUrl = () => {
    if (!url) {
      toast.error("Please enter a URL");
      return;
    }

    // Add https:// if not present
    let formattedUrl = url;
    if (!/^https?:\/\//i.test(url)) {
      formattedUrl = `https://${url}`;
    }

    setCurrentUrl(formattedUrl);
    toast.success("URL loaded in frame");
  };

  const generatePrompt = () => {
    setGenerating(true);
    
    // Copy the generated prompt to clipboard
    const prompt = `Please help me analyze and improve this website: ${currentUrl}

Based on the visual elements I can see:
- The layout appears to be [describe layout]
- The color scheme is [describe colors]
- The main content focuses on [describe content]

I'd like suggestions to:
1. Improve the visual hierarchy
2. Enhance user experience
3. Optimize for better conversion/engagement
4. Modernize the design

Any specific UX/UI patterns that would work well for this type of website?`;

    navigator.clipboard.writeText(prompt)
      .then(() => {
        toast.success("Prompt copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy prompt: ", err);
        toast.error("Failed to copy prompt");
      })
      .finally(() => {
        setGenerating(false);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl h-[80vh] rounded-lg border bg-background shadow-lg">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-medium">External URL Frame</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-4 border-b flex items-center gap-2">
          <Input 
            value={url} 
            onChange={(e) => setUrl(e.target.value)} 
            placeholder="Enter URL to display (e.g., example.com)" 
            className="flex-1"
            onKeyDown={(e) => e.key === 'Enter' && handleLoadUrl()}
          />
          <Button onClick={handleLoadUrl}>Load URL</Button>
        </div>
        
        <div className="relative h-[calc(100%-12rem)] overflow-hidden">
          {currentUrl ? (
            <iframe 
              src={currentUrl} 
              className="w-full h-full border-0" 
              title="External URL Frame"
              sandbox="allow-same-origin allow-scripts"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Enter a URL above to display content
            </div>
          )}
        </div>
        
        <div className="p-4 border-t">
          <Button 
            onClick={generatePrompt} 
            className="w-full" 
            disabled={!currentUrl || generating}
          >
            {generating ? "Generating..." : "Generate AI Prompt from This Page"}
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            This will copy a prompt to your clipboard that you can use with AI assistants
          </p>
        </div>
      </div>
    </div>
  );
};

export default UrlFramePanel;

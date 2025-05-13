
import { useState, useRef, useEffect } from "react";
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
  const [inspectMode, setInspectMode] = useState(false);
  const [selectedElement, setSelectedElement] = useState<any>(null);
  const [elementStyles, setElementStyles] = useState<Record<string, string>>({});
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Reset inspection state when URL changes
    setInspectMode(false);
    setSelectedElement(null);
    setElementStyles({});
  }, [currentUrl]);

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

  const toggleInspectMode = () => {
    setInspectMode(!inspectMode);
    
    if (!inspectMode) {
      toast.info("Inspect mode enabled. Click on elements to select them.");
      
      // Try to communicate with the iframe to enable inspection
      if (iframeRef.current && iframeRef.current.contentWindow) {
        try {
          // This might fail due to cross-origin restrictions
          // We'll provide fallback options if it does
          const iframe = iframeRef.current;
          iframe.onload = () => {
            try {
              // Attempt to inject inspection script
              const script = iframe.contentDocument?.createElement('script');
              if (script) {
                script.textContent = `
                  document.body.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const styles = window.getComputedStyle(e.target);
                    const styleObj = {};
                    for (let i = 0; i < styles.length; i++) {
                      const prop = styles[i];
                      styleObj[prop] = styles.getPropertyValue(prop);
                    }
                    
                    window.parent.postMessage({
                      type: 'ELEMENT_SELECTED',
                      tagName: e.target.tagName,
                      className: e.target.className,
                      id: e.target.id,
                      styles: styleObj,
                      html: e.target.outerHTML
                    }, '*');
                    
                    return false;
                  }, true);
                  
                  document.body.style.cursor = 'crosshair';
                `;
                iframe.contentDocument?.body.appendChild(script);
              }
            } catch (error) {
              console.error("Failed to inject inspection script:", error);
            }
          };
        } catch (error) {
          console.error("Failed to access iframe content:", error);
          toast.error("Cross-origin restrictions prevent direct inspection. Try with a CORS-enabled URL.");
        }
      }
    } else {
      // Restore cursor if disabling inspect mode
      if (iframeRef.current && iframeRef.current.contentDocument) {
        try {
          iframeRef.current.contentDocument.body.style.cursor = 'default';
        } catch (error) {
          // Ignore cross-origin errors
        }
      }
    }
  };

  // Listen for messages from the iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'ELEMENT_SELECTED') {
        setSelectedElement(event.data);
        setElementStyles(event.data.styles || {});
        toast.success(`Selected: ${event.data.tagName}`);
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Generate visual edit prompt
  const generatePrompt = () => {
    if (!selectedElement) {
      toast.error("Please select an element first");
      return;
    }
    
    // Build a detailed prompt about the selected element
    const prompt = `Please help me improve this UI element:

Element: ${selectedElement.tagName}
${selectedElement.id ? `ID: ${selectedElement.id}` : ''}
${selectedElement.className ? `Classes: ${selectedElement.className}` : ''}

Current styles:
${Object.entries(elementStyles)
  .filter(([key]) => key.startsWith('color') || key.startsWith('background') || 
                    key.startsWith('font') || key.startsWith('padding') || 
                    key.startsWith('margin') || key.includes('width') || 
                    key.includes('height') || key.includes('border'))
  .map(([key, value]) => `- ${key}: ${value}`)
  .join('\n')}

HTML structure:
\`\`\`html
${selectedElement.html || 'Not available due to cross-origin restrictions'}
\`\`\`

I'd like suggestions to:
1. Improve the visual appearance
2. Enhance readability and user experience
3. Make it more consistent with modern design principles
4. Provide alternative CSS implementations for this element

Please provide specific CSS changes I could apply.`;

    navigator.clipboard.writeText(prompt)
      .then(() => {
        toast.success("Design prompt copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy prompt: ", err);
        toast.error("Failed to copy prompt");
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl h-[80vh] rounded-lg border bg-background shadow-lg flex flex-col">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-medium">Developer Tools View</h2>
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
          <Button 
            onClick={toggleInspectMode}
            variant={inspectMode ? "destructive" : "outline"}
          >
            {inspectMode ? "Stop Inspecting" : "Inspect Elements"}
          </Button>
        </div>
        
        <div className="flex flex-1 overflow-hidden">
          <div className="relative w-2/3 h-full overflow-hidden">
            {currentUrl ? (
              <iframe 
                ref={iframeRef}
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
          
          <div className="w-1/3 border-l p-4 overflow-y-auto">
            <h3 className="text-lg font-medium mb-4">Element Inspector</h3>
            
            {selectedElement ? (
              <div className="space-y-4">
                <div className="p-2 bg-muted rounded-md">
                  <p className="font-mono text-sm">&lt;{selectedElement.tagName.toLowerCase()}&gt;</p>
                  {selectedElement.id && <p className="text-sm mt-1">ID: {selectedElement.id}</p>}
                  {selectedElement.className && (
                    <p className="text-sm mt-1 break-all">Class: {selectedElement.className}</p>
                  )}
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Computed Styles</h4>
                  <div className="max-h-64 overflow-y-auto">
                    {Object.entries(elementStyles)
                      .filter(([key]) => {
                        // Show only the most important styles
                        const important = ['color', 'background', 'font', 'padding', 
                                          'margin', 'width', 'height', 'border'];
                        return important.some(prop => key.includes(prop));
                      })
                      .map(([key, value]) => (
                        <div key={key} className="grid grid-cols-2 text-sm border-b py-1">
                          <span className="font-mono">{key}:</span>
                          <span className="font-mono truncate">{value as string}</span>
                        </div>
                      ))
                    }
                  </div>
                </div>
                
                <Button 
                  onClick={generatePrompt}
                  className="w-full"
                >
                  Generate Design Improvement Prompt
                </Button>
              </div>
            ) : (
              <div className="text-center text-muted-foreground p-4">
                {inspectMode ? 
                  "Click on an element in the page to inspect it" : 
                  "Enable inspect mode to select elements"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrlFramePanel;

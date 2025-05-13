
import { useState, useRef, useEffect } from "react";
import { X, Move, Edit3, Palette, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface UrlFramePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const UrlFramePanel = ({ isOpen, onClose }: UrlFramePanelProps) => {
  const [url, setUrl] = useState<string>("");
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [inspectMode, setInspectMode] = useState(false);
  const [moveMode, setMoveMode] = useState(false);
  const [selectedElement, setSelectedElement] = useState<any>(null);
  const [elementStyles, setElementStyles] = useState<Record<string, string>>({});
  const [editingColor, setEditingColor] = useState<string | null>(null);
  const [customColor, setCustomColor] = useState("#000000");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Reset modes when URL changes
  useEffect(() => {
    setInspectMode(false);
    setMoveMode(false);
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
    // Disable move mode if enabling inspect mode
    if (!inspectMode) {
      setMoveMode(false);
    }
    setInspectMode(!inspectMode);
    
    if (!inspectMode) {
      toast.info("Inspect mode enabled. Click on elements to select them.");
      
      // Communicate with the iframe to enable inspection
      if (iframeRef.current && iframeRef.current.contentWindow) {
        try {
          const iframe = iframeRef.current;
          iframe.onload = () => {
            injectInspectionScript();
          };
          
          // If iframe already loaded, inject immediately
          if (iframe.contentDocument?.readyState === 'complete') {
            injectInspectionScript();
          }
        } catch (error) {
          console.error("Failed to access iframe content:", error);
          toast.error("Cross-origin restrictions prevent direct inspection. Try with a CORS-enabled URL.");
        }
      }
    } else {
      // Restore cursor if disabling inspect mode
      resetIframeCursor();
    }
  };
  
  const toggleMoveMode = () => {
    // Disable inspect mode if enabling move mode
    if (!moveMode) {
      setInspectMode(false);
    }
    setMoveMode(!moveMode);
    
    if (!moveMode) {
      toast.info("Move mode enabled. Click and drag elements to reposition them.");
      
      if (iframeRef.current && iframeRef.current.contentWindow) {
        try {
          const iframe = iframeRef.current;
          iframe.onload = () => {
            injectMovementScript();
          };
          
          // If iframe already loaded, inject immediately
          if (iframe.contentDocument?.readyState === 'complete') {
            injectMovementScript();
          }
        } catch (error) {
          console.error("Failed to access iframe content:", error);
          toast.error("Cross-origin restrictions prevent element manipulation. Try with a CORS-enabled URL.");
        }
      }
    } else {
      resetIframeCursor();
    }
  };

  const injectInspectionScript = () => {
    if (!iframeRef.current || !iframeRef.current.contentDocument) return;
    
    try {
      const iframe = iframeRef.current;
      const script = iframe.contentDocument.createElement('script');
      script.textContent = `
        // Remove any previous event listeners
        document.body.removeEventListener('click', window._inspectClickHandler);
        
        // Define and store the handler function so we can remove it later
        window._inspectClickHandler = function(e) {
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
            html: e.target.outerHTML,
            path: getElementPath(e.target)
          }, '*');
          
          // Highlight the selected element
          const prevHighlight = document.querySelector('.element-highlight');
          if (prevHighlight) prevHighlight.remove();
          
          const highlight = document.createElement('div');
          highlight.className = 'element-highlight';
          const rect = e.target.getBoundingClientRect();
          
          highlight.style.position = 'absolute';
          highlight.style.border = '2px solid #ff4081';
          highlight.style.backgroundColor = 'rgba(255, 64, 129, 0.2)';
          highlight.style.pointerEvents = 'none';
          highlight.style.zIndex = '10000';
          highlight.style.top = rect.top + 'px';
          highlight.style.left = rect.left + 'px';
          highlight.style.width = rect.width + 'px';
          highlight.style.height = rect.height + 'px';
          
          document.body.appendChild(highlight);
          
          return false;
        };
        
        // Helper function to get CSS selector path for an element
        function getElementPath(el) {
          let path = [];
          while (el && el.nodeType === Node.ELEMENT_NODE) {
            let selector = el.nodeName.toLowerCase();
            if (el.id) {
              selector += '#' + el.id;
              path.unshift(selector);
              break;
            } else {
              let sibling = el;
              let nth = 1;
              while (sibling = sibling.previousElementSibling) {
                if (sibling.nodeName.toLowerCase() === selector) nth++;
              }
              if (nth !== 1) selector += ":nth-of-type("+nth+")";
            }
            path.unshift(selector);
            el = el.parentNode;
          }
          return path.join(" > ");
        }
        
        // Add the click handler
        document.body.addEventListener('click', window._inspectClickHandler, true);
        document.body.style.cursor = 'crosshair';
      `;
      iframe.contentDocument.body.appendChild(script);
    } catch (error) {
      console.error("Failed to inject inspection script:", error);
    }
  };

  const injectMovementScript = () => {
    if (!iframeRef.current || !iframeRef.current.contentDocument) return;
    
    try {
      const iframe = iframeRef.current;
      const script = iframe.contentDocument.createElement('script');
      script.textContent = `
        // Remove any previous event listeners
        if (window._moveHandlers) {
          document.removeEventListener('mousedown', window._moveHandlers.mousedown);
          document.removeEventListener('mousemove', window._moveHandlers.mousemove);
          document.removeEventListener('mouseup', window._moveHandlers.mouseup);
        }
        
        // Store handlers so we can remove them later
        window._moveHandlers = {
          mousedown: null,
          mousemove: null,
          mouseup: null,
          currentElement: null,
          startX: 0,
          startY: 0,
          originalPosition: null
        };
        
        window._moveHandlers.mousedown = function(e) {
          if (e.target === document.body) return;
          e.preventDefault();
          
          window._moveHandlers.currentElement = e.target;
          window._moveHandlers.startX = e.clientX;
          window._moveHandlers.startY = e.clientY;
          
          // Store original position
          const style = window.getComputedStyle(e.target);
          window._moveHandlers.originalPosition = {
            position: style.position,
            top: style.top,
            left: style.left,
            zIndex: style.zIndex
          };
          
          // Make element movable
          e.target.style.position = 'relative';
          e.target.style.zIndex = '1000';
          
          // Add highlight effect
          e.target.style.outline = '2px solid #2196F3';
          
          // Notify parent about element selection
          const styles = window.getComputedStyle(e.target);
          const styleObj = {};
          for (let i = 0; i < styles.length; i++) {
            const prop = styles[i];
            styleObj[prop] = styles.getPropertyValue(prop);
          }
          
          window.parent.postMessage({
            type: 'ELEMENT_MOVE_START',
            tagName: e.target.tagName,
            className: e.target.className,
            id: e.target.id,
            styles: styleObj
          }, '*');
        };
        
        window._moveHandlers.mousemove = function(e) {
          if (!window._moveHandlers.currentElement) return;
          
          e.preventDefault();
          const el = window._moveHandlers.currentElement;
          const dx = e.clientX - window._moveHandlers.startX;
          const dy = e.clientY - window._moveHandlers.startY;
          
          // Update position
          const currentTop = parseInt(el.style.top || '0');
          const currentLeft = parseInt(el.style.left || '0');
          el.style.top = (currentTop + dy) + 'px';
          el.style.left = (currentLeft + dx) + 'px';
          
          // Update start position for next move
          window._moveHandlers.startX = e.clientX;
          window._moveHandlers.startY = e.clientY;
          
          // Notify parent about position change
          window.parent.postMessage({
            type: 'ELEMENT_MOVE',
            tagName: el.tagName,
            id: el.id,
            top: el.style.top,
            left: el.style.left
          }, '*');
        };
        
        window._moveHandlers.mouseup = function(e) {
          if (!window._moveHandlers.currentElement) return;
          
          const el = window._moveHandlers.currentElement;
          el.style.outline = '';
          
          // Notify parent about move end
          window.parent.postMessage({
            type: 'ELEMENT_MOVE_END',
            tagName: el.tagName,
            id: el.id,
            top: el.style.top,
            left: el.style.left
          }, '*');
          
          window._moveHandlers.currentElement = null;
        };
        
        document.addEventListener('mousedown', window._moveHandlers.mousedown);
        document.addEventListener('mousemove', window._moveHandlers.mousemove);
        document.addEventListener('mouseup', window._moveHandlers.mouseup);
        document.body.style.cursor = 'move';
      `;
      iframe.contentDocument.body.appendChild(script);
    } catch (error) {
      console.error("Failed to inject movement script:", error);
    }
  };

  const resetIframeCursor = () => {
    if (iframeRef.current && iframeRef.current.contentDocument) {
      try {
        iframeRef.current.contentDocument.body.style.cursor = 'default';
        
        // Remove any highlight elements
        const highlight = iframeRef.current.contentDocument.querySelector('.element-highlight');
        if (highlight) highlight.remove();
        
        // Remove event listeners if exist
        if (iframeRef.current.contentWindow && iframeRef.current.contentWindow.hasOwnProperty('_inspectClickHandler')) {
          iframeRef.current.contentDocument.body.removeEventListener('click', 
            (iframeRef.current.contentWindow as any)._inspectClickHandler);
        }
        
        // Remove movement event listeners if exist
        if (iframeRef.current.contentWindow && iframeRef.current.contentWindow.hasOwnProperty('_moveHandlers')) {
          const moveHandlers = (iframeRef.current.contentWindow as any)._moveHandlers;
          if (moveHandlers) {
            iframeRef.current.contentDocument.removeEventListener('mousedown', moveHandlers.mousedown);
            iframeRef.current.contentDocument.removeEventListener('mousemove', moveHandlers.mousemove);
            iframeRef.current.contentDocument.removeEventListener('mouseup', moveHandlers.mouseup);
          }
        }
      } catch (error) {
        // Ignore cross-origin errors
      }
    }
  };

  const applyStyleChange = (property: string, value: string) => {
    if (!selectedElement || !iframeRef.current || !iframeRef.current.contentDocument) {
      toast.error("No element selected or iframe access restricted");
      return;
    }
    
    try {
      // Get the element path and try to find the element
      const path = selectedElement.path;
      const element = iframeRef.current.contentDocument.querySelector(path);
      
      if (!element) {
        toast.error("Could not find the selected element");
        return;
      }
      
      // Apply the style change
      (element as HTMLElement).style[property as any] = value;
      
      // Update stored styles
      setElementStyles(prev => ({
        ...prev,
        [property]: value
      }));
      
      toast.success(`Applied ${property}: ${value}`);
    } catch (error) {
      console.error("Failed to apply style:", error);
      toast.error("Failed to apply style. Cross-origin restrictions may apply.");
    }
  };

  // Listen for messages from the iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'ELEMENT_SELECTED') {
        setSelectedElement(event.data);
        setElementStyles(event.data.styles || {});
        toast.success(`Selected: ${event.data.tagName}`);
      } else if (event.data && event.data.type === 'ELEMENT_MOVE') {
        // Handle move updates if needed
        console.log("Element moved:", event.data);
      } else if (event.data && event.data.type === 'ELEMENT_MOVE_END') {
        toast.success(`Repositioned element: ${event.data.tagName}`);
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
        
        <div className="p-4 border-b flex items-center gap-2 flex-wrap">
          <Input 
            value={url} 
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL to display (e.g., example.com)" 
            className="flex-1"
            onKeyDown={(e) => e.key === 'Enter' && handleLoadUrl()}
            aria-label="URL input"
          />
          <Button onClick={handleLoadUrl}>Load URL</Button>
          <Button 
            onClick={toggleInspectMode}
            variant={inspectMode ? "destructive" : "outline"}
          >
            <Edit3 className="mr-2 h-4 w-4" />
            {inspectMode ? "Stop Inspecting" : "Inspect Elements"}
          </Button>
          <Button 
            onClick={toggleMoveMode}
            variant={moveMode ? "destructive" : "outline"}
          >
            <Move className="mr-2 h-4 w-4" />
            {moveMode ? "Stop Moving" : "Move Elements"}
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
                  <h4 className="text-sm font-medium mb-2">Modify Styles</h4>
                  
                  {/* Color modifications */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Text Color</span>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="h-8 w-8 p-0">
                            <div 
                              className="h-4 w-4 rounded-full" 
                              style={{ backgroundColor: elementStyles.color || '#000000' }} 
                            />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64">
                          <div className="space-y-2">
                            <div className="grid grid-cols-6 gap-2">
                              {['#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', 
                                '#ffff00', '#00ffff', '#ff00ff', '#c0c0c0', '#808080', 
                                '#ff8000', '#8000ff'].map((color) => (
                                <button
                                  key={color}
                                  className="h-6 w-6 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
                                  style={{ backgroundColor: color }}
                                  onClick={() => applyStyleChange('color', color)}
                                />
                              ))}
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                value={customColor}
                                onChange={(e) => setCustomColor(e.target.value)}
                                className="h-8 w-8"
                              />
                              <Button 
                                size="sm" 
                                onClick={() => applyStyleChange('color', customColor)}
                                className="flex-1"
                              >
                                Apply Custom Color
                              </Button>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Background Color</span>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="h-8 w-8 p-0">
                            <div 
                              className="h-4 w-4 rounded-full" 
                              style={{ backgroundColor: elementStyles.backgroundColor || 'transparent' }} 
                            />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64">
                          <div className="space-y-2">
                            <div className="grid grid-cols-6 gap-2">
                              {['transparent', '#ffffff', '#f8f9fa', '#e9ecef', '#dee2e6', 
                                '#ced4da', '#6c757d', '#495057', '#343a40', '#212529',
                                '#f8d7da', '#d1e7dd'].map((color) => (
                                <button
                                  key={color}
                                  className="h-6 w-6 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
                                  style={{ 
                                    backgroundColor: color,
                                    border: color === 'transparent' ? '1px dashed #ced4da' : 'none'
                                  }}
                                  onClick={() => applyStyleChange('backgroundColor', color)}
                                />
                              ))}
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                value={customColor}
                                onChange={(e) => setCustomColor(e.target.value)}
                                className="h-8 w-8"
                              />
                              <Button 
                                size="sm" 
                                onClick={() => applyStyleChange('backgroundColor', customColor)}
                                className="flex-1"
                              >
                                Apply Custom Color
                              </Button>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  
                  {/* Font size control */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Font Size</span>
                      <span className="text-xs text-muted-foreground">
                        {elementStyles.fontSize || '16px'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">12px</span>
                      <Slider
                        defaultValue={[parseInt(elementStyles.fontSize) || 16]}
                        min={8}
                        max={36}
                        step={1}
                        onValueChange={(value) => applyStyleChange('fontSize', `${value[0]}px`)}
                        className="flex-1"
                      />
                      <span className="text-xs">36px</span>
                    </div>
                  </div>
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
                
                <div className="flex flex-col gap-2">
                  <Button 
                    onClick={generatePrompt}
                    className="w-full"
                    variant="default"
                  >
                    <Palette className="mr-2 h-4 w-4" />
                    Generate Design Improvement Prompt
                  </Button>
                  
                  <Button 
                    onClick={() => {
                      if (selectedElement && selectedElement.html) {
                        navigator.clipboard.writeText(selectedElement.html);
                        toast.success("HTML copied to clipboard!");
                      } else {
                        toast.error("No HTML available");
                      }
                    }}
                    className="w-full"
                    variant="outline"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Element HTML
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground p-4">
                {inspectMode ? 
                  "Click on an element in the page to inspect it" : 
                  moveMode ? 
                  "Click on an element in the page to move it" :
                  "Enable inspect or move mode to interact with elements"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrlFramePanel;

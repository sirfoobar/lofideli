
import React, { useState } from "react";
import { X, Copy, Download } from "lucide-react";
import { toast } from "sonner";

interface CodeSidebarProps {
  code: string;
  onClose: () => void;
  title?: string;
}

const CodeSidebar: React.FC<CodeSidebarProps> = ({ code, onClose, title = "Generated Code" }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/\s+/g, '')}.tsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Code downloaded successfully!");
  };
  
  return (
    <div className="fixed right-0 top-0 bottom-0 w-96 bg-[#1A1F2C] text-white shadow-lg z-50 flex flex-col">
      <div className="flex items-center justify-between border-b border-[#8A898C] p-4">
        <h3 className="font-medium text-lg">{title}</h3>
        <div className="flex gap-2">
          <button 
            onClick={handleCopy} 
            className="p-1.5 hover:bg-[#222222] rounded-md transition-colors"
            aria-label="Copy code"
          >
            <Copy size={18} />
          </button>
          <button 
            onClick={handleDownload} 
            className="p-1.5 hover:bg-[#222222] rounded-md transition-colors"
            aria-label="Download code"
          >
            <Download size={18} />
          </button>
          <button 
            onClick={onClose} 
            className="p-1.5 hover:bg-[#222222] rounded-md transition-colors"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <pre className="text-sm font-mono whitespace-pre-wrap">
          <code>{code}</code>
        </pre>
      </div>
      <div className="border-t border-[#8A898C] p-4 flex justify-between">
        <span className="text-sm text-[#8A898C]">React Component</span>
        <button 
          onClick={handleCopy} 
          className={`text-sm px-3 py-1 rounded-md transition-colors ${
            copied ? 'bg-green-600' : 'bg-[#1EAEDB] hover:bg-[#1EAEDB]/80'
          }`}
        >
          {copied ? "Copied!" : "Copy All"}
        </button>
      </div>
    </div>
  );
};

export default CodeSidebar;

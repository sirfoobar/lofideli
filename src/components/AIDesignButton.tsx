
import React from "react";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";

interface AIDesignButtonProps {
  onClick: () => void;
}

const AIDesignButton: React.FC<AIDesignButtonProps> = ({ onClick }) => {
  return (
    <div className="fixed bottom-[72px] right-4 z-50">
      <Button
        variant="outline"
        size="sm"
        onClick={onClick}
        className="bg-background flex items-center gap-2 shadow-md border border-border"
      >
        <Wand2 className="h-4 w-4" />
        <span className="text-xs">AI Design</span>
      </Button>
    </div>
  );
};

export default AIDesignButton;

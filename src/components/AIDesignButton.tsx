
import React from "react";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";

interface AIDesignButtonProps {
  onClick: () => void;
}

const AIDesignButton: React.FC<AIDesignButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="hover:bg-accent hover:text-accent-foreground"
      title="AI Design"
    >
      <Wand2 className="h-4 w-4" />
    </Button>
  );
};

export default AIDesignButton;

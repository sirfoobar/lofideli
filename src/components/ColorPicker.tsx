import React from 'react';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  className?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange, className }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className={cn("flex items-center gap-2 cursor-pointer", className)}>
          <div
            className="w-6 h-6 rounded border border-border"
            style={{ backgroundColor: color }}
          />
          <Input
            value={color}
            readOnly
            className="h-8 w-24 font-mono text-sm"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3">
        <div className="space-y-2">
          <Input
            type="color"
            value={color}
            onChange={onChange}
            className="h-8 w-full cursor-pointer"
          />
          <Input
            type="text"
            value={color}
            onChange={onChange}
            placeholder="#000000"
            className="h-8 font-mono"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker; 

import React from 'react';
import { Label } from './Form';

export const Meter: React.FC<React.HTMLAttributes<HTMLDivElement> & { value?: number; max?: number }> = ({ 
  children, 
  value = 0, 
  max = 100, 
  ...props 
}) => {
  return (
    <div 
      className="grid grid-areas-[label_value/bar_bar] grid-cols-[1fr_auto] gap-1 w-[250px] text-gray-900"
      style={{ 
        gridTemplateAreas: '"label value" "bar bar"'
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export const MeterLabel = Label;

export const MeterValue: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ children, ...props }) => {
  return (
    <span className="grid-area-value text-base leading-normal" style={{ gridArea: 'value' }} {...props}>
      {children}
    </span>
  );
};

export const MeterBar: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <div 
      className="grid-area-bar shadow-[inset_0px_0px_0px_1px_#D0D5DD] h-[10px] rounded-[5px] overflow-hidden"
      style={{ gridArea: 'bar' }}
      {...props}
    >
      {children}
    </div>
  );
};

export const MeterFill: React.FC<React.HTMLAttributes<HTMLDivElement> & { percentage: number }> = ({ 
  percentage, 
  ...props 
}) => {
  return (
    <div 
      className="bg-blue-500 h-full" 
      style={{ width: `${percentage}%` }}
      {...props}
    />
  );
};

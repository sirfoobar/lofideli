
import React from 'react';

export const ProgressBar: React.FC<React.HTMLAttributes<HTMLDivElement> & { value?: number }> = ({ 
  children, 
  value = 0, 
  ...props 
}) => {
  return (
    <div 
      className="grid grid-cols-[1fr_auto] gap-1 w-[250px] text-gray-900"
      style={{ gridTemplateAreas: '"label value" "bar bar"' }}
      {...props}
    >
      {children}
    </div>
  );
};

export const ProgressBarLabel: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ 
  children, 
  ...props 
}) => {
  return (
    <label 
      className="text-gray-900 text-base font-medium leading-6"
      style={{ gridArea: 'label' }}
      {...props}
    >
      {children}
    </label>
  );
};

export const ProgressBarValue: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ 
  children, 
  ...props 
}) => {
  return (
    <span 
      className="text-base leading-normal"
      style={{ gridArea: 'value' }}
      {...props}
    >
      {children}
    </span>
  );
};

export const ProgressBarBar: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  children, 
  ...props 
}) => {
  return (
    <div 
      className="shadow-[inset_0px_0px_0px_1px_#D0D5DD] h-[10px] rounded-[5px] overflow-hidden"
      style={{ gridArea: 'bar' }}
      {...props}
    >
      {children}
    </div>
  );
};

export const ProgressBarFill: React.FC<React.HTMLAttributes<HTMLDivElement> & { 
  percentage: number | undefined 
}> = ({ 
  percentage = 0, 
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

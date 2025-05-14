
import React from 'react';

export const Radio: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ 
  children,
  ...props
}) => {
  return (
    <label className="flex items-center gap-3 text-base cursor-pointer">
      <input
        type="radio"
        className="w-5 h-5 rounded-full border border-gray-300 checked:border-blue-500 checked:border-[6px]"
        {...props}
      />
      {children}
    </label>
  );
};

export const RadioGroup: React.FC<React.HTMLAttributes<HTMLDivElement> & { 
  orientation?: 'vertical' | 'horizontal' 
}> = ({ 
  children,
  orientation = 'vertical',
  ...props
}) => {
  return (
    <div 
      className={`flex ${orientation === 'horizontal' ? 'flex-row items-center' : 'flex-col'} gap-2`}
      {...props}
    >
      {children}
    </div>
  );
};

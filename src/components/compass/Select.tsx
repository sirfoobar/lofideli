
import React from 'react';

export const SelectValue: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ 
  children,
  ...props
}) => {
  return (
    <span className="min-w-0" {...props}>
      {children}
    </span>
  );
};

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({
  children,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2">
      <select 
        className={`appearance-none border border-gray-300 rounded px-4 py-2 bg-white min-w-[200px] max-w-[560px] outline-none ${props.className || ''}`} 
        {...props}
      >
        {children}
      </select>
    </div>
  );
};

export const SelectButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return (
    <button 
      className="flex flex-row gap-1 bg-white justify-between items-center box-border h-10 border border-gray-300 py-3 px-4 min-w-[200px] max-w-[560px] rounded outline-none text-gray-900 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2"
      {...props}
    >
      {children}
    </button>
  );
};

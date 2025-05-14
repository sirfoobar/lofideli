
import React from 'react';

export const ToggleButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isSelected?: boolean;
}> = ({
  children,
  isSelected,
  ...props
}) => {
  return (
    <button 
      className={`inline-flex w-fit py-2 px-4 justify-center items-center gap-2 flex-shrink-0 flex-grow-0 border border-gray-300 rounded-full outline-none box-border h-10 text-sm bg-transparent hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 ${isSelected ? 'border-2 border-gray-900 font-medium' : ''}`}
      {...props}
    >
      {children}
    </button>
  );
};


import React from 'react';

export const Popover: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <div 
      className="bg-white shadow-lg rounded-md p-4 border border-gray-200" 
      {...props}
    >
      {children}
    </div>
  );
};

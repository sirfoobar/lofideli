
import React from 'react';

export const Collection: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <div
      className="flex flex-col gap-2 w-full max-w-full box-border list-none m-0 p-0 outline-blue-400 outline-offset-2 focus-visible:outline-4"
      {...props}
    >
      {children}
    </div>
  );
};

export const Section: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <div 
      className="flex flex-col gap-2 p-2 border border-gray-300 rounded bg-white outline-blue-400 outline-offset-2 focus-visible:outline-4"
      {...props}
    >
      {children}
    </div>
  );
};

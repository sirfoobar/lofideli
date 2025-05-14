
import React from 'react';

export const GridList: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <div 
      className="grid grid-cols-repeat-auto-fill-minmax-200px-1fr gap-4 p-2 list-none m-0 w-full max-w-full box-border outline-blue-400 outline-offset-2 focus-visible:outline-4"
      style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}
      {...props}
    >
      {children}
    </div>
  );
};

export const GridListItem: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <div 
      className="flex flex-col gap-2 p-4 border border-gray-300 rounded bg-white cursor-pointer transition-all duration-200 hover:border-gray-400 hover:bg-gray-100 selected:border-blue-500 selected:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed outline-blue-400 outline-offset-2 focus-visible:outline-4"
      {...props}
    >
      {children}
    </div>
  );
};

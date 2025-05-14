
import React from 'react';

export const Menu: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <div 
      className="max-h-inherit overflow-auto min-w-[150px] max-w-[560px] flex flex-col bg-white gap-0.5 outline-none border border-gray-300 rounded-md"
      {...props}
    >
      {children}
    </div>
  );
};

export const MenuItem: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <div 
      className="py-3 px-4 text-ellipsis whitespace-nowrap overflow-hidden outline-none cursor-default text-decoration-none text-gray-900 hover:bg-gray-100 focus-visible:bg-gray-100"
      {...props}
    >
      {children}
    </div>
  );
};

export const MenuTrigger: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <div {...props}>
      {children}
    </div>
  );
};


import React from 'react';

export const SearchGroup: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <div className="flex rounded-full pl-4 w-80" {...props}>
      {children}
    </div>
  );
};

export const SearchField: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return (
    <div className="flex flex-col gap-2">
      <input type="search" {...props} className={`border rounded px-3 py-2 ${props.className || ''}`} />
    </div>
  );
};

export const InlineSearchField: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return (
    <input type="search" {...props} className={`flex-grow border rounded px-3 py-2 ${props.className || ''}`} />
  );
};

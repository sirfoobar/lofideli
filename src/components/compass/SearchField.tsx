
import React from 'react';
import { SearchField as AriaSearchField } from 'react-aria-components';

export const SearchField: React.FC<React.ComponentProps<typeof AriaSearchField>> = (props) => {
  return <AriaSearchField {...props} className={`flex flex-col gap-2 ${props.className || ''}`} />;
};

export const InlineSearchField: React.FC<React.ComponentProps<typeof AriaSearchField>> = (props) => {
  return <AriaSearchField {...props} className={`flex-grow-1 ${props.className || ''}`} />;
};

export const SearchGroup: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className = '', children }) => {
  return (
    <div className={`flex items-center border rounded-full px-4 w-[320px] ${className}`}>
      {children}
    </div>
  );
};

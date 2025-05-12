
import React from 'react';
import {
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  ListBoxItemProps,
  Header,
  Section
} from 'react-aria-components';

export const ListBox: React.FC<React.ComponentProps<typeof AriaListBox>> = (props) => {
  return (
    <AriaListBox
      {...props}
      className={`max-h-inherit overflow-auto p-0 min-w-[150px] bg-white gap-0.5 outline-none border border-neutral-200 rounded-lg ${props.className || ''}`}
    />
  );
};

export const UnstyledListBox: React.FC<React.ComponentProps<typeof AriaListBox>> = (props) => {
  return (
    <AriaListBox
      {...props}
      className={`max-h-inherit overflow-auto min-w-[150px] gap-0.5 outline-none m-0 ${props.className || ''}`}
    />
  );
};

export const StyledListBoxItem: React.FC<ListBoxItemProps> = (props) => {
  return (
    <AriaListBoxItem
      {...props}
      className={`flex flex-row justify-between p-3 px-4 gap-2 outline-none cursor-default
      data-[hovered]:bg-neutral-100
      data-[focus-visible]:bg-neutral-100
      data-[selected]:bg-neutral-200 ${props.className || ''}`}
    />
  );
};

export const Header: React.FC<React.ComponentProps<typeof Header>> = (props) => {
  return (
    <Header
      {...props}
      className={`flex gap-2 bg-neutral-50 p-2 px-6 ${props.className || ''}`}
    />
  );
};

// Helper component for ListBoxItem contents
export const ListBoxItem: React.FC<ListBoxItemProps> = (props) => {
  return (
    <StyledListBoxItem {...props}>
      {({ isSelected }) => (
        <>
          <div className="min-w-0 text-ellipsis whitespace-nowrap overflow-hidden">
            {props.children}
          </div>
          {isSelected && (
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="ml-auto"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </>
      )}
    </StyledListBoxItem>
  );
};

export { Section };

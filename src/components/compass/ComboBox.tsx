
import React from 'react';
import {
  ComboBox as AriaComboBox,
  ListBox,
  ListBoxItem
} from 'react-aria-components';

export const ComboBox: React.FC<React.ComponentProps<typeof AriaComboBox>> = (props) => {
  return (
    <AriaComboBox
      {...props}
      className={`flex flex-col gap-2 w-full max-w-[560px] relative ${props.className || ''}`}
    />
  );
};

export const ComboBoxListBox: React.FC<React.ComponentProps<typeof ListBox>> = (props) => {
  return (
    <ListBox
      {...props}
      className={`absolute top-full left-0 right-0 mt-1 max-h-[300px] overflow-y-auto bg-white border border-neutral-200 rounded-md shadow-md z-10 ${props.className || ''}`}
    />
  );
};

export const ComboBoxItem: React.FC<React.ComponentProps<typeof ListBoxItem>> = (props) => {
  return (
    <ListBoxItem
      {...props}
      className={`p-2 px-4 cursor-pointer transition-all
      data-[hovered]:bg-neutral-100
      data-[selected]:bg-blue-100 data-[selected]:text-blue-700
      data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed
      data-[focus-visible]:outline-2 data-[focus-visible]:outline-blue-400 data-[focus-visible]:outline-offset-[-2px] ${props.className || ''}`}
    />
  );
};

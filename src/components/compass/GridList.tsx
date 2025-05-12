
import React from 'react';
import {
  GridList as AriaGridList,
  GridListItem as AriaGridListItem
} from 'react-aria-components';

export const GridList: React.FC<React.ComponentProps<typeof AriaGridList>> = (props) => {
  return (
    <AriaGridList
      {...props}
      className={`grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-2 list-none m-0 w-full max-w-full box-border
      data-[focus-visible]:outline-2 data-[focus-visible]:outline-blue-400 data-[focus-visible]:outline-offset-2 ${props.className || ''}`}
    />
  );
};

export const GridListItem: React.FC<React.ComponentProps<typeof AriaGridListItem>> = (props) => {
  return (
    <AriaGridListItem
      {...props}
      className={`flex flex-col gap-2 p-4 border border-neutral-200 rounded-md bg-white cursor-pointer transition-all
      data-[hovered]:border-neutral-300 data-[hovered]:bg-neutral-100
      data-[selected]:border-blue-500 data-[selected]:bg-blue-100
      data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed
      data-[focus-visible]:outline-2 data-[focus-visible]:outline-blue-400 data-[focus-visible]:outline-offset-2 ${props.className || ''}`}
    />
  );
};

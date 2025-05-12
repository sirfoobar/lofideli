
import React from 'react';
import {
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  MenuTrigger
} from 'react-aria-components';

export const Menu: React.FC<React.ComponentProps<typeof AriaMenu>> = (props) => {
  return (
    <AriaMenu
      {...props}
      className={`max-h-inherit overflow-auto min-w-[150px] max-w-[560px] flex flex-col bg-white gap-0.5 outline-none border border-neutral-200 rounded-lg ${props.className || ''}`}
    />
  );
};

export const MenuItem: React.FC<React.ComponentProps<typeof AriaMenuItem>> = (props) => {
  return (
    <AriaMenuItem
      {...props}
      className={`p-3 px-4 text-ellipsis whitespace-nowrap overflow-hidden outline-none cursor-default text-decoration-none text-neutral-900
      data-[hovered]:bg-neutral-100
      data-[focus-visible]:bg-neutral-100 ${props.className || ''}`}
    />
  );
};

export { MenuTrigger };

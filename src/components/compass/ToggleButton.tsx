
import React from 'react';
import { ToggleButton as AriaToggleButton } from 'react-aria-components';

export const ToggleButton: React.FC<React.ComponentProps<typeof AriaToggleButton>> = (props) => {
  return (
    <AriaToggleButton
      {...props}
      className={`inline-flex w-fit p-2 px-4 justify-center items-center gap-2 flex-shrink-0 flex-grow-0 border border-neutral-200 rounded-full outline-none box-border h-10 text-sm text-neutral-400
      data-[hovered]:bg-neutral-100 data-[hovered]:border-neutral-300
      data-[pressed]:bg-neutral-200 data-[pressed]:border-neutral-400
      data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed
      data-[selected]:border-2 data-[selected]:border-neutral-900 data-[selected]:font-medium data-[selected]:text-neutral-900
      data-[focus-visible]:outline-2 data-[focus-visible]:outline-blue-400 data-[focus-visible]:outline-offset-2 ${props.className || ''}`}
    />
  );
};

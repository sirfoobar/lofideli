
import React, { forwardRef } from 'react';
import { Popover as AriaPopover } from 'react-aria-components';
import type { PopoverProps } from 'react-aria-components';

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (props, ref) => (
    <AriaPopover
      {...props}
      ref={ref}
      className={`${props.className || ''} 
        ${props['data-trigger'] === 'ComboBox' ? 'mt-2 min-w-[240px] -ml-[13px] w-[calc(var(--trigger-width)+26px)]' : ''}
        ${props['data-trigger'] === 'Select' ? 'min-w-[240px] w-[var(--trigger-width)]' : ''}`}
    />
  )
);

Popover.displayName = 'Popover';


import React from 'react';
import { Popover as AriaPopover } from 'react-aria-components';

export const Popover: React.FC<React.ComponentProps<typeof AriaPopover>> = (props) => {
  return <AriaPopover {...props} className={`bg-white border border-neutral-200 shadow-lg rounded-md p-4 ${props.className || ''}`} />;
};


import React from 'react';
import { DateField as AriaDateField, DateInput, DateSegment } from 'react-aria-components';

export const DateField: React.FC<React.ComponentProps<typeof AriaDateField>> = (props) => {
  return <AriaDateField {...props} className={`flex flex-col gap-2 ${props.className || ''}`} />;
};

export const DateInput: React.FC<React.ComponentProps<typeof DateInput>> = (props) => {
  return (
    <DateInput
      {...props}
      className={`border border-neutral-200 p-2 py-2.5 flex box-border h-10 min-w-[200px] max-w-[560px] rounded-md outline-none
      data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed
      data-[hovered]:border-neutral-300
      data-[invalid]:border-red-500
      data-[focus-visible]:outline-2 data-[focus-visible]:outline-blue-400 data-[focus-visible]:outline-offset-2 ${props.className || ''}`}
    />
  );
};

export const DateSegment: React.FC<React.ComponentProps<typeof DateSegment>> = (props) => {
  return (
    <DateSegment
      {...props}
      className={`px-0.5 text-right text-neutral-900 data-[placeholder]:text-neutral-500 focus:text-white focus:bg-blue-500 focus:outline-none focus:rounded focus:caret-transparent ${props.className || ''}`}
    />
  );
};

export const UnstyledDateInput: React.FC<React.ComponentProps<typeof DateInput>> = (props) => {
  return <DateInput {...props} className={`flex border-none outline-none ${props.className || ''}`} />;
};

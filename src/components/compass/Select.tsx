
import React from 'react';
import {
  Button,
  Select as AriaSelect,
  SelectValue as AriaSelectValue,
} from 'react-aria-components';

export const SelectValue: React.FC<React.ComponentProps<typeof AriaSelectValue>> = (props) => {
  return <AriaSelectValue {...props} className={`min-w-0 ${props.className || ''}`} />;
};

export const Select: React.FC<React.ComponentProps<typeof AriaSelect>> = (props) => {
  return (
    <AriaSelect
      {...props}
      className={`flex flex-col gap-2 data-[invalid]:button:border-red-500 ${props.className || ''}`}
    />
  );
};

export const SelectButton: React.FC<React.ComponentProps<typeof Button>> = (props) => {
  return (
    <Button
      {...props}
      className={`flex flex-row gap-1 bg-white justify-between items-center box-border h-10 border border-neutral-200 p-3 px-4 p-3 px-3 min-w-[200px] max-w-[560px] rounded-md outline-none text-neutral-900
      data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed
      data-[hovered]:bg-neutral-100 data-[hovered]:border-neutral-300
      data-[focus-visible]:outline-2 data-[focus-visible]:outline-blue-400 data-[focus-visible]:outline-offset-2 ${props.className || ''}`}
    />
  );
};


import React from 'react';
import { Input as AriaInput, TextArea as AriaTextArea, Group } from 'react-aria-components';

export const Input: React.FC<React.ComponentProps<typeof AriaInput>> = (props) => {
  return (
    <AriaInput
      {...props}
      className={`border border-neutral-200 p-2 py-2.5 box-border h-10 min-w-[200px] max-w-[560px] rounded-md outline-none
      data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed
      data-[hovered]:border-neutral-300
      data-[invalid]:border-red-500
      data-[focus-visible]:outline-2 data-[focus-visible]:outline-blue-400 data-[focus-visible]:outline-offset-2 ${props.className || ''}`}
    />
  );
};

export const TextArea: React.FC<React.ComponentProps<typeof AriaTextArea>> = (props) => {
  return (
    <AriaTextArea
      {...props}
      className={`border border-neutral-200 p-2 min-w-[200px] max-w-[560px] rounded-md outline-none
      data-[disabled]:opacity-50
      data-[hovered]:border-neutral-300
      data-[invalid]:border-red-500
      data-[focus-visible]:outline-2 data-[focus-visible]:outline-blue-400 data-[focus-visible]:outline-offset-2 ${props.className || ''}`}
    />
  );
};

export const InputGroup: React.FC<React.ComponentProps<typeof Group>> = (props) => {
  return (
    <Group
      {...props}
      className={`flex flex-row gap-1 justify-between items-center box-border h-10 bg-white border border-neutral-200 p-1 px-3 min-w-[200px] max-w-[560px] rounded-md outline-none
      data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed
      data-[hovered]:border-neutral-300
      data-[invalid]:border-red-500
      data-[focus-visible]:outline-2 data-[focus-visible]:outline-blue-400 data-[focus-visible]:outline-offset-2 ${props.className || ''}`}
    />
  );
};

export const InlineInputGroup: React.FC<React.ComponentProps<typeof Group>> = (props) => {
  return (
    <Group
      {...props}
      className={`flex flex-row gap-1 items-center w-full flex-grow-1 h-10 border-none outline-none p-1 flex-grow-1 h-6 ${props.className || ''}`}
    />
  );
};

export const UnstyledInput: React.FC<React.ComponentProps<typeof AriaInput>> = (props) => {
  return (
    <AriaInput
      {...props}
      className={`border-none outline-none p-1 flex-grow-1 h-6 ${props.className || ''}`}
    />
  );
};

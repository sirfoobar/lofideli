
import React from 'react';
import {
  Radio as AriaRadio,
  RadioGroup as AriaRadioGroup,
} from 'react-aria-components';

export const Radio: React.FC<React.ComponentProps<typeof AriaRadio>> = (props) => {
  return (
    <AriaRadio
      {...props}
      className={`flex items-center gap-3 text-base
      before:content-[''] before:block before:w-5 before:h-5 before:box-border before:border-2 before:border-neutral-300 before:bg-white before:rounded-full
      data-[hovered]:before:border-neutral-300
      data-[pressed]:before:border-neutral-500
      data-[selected]:before:border-blue-500 data-[selected]:before:border-[6px]
      data-[selected][data-pressed]:before:border-blue-600
      data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed
      data-[focus-visible]:before:outline-2 data-[focus-visible]:before:outline-blue-400 data-[focus-visible]:before:outline-offset-2 ${props.className || ''}`}
    />
  );
};

export const RadioGroup: React.FC<React.ComponentProps<typeof AriaRadioGroup>> = (props) => {
  return (
    <AriaRadioGroup
      {...props}
      className={`flex flex-col gap-2 ${props.orientation === 'horizontal' ? 'flex-row items-center' : ''} ${props.className || ''}`}
    />
  );
};

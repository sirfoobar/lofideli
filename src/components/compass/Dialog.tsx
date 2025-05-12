
import React from 'react';
import {
  Dialog as AriaDialog,
  Heading,
  DialogTrigger,
  DialogTriggerProps,
} from 'react-aria-components';

export const DialogTrigger = (props: DialogTriggerProps) => <DialogTrigger {...props} />;

export const Dialog: React.FC<React.ComponentProps<typeof AriaDialog>> = (props) => {
  return <AriaDialog {...props} className={`p-6 flex flex-col gap-6 min-w-[480px] outline-none relative ${props.className || ''}`} />;
};

export const DialogHeading: React.FC<React.ComponentProps<typeof Heading>> = (props) => {
  return <Heading {...props} className={`text-xl font-medium leading-7 m-0 max-w-[calc(100%-2rem)] ${props.className || ''}`} />;
};

export const DialogCloseButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return (
    <button
      {...props}
      className={`bg-transparent border border-transparent text-neutral-900 p-2 w-fit h-fit absolute top-4 right-4
      hover:bg-neutral-100 hover:border-neutral-100
      focus:outline-2 focus:outline-blue-400 focus:outline-offset-2 ${props.className || ''}`}
    />
  );
};

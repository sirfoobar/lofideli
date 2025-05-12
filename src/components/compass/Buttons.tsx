
import React, { forwardRef } from 'react';
import { Button } from 'react-aria-components';
import type { ButtonProps } from 'react-aria-components';

interface IconButtonProps extends ButtonProps {
  size?: 'small' | 'default';
}

const baseButtonClasses = 
  "inline-flex w-fit px-4 py-2 justify-center items-center gap-2 flex-shrink-0 flex-grow-0 " + 
  "rounded-full outline-none box-border h-10 text-sm font-medium " + 
  "disabled:opacity-60 disabled:cursor-not-allowed " +
  "focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:outline-offset-2";

export const BaseButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => (
    <Button
      {...props}
      ref={ref}
      className={`${baseButtonClasses} ${props.className || ''}`}
    />
  )
);

BaseButton.displayName = 'BaseButton';

export const PrimaryButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => (
    <BaseButton
      {...props}
      ref={ref}
      className={`bg-blue-500 border border-blue-600 text-white hover:bg-blue-600 
        active:bg-blue-700 active:border-blue-700 ${props.className || ''}`}
    />
  )
);

PrimaryButton.displayName = 'PrimaryButton';

export const SecondaryButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => (
    <BaseButton
      {...props}
      ref={ref}
      className={`bg-gray-300 border border-gray-300 text-gray-900 hover:bg-gray-400 
        hover:border-gray-400 active:bg-gray-500 active:border-gray-500 ${props.className || ''}`}
    />
  )
);

SecondaryButton.displayName = 'SecondaryButton';

export const FlatButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => (
    <BaseButton
      {...props}
      ref={ref}
      className={`bg-transparent border border-transparent text-gray-900 hover:bg-gray-200 
        hover:border-gray-200 active:bg-gray-300 active:border-gray-300 ${props.className || ''}`}
    />
  )
);

FlatButton.displayName = 'FlatButton';

export const DestructiveButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => (
    <BaseButton
      {...props}
      ref={ref}
      className={`bg-red-500 border border-red-600 text-white hover:bg-red-600 
        hover:border-red-600 active:bg-red-700 active:border-red-700 ${props.className || ''}`}
    />
  )
);

DestructiveButton.displayName = 'DestructiveButton';

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ size = 'default', ...props }, ref) => (
    <BaseButton
      {...props}
      ref={ref}
      className={`p-2 ${size === 'small' ? 'w-8 h-8' : 'w-10 h-10'} bg-transparent border-transparent 
        text-gray-900 hover:bg-gray-200 hover:border-gray-200 active:bg-gray-300 active:border-gray-300 
        ${props.className || ''}`}
    />
  )
);

IconButton.displayName = 'IconButton';

export const LinkButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => (
    <Button
      {...props}
      ref={ref}
      className={`text-decoration-none bg-none border-none p-0 outline-none text-blue-500 hover:text-blue-600 
        active:text-blue-700 disabled:text-gray-900 focus-visible:outline-2 focus-visible:outline-blue-400 
        focus-visible:outline-offset-2 focus-visible:rounded ${props.className || ''}`}
    />
  )
);

LinkButton.displayName = 'LinkButton';

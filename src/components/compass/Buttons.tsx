
import React from 'react';
import { Button as AriaButton } from 'react-aria-components';
import type { ButtonProps } from 'react-aria-components';

// Base button component using Tailwind classes
export const BaseButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <AriaButton
        {...props}
        ref={ref}
        className={`inline-flex w-fit px-4 py-2 justify-center items-center gap-2 flex-shrink-0 flex-grow-0 rounded-full outline-none box-border h-10 text-sm font-medium
          data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed
          data-[focus-visible]:outline-2 data-[focus-visible]:outline-blue-400 data-[focus-visible]:outline-offset-2
          ${className}`}
      >
        {children}
      </AriaButton>
    );
  }
);

BaseButton.displayName = 'BaseButton';

export const PrimaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <BaseButton
        {...props}
        ref={ref}
        className={`bg-blue-500 border border-blue-600 text-white
          data-[hovered]:bg-blue-600
          data-[pressed]:bg-blue-700 data-[pressed]:border-blue-700
          ${className}`}
      >
        {children}
      </BaseButton>
    );
  }
);

PrimaryButton.displayName = 'PrimaryButton';

export const SecondaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <BaseButton
        {...props}
        ref={ref}
        className={`bg-neutral-200 border border-neutral-200 text-neutral-900
          data-[hovered]:bg-neutral-300 data-[hovered]:border-neutral-300
          data-[pressed]:bg-neutral-400 data-[pressed]:border-neutral-400
          ${className}`}
      >
        {children}
      </BaseButton>
    );
  }
);

SecondaryButton.displayName = 'SecondaryButton';

export const TertiaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <BaseButton
        {...props}
        ref={ref}
        className={`bg-transparent border border-neutral-700 text-neutral-700
          data-[hovered]:bg-neutral-100 data-[hovered]:border-neutral-800 data-[hovered]:text-neutral-800
          data-[pressed]:bg-neutral-200 data-[pressed]:border-neutral-900 data-[pressed]:text-neutral-900
          ${className}`}
      >
        {children}
      </BaseButton>
    );
  }
);

TertiaryButton.displayName = 'TertiaryButton';

interface IconButtonProps extends ButtonProps {
  size?: 'small' | 'default';
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className = '', size = 'default', children, ...props }, ref) => {
    return (
      <BaseButton
        {...props}
        ref={ref}
        className={`p-2 ${size === 'small' ? 'w-8 h-8' : 'w-10 h-10'} bg-transparent border-transparent text-neutral-900
          data-[hovered]:bg-neutral-100 data-[hovered]:border-neutral-100
          data-[pressed]:bg-neutral-200 data-[pressed]:border-neutral-200
          ${className}`}
      >
        {children}
      </BaseButton>
    );
  }
);

IconButton.displayName = 'IconButton';

export const Button = PrimaryButton;


import React from 'react';
import { Button as AriaButton, ButtonProps } from 'react-aria-components';

export const BaseButton: React.FC<ButtonProps> = ({ className = '', children, ...props }) => {
  return (
    <AriaButton
      {...props}
      className={`inline-flex w-fit px-4 py-2 justify-center items-center gap-2 flex-shrink-0 flex-grow-0 rounded-full outline-none box-border h-10 text-sm font-medium
        data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed
        data-[focus-visible]:outline-2 data-[focus-visible]:outline-blue-400 data-[focus-visible]:outline-offset-2
        ${className}`}
    >
      {children}
    </AriaButton>
  );
};

export const PrimaryButton: React.FC<ButtonProps> = ({ className = '', children, ...props }) => {
  return (
    <BaseButton
      {...props}
      className={`bg-blue-500 border border-blue-600 text-white
        data-[hovered]:bg-blue-600
        data-[pressed]:bg-blue-700 data-[pressed]:border-blue-700
        ${className}`}
    >
      {children}
    </BaseButton>
  );
};

export const SecondaryButton: React.FC<ButtonProps> = ({ className = '', children, ...props }) => {
  return (
    <BaseButton
      {...props}
      className={`bg-neutral-700 border border-neutral-700 text-white
        data-[hovered]:bg-neutral-800 data-[hovered]:border-neutral-800
        data-[pressed]:bg-neutral-900 data-[pressed]:border-neutral-900
        ${className}`}
    >
      {children}
    </BaseButton>
  );
};

export const TertiaryButton: React.FC<ButtonProps> = ({ className = '', children, ...props }) => {
  return (
    <BaseButton
      {...props}
      className={`bg-transparent border border-neutral-700 text-neutral-700
        data-[hovered]:bg-neutral-100 data-[hovered]:border-neutral-800 data-[hovered]:text-neutral-800
        data-[pressed]:bg-neutral-200 data-[pressed]:border-neutral-900 data-[pressed]:text-neutral-900
        ${className}`}
    >
      {children}
    </BaseButton>
  );
};

export const IconButton: React.FC<ButtonProps & { size?: 'small' | 'default' }> = ({ 
  className = '', 
  size = 'default', 
  children, 
  ...props 
}) => {
  return (
    <BaseButton
      {...props}
      className={`p-2 ${size === 'small' ? 'w-8 h-8' : 'w-10 h-10'} bg-transparent border-transparent text-neutral-900
        data-[hovered]:bg-neutral-100 data-[hovered]:border-neutral-100
        data-[pressed]:bg-neutral-200 data-[pressed]:border-neutral-200
        ${className}`}
    >
      {children}
    </BaseButton>
  );
};

export const Button = PrimaryButton;

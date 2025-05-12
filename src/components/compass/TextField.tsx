
import React from 'react';
import { TextField as AriaTextField } from 'react-aria-components';
import type { TextFieldProps } from 'react-aria-components';

export const TextField = React.forwardRef<HTMLDivElement, TextFieldProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <AriaTextField
        {...props}
        ref={ref}
        className={`flex flex-col gap-2 ${className}`}
      >
        {children}
      </AriaTextField>
    );
  }
);

TextField.displayName = 'TextField';

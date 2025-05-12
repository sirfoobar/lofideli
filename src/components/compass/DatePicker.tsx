
import React from 'react';
import { DatePicker as AriaDatePicker } from 'react-aria-components';
import type { DatePickerProps } from 'react-aria-components';

export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <AriaDatePicker
        {...props}
        ref={ref}
        className={`flex flex-col gap-2 ${className}`}
      >
        {children}
      </AriaDatePicker>
    );
  }
);

DatePicker.displayName = 'DatePicker';

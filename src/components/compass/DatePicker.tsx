
import React from 'react';
import { 
  DatePicker as AriaDatePicker, 
  DatePickerProps as AriaDatePickerProps,
  DateValue
} from 'react-aria-components';

export type DatePickerProps = Omit<AriaDatePickerProps<DateValue>, 'children'> & {
  className?: string;
  children: React.ReactNode;
};

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

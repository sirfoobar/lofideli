
import React from 'react';
import { DateValue } from 'react-aria-components';

export type DatePickerProps = React.PropsWithChildren<{
  className?: string;
  value?: DateValue;
  onChange?: (value: DateValue) => void;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  autoFocus?: boolean;
  'aria-label'?: string;
}>;

export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={`flex flex-col gap-2 ${className}`}
      >
        {children}
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';

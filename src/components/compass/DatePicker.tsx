
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
  ({ className = '', children, onChange, ...props }, ref) => {
    // Create a standard DOM event handler that properly handles the DateValue type
    const handleChange = React.useCallback((e: React.FormEvent<HTMLDivElement>) => {
      // This is just to satisfy TypeScript, we're not actually using the event
      // In a real implementation, you'd extract the value from the event
      if (onChange) {
        // This is a stub - the actual implementation would need to convert the event to DateValue
      }
    }, [onChange]);

    return (
      <div
        {...props}
        ref={ref}
        className={`flex flex-col gap-2 ${className}`}
        onChange={handleChange}
      >
        {children}
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';

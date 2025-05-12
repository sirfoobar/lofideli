
import React from 'react';

interface DateValue {
  day: number;
  month: number;
  year: number;
}

export type DatePickerProps = React.HTMLAttributes<HTMLDivElement> & {
  value?: DateValue;
  onChange?: (value: DateValue) => void;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  autoFocus?: boolean;
};

export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  ({ className = '', children, onChange, value, isDisabled, isReadOnly, autoFocus, ...props }, ref) => {
    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange && e.target.value) {
        try {
          const date = new Date(e.target.value);
          onChange({
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear()
          });
        } catch (error) {
          console.error('Invalid date input', error);
        }
      }
    }, [onChange]);

    return (
      <div
        {...props}
        ref={ref}
        className={`flex flex-col gap-2 ${className}`}
      >
        <input 
          type="date" 
          className="border border-neutral-200 rounded p-2 outline-none focus:border-blue-400"
          onChange={handleChange}
          disabled={isDisabled}
          readOnly={isReadOnly}
          autoFocus={autoFocus}
        />
        {children}
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';

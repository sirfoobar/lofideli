
import React from 'react';
import { Dialog, DatePicker as AriaDatePicker, DateRangePicker as AriaDateRangePicker } from 'react-aria-components';

export const DatePicker = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof AriaDatePicker>>(
  (props, ref) => (
    <AriaDatePicker
      {...props}
      ref={ref}
      className={`flex flex-col gap-2 ${props.className || ''}`}
    />
  )
);

DatePicker.displayName = 'DatePicker';

export const DatePickerDialog = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof Dialog>>(
  (props, ref) => (
    <Dialog
      {...props}
      ref={ref}
      className={`max-h-inherit overflow-auto p-4 bg-white gap-0.5 outline-none border border-gray-300 rounded-md ${props.className || ''}`}
    />
  )
);

DatePickerDialog.displayName = 'DatePickerDialog';

export const DateRangePicker = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof AriaDateRangePicker>>(
  (props, ref) => (
    <AriaDateRangePicker
      {...props}
      ref={ref}
      className={`flex flex-col gap-2 ${props.className || ''} ${
        props.slot === 'start' ? 'flex-none' : ''
      } ${props.slot === 'end' ? 'mr-8 flex-1' : ''}`}
    />
  )
);

DateRangePicker.displayName = 'DateRangePicker';

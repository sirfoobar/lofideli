
import React from 'react';
import {
  Calendar as AriaCalendar,
  CalendarGrid,
  CalendarCell as AriaCalendarCell,
  Heading
} from 'react-aria-components';

export const Calendar: React.FC<React.ComponentProps<typeof AriaCalendar>> = (props) => {
  return <AriaCalendar {...props} className={`w-fit max-w-full ${props.className || ''}`} />;
};

export const CalendarCell: React.FC<React.ComponentProps<typeof AriaCalendarCell>> = (props) => {
  return <AriaCalendarCell {...props} className={`w-10 h-10 flex items-center justify-center rounded-full data-[selected]:bg-blue-500 data-[selected]:text-white data-[hovered]:bg-neutral-100 data-[focus-visible]:outline-2 data-[focus-visible]:outline-blue-400 data-[focus-visible]:outline-offset-2 ${props.className || ''}`} />;
};

export const CalendarHeader: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className = '', children }) => {
  return <div className={`flex items-center mb-2 ${className}`}>{children}</div>;
};

export const CalendarHeading: React.FC<React.ComponentProps<typeof Heading>> = (props) => {
  return <Heading {...props} className={`flex-1 text-center text-lg font-semibold ${props.className || ''}`} />;
};

export { CalendarGrid };
export const RangeCalendar = Calendar;
export const RangeCalendarCell = CalendarCell;

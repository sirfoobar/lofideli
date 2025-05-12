
import React from 'react';
import { Meter as AriaMeter } from 'react-aria-components';
import { Label } from './Form';

export const Meter: React.FC<React.ComponentProps<typeof AriaMeter>> = ({ className = '', children, ...props }) => {
  return (
    <AriaMeter
      {...props}
      className={`grid grid-areas-[label_value/bar_bar] grid-cols-[1fr_auto] gap-1 w-[250px] text-neutral-900 ${className}`}
    >
      {children}
    </AriaMeter>
  );
};

export const MeterLabel: React.FC<React.ComponentProps<typeof Label>> = ({ className = '', ...props }) => {
  return <Label {...props} className={`grid-area-[label] ${className}`} />;
};

export const MeterValue: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ className = '', ...props }) => {
  return <span {...props} className={`grid-area-[value] text-base leading-normal ${className}`} />;
};

export const MeterBar: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', ...props }) => {
  return (
    <div
      {...props}
      className={`grid-area-[bar] shadow-[inset_0px_0px_0px_1px_#e5e7eb] h-[10px] rounded-md overflow-hidden ${className}`}
    />
  );
};

export const MeterFill: React.FC<React.HTMLAttributes<HTMLDivElement> & { percentage: number }> = ({ percentage, className = '', ...props }) => {
  return <div {...props} className={`w-[${percentage}%] bg-blue-500 h-full ${className}`} style={{ width: `${percentage}%` }} />;
};

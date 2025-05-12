
import React from 'react';
import { ProgressBar as AriaProgressBar } from 'react-aria-components';
import { Label } from './Form';

export const ProgressBar: React.FC<React.ComponentProps<typeof AriaProgressBar>> = ({ className = '', children, ...props }) => {
  return (
    <AriaProgressBar
      {...props}
      className={`grid grid-areas-[label_value/bar_bar] grid-cols-[1fr_auto] gap-1 w-[250px] text-neutral-900 ${className}`}
    >
      {children}
    </AriaProgressBar>
  );
};

export const ProgressBarLabel: React.FC<React.ComponentProps<typeof Label>> = ({ className = '', ...props }) => {
  return <Label {...props} className={`grid-area-[label] ${className}`} />;
};

export const ProgressBarValue: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ className = '', ...props }) => {
  return <span {...props} className={`grid-area-[value] text-base leading-normal ${className}`} />;
};

export const ProgressBarBar: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', ...props }) => {
  return (
    <div
      {...props}
      className={`grid-area-[bar] shadow-[inset_0px_0px_0px_1px_#e5e7eb] h-[10px] rounded-md overflow-hidden ${className}`}
    />
  );
};

export const ProgressBarFill: React.FC<React.HTMLAttributes<HTMLDivElement> & { percentage: number | undefined }> = ({ percentage = 0, className = '', ...props }) => {
  return <div {...props} className={`bg-blue-500 h-full ${className}`} style={{ width: `${percentage}%` }} />;
};

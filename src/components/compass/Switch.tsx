
import React from 'react';
import { Switch as RACSwitch, SwitchProps } from 'react-aria-components';

export const Switch: React.FC<SwitchProps & { labelOn?: 'left' | 'right' }> = ({
  labelOn = 'left',
  className = '',
  children,
  ...props
}) => {
  return (
    <RACSwitch
      {...props}
      className={`flex items-center gap-3 text-neutral-900 w-fit ${className}`}
    >
      {labelOn === 'right' && <IndicatorSpan />}
      {children}
      {labelOn === 'left' && <IndicatorSpan />}
    </RACSwitch>
  );
};

const IndicatorSpan: React.FC = () => (
  <span className="indicator w-8 h-[1.125rem] border border-neutral-400 bg-neutral-200 rounded-full transition-all box-border
    before:content-[''] before:block before:m-0.5 before:w-[0.875rem] before:h-[0.875rem] before:bg-white before:rounded-full before:transition-transform
    group-data-[hovered]/switch:bg-neutral-300
    group-data-[pressed]/switch:bg-neutral-400
    group-data-[selected]/switch:bg-blue-500 group-data-[selected]/switch:border-blue-500 group-data-[selected]/switch:before:translate-x-full
    group-data-[selected][data-hovered]/switch:bg-blue-600 group-data-[selected][data-hovered]/switch:border-blue-600
    group-data-[selected][data-pressed]/switch:bg-blue-700
    group-data-[disabled]/switch:opacity-50 group-data-[disabled]/switch:cursor-not-allowed
    group-data-[focus-visible]/switch:outline-2 group-data-[focus-visible]/switch:outline-blue-400 group-data-[focus-visible]/switch:outline-offset-2" />
);

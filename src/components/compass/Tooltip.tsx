
import React from 'react';
import {
  Tooltip as AriaTooltip,
  OverlayArrow,
  TooltipProps,
  TooltipTrigger,
} from 'react-aria-components';

export const TooltipArrowIcon: React.FC = () => (
  <svg width={8} height={8} viewBox="0 0 8 8">
    <path d="M0 0 L4 4 L8 0" />
  </svg>
);

export const StyledTooltip: React.FC<React.ComponentProps<typeof AriaTooltip>> = (props) => {
  return (
    <AriaTooltip
      {...props}
      className={`shadow-lg rounded-lg bg-neutral-600 text-white outline-none p-3 max-w-[380px] transform-gpu
      data-[placement=top]:mb-2 data-[placement=top]:origin-[translateY(4px)]
      data-[placement=bottom]:mt-3 data-[placement=bottom]:origin-[translateY(-4px)]
      data-[placement=bottom]:react-aria-OverlayArrow:svg:rotate-180
      data-[placement=right]:ml-2 data-[placement=right]:origin-[translateX(-4px)]
      data-[placement=right]:react-aria-OverlayArrow:svg:rotate-90
      data-[placement=left]:mr-2 data-[placement=left]:origin-[translateX(4px)]
      data-[placement=left]:react-aria-OverlayArrow:svg:rotate-[-90deg] ${props.className || ''}`}
    />
  );
};

export const Tooltip: React.FC<Omit<TooltipProps, 'children'> & { children: React.ReactNode }> = ({ children, ...props }) => (
  <StyledTooltip {...props}>
    <OverlayArrow>
      <svg width={8} height={8} viewBox="0 0 8 8" className="block h-2">
        <path d="M0 0 L4 4 L8 0" />
      </svg>
    </OverlayArrow>
    {children}
  </StyledTooltip>
);

export { TooltipTrigger };

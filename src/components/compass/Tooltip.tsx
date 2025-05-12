import styled from '@emotion/styled';
import React from 'react';
import {
  Tooltip as AriaTooltip,
  OverlayArrow as AriaOverlayArrow,
} from 'react-aria-components';
import type { TooltipProps } from 'react-aria-components';

import { theme } from './theme';

export { TooltipTrigger } from 'react-aria-components';

export const TooltipArrowIcon = () => (
  <svg width={8} height={8} viewBox="0 0 8 8">
    <path d="M0 0 L4 4 L8 0" />
  </svg>
);

export const StyledTooltip = styled(AriaTooltip)`
  box-shadow: 0 8px 20px rgba(0 0 0 / 0.1);
  border-radius: ${theme.radii.card};
  background: ${theme.colors.n600};
  color: ${theme.colors.white};
  forced-color-adjust: none;
  outline: none;
  padding: ${theme.space.space12};
  max-width: 380px;
  /* fixes FF gap */
  transform: translate3d(0, 0, 0);

  &[data-placement='top'] {
    margin-bottom: 8px;
    --origin: translateY(4px);
  }

  &[data-placement='bottom'] {
    margin-top: 12px;
    --origin: translateY(-4px);
    & .react-aria-OverlayArrow svg {
      transform: rotate(180deg);
    }
  }

  &[data-placement='right'] {
    margin-left: 8px;
    --origin: translateX(-4px);
    & .react-aria-OverlayArrow svg {
      transform: rotate(90deg);
    }
  }
  &[data-placement='left'] {
    margin-right: 8px;
    --origin: translateX(4px);
    & .react-aria-OverlayArrow svg {
      transform: rotate(-90deg);
    }
  }

  & .react-aria-OverlayArrow svg {
    display: block;
    height: ${theme.space.space8};
  }
`;

interface MyTooltipProps extends Omit<TooltipProps, 'children'> {
  children: React.ReactNode;
}

export const Tooltip = ({ children, ...props }: MyTooltipProps) => (
  <StyledTooltip {...props}>
    <AriaOverlayArrow>
      <svg width={8} height={8} viewBox="0 0 8 8">
        <path d="M0 0 L4 4 L8 0" />
      </svg>
    </AriaOverlayArrow>
    {children}
  </StyledTooltip>
);

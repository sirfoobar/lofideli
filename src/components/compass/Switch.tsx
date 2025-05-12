import styled from '@emotion/styled';
import React from 'react';
import { Switch as RACSwitch } from 'react-aria-components';
import type { SwitchProps as RACSwitchProps } from 'react-aria-components';

import { theme } from './theme';

const StyledSwitch = styled(RACSwitch)`
  display: flex;
  align-items: center;
  gap: ${theme.space.space12};
  color: ${theme.colors.n900};
  forced-color-adjust: none;
  width: fit-content;

  .indicator {
    width: ${theme.space.space32};
    height: 1.125rem;
    border: ${theme.borderWidths.regular} solid ${theme.colors.n400};
    background: ${theme.colors.n200};
    border-radius: ${theme.radii.circle};
    transition: all 200ms;
    transition: outline 0ms;
    box-sizing: content-box;

    &:before {
      content: '';
      display: block;
      margin: ${theme.space.space2};
      width: 0.875rem;
      height: 0.875rem;
      background: ${theme.colors.white};
      border-radius: ${theme.radii.circle};
      transition: transform 200ms;
    }
  }

  &[data-hovered] .indicator {
    background: ${theme.colors.n300};
  }

  &[data-pressed] .indicator {
    background: ${theme.colors.n400};
  }

  &[data-selected] {
    &[data-hovered] .indicator {
      background: ${theme.colors.blue600};
      border-color: ${theme.colors.blue600};
    }

    &[data-pressed] .indicator {
      background: ${theme.colors.blue700};
    }

    .indicator {
      background: ${theme.colors.blue500};
      border-color: ${theme.colors.blue500};

      &:before {
        background: ${theme.colors.white};
        transform: translateX(100%);
      }
    }
  }

  &[data-disabled] {
    opacity: ${theme.opacity.semiOpaque};
    cursor: not-allowed;
  }

  &[data-focus-visible] .indicator {
    outline: ${theme.borderWidths.thick} solid ${theme.colors.blue400};
    outline-offset: ${theme.space.space2};
  }
`;

interface SwitchProps extends Omit<RACSwitchProps, 'children'> {
  labelOn?: 'left' | 'right';
  children: React.ReactNode;
}

export const Switch = ({
  labelOn = 'left',
  children,
  ...props
}: SwitchProps) => (
  <StyledSwitch {...props}>
    {labelOn === 'right' && <span className="indicator" />}
    {children}
    {labelOn === 'left' && <span className="indicator" />}
  </StyledSwitch>
);
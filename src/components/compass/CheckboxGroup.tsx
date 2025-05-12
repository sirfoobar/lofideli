import styled from '@emotion/styled';
import React from 'react';
import {
  Checkbox as AriaCheckbox,
  CheckboxGroup as AriaCheckboxGroup,
  CheckboxProps as AriaCheckboxProps,
} from 'react-aria-components';

import { CheckIcon, MinusIcon } from '../../icons';
import { theme } from './theme';

export const StyledCheckbox = styled(AriaCheckbox)`
  display: flex;
  align-items: center;
  gap: ${theme.space.space12};
  font-size: ${theme.fontSizes.fontsize16};

  .checkbox {
    width: ${theme.space.space20};
    height: ${theme.space.space20};
    border: ${theme.borderWidths.regular} solid ${theme.colors.n200};
    border-radius: ${theme.radii.rounded};
  }

  &[data-pressed] .checkbox {
    border-color: ${theme.colors.blue600};
  }

  &[data-focus-visible] .checkbox {
    outline: ${theme.borderWidths.thick} solid ${theme.colors.blue400};
    outline-offset: ${theme.space.space2};
  }

  &[data-selected],
  &[data-indeterminate] {
    .checkbox {
      border-color: ${theme.colors.blue500};
      background: ${theme.colors.blue500};
    }

    &[data-pressed] .checkbox {
      border-color: ${theme.colors.blue600};
      background: ${theme.colors.blue600};
    }
  }

  &[data-invalid] {
    .checkbox {
      border-color: ${theme.colors.red500};
    }

    &[data-pressed] .checkbox {
      border-color: ${theme.colors.red600};
    }

    &[data-selected],
    &[data-indeterminate] {
      .checkbox {
        background: ${theme.colors.red500});
      }

      &[data-pressed] .checkbox {
        background: ${theme.colors.red600};
      }
    }
  }

  &[data-disabled] {
    opacity: ${theme.opacity.semiOpaque};
    cursor: not-allowed;
  }
`;

export const Checkbox = ({ children, ...rest }: AriaCheckboxProps) => (
  <StyledCheckbox {...rest}>
    {({ isSelected, isIndeterminate }) => (
      <>
        <div className="checkbox" aria-hidden="true">
          {isSelected && <CheckIcon size={18} color="white" />}
          {isIndeterminate && <MinusIcon size={18} color="white" />}
        </div>
        {children}
      </>
    )}
  </StyledCheckbox>
);

export const CheckboxGroup = styled(AriaCheckboxGroup)`
  display: flex;
  flex-direction: column;
  gap: ${theme.space.space8};

  &[data-orientation='horizontal'] {
    flex-direction: row;
    align-items: center;
  }
`;

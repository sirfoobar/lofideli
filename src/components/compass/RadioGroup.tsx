import styled from '@emotion/styled';
import {
  Radio as AriaRadio,
  RadioGroup as AriaRadioGroup,
} from 'react-aria-components';

import { theme } from './theme';

export const Radio = styled(AriaRadio)`
  display: flex;
  align-items: center;
  gap: ${theme.space.space12};
  font-size: ${theme.fontSizes.fontsize16};

  &:before {
    content: '';
    display: block;
    width: ${theme.space.space20};
    height: ${theme.space.space20};
    box-sizing: border-box;
    border: ${theme.borderWidths.regular} solid ${theme.colors.n300};
    background: ${theme.colors.white};
    border-radius: ${theme.radii.circle};
  }

  &[data-hovered]:before {
    border-color: ${theme.colors.n300};
  }

  &[data-pressed]:before {
    border-color: ${theme.colors.n500};
  }

  &[data-selected] {
    &:before {
      border-color: ${theme.colors.blue500};
      border-width: 6px;
    }

    &[data-pressed]:before {
      border-color: ${theme.colors.blue600};
    }
  }

  &[data-disabled] {
    opacity: ${theme.opacity.semiOpaque};
    cursor: not-allowed;
  }

  &[data-focus-visible]:before {
    outline: ${theme.borderWidths.thick} solid ${theme.colors.blue400};
    outline-offset: ${theme.space.space2};
  }
`;

export const RadioGroup = styled(AriaRadioGroup)`
  display: flex;
  flex-direction: column;
  gap: ${theme.space.space8};

  &[data-orientation='horizontal'] {
    flex-direction: row;
    align-items: center;
  }
`;

import styled from '@emotion/styled';
import { ToggleButton as AriaToggleButton } from 'react-aria-components';

import { theme } from '../../theme';

export const ToggleButton = styled(AriaToggleButton)`
  display: inline-flex;
  width: fit-content;
  padding: ${theme.space.space8} ${theme.space.space16};
  justify-content: center;
  align-items: center;
  gap: ${theme.space.space8};
  flex-shrink: 0;
  flex-grow: 0;
  border: ${theme.borderWidths.regular} solid ${theme.colors.n80};
  border-radius: ${theme.radii.circle};
  outline: none;
  box-sizing: border-box;
  height: ${theme.space.space40};
  font-size: ${theme.fontSizes.fontsize14};
  background: none;

  &[data-hovered] {
    background: ${theme.colors.n60};
    border: ${theme.borderWidths.regular} solid ${theme.colors.n90};
  }

  &[data-pressed] {
    background: ${theme.colors.n70};
    border: ${theme.borderWidths.regular} solid ${theme.colors.n100};
  }

  &[data-disabled] {
    opacity: ${theme.opacity.semiOpaque};
    cursor: not-allowed;
  }

  &[data-selected] {
    border: ${theme.borderWidths.thick} solid ${theme.colors.n900};
    font-weight: ${theme.fontWeights.medium};
  }

  &[data-focus-visible] {
    outline: ${theme.borderWidths.thick} solid ${theme.colors.blue400};
    outline-offset: ${theme.space.space2};
  }
`;

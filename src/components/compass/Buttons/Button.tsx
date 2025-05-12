import styled from '@emotion/styled';
import { Button as AriaButton, ButtonProps } from 'react-aria-components';
import { theme } from '../theme';

export const BaseButton = styled(AriaButton)`
  display: inline-flex;
  width: fit-content;
  padding: ${theme.space.space8} ${theme.space.space16};
  justify-content: center;
  align-items: center;
  gap: ${theme.space.space8};
  flex-shrink: 0;
  flex-grow: 0;
  border-radius: ${theme.radii.circle};
  outline: none;
  box-sizing: border-box;
  height: ${theme.space.space40};
  font-size: ${theme.fontSizes.fontsize14};
  font-weight: ${theme.fontWeights.medium};

  &[data-disabled] {
    opacity: ${theme.opacity.semiOpaque};
    cursor: not-allowed;
  }

  &[data-focus-visible] {
    outline: ${theme.borderWidths.thick} solid ${theme.colors.blue400};
    outline-offset: ${theme.space.space2};
  }
`;

export const PrimaryButton = styled(BaseButton)`
  background: ${theme.colors.blue500};
  border: ${theme.borderWidths.regular} solid ${theme.colors.blue600};
  color: ${theme.colors.white};

  &[data-hovered] {
    background: ${theme.colors.blue600};
  }

  &[data-pressed] {
    background: ${theme.colors.blue700};
    border: 1px solid ${theme.colors.blue700};
  }
`;

export const SecondaryButton = styled(BaseButton)`
  background: ${theme.colors.n700};
  border: ${theme.borderWidths.regular} solid ${theme.colors.n700};
  color: ${theme.colors.white};

  &[data-hovered] {
    background: ${theme.colors.n800};
    border: 1px solid ${theme.colors.n800};
  }

  &[data-pressed] {
    background: ${theme.colors.n900};
    border: 1px solid ${theme.colors.n900};
  }
`;

export const TertiaryButton = styled(BaseButton)`
  background: transparent;
  border: ${theme.borderWidths.regular} solid ${theme.colors.n700};
  color: ${theme.colors.n700};

  &[data-hovered] {
    background: ${theme.colors.n100};
    border: 1px solid ${theme.colors.n800};
    color: ${theme.colors.n800};
  }

  &[data-pressed] {
    background: ${theme.colors.n200};
    border: 1px solid ${theme.colors.n900};
    color: ${theme.colors.n900};
  }
`;

export const IconButton = styled(BaseButton)`
  padding: ${theme.space.space8};
  border-radius: ${theme.radii.circle};
  background: transparent;
  border: none;
  color: ${theme.colors.n700};

  &[data-hovered] {
    background: ${theme.colors.n100};
    color: ${theme.colors.n800};
  }

  &[data-pressed] {
    background: ${theme.colors.n200};
    color: ${theme.colors.n900};
  }
`;

export const Button = PrimaryButton; 
import styled from '@emotion/styled';
import { Button as AriaButton, ButtonProps } from 'react-aria-components';

import { theme } from './theme';

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
  background: ${theme.colors.n70};
  border: ${theme.borderWidths.regular} solid ${theme.colors.n70};
  color: ${theme.colors.n900};

  &[data-hovered] {
    background: ${theme.colors.n80};
    border: ${theme.borderWidths.regular} solid ${theme.colors.n80};
  }

  &[data-pressed] {
    background: ${theme.colors.n90};
    border: ${theme.borderWidths.regular} solid ${theme.colors.n90};
  }
`;

export const FlatButton = styled(BaseButton)`
  background: transparent;
  border: ${theme.borderWidths.regular} solid transparent;
  color: ${theme.colors.n900};

  &[data-hovered] {
    background: ${theme.colors.n60};
    border: ${theme.borderWidths.regular} solid ${theme.colors.n60};
  }

  &[data-pressed] {
    background: ${theme.colors.n70};
    border: ${theme.borderWidths.regular} solid ${theme.colors.n70};
  }
`;

export const DestructiveButton = styled(BaseButton)`
  background: ${theme.colors.red500};
  border: ${theme.borderWidths.regular} solid ${theme.colors.red600};
  color: ${theme.colors.white};

  &[data-hovered] {
    background: ${theme.colors.red600};
    border: ${theme.borderWidths.regular} solid ${theme.colors.red600};
  }

  &[data-pressed] {
    background: ${theme.colors.red700};
    border: ${theme.borderWidths.regular} solid ${theme.colors.red700};
  }
`;

interface IconButtonProps extends ButtonProps {
  size?: 'small' | 'default';
}

export const IconButton = styled(BaseButton)<IconButtonProps>(
  ({ size }: IconButtonProps) => `
  padding: ${theme.space.space8};
  width: ${size === 'small' ? theme.space.space32 : theme.space.space40};
  height: ${size === 'small' ? theme.space.space32 : theme.space.space40};

  background: transparent;
  border: ${theme.borderWidths.regular} solid transparent;
  color: ${theme.colors.n900};

  &[data-hovered] {
    background: ${theme.colors.n60};
    border: ${theme.borderWidths.regular} solid ${theme.colors.n60};
  }

  &[data-pressed] {
    background: ${theme.colors.n70};
    border: ${theme.borderWidths.regular} solid ${theme.colors.n70};
  }
`,
);

export const LinkButton = styled(AriaButton)`
  text-decoration: none;
  background: none;
  border: none;
  padding: 0;
  outline: none;
  color: ${theme.colors.blue500};

  &[data-hovered] {
    color: ${theme.colors.blue600};
  }

  &[data-pressed] {
    color: ${theme.colors.blue700};
  }

  &[data-disabled] {
    color: ${theme.colors.n900};
  }

  &[data-focus-visible] {
    outline: ${theme.borderWidths.thick} solid ${theme.colors.blue400};
    outline-offset: ${theme.space.space2};
    border-radius: ${theme.radii.rounded};
  }
`;

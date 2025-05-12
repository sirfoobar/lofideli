import styled from '@emotion/styled';
import { Link as AriaLink, LinkProps } from 'react-aria-components';

import { theme } from './theme';
export { Link as UnstyledLink } from 'react-aria-components';

export const Link = styled(AriaLink)`
  text-decoration: none;
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

const BaseButtonLink = styled(AriaLink)`
  display: inline-flex;
  width: fit-content;
  text-decoration: none;
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

export const PrimaryButtonLink = styled(BaseButtonLink)`
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

export const SecondaryButtonLink = styled(BaseButtonLink)`
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

export const FlatButtonLink = styled(BaseButtonLink)`
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

export const DestructiveButtonLink = styled(BaseButtonLink)`
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

interface IconButtonLinkProps extends LinkProps {
  size?: 'small' | 'default';
}

export const IconButtonLink = styled(FlatButtonLink)<IconButtonLinkProps>(
  ({ size }: IconButtonLinkProps) => `
  padding: ${theme.space.space8};
  width: ${size === 'small' ? theme.space.space32 : theme.space.space40};
  height: ${size === 'small' ? theme.space.space32 : theme.space.space40};
`,
);

export const BreadcrumbLink = styled(AriaLink)`
  color: ${theme.colors.n600};
  outline: none;
  position: relative;
  text-decoration: none;
  cursor: pointer;

  &[data-hovered] {
    text-decoration: underline;
  }

  &[data-current] {
    color: ${theme.colors.n900};
    font-weight: ${theme.fontWeights.semiBold};
    cursor: auto;
  }

  &[data-focus-visible]:after {
    content: '';
    position: absolute;
    inset: -2px -4px;
    border-radius: 6px;
    border: 2px solid var(--focus-ring-color);
  }
`;

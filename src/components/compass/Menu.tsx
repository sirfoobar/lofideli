import styled from '@emotion/styled';
import {
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
} from 'react-aria-components';

import { theme } from './theme';
export { MenuTrigger } from 'react-aria-components';

export const Menu = styled(AriaMenu)`
  max-height: inherit;
  overflow: auto;
  min-width: 150px;
  max-width: 560px;
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.white};
  gap: ${theme.space.space2};
  outline: none;
  border: ${theme.borderWidths.regular} solid ${theme.colors.n80};
  border-radius: ${theme.radii.card};

  a {
    cursor: pointer;
  }
`;

export const MenuItem = styled(AriaMenuItem)`
  padding: ${theme.space.space12} ${theme.space.space16};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  outline: none;
  cursor: default;
  text-decoration: none;
  color: ${theme.colors.n900};

  &[data-hovered] {
    background-color: ${theme.colors.n60};
  }

  &[data-focus-visible] {
    background-color: ${theme.colors.n60};
  }
`;

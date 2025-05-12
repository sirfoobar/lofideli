import styled from '@emotion/styled';
import {
  GridList as AriaGridList,
  GridListItem as AriaGridListItem,
} from 'react-aria-components';

import { theme } from './theme';

export const GridList = styled(AriaGridList)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${theme.space.space16};
  padding: ${theme.space.space8};
  list-style: none;
  margin: 0;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  &[data-focus-visible] {
    outline: ${theme.borderWidths.thick} solid ${theme.colors.blue400};
    outline-offset: ${theme.space.space2};
  }
`;

export const GridListItem = styled(AriaGridListItem)`
  display: flex;
  flex-direction: column;
  gap: ${theme.space.space8};
  padding: ${theme.space.space16};
  border: ${theme.borderWidths.regular} solid ${theme.colors.n80};
  border-radius: ${theme.radii.field};
  background: ${theme.colors.white};
  cursor: pointer;
  transition: all 200ms;

  &[data-hovered] {
    border-color: ${theme.colors.n90};
    background: ${theme.colors.n60};
  }

  &[data-selected] {
    border-color: ${theme.colors.blue500};
    background: ${theme.colors.blue100};
  }

  &[data-disabled] {
    opacity: ${theme.opacity.semiOpaque};
    cursor: not-allowed;
  }

  &[data-focus-visible] {
    outline: ${theme.borderWidths.thick} solid ${theme.colors.blue400};
    outline-offset: ${theme.space.space2};
  }
`;

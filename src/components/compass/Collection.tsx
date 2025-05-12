import styled from '@emotion/styled';
import {
  Collection as AriaCollection,
  Section as AriaSection,
} from 'react-aria-components';

import { theme } from './theme';

export const Collection = styled(AriaCollection)`
  display: flex;
  flex-direction: column;
  gap: ${theme.space.space8};
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  list-style: none;
  margin: 0;
  padding: 0;

  &[data-focus-visible] {
    outline: ${theme.borderWidths.thick} solid ${theme.colors.blue400};
    outline-offset: ${theme.space.space2};
  }
`;

export const Section = styled(AriaSection)`
  display: flex;
  flex-direction: column;
  gap: ${theme.space.space8};
  padding: ${theme.space.space8};
  border: ${theme.borderWidths.regular} solid ${theme.colors.n80};
  border-radius: ${theme.radii.field};
  background: ${theme.colors.white};

  &[data-focus-visible] {
    outline: ${theme.borderWidths.thick} solid ${theme.colors.blue400};
    outline-offset: ${theme.space.space2};
  }
`;

import styled from '@emotion/styled';
import {
  Tabs as AriaTabs,
  TabList as AriaTabList,
  Tab as AriaTab,
} from 'react-aria-components';

import { theme } from '../theme';

export const Tabs = styled(AriaTabs)`
  display: flex;

  &[data-orientation='horizontal'] {
    flex-direction: column;
  }
`;

export const TabList = styled(AriaTabList)`
  display: flex;

  &[data-orientation='horizontal'] {
    border-bottom: ${theme.borderWidths.regular} solid ${theme.colors.n70};
  }
`;

export const Tab = styled(AriaTab)`
  padding: ${theme.space.space8} ${theme.space.space16};
  cursor: default;
  outline: none;
  position: relative;
  transition: all 200ms;
  border: ${theme.borderWidths.regular} solid transparent;
  border-top-left-radius: ${theme.radii.field};
  border-top-right-radius: ${theme.radii.field};
  forced-color-adjust: none;
  color: ${theme.colors.n400};

  &[data-hovered],
  &[data-focused] {
    background: ${theme.colors.n50};
    color: ${theme.colors.n900};
  }

  &[data-selected] {
    border-color: ${theme.colors.n70};
    background: ${theme.colors.n60};
    color: ${theme.colors.n900};
    font-weight: ${theme.fontWeights.medium};
  }

  &[data-disabled] {
    opacity: ${theme.opacity.semiOpaque};
  }

  &[data-focus-visible]:after {
    content: '';
    position: absolute;
    inset: 4px;
    border-radius: 4px;
    border: ${theme.borderWidths.thick} solid ${theme.colors.blue400};
  }
`;

export { TabPanel } from 'react-aria-components';

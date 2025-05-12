import styled from '@emotion/styled';
import { Meter as AriaMeter } from 'react-aria-components';

import { theme } from './theme';

import { Label } from './Form';

export const Meter = styled(AriaMeter)`
  display: grid;
  grid-template-areas:
    'label value'
    'bar bar';
  grid-template-columns: 1fr auto;
  gap: 4px;
  width: 250px;
  color: ${theme.colors.n900};
`;

export const MeterLabel = styled(Label)`
  grid-area: label;
`;

export const MeterValue = styled.span`
  grid-area: value;
  font-size: ${theme.fontSizes.body};
  line-height: ${theme.lineHeights.body};
`;

export const MeterBar = styled.div`
  grid-area: bar;
  box-shadow: inset 0px 0px 0px 1px ${theme.colors.n70};
  forced-color-adjust: none;
  height: 10px;
  border-radius: 5px;
  overflow: hidden;
`;

export const MeterFill = styled.div<{ percentage: number }>(
  ({ percentage }) => `
    width: ${percentage}%;
    background: ${theme.colors.blue500};
    height: 100%;
  `,
);

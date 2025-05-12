import styled from '@emotion/styled';
import {
  Slider as AriaSlider,
  SliderOutput as AriaSliderOutput,
  SliderThumb as AriaSliderThumb,
  SliderTrack as AriaSliderTrack,
} from 'react-aria-components';

import { theme } from './theme';

import { Label } from './Form';

export const Slider = styled(AriaSlider)`
  display: grid;
  grid-template-areas:
    'label output'
    'track track';
  grid-template-columns: 1fr auto;
  max-width: 300px;
  color: ${theme.colors.n900};
`;

export const SliderLabel = styled(Label)`
  grid-area: label;
`;

export const SliderOutput = styled(AriaSliderOutput)`
  grid-area: output;
`;

export const SliderThumb = styled(AriaSliderThumb)`
  width: ${theme.space.space20};
  height: ${theme.space.space20};
  border-radius: ${theme.radii.circle};
  background: ${theme.colors.blue500};
  border: ${theme.borderWidths.thick} solid ${theme.colors.white};
  forced-color-adjust: none;

  &[data-hovered] {
    background: ${theme.colors.blue600};
  }

  &[data-dragging] {
    background: ${theme.colors.blue700};
  }

  &[data-focus-visible] {
    outline: 2px solid ${theme.colors.blue400};
  }
  top: 50%;
`;

export const SliderTrack = styled(AriaSliderTrack)`
  grid-area: track;
  position: relative;

  /* track line */
  &:before {
    content: '';
    display: block;
    position: absolute;
    background: ${theme.colors.n70};
    border-radius: ${theme.radii.circle};
  }

  height: 30px;
  width: 100%;

  &:before {
    height: 3px;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
`;
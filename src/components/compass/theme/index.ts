import { ThemeValue, ResponsiveValue } from 'styled-system';

import mediaQueries from '../tokens/mediaQueries';

import { borderWidths } from './borderWidths';
import { colors } from './colors';
import { fontFamilies } from './fontFamilies';
import { fontSizes } from './fontSizes';
import { fontWeights } from './fontWeights';
import { letterSpacings } from './letterSpacings';
import { lineHeights } from './lineHeights';
import { opacities } from './opacities';
import { radii } from './radii';
import { shadows } from './shadows';
import { spacing } from './spacing';
import { zIndices } from './zIndices';

export const theme = {
  colors,
  fontSizes,
  fontWeights,
  fonts: fontFamilies,
  lineHeights,
  opacity: opacities,
  radii,
  shadows,
  zIndices,
  space: spacing,
  borderWidths,
  letterSpacings,
  mediaQueries,
  breakpoints: [mediaQueries.small, mediaQueries.medium, mediaQueries.large],
};

export type Theme = typeof theme;

/**
 * Restrict responsive arrays to contain only Compass theme tokens
 */
export type CompassResponsiveValue<ThemeKey extends keyof typeof theme> =
  ResponsiveValue<ThemeValue<ThemeKey, Theme>, Theme>;

export * from './colors';
export * from './fontSizes';
export * from './fontWeights';
export * from './fontFamilies';
export * from './lineHeights';
export * from './opacities';
export * from './radii';
export * from './shadows';
export * from './zIndices';
export * from './spacing';
export * from './borderWidths';
export * from './letterSpacings';

export interface ThemeProps {
  theme?: Theme;
}

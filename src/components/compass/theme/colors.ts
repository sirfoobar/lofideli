import colors from '../tokens/colors';

export type ThemeColor = keyof typeof colors;

export type ThemeColorValue = typeof colors[keyof typeof colors];

export { colors };

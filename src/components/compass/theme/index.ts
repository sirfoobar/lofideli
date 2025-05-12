
// Simplified theme that doesn't rely on styled-system
export const theme = {
  colors: {
    // Neutrals
    white: '#ffffff',
    black: '#000000',
    n50: '#f9fafb',
    n60: '#f3f4f6',
    n70: '#e5e7eb',
    n80: '#d1d5db',
    n90: '#9ca3af',
    n100: '#6b7280',
    n200: '#4b5563',
    n300: '#374151',
    n400: '#1f2937',
    n500: '#111827',
    n600: '#0f172a',
    n700: '#0f172a',
    n800: '#0f172a',
    n900: '#0f172a',
    
    // Blues
    blue50: '#eff6ff',
    blue100: '#dbeafe',
    blue400: '#60a5fa',
    blue500: '#3b82f6',
    blue600: '#2563eb',
    blue700: '#1d4ed8',
    
    // Reds
    red500: '#ef4444',
    red600: '#dc2626',
  },
  space: {
    space2: '2px',
    space4: '4px',
    space8: '8px',
    space12: '12px',
    space16: '16px',
    space20: '20px',
    space24: '24px',
    space32: '32px',
    space40: '40px',
  },
  fontSizes: {
    body: '1rem',
    fontsize10: '0.625rem',
    fontsize12: '0.75rem',
    fontsize13: '0.8125rem',
    fontsize14: '0.875rem',
    fontsize16: '1rem',
    fontsize20: '1.25rem',
    fontsize24: '1.5rem',
    fontsize28: '1.75rem',
    fontsize32: '2rem',
    h5: '1.125rem',
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    h5: 1.5,
    lineheight16: 1.0,
    lineheight20: 1.25,
    lineheight24: 1.5,
    lineheight28: 1.75,
  },
  borderWidths: {
    regular: '1px',
    thick: '2px',
  },
  radii: {
    field: '4px',
    card: '8px',
    circle: '9999px',
  },
  opacity: {
    semiOpaque: 0.5,
  },
};

export type Theme = typeof theme;

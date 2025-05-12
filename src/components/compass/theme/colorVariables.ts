import { css } from '@emotion/core';

export const currentColors = css`
  --white: rgba(255, 255, 255, 1);
  --cg-30: rgba(250, 250, 250, 1);
  --cg-40: rgba(247, 247, 247, 1);
  --cg-50: rgba(241, 241, 241, 1);
  --cg-60: rgba(237, 237, 237, 1);
  --cg-70: rgba(235, 235, 235, 1);
  --cg-80: rgba(232, 232, 232, 1);
  --cg-90: rgba(227, 227, 227, 1);
  --cg-100: rgba(212, 212, 212, 1);
  --cg-200: rgba(195, 197, 201, 1);
  --cg-300: rgba(164, 168, 176, 1);
  --cg-400: rgba(133, 139, 151, 1);
  --cg-500: rgba(107, 115, 133, 1);
  --cg-600: rgba(76, 86, 104, 1);
  --cg-650: rgba(56, 69, 92, 1);
  --cg-700: rgba(48, 61, 82, 1);
  --cg-800: rgba(28, 39, 58, 1);
  --cg-900: rgba(15, 28, 46, 1);
  --blue-50: rgba(235, 242, 255, 1);
  --blue-100: rgba(214, 227, 250, 1);
  --blue-200: rgba(168, 201, 255, 1);
  --blue-300: rgba(115, 176, 255, 1);
  --blue-400: rgba(82, 145, 255, 1);
  --blue-500: rgba(26, 102, 247, 1);
  --blue-600: rgba(33, 82, 229, 1);
  --blue-700: rgba(0, 61, 184, 1);
  --blue-800: rgba(0, 41, 133, 1);
  --blue-900: rgba(0, 23, 84, 1);
  --green-50: rgba(227, 245, 229, 1);
  --green-100: rgba(196, 237, 207, 1);
  --green-200: rgba(148, 229, 171, 1);
  --green-300: rgba(92, 196, 128, 1);
  --green-slime: rgba(0, 219, 116, 1);
  --green-400: rgba(0, 166, 87, 1);
  --green-500: rgba(0, 133, 66, 1);
  --green-600: rgba(0, 110, 56, 1);
  --green-700: rgba(0, 82, 41, 1);
  --green-800: rgba(0, 56, 26, 1);
  --green-900: rgba(0, 33, 10, 1);
  --red-50: rgba(255, 240, 237, 1);
  --red-100: rgba(252, 219, 214, 1);
  --red-200: rgba(255, 199, 191, 1);
  --red-300: rgba(237, 145, 135, 1);
  --red-400: rgba(237, 97, 89, 1);
  --red-500: rgba(204, 66, 66, 1);
  --red-600: rgba(176, 38, 46, 1);
  --red-700: rgba(143, 0, 28, 1);
  --red-800: rgba(102, 0, 15, 1);
  --red-900: rgba(59, 5, 3, 1);
  --purple-50: rgba(245, 237, 255, 1);
  --purple-100: rgba(235, 222, 250, 1);
  --purple-200: rgba(214, 189, 245, 1);
  --purple-300: rgba(196, 156, 237, 1);
  --purple-400: rgba(168, 125, 224, 1);
  --purple-500: rgba(138, 92, 207, 1);
  --purple-600: rgba(115, 71, 181, 1);
  --purple-700: rgba(87, 51, 148, 1);
  --purple-800: rgba(61, 31, 110, 1);
  --purple-900: rgba(36, 15, 74, 1);
  --khaki-50: rgba(242, 242, 212, 1);
  --warning-contrast: rgba(51, 48, 0, 1);
  --warning: rgba(245, 232, 110, 1);
  --khaki-100: rgba(232, 232, 196, 1);
  --khaki-200: rgba(217, 214, 156, 1);
  --khaki-300: rgba(176, 173, 97, 1);
  --khaki-400: rgba(145, 148, 51, 1);
  --khaki-500: rgba(120, 122, 23, 1);
  --khaki-600: rgba(94, 97, 0, 1);
  --khaki-700: rgba(71, 74, 0, 1);
  --khaki-800: rgba(48, 51, 0, 1);
  --khaki-900: rgba(28, 28, 0, 1);
  --bronze-50: rgba(255, 249, 230, 1);
  --bronze-100: rgba(253, 222, 179, 1);
  --bronze-200: rgba(245, 190, 118, 1);
  --bronze-300: rgba(221, 159, 84, 1);
  --bronze-400: rgba(191, 133, 50, 1);
  --bronze-500: rgba(159, 106, 21, 1);
  --bronze-600: rgba(133, 84, 0, 1);
  --bronze-700: rgba(105, 61, 0, 1);
  --bronze-800: rgba(79, 38, 0, 1);
  --bronze-900: rgba(57, 16, 0, 1);
  --neutral-30: rgba(251, 251, 251, 1);
  --neutral-40: rgba(247, 247, 247, 1);
  --neutral-60: rgba(237, 237, 237, 1);
  --neutral-50: rgba(241, 241, 241, 1);
  --neutral-70: rgba(227, 227, 227, 1);
  --neutral-80: rgba(212, 212, 212, 1);
  --neutral-90: rgba(191, 191, 191, 1);
  --neutral-100: rgba(170, 170, 170, 1);
  --neutral-200: rgba(149, 149, 149, 1);
  --neutral-300: rgba(127, 127, 127, 1);
  --neutral-400: rgba(106, 106, 106, 1);
  --neutral-500: rgba(85, 85, 85, 1);
  --neutral-600: rgba(64, 64, 64, 1);
  --neutral-700: rgba(52, 52, 52, 1);
  --neutral-800: rgba(43, 43, 43, 1);
  --neutral-900: rgba(22, 22, 22, 1);
  --surface-200: var(--white);
  --content-primary: var(--neutral-900);
  --content-secondary: var(--neutral-600);
  --content-tertiary: var(--neutral-400);
  --alpha-overlay-rgb: 28, 39, 58;
  --alpha-overlay-dark-rgb: 247, 248, 250;
`;

export const draftLightColors = css`
  --white: #ffffff;
  --white: oklch(1 0 0);

  --neutral-40: #f7f8fa;
  --neutral-50: #eeeff1;
  --neutral-60: #dddfe2;
  --neutral-70: #cdcfd4;
  --neutral-80: #bdbfc6;
  --neutral-90: #adb0b9;
  --neutral-100: #9da1ab;
  --neutral-200: #8e929e;
  --neutral-300: #7e8491;
  --neutral-400: #6f7584;
  --neutral-500: #616777;
  --neutral-600: #525a6a;
  --neutral-700: #444c5e;
  --neutral-800: #373f52;
  --neutral-900: #293346;
  --neutral-1000: #1c273a;
  --neutral-1100: #192334;
  --neutral-1200: #111723;

  @supports (color: oklch(0% 0 0)) {
    --neutral-40: oklch(97.9% 0.00287 265deg);
    --neutral-50: oklch(95.2% 0.00289 265deg);
    --neutral-60: oklch(90.3% 0.00462 258deg);
    --neutral-70: oklch(85.4% 0.00723 269deg);
    --neutral-80: oklch(80.5% 0.01 273deg);
    --neutral-90: oklch(75.8% 0.0132 271deg);
    --neutral-100: oklch(70.9% 0.0152 268deg);
    --neutral-200: oklch(66.1% 0.0183 271deg);
    --neutral-300: oklch(61.3% 0.0209 266deg);
    --neutral-400: oklch(56.3% 0.0243 268deg);
    --neutral-500: oklch(51.4% 0.0264 269deg);
    --neutral-600: oklch(46.7% 0.0279 264deg);
    --neutral-700: oklch(41.7% 0.0319 266deg);
    --neutral-800: oklch(36.8% 0.0346 267deg);
    --neutral-900: oklch(32.1% 0.0368 263deg);
    --neutral-1000: oklch(27.2% 0.0388 261deg);
    --neutral-1100: oklch(25.5% 0.0354 261deg);
    --neutral-1200: oklch(20.5% 0.0258 264deg);
  }

  --surface-100: var(--neutral-40);
  --surface-200: var(--white);

  --content-primary: var(--neutral-900);
  --content-secondary: var(--neutral-600);
  --content-tertiary: var(--neutral-400);

  --alpha-overlay-rgb: 28, 39, 58;
  --alpha-overlay-dark-rgb: 247, 248, 250;

  --blue-50: #ebf2ff;
  --blue-100: #d6e3fa;
  --blue-200: #a8c9ff;
  --blue-300: #73b0ff;
  --blue-400: #5291ff;
  --blue-500: #1a66f7;
  --blue-600: #2152e5;
  --blue-700: #003db8;
  --blue-800: #002985;
  --blue-900: #001754;

  @supports (color: oklch(0% 0 0)) {
    --blue-50: oklch(0.96 0.02 263);
    --blue-100: oklch(0.91 0.03 262);
    --blue-200: oklch(0.83 0.08 260);
    --blue-300: oklch(0.75 0.13 255);
    --blue-400: oklch(0.67 0.18 261);
    --blue-500: oklch(0.56 0.23 262);
    --blue-600: oklch(0.51 0.23 265);
    --blue-700: oklch(0.42 0.2 262);
    --blue-800: oklch(0.33 0.16 262);
    --blue-900: oklch(0.24 0.11 262);
  }

  --green-50: #e3f5e5;
  --green-100: #c4edcf;
  --green-200: #94e5ab;
  --green-300: #5cc480;
  --green-400: #00a657;
  --green-500: #008542;
  --green-600: #006e38;
  --green-700: #005229;
  --green-800: #00381a;
  --green-900: #00210a;

  @supports (color: oklch(0% 0 0)) {
    --green-50: oklch(0.95 0.03 149);
    --green-100: oklch(0.91 0.06 153);
    --green-200: oklch(0.85 0.11 152);
    --green-300: oklch(0.74 0.14 153);
    --green-400: oklch(0.63 0.16 153);
    --green-500: oklch(0.54 0.14 152);
    --green-600: oklch(0.47 0.12 153);
    --green-700: oklch(0.38 0.1 153);
    --green-800: oklch(0.3 0.08 153);
    --green-900: oklch(0.22 0.06 150);
  }

  --red-50: #fff0ed;
  --red-100: #fcdbd6;
  --red-200: #ffc7bf;
  --red-300: #ed9187;
  --red-400: #ed6159;
  --red-500: #cc4242;
  --red-600: #b0262e;
  --red-700: #8f001c;
  --red-800: #66000f;
  --red-900: #3b0503;

  @supports (color: oklch(0% 0 0)) {
    --red-50: oklch(0.97 0.02 31.1);
    --red-100: oklch(0.92 0.04 28);
    --red-200: oklch(0.88 0.07 27.8);
    --red-300: oklch(0.75 0.11 26.8);
    --red-400: oklch(0.67 0.17 26.2);
    --red-500: oklch(0.58 0.17 24.5);
    --red-600: oklch(0.5 0.17 23.6);
    --red-700: oklch(0.41 0.17 22.2);
    --red-800: oklch(0.32 0.13 23.2);
    --red-900: oklch(0.23 0.08 29.2);
  }

  --purple-50: #f5edff;
  --purple-100: #ebdefa;
  --purple-200: #d6bdf5;
  --purple-300: #c49ced;
  --purple-400: #a87de0;
  --purple-500: #8a5ccf;
  --purple-600: #7347b5;
  --purple-700: #573394;
  --purple-800: #3d1f6e;
  --purple-900: #240f4a;

  @supports (color: oklch(0% 0 0)) {
    --purple-50: oklch(0.96 0.03 306);
    --purple-100: oklch(0.92 0.04 306);
    --purple-200: oklch(0.84 0.08 305);
    --purple-300: oklch(0.76 0.12 306);
    --purple-400: oklch(0.67 0.15 303);
    --purple-500: oklch(0.58 0.17 299);
    --purple-600: oklch(0.5 0.17 299);
    --purple-700: oklch(0.42 0.15 296);
    --purple-800: oklch(0.33 0.13 296);
    --purple-900: oklch(0.24 0.1 294);
  }

  --khaki-50: #f2f2d4;
  --khaki-100: #e8e8c4;
  --khaki-200: #d9d69c;
  --khaki-300: #b0ad61;
  --khaki-400: #919433;
  --khaki-500: #787a17;
  --khaki-600: #5e6100;
  --khaki-700: #474a00;
  --khaki-800: #303300;
  --khaki-900: #1c1c00;

  @supports (color: oklch(0% 0 0)) {
    --khaki-50: oklch(0.95 0.04 107);
    --khaki-100: oklch(0.92 0.05 107);
    --khaki-200: oklch(0.86 0.08 105);
    --khaki-300: oklch(0.73 0.1 107);
    --khaki-400: oklch(0.65 0.12 111);
    --khaki-500: oklch(0.56 0.11 111);
    --khaki-600: oklch(0.47 0.1 112);
    --khaki-700: oklch(0.39 0.09 112);
    --khaki-800: oklch(0.31 0.07 113);
    --khaki-900: oklch(0.22 0.05 110);
  }

  --cg-30: #fafafa;
  --cg-40: #f7f7f7;
  --cg-50: #f1f1f1;
  --cg-60: #ededed;
  --cg-70: #ebebeb;
  --cg-80: #e8e8e8;
  --cg-90: #e3e3e3;
  --cg-100: #d4d4d4;
  --cg-200: #c3c5c9;
  --cg-300: #a4a8b0;
  --cg-400: #858b97;
  --cg-500: #6b7385;
  --cg-600: #4c5668;
  --cg-700: #303d52;
  --cg-800: #1c273a;
  --cg-900: #161616;

  @supports (color: oklch(0% 0 0)) {
    --cg-30: oklch(0.98 0 0);
    --cg-40: oklch(0.98 0 0);
    --cg-50: oklch(0.96 0 0);
    --cg-60: oklch(0.95 0 0);
    --cg-70: oklch(0.94 0 0);
    --cg-80: oklch(0.93 0 0);
    --cg-90: oklch(0.92 0 0);
    --cg-100: oklch(0.87 0 0);
    --cg-200: oklch(0.82 0.01 265);
    --cg-300: oklch(0.73 0.01 264);
    --cg-400: oklch(0.64 0.02 264);
    --cg-500: oklch(0.56 0.03 266);
    --cg-600: oklch(0.45 0.03 262);
    --cg-700: oklch(0.36 0.04 260);
    --cg-800: oklch(0.27 0.04 260);
    --cg-900: oklch(0.2 0 0);
  }

  --bronze-50: #fff9e6;
  --bronze-100: #fddeb3;
  --bronze-200: #f5be76;
  --bronze-300: #dd9f54;
  --bronze-400: #bf8532;
  --bronze-500: #9f6a15;
  --bronze-600: #855400;
  --bronze-700: #693d00;
  --bronze-800: #4f2600;
  --bronze-900: #391000;

  @supports (color: oklch(0% 0 0)) {
    --bronze-50: oklch(0.98 0.03 92.4);
    --bronze-100: oklch(0.92 0.07 75.8);
    --bronze-200: oklch(0.84 0.11 72.8);
    --bronze-300: oklch(0.75 0.12 69.5);
    --bronze-400: oklch(0.66 0.12 72.2);
    --bronze-500: oklch(0.57 0.11 72.5);
    --bronze-600: oklch(0.49 0.11 70.8);
    --bronze-700: oklch(0.4 0.09 65.8);
    --bronze-800: oklch(0.32 0.08 56.7);
    --bronze-900: oklch(0.24 0.07 42.8);
  }

  --warning: #f5e86e;
  --warning-contrast: #333000;

  @supports (color: oklch(0% 0 0)) {
    --warning: oklch(91.8% 0.143 103deg);
    --warning-contrast: oklch(30.3% 0.0645 106deg);
  }

  --green-slime: #00db74;

  @supports (color: oklch(0% 0 0)) {
    --green-slime: oklch(78.1% 0.203 153deg);
  }
`;

export const draftDarkColors = css`
  --white: #ffffff;
  --white: oklch(1 0 0);

  --neutral-1200: #f7f8fa;
  --neutral-1100: #eeeff1;
  --neutral-1000: #dddfe2;
  --neutral-900: #cdcfd4;
  --neutral-800: #bdbfc6;
  --neutral-700: #adb0b9;
  --neutral-600: #9da1ab;
  --neutral-500: #8e929e;
  --neutral-400: #7e8491;
  --neutral-300: #6f7584;
  --neutral-200: #616777;
  --neutral-100: #525a6a;
  --neutral-90: #444c5e;
  --neutral-80: #373f52;
  --neutral-70: #293346;
  --neutral-60: #1c273a;
  --neutral-50: #192334;
  --neutral-40: #111723;

  @supports (color: oklch(0% 0 0)) {
    --neutral-1200: oklch(97.9% 0.00287 265deg);
    --neutral-1100: oklch(95.2% 0.00289 265deg);
    --neutral-1000: oklch(90.3% 0.00462 258deg);
    --neutral-900: oklch(85.4% 0.00723 269deg);
    --neutral-800: oklch(80.5% 0.01 273deg);
    --neutral-700: oklch(75.8% 0.0132 271deg);
    --neutral-600: oklch(70.9% 0.0152 268deg);
    --neutral-500: oklch(66.1% 0.0183 271deg);
    --neutral-400: oklch(61.3% 0.0209 266deg);
    --neutral-300: oklch(56.3% 0.0243 268deg);
    --neutral-200: oklch(51.4% 0.0264 269deg);
    --neutral-100: oklch(46.7% 0.0279 264deg);
    --neutral-90: oklch(41.7% 0.0319 266deg);
    --neutral-80: oklch(36.8% 0.0346 267deg);
    --neutral-70: oklch(32.1% 0.0368 263deg);
    --neutral-60: oklch(27.2% 0.0388 261deg);
    --neutral-50: oklch(25.5% 0.0354 261deg);
    --neutral-40: oklch(20.5% 0.0258 264deg);
  }

  --surface-100: var(--neutral-40);
  --surface-200: var(--neutral-50);

  --content-primary: var(--neutral-900);
  --content-secondary: var(--neutral-600);
  --content-tertiary: var(--neutral-400);

  --alpha-overlay-rgb: 247, 248, 250;
  --alpha-overlay-dark-rgb: 247, 248, 250;

  --blue-900: #ebf2ff;
  --blue-800: #d6e3fa;
  --blue-700: #a8c9ff;
  --blue-600: #73b0ff;
  --blue-500: #5291ff;
  --blue-400: #1a66f7;
  --blue-300: #2152e5;
  --blue-200: #003db8;
  --blue-100: #002985;
  --blue-50: #001754;

  @supports (color: oklch(0% 0 0)) {
    --blue-900: oklch(0.96 0.02 263);
    --blue-800: oklch(0.91 0.03 262);
    --blue-700: oklch(0.83 0.08 260);
    --blue-600: oklch(0.75 0.13 255);
    --blue-500: oklch(0.67 0.18 261);
    --blue-400: oklch(0.56 0.23 262);
    --blue-300: oklch(0.51 0.23 265);
    --blue-200: oklch(0.42 0.2 262);
    --blue-100: oklch(0.33 0.16 262);
    --blue-50: oklch(0.24 0.11 262);
  }

  --green-900: #e3f5e5;
  --green-800: #c4edcf;
  --green-700: #94e5ab;
  --green-600: #5cc480;
  --green-500: #00a657;
  --green-400: #008542;
  --green-300: #006e38;
  --green-200: #005229;
  --green-100: #00381a;

  @supports (color: oklch(0% 0 0)) {
    --green-900: oklch(0.95 0.03 149);
    --green-800: oklch(0.91 0.06 153);
    --green-700: oklch(0.85 0.11 152);
    --green-600: oklch(0.74 0.14 153);
    --green-500: oklch(0.63 0.16 153);
    --green-400: oklch(0.54 0.14 152);
    --green-300: oklch(0.47 0.12 153);
    --green-200: oklch(0.38 0.1 153);
    --green-100: oklch(0.3 0.08 153);
    --green-50: oklch(0.22 0.06 150);
  }

  --red-900: #fff0ed;
  --red-800: #fcdbd6;
  --red-700: #ffc7bf;
  --red-600: #ed9187;
  --red-500: #ed6159;
  --red-400: #cc4242;
  --red-300: #b0262e;
  --red-200: #8f001c;
  --red-100: #66000f;
  --red-50: #3b0503;

  @supports (color: oklch(0% 0 0)) {
    --red-900: oklch(0.97 0.02 31.1);
    --red-800: oklch(0.92 0.04 28);
    --red-700: oklch(0.88 0.07 27.8);
    --red-600: oklch(0.75 0.11 26.8);
    --red-500: oklch(0.67 0.17 26.2);
    --red-400: oklch(0.58 0.17 24.5);
    --red-300: oklch(0.5 0.17 23.6);
    --red-200: oklch(0.41 0.17 22.2);
    --red-100: oklch(0.32 0.13 23.2);
    --red-50: oklch(0.23 0.08 29.2);
  }

  --purple-900: #f5edff;
  --purple-800: #ebdefa;
  --purple-700: #d6bdf5;
  --purple-600: #c49ced;
  --purple-500: #a87de0;
  --purple-400: #8a5ccf;
  --purple-300: #7347b5;
  --purple-200: #573394;
  --purple-100: #3d1f6e;
  --purple-50: #240f4a;

  @supports (color: oklch(0% 0 0)) {
    --purple-900: oklch(0.96 0.03 306);
    --purple-800: oklch(0.92 0.04 306);
    --purple-700: oklch(0.84 0.08 305);
    --purple-600: oklch(0.76 0.12 306);
    --purple-500: oklch(0.67 0.15 303);
    --purple-400: oklch(0.58 0.17 299);
    --purple-300: oklch(0.5 0.17 299);
    --purple-200: oklch(0.42 0.15 296);
    --purple-100: oklch(0.33 0.13 296);
    --purple-50: oklch(0.24 0.1 294);
  }

  --khaki-900: #f2f2d4;
  --khaki-800: #e8e8c4;
  --khaki-700: #d9d69c;
  --khaki-600: #b0ad61;
  --khaki-500: #919433;
  --khaki-400: #787a17;
  --khaki-300: #5e6100;
  --khaki-200: #474a00;
  --khaki-100: #303300;
  --khaki-50: #1c1c00;

  @supports (color: oklch(0% 0 0)) {
    --khaki-900: oklch(0.95 0.04 107);
    --khaki-800: oklch(0.92 0.05 107);
    --khaki-700: oklch(0.86 0.08 105);
    --khaki-600: oklch(0.73 0.1 107);
    --khaki-500: oklch(0.65 0.12 111);
    --khaki-400: oklch(0.56 0.11 111);
    --khaki-300: oklch(0.47 0.1 112);
    --khaki-200: oklch(0.39 0.09 112);
    --khaki-100: oklch(0.31 0.07 113);
    --khaki-50: oklch(0.22 0.05 110);
  }

  --cg-900: #fafafa;
  --cg-800: #1c273a;
  --cg-700: #f1f1f1;
  --cg-600: #ededed;
  --cg-500: #e3e3e3;
  --cg-400: #d4d4d4;
  --cg-300: #bfbfbf;
  --cg-200: #d4d4d4;
  --cg-100: #c3c5c9;
  --cg-90: #a4a8b0;
  --cg-80: #858b97;
  --cg-70: #6b7385;
  --cg-60: #4c5668;
  --cg-50: #303d52;
  --cg-40: #1c273a;
  --cg-30: #161616;

  @supports (color: oklch(0% 0 0)) {
    --cg-900: oklch(0.98 0 0);
    --cg-800: oklch(0.27 0.04 260);
    --cg-700: oklch(0.96 0 0);
    --cg-600: oklch(0.95 0 0);
    --cg-500: oklch(0.94 0 0);
    --cg-400: oklch(0.93 0 0);
    --cg-300: oklch(0.92 0 0);
    --cg-200: oklch(0.87 0 0);
    --cg-100: oklch(0.82 0.01 265);
    --cg-90: oklch(0.73 0.01 264);
    --cg-80: oklch(0.64 0.02 264);
    --cg-70: oklch(0.56 0.03 266);
    --cg-60: oklch(0.45 0.03 262);
    --cg-50: oklch(0.36 0.04 260);
    --cg-40: oklch(0.27 0.04 260);
    --cg-30: oklch(0.2 0 0);
  }

  --bronze-900: #fff9e6;
  --bronze-800: #fddeb3;
  --bronze-700: #f5be76;
  --bronze-600: #dd9f54;
  --bronze-500: #bf8532;
  --bronze-400: #9f6a15;
  --bronze-300: #855400;
  --bronze-200: #693d00;
  --bronze-100: #4f2600;
  --bronze-50: #391000;

  @supports (color: oklch(0% 0 0)) {
    --bronze-900: oklch(0.98 0.03 92.4);
    --bronze-800: oklch(0.92 0.07 75.8);
    --bronze-700: oklch(0.84 0.11 72.8);
    --bronze-600: oklch(0.75 0.12 69.5);
    --bronze-500: oklch(0.66 0.12 72.2);
    --bronze-400: oklch(0.57 0.11 72.5);
    --bronze-300: oklch(0.49 0.11 70.8);
    --bronze-200: oklch(0.4 0.09 65.8);
    --bronze-100: oklch(0.32 0.08 56.7);
    --bronze-50: oklch(0.24 0.07 42.8);
  }

  --warning-contrast: #f5e86e;
  --warning: #333000;

  @supports (color: oklch(0% 0 0)) {
    --warning-contrast: oklch(91.8% 0.143 103deg);
    --warning: oklch(30.3% 0.0645 106deg);
  }

  --green-slime: #00db74;

  @supports (color: oklch(0% 0 0)) {
    --green-slime: oklch(78.1% 0.203 153deg);
  }
`;

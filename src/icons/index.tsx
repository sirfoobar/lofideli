
import React from 'react';

type IconProps = {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
};

export const CheckIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const MinusIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const ArrowGroupDownIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const ArrowGroupUpIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <path d="m18 15-6-6-6 6" />
  </svg>
);

export const ArrowGroupUnsortedIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <path d="m7 15 5 5 5-5" />
    <path d="m7 9 5-5 5 5" />
  </svg>
);

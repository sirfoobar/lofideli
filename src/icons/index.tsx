
import React from 'react';
import { Check, Minus, ChevronDown, ChevronUp, ArrowDown, ArrowUp } from 'lucide-react';

interface IconProps {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}

export const CheckIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', style }) => {
  return <Check size={size} color={color} style={style} />;
};

export const MinusIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', style }) => {
  return <Minus size={size} color={color} style={style} />;
};

export const ArrowGroupDownIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', style }) => {
  return <ArrowDown size={size} color={color} style={style} />;
};

export const ArrowGroupUpIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', style }) => {
  return <ArrowUp size={size} color={color} style={style} />;
};

export const ArrowGroupUnsortedIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', style }) => {
  return (
    <span style={{ position: 'relative', display: 'inline-block', width: size, height: size, ...style }}>
      <ChevronUp size={size * 0.7} color={color} style={{ position: 'absolute', top: 0, left: 0 }} />
      <ChevronDown size={size * 0.7} color={color} style={{ position: 'absolute', bottom: 0, left: 0 }} />
    </span>
  );
};


import React from 'react';
import {
  Slider as AriaSlider,
  SliderOutput,
  SliderThumb,
  SliderTrack,
} from 'react-aria-components';
import { Label } from './Form';

export const Slider: React.FC<React.ComponentProps<typeof AriaSlider>> = (props) => {
  return (
    <AriaSlider
      {...props}
      className={`grid grid-areas-[label_output/track_track] grid-cols-[1fr_auto] max-w-[300px] text-neutral-900 ${props.className || ''}`}
    />
  );
};

export const SliderLabel: React.FC<React.ComponentProps<typeof Label>> = (props) => {
  return <Label {...props} className={`grid-area-[label] ${props.className || ''}`} />;
};

export const SliderOutput: React.FC<React.ComponentProps<typeof SliderOutput>> = (props) => {
  return <SliderOutput {...props} className={`grid-area-[output] ${props.className || ''}`} />;
};

export const SliderThumb: React.FC<React.ComponentProps<typeof SliderThumb>> = (props) => {
  return (
    <SliderThumb
      {...props}
      className={`w-5 h-5 rounded-full bg-blue-500 border-2 border-white top-1/2
      data-[hovered]:bg-blue-600
      data-[dragging]:bg-blue-700
      data-[focus-visible]:outline-2 data-[focus-visible]:outline-blue-400 ${props.className || ''}`}
    />
  );
};

export const SliderTrack: React.FC<React.ComponentProps<typeof SliderTrack>> = (props) => {
  return (
    <SliderTrack
      {...props}
      className={`grid-area-[track] relative h-[30px] w-full before:content-[''] before:block before:absolute before:bg-neutral-200 before:rounded-full before:h-[3px] before:w-full before:top-1/2 before:-translate-y-1/2 ${props.className || ''}`}
    />
  );
};

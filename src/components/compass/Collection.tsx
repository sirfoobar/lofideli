
import React, { forwardRef } from 'react';
import { Collection as AriaCollection, Section as AriaSection } from 'react-aria-components';
import type { CollectionProps, SectionProps } from 'react-aria-components';

export const Collection = forwardRef<HTMLDivElement, CollectionProps<object>>(
  (props, ref) => (
    <AriaCollection
      {...props}
      ref={ref}
      className={`flex flex-col gap-2 w-full max-w-full box-border list-none m-0 p-0 ${
        props.className || ''
      } focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:outline-offset-2`}
    />
  )
);

Collection.displayName = 'Collection';

export const Section = forwardRef<HTMLDivElement, SectionProps<object>>(
  (props, ref) => (
    <AriaSection
      {...props}
      ref={ref}
      className={`flex flex-col gap-2 p-2 border border-gray-300 rounded-md bg-white ${
        props.className || ''
      } focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:outline-offset-2`}
    />
  )
);

Section.displayName = 'Section';


import React from 'react';
import { Collection as AriaCollection, Section as AriaSection } from 'react-aria-components';

export const Collection = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof AriaCollection>>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <AriaCollection
        {...props}
        ref={ref}
        className={`flex flex-col gap-2 w-full max-w-full box-border list-none m-0 p-0 ${className}`}
      >
        {children}
      </AriaCollection>
    );
  }
);

Collection.displayName = 'Collection';

export const Section = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof AriaSection>>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <AriaSection
        {...props}
        ref={ref}
        className={`flex flex-col gap-2 p-2 border border-solid border-neutral-200 rounded-md bg-white ${className}`}
      >
        {children}
      </AriaSection>
    );
  }
);

Section.displayName = 'Section';

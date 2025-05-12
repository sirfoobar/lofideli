
import React from 'react';
import {
  Collection as AriaCollection,
  Section as AriaSection,
} from 'react-aria-components';

export type CollectionComponentProps = React.PropsWithChildren<{
  className?: string;
}>;

export const Collection = React.forwardRef<HTMLDivElement, CollectionComponentProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex flex-col gap-2 w-full max-w-full box-border list-none m-0 p-0 ${className}`}
      >
        {children}
      </div>
    );
  }
);

Collection.displayName = 'Collection';

export const Section = React.forwardRef<HTMLDivElement, CollectionComponentProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex flex-col gap-2 p-2 border border-solid border-neutral-200 rounded-md bg-white ${className}`}
      >
        {children}
      </div>
    );
  }
);

Section.displayName = 'Section';

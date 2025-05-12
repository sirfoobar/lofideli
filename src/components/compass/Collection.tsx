
import React from 'react';

export type CollectionComponentProps = React.PropsWithChildren<{
  className?: string;
}>;

export const Collection = React.forwardRef<HTMLDivElement, CollectionComponentProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex flex-col gap-2 w-full max-w-full box-border list-none m-0 p-0 ${className}`}
        {...props}
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
        {...props}
      >
        {children}
      </div>
    );
  }
);

Section.displayName = 'Section';


import React from 'react';
import {
  Collection as AriaCollection,
  Section as AriaSection,
  CollectionProps,
  SectionProps
} from 'react-aria-components';

export const Collection = React.forwardRef<
  HTMLDivElement, 
  React.PropsWithChildren<Omit<CollectionProps<object>, 'children'> & { className?: string }>
>((props, ref) => {
  const { className = '', children, ...rest } = props;
  
  return (
    <AriaCollection
      {...rest}
      className={`flex flex-col gap-2 w-full max-w-full box-border list-none m-0 p-0 ${className}`}
    >
      {children}
    </AriaCollection>
  );
});

Collection.displayName = 'Collection';

export const Section = React.forwardRef<
  HTMLDivElement, 
  React.PropsWithChildren<Omit<SectionProps<object>, 'children'> & { className?: string }>
>((props, ref) => {
  const { className = '', children, ...rest } = props;
  
  return (
    <AriaSection
      {...rest}
      className={`flex flex-col gap-2 p-2 border border-solid border-neutral-200 rounded-md bg-white ${className}`}
    >
      {children}
    </AriaSection>
  );
});

Section.displayName = 'Section';

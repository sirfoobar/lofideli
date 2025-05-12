
import React, { forwardRef } from 'react';
import { SearchField as AriaSearchField } from 'react-aria-components';
import type { SearchFieldProps } from 'react-aria-components';

export const SearchGroup = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => (
    <div
      {...props}
      ref={ref}
      className={`rounded-full pl-4 w-[320px] ${props.className || ''}`}
    />
  )
);

SearchGroup.displayName = 'SearchGroup';

export const SearchField = forwardRef<HTMLDivElement, SearchFieldProps>(
  (props, ref) => (
    <AriaSearchField
      {...props}
      ref={ref}
      className={`flex flex-col gap-2 ${props.className || ''}`}
    />
  )
);

SearchField.displayName = 'SearchField';

export const InlineSearchField = forwardRef<HTMLDivElement, SearchFieldProps>(
  (props, ref) => (
    <AriaSearchField
      {...props}
      ref={ref}
      className={`flex-grow ${props.className || ''}`}
    />
  )
);

InlineSearchField.displayName = 'InlineSearchField';

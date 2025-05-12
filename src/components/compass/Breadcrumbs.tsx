
import React from 'react';
import {
  Breadcrumbs as AriaBreadcrumbs,
  Breadcrumb as AriaBreadcrumb,
} from 'react-aria-components';
import type { BreadcrumbsProps, BreadcrumbProps } from 'react-aria-components';

export const Breadcrumbs = React.forwardRef<HTMLOListElement, BreadcrumbsProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <AriaBreadcrumbs
        {...props}
        ref={ref}
        className={`flex items-center list-none m-0 p-0 text-sm text-neutral-700 ${className}`}
      >
        {children}
      </AriaBreadcrumbs>
    );
  }
);

Breadcrumbs.displayName = 'Breadcrumbs';

export const Breadcrumb = React.forwardRef<HTMLLIElement, BreadcrumbProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <AriaBreadcrumb
        {...props}
        ref={ref}
        className={`${className} [&:not(:last-child)]:after:content-['/'] [&:not(:last-child)]:after:px-[5px]`}
      >
        {children}
      </AriaBreadcrumb>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

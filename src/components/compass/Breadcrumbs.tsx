
import React from 'react';

export type BreadcrumbsProps = React.PropsWithChildren<{
  className?: string;
}>;

export type BreadcrumbProps = React.PropsWithChildren<{
  className?: string;
}>;

export const Breadcrumbs = React.forwardRef<HTMLOListElement, BreadcrumbsProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <ol
        {...props}
        ref={ref}
        className={`flex items-center list-none m-0 p-0 text-sm text-neutral-700 ${className}`}
      >
        {children}
      </ol>
    );
  }
);

Breadcrumbs.displayName = 'Breadcrumbs';

export const Breadcrumb = React.forwardRef<HTMLLIElement, BreadcrumbProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <li
        {...props}
        ref={ref}
        className={`${className} [&:not(:last-child)]:after:content-['/'] [&:not(:last-child)]:after:px-[5px]`}
      >
        {children}
      </li>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

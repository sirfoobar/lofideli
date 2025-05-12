
import React from 'react';
import { Link as AriaLink, LinkProps } from 'react-aria-components';

export const Link: React.FC<LinkProps> = (props) => {
  return (
    <AriaLink
      {...props}
      className={`text-decoration-none text-blue-500
      data-[hovered]:text-blue-600
      data-[pressed]:text-blue-700
      data-[disabled]:text-neutral-900
      data-[focus-visible]:outline-2 data-[focus-visible]:outline-blue-400 data-[focus-visible]:outline-offset-2 data-[focus-visible]:rounded ${props.className || ''}`}
    />
  );
};

export const PrimaryButtonLink: React.FC<LinkProps> = (props) => {
  return (
    <AriaLink
      {...props}
      className={`inline-flex w-fit p-2 px-4 justify-center items-center gap-2 flex-shrink-0 flex-grow-0 rounded-full outline-none box-border h-10 text-sm font-medium bg-blue-500 border border-blue-600 text-white
      data-[hovered]:bg-blue-600
      data-[pressed]:bg-blue-700 data-[pressed]:border-blue-700
      data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed
      data-[focus-visible]:outline-2 data-[focus-visible]:outline-blue-400 data-[focus-visible]:outline-offset-2 ${props.className || ''}`}
    />
  );
};

export const SecondaryButtonLink: React.FC<LinkProps> = (props) => {
  return (
    <AriaLink
      {...props}
      className={`inline-flex w-fit p-2 px-4 justify-center items-center gap-2 flex-shrink-0 flex-grow-0 rounded-full outline-none box-border h-10 text-sm font-medium bg-neutral-200 border border-neutral-200 text-neutral-900
      data-[hovered]:bg-neutral-300 data-[hovered]:border-neutral-300
      data-[pressed]:bg-neutral-400 data-[pressed]:border-neutral-400
      data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed
      data-[focus-visible]:outline-2 data-[focus-visible]:outline-blue-400 data-[focus-visible]:outline-offset-2 ${props.className || ''}`}
    />
  );
};

export const FlatButtonLink: React.FC<LinkProps> = (props) => {
  return (
    <AriaLink
      {...props}
      className={`inline-flex w-fit p-2 px-4 justify-center items-center gap-2 flex-shrink-0 flex-grow-0 rounded-full outline-none box-border h-10 text-sm font-medium bg-transparent border border-transparent text-neutral-900
      data-[hovered]:bg-neutral-100 data-[hovered]:border-neutral-100
      data-[pressed]:bg-neutral-200 data-[pressed]:border-neutral-200
      data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed
      data-[focus-visible]:outline-2 data-[focus-visible]:outline-blue-400 data-[focus-visible]:outline-offset-2 ${props.className || ''}`}
    />
  );
};

export const UnstyledLink: React.FC<LinkProps> = (props) => {
  return <AriaLink {...props} />;
};

export const BreadcrumbLink: React.FC<LinkProps> = (props) => {
  return (
    <AriaLink
      {...props}
      className={`text-neutral-600 outline-none relative text-decoration-none cursor-pointer
      data-[hovered]:underline
      data-[current]:text-neutral-900 data-[current]:font-semibold data-[current]:cursor-auto
      data-[focus-visible]:after:content-[''] data-[focus-visible]:after:absolute data-[focus-visible]:after:inset-[-2px] data-[focus-visible]:after:inset-x-[-4px] data-[focus-visible]:after:rounded-md data-[focus-visible]:after:border-2 data-[focus-visible]:after:border-blue-400 ${props.className || ''}`}
    />
  );
};

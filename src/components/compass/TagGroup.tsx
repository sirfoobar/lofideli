
import React from 'react';
import {
  TagGroup as AriaTagGroup,
  TagList as AriaTagList,
  Tag as AriaTag,
} from 'react-aria-components';

export const TagGroup: React.FC<React.ComponentProps<typeof AriaTagGroup>> = (props) => {
  return <AriaTagGroup {...props} className={`flex flex-col gap-2 ${props.className || ''}`} />;
};

export const TagList: React.FC<React.ComponentProps<typeof AriaTagList>> = (props) => {
  return <AriaTagList {...props} className={`flex flex-row gap-2 ${props.className || ''}`} />;
};

export const Tag: React.FC<React.ComponentProps<typeof AriaTag>> = (props) => {
  return (
    <AriaTag
      {...props}
      className={`inline-flex w-fit p-2 px-4 justify-center items-center gap-2 flex-shrink-0 flex-grow-0 border border-neutral-200 rounded-full outline-none box-border h-10 text-sm bg-transparent cursor-default
      data-[hovered]:bg-neutral-100 data-[hovered]:border-neutral-300
      data-[pressed]:bg-neutral-200 data-[pressed]:border-neutral-400
      data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed
      data-[selected]:border-2 data-[selected]:border-neutral-900 data-[selected]:font-medium
      data-[focus-visible]:outline-2 data-[focus-visible]:outline-blue-400 data-[focus-visible]:outline-offset-2 ${props.className || ''}`}
    />
  );
};

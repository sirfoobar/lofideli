
import React from 'react';
import {
  Tabs as AriaTabs,
  TabList as AriaTabList,
  Tab as AriaTab,
  TabPanel
} from 'react-aria-components';

export const Tabs: React.FC<React.ComponentProps<typeof AriaTabs>> = (props) => {
  return <AriaTabs {...props} className={`flex ${props.orientation === 'horizontal' ? 'flex-col' : 'flex-row'} ${props.className || ''}`} />;
};

export const TabList: React.FC<React.ComponentProps<typeof AriaTabList>> = (props) => {
  return <AriaTabList {...props} className={`flex ${props.orientation === 'horizontal' ? 'border-b border-neutral-200' : ''} ${props.className || ''}`} />;
};

export const Tab: React.FC<React.ComponentProps<typeof AriaTab>> = (props) => {
  return <AriaTab {...props} className={`p-2 px-4 outline-none relative transition-all cursor-default border border-transparent rounded-t-md data-[selected]:border-neutral-200 data-[selected]:bg-neutral-100 data-[selected]:text-neutral-900 data-[selected]:font-medium data-[hovered]:bg-neutral-50 data-[focus-visible]:outline-2 data-[focus-visible]:outline-blue-400 data-[focus-visible]:outline-offset-2 ${props.className || ''}`} />;
};

export { TabPanel };

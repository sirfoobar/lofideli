import styled from '@emotion/styled';
import React from 'react';
import {
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  ListBoxItemProps as AriaListBoxItemProps,
  Header as AriaHeader,
} from 'react-aria-components';

import { CheckIcon } from '../../icons';
import { theme } from './theme';
export { Section } from 'react-aria-components';

// use this when the ListBox will be self-contained
export const ListBox = styled(AriaListBox)`
  max-height: inherit;
  overflow: auto;
  padding: 0;
  min-width: 150px;
  background-color: ${theme.colors.white};
  gap: ${theme.space.space2};
  outline: none;
  border: ${theme.borderWidths.regular} solid ${theme.colors.n80};
  border-radius: ${theme.radii.card};
`;

// use this when the ListBox will be visually contained with other items (e.g. buttons, search box)
export const UnstyledListBox = styled(AriaListBox)`
  max-height: inherit;
  overflow: auto;
  min-width: 150px;
  gap: ${theme.space.space2};
  outline: none;
  margin: 0;
`;

export const StyledListBoxItem = styled(AriaListBoxItem)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: ${theme.space.space12} ${theme.space.space16};
  gap: ${theme.space.space8};
  outline: none;
  cursor: default;

  &[data-hovered] {
    background-color: ${theme.colors.n60};
  }

  &[data-focus-visible] {
    background-color: ${theme.colors.n60};
  }

  &[data-selected] {
    background-color: ${theme.colors.n70};
  }
`;

export const Header = styled(AriaHeader)`
  display: flex;
  gap: ${theme.space.space8};
  background-color: ${theme.colors.n40};
  padding: ${theme.space.space8} ${theme.space.space24};
`;

const ContentContainer = styled.div`
  min-width: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const ListBoxItem = ({ children, ...props }: AriaListBoxItemProps) => (
  <StyledListBoxItem {...props}>
    {({ isSelected }) => (
      <>
        <ContentContainer>{children}</ContentContainer>

        {isSelected && <CheckIcon size={20} style={{ marginLeft: 'auto' }} />}
      </>
    )}
  </StyledListBoxItem>
);

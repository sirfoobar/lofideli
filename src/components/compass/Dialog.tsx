import styled from '@emotion/styled';
import React from 'react';
import {
  Dialog as AriaDialog,
  Heading as AriaHeading,
  DialogTrigger as AriaDialogTrigger,
  DialogTriggerProps as AriaDialogTriggerProps,
} from 'react-aria-components';

import { theme } from './theme';

import { BaseButton } from './Buttons';

export const DialogTrigger = ({
  children,
  ...rest
}: AriaDialogTriggerProps) => (
  <AriaDialogTrigger {...rest}>{children}</AriaDialogTrigger>
);

export const Dialog = styled(AriaDialog)`
  padding: ${theme.space.space24} ${theme.space.space24};
  display: flex;
  flex-direction: column;
  gap: ${theme.space.space24};
  min-width: 480px;
  outline: none;
  position: relative;
`;

export const DialogHeading = styled(AriaHeading)`
  font-size: ${theme.fontSizes.fontsize20};
  font-weight: ${theme.fontWeights.medium};
  line-height: ${theme.lineHeights.lineheight28};
  margin: 0;
  max-width: calc(100% - ${theme.space.space32});
`;

export const DialogCloseButton = styled(BaseButton)`
  background: transparent;
  border: ${theme.borderWidths.regular} solid transparent;
  color: ${theme.colors.n900};

  &[data-hovered] {
    background: ${theme.colors.n60};
    border: ${theme.borderWidths.regular} solid ${theme.colors.n60};
  }

  &[data-pressed] {
    background: ${theme.colors.n70};
    border: ${theme.borderWidths.regular} solid ${theme.colors.n70};
  }

  &[data-focus-visible] {
    outline: ${theme.borderWidths.thick} solid ${theme.colors.blue400};
    outline-offset: ${theme.space.space2};
  }
  padding: ${theme.space.space8};
  width: fit-content;
  height: fit-content;
  position: absolute;
  top: ${theme.space.space16};
  right: ${theme.space.space16};
`;

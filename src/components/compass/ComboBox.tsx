import styled from '@emotion/styled';
import {
  ComboBox as AriaComboBox,
  Input as AriaInput,
  Button as AriaButton,
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
} from 'react-aria-components';

import { theme } from './theme';
import { Input } from './Inputs';
import { BaseButton } from './Buttons';

export const ComboBox = styled(AriaComboBox)`
  display: flex;
  flex-direction: column;
  gap: ${theme.space.space8};
  width: 100%;
  max-width: 560px;
  position: relative;

  &[data-focus-visible] {
    outline: ${theme.borderWidths.thick} solid ${theme.colors.blue400};
    outline-offset: ${theme.space.space2};
  }
`;

export const ComboBoxInput = styled(Input)`
  width: 100%;
  padding-right: ${theme.space.space32};
`;

export const ComboBoxButton = styled(BaseButton)`
  position: absolute;
  right: ${theme.space.space8};
  top: 50%;
  transform: translateY(-50%);
  padding: ${theme.space.space4};
  height: auto;
  min-width: auto;
  background: transparent;
  color: ${theme.colors.n700};

  &:hover {
    background: ${theme.colors.n60};
  }

  &[data-disabled] {
    opacity: ${theme.opacity.semiOpaque};
    cursor: not-allowed;
  }
`;

export const ComboBoxListBox = styled(AriaListBox)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: ${theme.space.space4};
  max-height: 300px;
  overflow-y: auto;
  background: ${theme.colors.white};
  border: ${theme.borderWidths.regular} solid ${theme.colors.n80};
  border-radius: ${theme.radii.field};
  box-shadow: ${theme.shadows.card};
  z-index: 1;
`;

export const ComboBoxItem = styled(AriaListBoxItem)`
  padding: ${theme.space.space8} ${theme.space.space16};
  cursor: pointer;
  transition: all 200ms;

  &[data-hovered] {
    background: ${theme.colors.n60};
  }

  &[data-selected] {
    background: ${theme.colors.blue100};
    color: ${theme.colors.blue700};
  }

  &[data-disabled] {
    opacity: ${theme.opacity.semiOpaque};
    cursor: not-allowed;
  }

  &[data-focus-visible] {
    outline: ${theme.borderWidths.thick} solid ${theme.colors.blue400};
    outline-offset: -${theme.space.space2};
  }
`;

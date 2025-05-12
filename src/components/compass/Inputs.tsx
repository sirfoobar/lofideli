import styled from '@emotion/styled';
import {
  TextArea as AriaTextArea,
  Input as AriaInput,
  Group as AriaGroup,
} from 'react-aria-components';

import { theme } from './theme';

export const Input = styled(AriaInput)`
  border: ${theme.borderWidths.regular} solid ${theme.colors.n80};
  padding: ${theme.space.space8} ${theme.space.space12};
  sizing: border-box;
  height: 40px;
  min-width: 200px;
  max-width: 560px;
  border-radius: ${theme.radii.field};
  outline: none;

  &[data-disabled] {
    opacity: ${theme.opacity.semiOpaque};
    cursor: not-allowed;
  }

  &[data-hovered] {
    border: ${theme.borderWidths.regular} solid ${theme.colors.n90};
  }

  &[data-invalid] {
    border: ${theme.borderWidths.regular} solid ${theme.colors.red500};
  }

  &[data-focus-visible] {
    outline: ${theme.borderWidths.thick} solid ${theme.colors.blue400};
    outline-offset: ${theme.space.space2};
  }
`;

export const TextArea = styled(AriaTextArea)`
  border: ${theme.borderWidths.regular} solid ${theme.colors.n80};
  padding: ${theme.space.space8} ${theme.space.space12};
  min-width: 200px;
  max-width: 560px;
  border-radius: ${theme.radii.field};
  outline: none;

  &[data-disabled] {
    opacity: ${theme.opacity.semiOpaque};
  }

  &[data-hovered] {
    border: ${theme.borderWidths.regular} solid ${theme.colors.n90};
  }

  &[data-invalid] {
    border: ${theme.borderWidths.regular} solid ${theme.colors.red500};
  }

  &[data-focus-visible] {
    outline: ${theme.borderWidths.thick} solid ${theme.colors.blue400};
    outline-offset: ${theme.space.space2};
  }
`;

export const InputGroup = styled(AriaGroup)`
  display: flex;
  flex-direction: row;
  gap: ${theme.space.space4};
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  height: 40px;
  background: ${theme.colors.white};
  border: ${theme.borderWidths.regular} solid ${theme.colors.n80};
  padding: ${theme.space.space4} ${theme.space.space12};
  min-width: 200px;
  max-width: 560px;
  border-radius: ${theme.radii.field};
  outline: none;

  &[data-disabled] {
    opacity: ${theme.opacity.semiOpaque};
    cursor: not-allowed;
  }

  &[data-hovered] {
    border: ${theme.borderWidths.regular} solid ${theme.colors.n90};
  }

  &[data-invalid] {
    border: ${theme.borderWidths.regular} solid ${theme.colors.red500};
  }

  &[data-focus-visible] {
    outline: ${theme.borderWidths.thick} solid ${theme.colors.blue400};
    outline-offset: ${theme.space.space2};
  }
`;

export const InlineInputGroup = styled(AriaGroup)`
  display: flex;
  flex-direction: row;
  gap: ${theme.space.space4};
  align-items: center;
  width: 100%;
  flex-grow: 1;
  height: 40px;
  border: none;
  outline: none;
  padding: ${theme.space.space4};
  flex-grow: 1;
  height: ${theme.space.space24};
  ::-webkit-search-cancel-button {
    display: none;
  }
`;

export const UnstyledInput = styled(AriaInput)`
  border: none;
  outline: none;
  padding: ${theme.space.space4};
  flex-grow: 1;
  height: ${theme.space.space24};
  ::-webkit-search-cancel-button {
    display: none;
  }
`;

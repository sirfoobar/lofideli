import styled from '@emotion/styled';
import {
  DateField as AriaDateField,
  DateSegment as AriaDateSegment,
  DateInput as AriaDateInput,
} from 'react-aria-components';

import { theme } from './theme';

export const DateField = styled(AriaDateField)`
  display: flex;
  flex-direction: column;
  gap: ${theme.space.space8};
`;

export const DateSegment = styled(AriaDateSegment)`
  padding: ${theme.space.space2};
  text-align: end;
  color: ${theme.colors.n900};

  &[data-placeholder] {
    color: ${theme.colors.n500};
  }

  &:focus {
    color: ${theme.colors.white};
    background: ${theme.colors.blue500};
    outline: none;
    border-radius: ${theme.radii.rounded};
    caret-color: transparent;
  }
`;

export const DateInput = styled(AriaDateInput)`
  border: ${theme.borderWidths.regular} solid ${theme.colors.n80};
  padding: ${theme.space.space8} ${theme.space.space12};
  display: flex;
  box-sizing: border-box;
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

export const UnstyledDateInput = styled(AriaDateInput)`
  display: flex;
  border: none;
  outline: none;

  &[slot='start'] {
    flex: 0;
  }

  &[slot='start'] + span {
    padding: 0 ${theme.space.space4};
    flex: 0;
  }

  &[slot='end'] {
    margin-right: ${theme.space.space32};
    flex: 1;
  }
`;

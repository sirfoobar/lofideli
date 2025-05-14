
import styled from '@emotion/styled';
import {
  Dialog as AriaDialog,
  DatePicker as AriaDatePicker,
  DateRangePicker as AriaDateRangePicker,
} from 'react-aria-components';

import { theme } from './theme';

/* Sketchy mode styles */
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap');

export const DatePicker = styled(AriaDatePicker)`
  display: flex;
  flex-direction: column;
  gap: ${theme.space.space8};
`;

export const DatePickerDialog = styled(AriaDialog)`
  max-height: inherit;
  overflow: auto;
  padding: ${theme.space.space16};
  background-color: ${theme.colors.white};
  gap: ${theme.space.space2};
  outline: none;
  border: ${theme.borderWidths.regular} solid ${theme.colors.n80};
  border-radius: ${theme.radii.card};
`;

export const DateRangePicker = styled(AriaDateRangePicker)`
  display: flex;
  flex-direction: column;
  gap: ${theme.space.space8};

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

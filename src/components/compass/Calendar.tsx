import styled from '@emotion/styled';
import {
  Calendar as AriaCalendar,
  RangeCalendar as AriaRangeCalendar,
  CalendarCell as AriaCalendarCell,
  Heading as AriaHeading,
} from 'react-aria-components';

import { theme } from './theme';

export const Calendar = styled(AriaCalendar)`
  width: fit-content;
  max-width: 100%;
  color: ${theme.colors.n900};

  & table {
    border-collapse: collapse;

    & td {
      padding: ${theme.space.space2} 0;
    }
  }
`;

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 ${theme.space.space8} 0;
`;

export const RangeCalendar = styled(AriaRangeCalendar)`
  width: fit-content;
  max-width: 100%;
  color: ${theme.colors.n900};

  header {
    display: flex;
    align-items: center;
    margin: 0 0 ${theme.space.space8} 0;
  }

  & table {
    border-collapse: collapse;

    & td {
      padding: ${theme.space.space2} 0;
    }
  }
`;

export { CalendarGrid } from 'react-aria-components';

export const CalendarCell = styled(AriaCalendarCell)`
  width: ${theme.space.space40};
  height: ${theme.space.space40};
  align-content: center;
  text-align: center;
  border-radius: ${theme.radii.circle};
  cursor: default;
  outline: none;
  forced-color-adjust: none;

  &[data-outside-month] {
    display: none;
  }

  &[data-hovered] {
    background: ${theme.colors.n60};
  }

  &[data-pressed] {
    background: ${theme.colors.n70};
  }

  &[data-focus-visible] {
    outline: 2px solid ${theme.colors.blue400};
    outline-offset: 2px;
  }

  &[data-selected] {
    background: ${theme.colors.blue500};
    color: ${theme.colors.white};
  }
`;

export const RangeCalendarCell = styled(CalendarCell)`
  &[data-selected] {
    border-radius: 0;
  }

  &[data-selection-start] {
    border-start-start-radius: ${theme.radii.circle};
    border-end-start-radius: ${theme.radii.circle};
  }

  &[data-selection-end] {
    border-start-end-radius: ${theme.radii.circle};
    border-end-end-radius: ${theme.radii.circle};
  }
`;

export const CalendarHeading = styled(AriaHeading)`
  flex: 1;
  margin: 0;
  text-align: center;
  font-size: ${theme.fontSizes.h5};
  line-height: ${theme.lineHeights.h5};
  font-weight: ${theme.fontWeights.semiBold};
`;

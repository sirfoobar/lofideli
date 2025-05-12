import styled from '@emotion/styled';
import React from 'react';
import {
  Table as AriaTable,
  TableHeader as AriaTableHeader,
  Column as AriaColumn,
  ColumnProps as AriaColumnProps,
  TableBody as AriaTableBody,
  Row as AriaRow,
  Cell as AriaCell,
  Group,
} from 'react-aria-components';

import {
  ArrowGroupDownIcon,
  ArrowGroupUnsortedIcon,
  ArrowGroupUpIcon,
} from '../../icons';
import { theme } from './theme';

export const Table = styled(AriaTable)`
  padding: 0;
  border: none;
  outline: none;
  border-spacing: 0;
  min-height: 100px;
  max-width: 100%;
  word-break: break-word;
  forced-color-adjust: none;

  &[data-focus-visible] {
    outline: ${theme.borderWidths.thick} solid ${theme.colors.blue400};
    outline-offset: ${theme.space.space2};
  }
`;

export const TableHeader = styled(AriaTableHeader)`
  background: ${theme.colors.n50};
`;

const StyledColumn = styled(AriaColumn)`
  &[data-focused] {
    z-index: 20;
    outline: ${theme.borderWidths.thick} solid ${theme.colors.blue400};
    outline-offset: -4px;
    border-radius: 11px;
  }
`;

const ColumnGroup = styled(Group)`
  display: flex;
  align-content: center;
  gap: ${theme.space.space4};
  outline: none;
  border: none;
  padding: ${theme.space.space16};
  text-align: start;
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.n600};
`;

export const Column = (props: AriaColumnProps) => (
  <StyledColumn {...props}>
    {({ allowsSorting, sortDirection }) => (
      <ColumnGroup role="presentation">
        <span>{props.children}</span>
        {allowsSorting && sortDirection && (
          <span aria-hidden="true">
            {sortDirection === 'ascending' ? (
              <ArrowGroupUpIcon size={16} />
            ) : (
              <ArrowGroupDownIcon size={16} />
            )}
          </span>
        )}
        {allowsSorting && !sortDirection && (
          <span aria-hidden="true">
            <ArrowGroupUnsortedIcon size={16} />
          </span>
        )}
      </ColumnGroup>
    )}
  </StyledColumn>
);

export const TableBody = styled(AriaTableBody)`
  background: ${theme.colors.n50};
`;

export const Row = styled(AriaRow)`
  &[data-focus-visible] {
    outline: ${theme.borderWidths.thick} solid ${theme.colors.blue400};
    outline-offset: -4px;
    border-radius: 11px;
  }

  &[data-hovered] {
    td {
      background: ${theme.colors.n50};
    }
  }

  &[data-selected] {
    td {
      background: ${theme.colors.blue50};
    }
  }

  td {
    border-top: ${theme.borderWidths.regular} solid ${theme.colors.n70};
  }

  & not(:last-of-type) {
    td {
      border-bottom: ${theme.borderWidths.regular} solid ${theme.colors.n70};
    }
  }
`;

export const Cell = styled(AriaCell)`
  padding: ${theme.space.space16};
  outline: none;
  background: ${theme.colors.white};
  &[data-focused] {
    outline: ${theme.borderWidths.thick} solid ${theme.colors.blue400};
    outline-offset: -4px;
    border-radius: ${theme.radii.field};
  }
`;

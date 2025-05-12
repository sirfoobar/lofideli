
import React from 'react';
import {
  Table as AriaTable,
  TableHeader as AriaTableHeader,
  Column as AriaColumn,
  ColumnProps,
  TableBody as AriaTableBody,
  Row as AriaRow,
  Cell as AriaCell,
} from 'react-aria-components';

type SortDirection = 'ascending' | 'descending' | undefined;

interface ArrowIconProps {
  size?: number;
}

const ArrowGroupUpIcon: React.FC<ArrowIconProps> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m7 15 5-5 5 5"/>
  </svg>
);

const ArrowGroupDownIcon: React.FC<ArrowIconProps> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m7 9 5 5 5-5"/>
  </svg>
);

const ArrowGroupUnsortedIcon: React.FC<ArrowIconProps> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m7 15 5-5 5 5 M7 9 l5 5 5-5"/>
  </svg>
);

export const Table = React.forwardRef<HTMLTableElement, React.PropsWithChildren<{ className?: string }>>(
  ({ className = '', children, ...props }, ref) => (
    <AriaTable
      {...props}
      ref={ref}
      className={`p-0 border-none outline-none border-spacing-0 min-h-[100px] max-w-full break-words ${className}`}
    >
      {children}
    </AriaTable>
  )
);

Table.displayName = 'Table';

export const TableHeader = React.forwardRef<HTMLTableSectionElement, React.PropsWithChildren<{ className?: string }>>(
  ({ className = '', children, ...props }, ref) => (
    <AriaTableHeader
      {...props}
      ref={ref}
      className={`bg-neutral-50 ${className}`}
    >
      {children}
    </AriaTableHeader>
  )
);

TableHeader.displayName = 'TableHeader';

// Render children directly instead of using a function
export const Column: React.FC<ColumnProps> = ({ children, allowsSorting, ...props }) => (
  <AriaColumn {...props}>
    <div className="flex items-center gap-1 outline-none border-none p-4 text-start font-medium text-neutral-600">
      <span>{children}</span>
      {allowsSorting && (
        <span aria-hidden="true">
          <ArrowGroupUnsortedIcon size={16} />
        </span>
      )}
    </div>
  </AriaColumn>
);

export const TableBody = React.forwardRef<HTMLTableSectionElement, React.PropsWithChildren<{ className?: string }>>(
  ({ className = '', children, ...props }, ref) => (
    <AriaTableBody
      {...props}
      ref={ref}
      className={`bg-neutral-50 ${className}`}
    >
      {children}
    </AriaTableBody>
  )
);

TableBody.displayName = 'TableBody';

export const Row = React.forwardRef<HTMLTableRowElement, React.PropsWithChildren<{ className?: string }>>(
  ({ className = '', children, ...props }, ref) => (
    <AriaRow
      {...props}
      ref={ref}
      className={`data-[focus-visible]:outline-2 data-[focus-visible]:outline-blue-400 data-[focus-visible]:outline-offset-[-4px] data-[focus-visible]:rounded-[11px]
      data-[hovered]:td:bg-neutral-50
      data-[selected]:td:bg-blue-50
      td:border-t td:border-t-neutral-70
      [&:not(:last-of-type)]:td:border-b [&:not(:last-of-type)]:td:border-b-neutral-70 ${className}`}
    >
      {children}
    </AriaRow>
  )
);

Row.displayName = 'Row';

export const Cell = React.forwardRef<HTMLTableCellElement, React.PropsWithChildren<{ className?: string }>>(
  ({ className = '', children, ...props }, ref) => (
    <AriaCell
      {...props}
      ref={ref}
      className={`p-4 outline-none bg-white data-[focused]:outline-2 data-[focused]:outline-blue-400 data-[focused]:outline-offset-[-4px] data-[focused]:rounded-md ${className}`}
    >
      {children}
    </AriaCell>
  )
);

Cell.displayName = 'Cell';

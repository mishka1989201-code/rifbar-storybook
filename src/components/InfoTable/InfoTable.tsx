import type { HTMLAttributes, ReactNode } from 'react';
import { RowInfoBlock } from '../RowInfoBlock';
import './InfoTable.css';

export interface InfoTableRow {
  label: ReactNode;
  value: ReactNode;
}

export interface InfoTableProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Columns of label / value rows. Figma `InfoTable/V2` has two (“Information 1” and “Information 2”). */
  columns: InfoTableRow[][];
}

/**
 * Figma `InfoTable/V2`: a white panel with columns of `RowInfoBlock variant="line"` rows
 * (grey caption + value, Stroke Light V2 line under each row, none under the last one).
 * Columns sit side by side and wrap under each other on narrow containers.
 */
export function InfoTable({ columns, className, ...rest }: InfoTableProps) {
  const classes = ['ds-info-table', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...rest}>
      {columns.map((rows, columnIndex) => (
        <div key={columnIndex} className="ds-info-table__column">
          {rows.map((row, rowIndex) => (
            <RowInfoBlock key={rowIndex} variant="line" label={row.label} value={row.value} />
          ))}
        </div>
      ))}
    </div>
  );
}

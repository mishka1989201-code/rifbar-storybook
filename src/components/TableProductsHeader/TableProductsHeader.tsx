import { Fragment, type HTMLAttributes, type ReactNode } from 'react';
import './TableProductsHeader.css';

export interface TableProductsHeaderColumn {
  /** Stable key. */
  id: string;
  label: ReactNode;
  /** Fixed column width in px. Omit to size by content. */
  width?: number;
  /** Text alignment inside the cell. Default `start`. */
  align?: 'start' | 'center' | 'end';
  /** Adjacent columns with the same `group` are packed together with a 32px gap. */
  group?: string;
}

export interface TableProductsHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Header cells in order. Defaults to the 7 columns of the Figma frame. */
  columns?: TableProductsHeaderColumn[];
}

/** Figma frame: `#` + `Name` grouped on the left, then five single columns. */
export const DEFAULT_PRODUCTS_COLUMNS: TableProductsHeaderColumn[] = [
  { id: 'id', label: '#', width: 30, align: 'center', group: 'lead' },
  { id: 'name', label: 'Name', width: 170, group: 'lead' },
  { id: 'flavor', label: 'Flavor/Group', width: 230 },
  { id: 'type', label: 'Type', width: 203 },
  { id: 'nicotine', label: 'Nicotine', width: 59 },
  { id: 'quantity', label: 'Quantity', align: 'end' },
  { id: 'amount', label: 'Ampunt', width: 75, align: 'end' },
];

/**
 * Figma `Table Products Header`: dark (Primary Blue Dark) header row of the products table.
 * Cells are white Semi-Bold h7 labels; groups and cells are spread with `justify-between`.
 */
export function TableProductsHeader({
  columns = DEFAULT_PRODUCTS_COLUMNS,
  className,
  ...rest
}: TableProductsHeaderProps) {
  const classes = ['ds-table-products-header', className].filter(Boolean).join(' ');

  // Pack consecutive columns with the same `group` into one flex container.
  const blocks: TableProductsHeaderColumn[][] = [];
  columns.forEach((col) => {
    const last = blocks[blocks.length - 1];
    if (col.group && last && last[0].group === col.group) last.push(col);
    else blocks.push([col]);
  });

  const cell = (col: TableProductsHeaderColumn) => (
    <div
      key={col.id}
      role="columnheader"
      className={`ds-table-products-header__cell ds-table-products-header__cell--${col.align ?? 'start'}`}
      style={col.width ? { width: col.width } : undefined}
    >
      {col.label}
    </div>
  );

  return (
    <div role="row" className={classes} {...rest}>
      {blocks.map((block) =>
        block.length > 1 ? (
          <div key={block[0].group} className="ds-table-products-header__group">
            {block.map(cell)}
          </div>
        ) : (
          <Fragment key={block[0].id}>{cell(block[0])}</Fragment>
        ),
      )}
    </div>
  );
}

import type { HTMLAttributes, ReactNode } from 'react';
import { TableProductsHeader, type TableProductsHeaderColumn } from '../TableProductsHeader';
import { TableProductsRow } from '../TableProductsRow';
import './TableProducts.css';

/** One row of the table; fields map 1:1 to `TableProductsRow`. */
export interface TableProductsItem {
  id: string | number;
  /** Row number. Defaults to the position in `rows` (1-based). */
  index?: ReactNode;
  name?: ReactNode;
  flavor?: ReactNode;
  type?: ReactNode;
  nicotine?: ReactNode;
  quantity?: ReactNode;
  amount?: ReactNode;
}

export type TableProductsStatus = 'ready' | 'loading' | 'error';

export interface TableProductsProps extends HTMLAttributes<HTMLDivElement> {
  /** Body rows. */
  rows?: TableProductsItem[];
  /** Header cells; defaults to the 7 columns of the Figma frame. */
  columns?: TableProductsHeaderColumn[];
  /** `loading` and `error` replace the rows with a message (AI-defined: Figma draws only the filled table). */
  status?: TableProductsStatus;
  emptyText?: ReactNode;
  loadingText?: ReactNode;
  errorText?: ReactNode;
  /** Accessible name of the table. */
  label?: string;
}

/**
 * Figma `Table - Products`: the dark `TableProductsHeader` on top of `TableProductsRow` rows, in a
 * 10px-rounded frame with a Primary Blue Dark stroke. The last row has no bottom line.
 * In a container narrower than the columns the table scrolls horizontally.
 */
export function TableProducts({
  rows = [],
  columns,
  status = 'ready',
  emptyText = 'No products.',
  loadingText = 'Loading…',
  errorText = 'Could not load products.',
  label = 'Products',
  className,
  ...rest
}: TableProductsProps) {
  const classes = ['ds-table-products', className].filter(Boolean).join(' ');
  const message =
    status === 'loading' ? loadingText : status === 'error' ? errorText : rows.length === 0 ? emptyText : null;

  return (
    <div className={classes} {...rest}>
      <div className="ds-table-products__scroll">
        <div className="ds-table-products__table" role="table" aria-label={label} aria-busy={status === 'loading' || undefined}>
          <TableProductsHeader columns={columns} />
          {status === 'ready' &&
            rows.map(({ id, index, ...cells }, i) => <TableProductsRow key={id} index={index ?? i + 1} {...cells} />)}
        </div>
        {message && (
          <div
            className={`ds-table-products__status${status === 'error' ? ' is-error' : ''}`}
            role={status === 'error' ? 'alert' : 'status'}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

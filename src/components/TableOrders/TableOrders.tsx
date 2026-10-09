import type { HTMLAttributes, ReactNode } from 'react';
import { CardGrid } from '../CardGrid';
import { TableHeader, type TableHeaderColumn, TABLE_HEADER_PRESETS } from '../TableHeader';
import { TableRowOrder, type TableRowOrderProps } from '../TableRowOrder';
import './TableOrders.css';

/** One row of the table; fields map 1:1 to `TableRowOrder`. */
export interface TableOrdersItem extends Omit<TableRowOrderProps, 'layout' | 'id'> {
  id: string | number;
}

export type TableOrdersStatus = 'ready' | 'loading' | 'error';

export interface TableOrdersProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSort'> {
  rows?: TableOrdersItem[];
  /** `table` (Figma `Table 1 - Management`: header + rows) or `cards` (Figma `Cards Line`, 768px and below: a grid of cards, no header). */
  layout?: 'table' | 'cards';
  /** Header cells; defaults to the `orders` preset of `TableHeader`. */
  columns?: TableHeaderColumn[];
  /** Called with the column id when a sortable header is pressed (`table` layout only). */
  onSort?: (id: string) => void;
  /** `loading` and `error` replace the rows with a message (AI-defined: Figma draws only the filled table). */
  status?: TableOrdersStatus;
  emptyText?: ReactNode;
  loadingText?: ReactNode;
  errorText?: ReactNode;
  /** Accessible name of the table. */
  label?: string;
}

/**
 * Figma `Table 1 - Management` / `Cards Line` of the client's Orders tab: `TableHeader` (`orders` preset) over
 * `TableRowOrder` rows, or — with `layout="cards"` — a responsive grid of `TableRowOrder` cards
 * (two columns at 768px, one below ~700px). In a container narrower than its columns the table scrolls.
 */
export function TableOrders({
  rows = [],
  layout = 'table',
  columns = TABLE_HEADER_PRESETS.orders,
  onSort,
  status = 'ready',
  emptyText = 'No orders.',
  loadingText = 'Loading…',
  errorText = 'Could not load orders.',
  label = 'Orders',
  className,
  ...rest
}: TableOrdersProps) {
  const classes = ['ds-table-orders', `ds-table-orders--${layout}`, className].filter(Boolean).join(' ');
  const message =
    status === 'loading' ? loadingText : status === 'error' ? errorText : rows.length === 0 ? emptyText : null;

  return (
    <div className={classes} {...rest}>
      <div className="ds-table-orders__scroll">
        {layout === 'cards' ? (
          <CardGrid className="ds-table-orders__table" role="table" aria-label={label} aria-busy={status === 'loading' || undefined}>
            {status === 'ready' && rows.map(({ id, ...cells }) => <TableRowOrder key={id} layout="card" {...cells} />)}
          </CardGrid>
        ) : (
          <div className="ds-table-orders__table" role="table" aria-label={label} aria-busy={status === 'loading' || undefined}>
            <TableHeader columns={columns} onSort={onSort} />
            {status === 'ready' && rows.map(({ id, ...cells }) => <TableRowOrder key={id} layout="row" {...cells} />)}
          </div>
        )}
        {message && (
          <div
            className={`ds-table-orders__status${status === 'error' ? ' is-error' : ''}`}
            role={status === 'error' ? 'alert' : 'status'}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

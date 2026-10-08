import type { HTMLAttributes, ReactNode } from 'react';
import { TableHeader, type TableHeaderColumn } from '../TableHeader';
import { TableRowClient, type TableRowClientProps } from '../TableRowClient';
import './TableClients.css';

/** One row of the table; fields map 1:1 to `TableRowClient`. */
export interface TableClientsItem extends Pick<
  TableRowClientProps,
  'name' | 'nameHref' | 'onNameClick' | 'company' | 'phone' | 'email' | 'joined' | 'updated' | 'actionLabel' | 'onAction'
> {
  id: string | number;
}

export type TableClientsStatus = 'ready' | 'loading' | 'error';

export interface TableClientsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSort'> {
  rows?: TableClientsItem[];
  /** Header cells; defaults to `DEFAULT_CLIENTS_COLUMNS`, aligned with the seven row cells. */
  columns?: TableHeaderColumn[];
  /** Called with the column id when a sortable header is pressed. */
  onSort?: (id: string) => void;
  /** `loading` and `error` replace the rows with a message (AI-defined: Figma draws only the filled table). */
  status?: TableClientsStatus;
  emptyText?: ReactNode;
  loadingText?: ReactNode;
  errorText?: ReactNode;
  /** Accessible name of the table. */
  label?: string;
}

/**
 * Figma `Table Header 4` columns aligned with the cells of `TableRowClient`. Figma labels only six of the
 * seven row cells; the second date column is named `Updated` (AI-defined, needs confirmation).
 */
export const DEFAULT_CLIENTS_COLUMNS: TableHeaderColumn[] = [
  { id: 'name', label: 'Name', width: 170, sortable: true },
  { id: 'company', label: 'Company', width: 170, sortable: true },
  { id: 'phone', label: 'Phone', width: 150, sortable: true },
  { id: 'email', label: 'Email', width: 220, sortable: true },
  { id: 'joined', label: 'Joined', width: 80, align: 'end', sortable: true },
  { id: 'updated', label: 'Updated', width: 119, align: 'end', sortable: true },
  { id: 'actions', label: 'Actions', width: 119, align: 'end' },
];

/**
 * Figma `Table/Row & Header`: the transparent `TableHeader` on top of `TableRowClient` cards, 8px apart.
 * In a container narrower than the columns the table scrolls horizontally.
 */
export function TableClients({
  rows = [],
  columns = DEFAULT_CLIENTS_COLUMNS,
  onSort,
  status = 'ready',
  emptyText = 'No clients.',
  loadingText = 'Loading…',
  errorText = 'Could not load clients.',
  label = 'Clients',
  className,
  ...rest
}: TableClientsProps) {
  const classes = ['ds-table-clients', className].filter(Boolean).join(' ');
  const message =
    status === 'loading' ? loadingText : status === 'error' ? errorText : rows.length === 0 ? emptyText : null;

  return (
    <div className={classes} {...rest}>
      <div className="ds-table-clients__scroll">
        <div className="ds-table-clients__table" role="table" aria-label={label} aria-busy={status === 'loading' || undefined}>
          <TableHeader columns={columns} onSort={onSort} />
          {status === 'ready' && rows.map(({ id, ...cells }) => <TableRowClient key={id} {...cells} />)}
        </div>
        {message && (
          <div
            className={`ds-table-clients__status${status === 'error' ? ' is-error' : ''}`}
            role={status === 'error' ? 'alert' : 'status'}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

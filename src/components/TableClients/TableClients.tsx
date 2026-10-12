import type { HTMLAttributes, ReactNode } from 'react';
import { CardGrid } from '../CardGrid';
import { TableHeader, type TableHeaderColumn } from '../TableHeader';
import { TableRowClient, type TableRowClientLayout, type TableRowClientProps } from '../TableRowClient';
import './TableClients.css';

/** One row of the table; fields map 1:1 to `TableRowClient`. */
export interface TableClientsItem extends Pick<
  TableRowClientProps,
  'index' | 'callState' | 'duration' | 'callResult' | 'onPlay' | 'onClose' | 'player' | 'callDate' | 'changeDate' | 'name' | 'nameHref' | 'onNameClick' | 'company' | 'phone' | 'email' | 'group' | 'status' | 'joined' | 'updated' | 'attention' | 'source' | 'actionLabel' | 'onAction' | 'onDelete' | 'onCall' | 'onNotes' | 'deleteTooltip' | 'notesTooltip' | 'callMenu' | 'tooltip' | 'tooltipTitle'
> {
  id: string | number;
}

export type TableClientsStatus = 'ready' | 'loading' | 'error';

export interface TableClientsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSort'> {
  rows?: TableClientsItem[];
  /** `management` = Figma `Table Row 15` (company, phone, group, status, two dates); `history` = Figma `Table Row 25` (ID, name, status, call date, change date); `calls` = Figma `Table Row 16` (seller, phone, date, time, updated, actions). Picks the default columns and the row layout. */
  layout?: TableRowClientLayout;
  /** `table` (header + rows) or `cards` (Figma `Cards Line`, 768px and below: a grid of `TableRowClient layout="card"`, no header). `cards` is for `management` rows. */
  view?: 'table' | 'cards';
  /** Header cells; defaults to `DEFAULT_CLIENTS_COLUMNS` (or `MANAGEMENT_CLIENTS_COLUMNS`), aligned with the row cells. */
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
 * Figma `Manager User - Clients - All Clients Tab` header, aligned with the cells of `TableRowClient layout="management"`.
 * Figma places `Status` and `Joined` unaligned with the rows (a drawing slip); here every label sits over its own column.
 * The first date is `Updated`, the second `Joined` (Figma writes `Joined` over the second one; `Updated` is AI-defined).
 */
export const MANAGEMENT_CLIENTS_COLUMNS: TableHeaderColumn[] = [
  { id: 'name', label: 'Name', width: 170, sortable: true },
  { id: 'company', label: 'Company', width: 170, sortable: true },
  { id: 'phone', label: 'Phone', width: 150, sortable: true },
  { id: 'groups', label: 'Groups', width: 112, sortable: true },
  { id: 'status', label: 'Status', width: 103, align: 'end', sortable: true },
  { id: 'updated', label: 'Updated', width: 80, align: 'end', sortable: true },
  { id: 'joined', label: 'Joined', width: 119, align: 'end', sortable: true },
  { id: 'actions', label: 'Actions', width: 213, align: 'end' },
];

/**
 * Figma `Table Header` of `Last updates` (client page → Main info), aligned with `TableRowClient layout="history"`:
 * ID and Name are packed together (210px), then Status, Call date and Change date.
 */
export const HISTORY_CLIENTS_COLUMNS: TableHeaderColumn[] = [
  { id: 'id', label: 'ID', width: 30, sortable: true, group: 'lead' },
  { id: 'name', label: 'Name', width: 170, sortable: true, group: 'lead' },
  { id: 'status', label: 'Status', width: 103, align: 'end', sortable: true },
  { id: 'callDate', label: 'Call date', width: 81, sortable: true },
  { id: 'changeDate', label: 'Change date', width: 110, align: 'end', sortable: true },
];

/**
 * Figma `Table Header 5` of `Call records` (client page), aligned with `TableRowClient layout="calls"`. Figma draws four labels
 * over five cells and places them unaligned with the rows (a drawing slip); here every label sits over its own column.
 * The second date column is named `Updated` (AI-defined, needs confirmation).
 */
export const CALLS_CLIENTS_COLUMNS: TableHeaderColumn[] = [
  { id: 'seller', label: 'Seller', width: 170, sortable: true },
  { id: 'phone', label: 'Phone', width: 150, sortable: true },
  { id: 'date', label: 'Date', width: 80, align: 'end', sortable: true },
  { id: 'time', label: 'Time', width: 66, align: 'end', sortable: true },
  { id: 'updated', label: 'Updated', width: 119, align: 'end', sortable: true },
  { id: 'actions', label: 'Actions', width: 119, align: 'end' },
];

/**
 * Figma `Table/Row & Header`: the transparent `TableHeader` on top of `TableRowClient` cards, 8px apart.
 * In a container narrower than the columns the table scrolls horizontally.
 */
export function TableClients({
  rows = [],
  layout = 'default',
  view = 'table',
  columns = layout === 'management' ? MANAGEMENT_CLIENTS_COLUMNS : layout === 'history' ? HISTORY_CLIENTS_COLUMNS : layout === 'calls' ? CALLS_CLIENTS_COLUMNS : DEFAULT_CLIENTS_COLUMNS,
  onSort,
  status = 'ready',
  emptyText = 'No clients.',
  loadingText = 'Loading…',
  errorText = 'Could not load clients.',
  label = 'Clients',
  className,
  ...rest
}: TableClientsProps) {
  const classes = ['ds-table-clients', `ds-table-clients--${view}`, className].filter(Boolean).join(' ');
  const message =
    status === 'loading' ? loadingText : status === 'error' ? errorText : rows.length === 0 ? emptyText : null;

  return (
    <div className={classes} {...rest}>
      <div className="ds-table-clients__scroll">
        {view === 'cards' ? (
          <CardGrid className="ds-table-clients__table" role="table" aria-label={label} aria-busy={status === 'loading' || undefined}>
            {status === 'ready' && rows.map(({ id, ...cells }) => <TableRowClient key={id} layout="card" {...cells} />)}
          </CardGrid>
        ) : (
          <div className="ds-table-clients__table" role="table" aria-label={label} aria-busy={status === 'loading' || undefined}>
            <TableHeader columns={columns} onSort={onSort} />
            {status === 'ready' && rows.map(({ id, ...cells }) => <TableRowClient key={id} layout={layout} {...cells} />)}
          </div>
        )}
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

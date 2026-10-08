import { Fragment, type HTMLAttributes, type ReactNode } from 'react';
import { Icon } from '../Icon';
import './TableHeader.css';

export interface TableHeaderColumn {
  /** Stable key, returned by `onSort`. */
  id: string;
  label: ReactNode;
  /** Fixed column width in px. Omit to size by content. */
  width?: number;
  /** Text alignment inside the cell. Default `start`. */
  align?: 'start' | 'end';
  /** Shows the sort icon and makes the label a button (Figma `Header with Sort`). */
  sortable?: boolean;
  /** Adjacent columns with the same `group` are packed together with a 32px gap. */
  group?: string;
}

export interface TableHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSort'> {
  /** Column set drawn in Figma. Default `warehouses`. Ignored when `columns` is set. */
  preset?: TableHeaderPreset;
  /** Custom header cells in order. Overrides `preset`. */
  columns?: TableHeaderColumn[];
  /** Called with the column id when a sortable header is clicked. */
  onSort?: (id: string) => void;
}

export type TableHeaderPreset = 'warehouses' | 'categories' | 'clients' | 'productsAnalytics' | 'paymentsAnalytics';

/**
 * Column sets drawn in Figma. All frames share one look (transparent row, padding 8/16,
 * `justify-between`, sort icon on `Header with Sort` cells) and differ only in columns.
 */
export const TABLE_HEADER_PRESETS: Record<TableHeaderPreset, TableHeaderColumn[]> = {
  /** Figma `Table Header 4` (587:173767). */
  warehouses: [
    { id: 'id', label: 'ID', sortable: true, group: 'lead' },
    { id: 'warehouse', label: 'Warehouse', width: 170, sortable: true, group: 'lead' },
    { id: 'location', label: 'Location', width: 300, sortable: true },
    { id: 'manager', label: 'Manager', width: 150, sortable: true },
    { id: 'updated', label: 'Latest update', align: 'end', sortable: true },
    { id: 'actions', label: 'Actions', width: 84, align: 'end' },
  ],
  /** Figma `Table Header 4` (1299:436979). */
  categories: [
    { id: 'image', label: 'Image', width: 64, group: 'lead' },
    { id: 'category', label: 'Category', width: 170, sortable: true, group: 'lead' },
    { id: 'flavors', label: 'Flavors/Types', width: 170, sortable: true },
    { id: 'colors', label: 'Colors', width: 150, sortable: true },
    { id: 'puffs', label: 'Puffs', width: 220, sortable: true },
    { id: 'capacity', label: 'E-Liquid capacity', sortable: true },
    { id: 'actions', label: 'Actions', width: 84, align: 'end' },
  ],
  /** Figma `Table Header 5` (1226:374723). */
  clients: [
    { id: 'name', label: 'Name', width: 170, sortable: true },
    { id: 'company', label: 'Company', width: 170, sortable: true },
    { id: 'phone', label: 'Phone', width: 150, sortable: true },
    { id: 'email', label: 'Email', width: 220, sortable: true },
    { id: 'joined', label: 'Joined', width: 80, align: 'end', sortable: true },
    { id: 'actions', label: 'Actions', width: 166, align: 'end' },
  ],
  /** Figma `Table Header 6` (3697:291914) — header of `TableRowAnalytics` with an image. */
  productsAnalytics: [
    { id: 'image', label: 'Image', width: 47, group: 'lead' },
    { id: 'name', label: 'Name', width: 157, sortable: true, group: 'lead' },
    { id: 'newOrders', label: 'New orders', width: 97, sortable: true },
    { id: 'done', label: 'Done', width: 53, align: 'end', sortable: true },
    { id: 'revenue', label: 'Revenue', width: 78, align: 'end', sortable: true },
  ],
  /** Figma `Table Header 7` (4631:289272) — header of the three-cell `TableRowAnalytics`. */
  paymentsAnalytics: [
    { id: 'date', label: 'Date', width: 77, sortable: true },
    { id: 'type', label: 'Type', width: 97, sortable: true },
    { id: 'amount', label: 'Amount', width: 78, align: 'end', sortable: true },
  ],
};

/**
 * Figma `Table Header 4 / 5`: transparent header row with Headlines-colored Semi-Bold h7 labels;
 * sortable columns carry the `sort` icon after the label. Pick a `preset` or pass your own `columns`.
 */
export function TableHeader({
  preset = 'warehouses',
  columns = TABLE_HEADER_PRESETS[preset],
  onSort,
  className,
  ...rest
}: TableHeaderProps) {
  const classes = ['ds-table-header', className].filter(Boolean).join(' ');

  // Pack consecutive columns with the same `group` into one flex container.
  const blocks: TableHeaderColumn[][] = [];
  columns.forEach((col) => {
    const last = blocks[blocks.length - 1];
    if (col.group && last && last[0].group === col.group) last.push(col);
    else blocks.push([col]);
  });

  const cell = (col: TableHeaderColumn) => (
    <div
      key={col.id}
      role="columnheader"
      className={`ds-table-header__cell ds-table-header__cell--${col.align ?? 'start'}`}
      style={col.width ? { width: col.width } : undefined}
    >
      {col.sortable ? (
        <button type="button" className="ds-table-header__sort" onClick={() => onSort?.(col.id)}>
          <span className="ds-table-header__label">{col.label}</span>
          <Icon name="sort" size={16} color="current" />
        </button>
      ) : (
        <span className="ds-table-header__label">{col.label}</span>
      )}
    </div>
  );

  return (
    <div role="row" className={classes} {...rest}>
      {blocks.map((block) =>
        block.length > 1 ? (
          <div key={block[0].group} className="ds-table-header__group">
            {block.map(cell)}
          </div>
        ) : (
          <Fragment key={block[0].id}>{cell(block[0])}</Fragment>
        ),
      )}
    </div>
  );
}

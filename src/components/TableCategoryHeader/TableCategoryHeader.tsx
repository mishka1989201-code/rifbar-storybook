import { Fragment, type HTMLAttributes, type ReactNode } from 'react';
import { Icon } from '../Icon';
import './TableCategoryHeader.css';

export interface TableCategoryHeaderColumn {
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

export interface TableCategoryHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSort'> {
  /** Header cells in order. Defaults to the 7 columns of the Figma frame. */
  columns?: TableCategoryHeaderColumn[];
  /** Called with the column id when a sortable header is clicked. */
  onSort?: (id: string) => void;
}

/** Figma frame: `Image` + `Category` grouped on the left, then four sortable columns and `Actions`. */
export const DEFAULT_CATEGORY_COLUMNS: TableCategoryHeaderColumn[] = [
  { id: 'image', label: 'Image', width: 64, group: 'lead' },
  { id: 'category', label: 'Category', width: 170, sortable: true, group: 'lead' },
  { id: 'flavors', label: 'Flavors/Types', width: 170, sortable: true },
  { id: 'colors', label: 'Colors', width: 150, sortable: true },
  { id: 'puffs', label: 'Puffs', width: 220, sortable: true },
  { id: 'capacity', label: 'E-Liquid capacity', sortable: true },
  { id: 'actions', label: 'Actions', width: 84, align: 'end' },
];

/**
 * Figma `Table Header 4`: transparent header row with Headlines-colored Semi-Bold h7 labels;
 * sortable columns carry the `sort` icon after the label.
 */
export function TableCategoryHeader({
  columns = DEFAULT_CATEGORY_COLUMNS,
  onSort,
  className,
  ...rest
}: TableCategoryHeaderProps) {
  const classes = ['ds-table-category-header', className].filter(Boolean).join(' ');

  // Pack consecutive columns with the same `group` into one flex container.
  const blocks: TableCategoryHeaderColumn[][] = [];
  columns.forEach((col) => {
    const last = blocks[blocks.length - 1];
    if (col.group && last && last[0].group === col.group) last.push(col);
    else blocks.push([col]);
  });

  const cell = (col: TableCategoryHeaderColumn) => (
    <div
      key={col.id}
      role="columnheader"
      className={`ds-table-category-header__cell ds-table-category-header__cell--${col.align ?? 'start'}`}
      style={col.width ? { width: col.width } : undefined}
    >
      {col.sortable ? (
        <button type="button" className="ds-table-category-header__sort" onClick={() => onSort?.(col.id)}>
          <span className="ds-table-category-header__label">{col.label}</span>
          <Icon name="sort" size={16} color="current" />
        </button>
      ) : (
        <span className="ds-table-category-header__label">{col.label}</span>
      )}
    </div>
  );

  return (
    <div role="row" className={classes} {...rest}>
      {blocks.map((block) =>
        block.length > 1 ? (
          <div key={block[0].group} className="ds-table-category-header__group">
            {block.map(cell)}
          </div>
        ) : (
          <Fragment key={block[0].id}>{cell(block[0])}</Fragment>
        ),
      )}
    </div>
  );
}

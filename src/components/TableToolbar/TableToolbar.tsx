import type { HTMLAttributes, ReactNode } from 'react';
import { Button } from '../Button';
import { SearchField, type SearchFieldProps } from '../SearchField';
import { ViewSwitch, type ViewMode } from '../ViewSwitch';
import './TableToolbar.css';

export interface TableToolbarProps extends HTMLAttributes<HTMLDivElement> {
  /** Figma `Buttons & Filters` at 768px and below: “Filter (8)” button, `sort` slot, full-width search under the buttons. */
  compact?: boolean;
  onExport?: () => void;
  exportLabel?: ReactNode;
  /** Desktop: called on click of “Clear”. */
  onClear?: () => void;
  clearLabel?: ReactNode;
  /** Desktop: the filter controls between “Clear” and the view switch (Figma: `Date range` and `Status` fields). */
  filters?: ReactNode;
  /** Compact: number of applied filters, drawn as the badge of the “Filter” button. Hidden when 0 or not set. */
  filterCount?: number;
  /** Compact: called on click of the “Filter” button. */
  onFilterClick?: () => void;
  filterLabel?: ReactNode;
  /** Compact: the sort control after the “Filter” button (a square icon button with its menu). */
  sort?: ReactNode;
  /** Current view; omit it together with `onViewChange` to hide the switch. */
  view?: ViewMode;
  onViewChange?: (view: ViewMode) => void;
  /** Props passed to the `SearchField` (value, onSearch, placeholder…). */
  searchProps?: Omit<SearchFieldProps, 'size'>;
}

/**
 * Figma `Actions` of the client's Orders tab: the toolbar above the table. Desktop — “Export” (dark) and “Clear”
 * buttons, a `filters` slot, `ViewSwitch` and a 232px `SearchField` at the right. `compact` (768px and below) —
 * “Export”, “Filter” with a count badge, a `sort` slot and the view switch, with a full-width search below.
 */
export function TableToolbar({
  compact = false,
  onExport,
  exportLabel = 'Export',
  onClear,
  clearLabel = 'Clear',
  filters,
  filterCount,
  onFilterClick,
  filterLabel = 'Filter',
  sort,
  view,
  onViewChange,
  searchProps,
  className,
  ...rest
}: TableToolbarProps) {
  const classes = ['ds-table-toolbar', compact && 'ds-table-toolbar--compact', className].filter(Boolean).join(' ');
  return (
    <div role="toolbar" aria-label="Table actions" className={classes} {...rest}>
      <div className="ds-table-toolbar__controls">
        <Button variant="dark" iconLeft="export" onClick={onExport}>
          {exportLabel}
        </Button>
        {compact ? (
          <>
            <Button variant="outline" iconLeft="filter-dark" counter={filterCount || undefined} onClick={onFilterClick}>
              {filterLabel}
            </Button>
            {sort}
          </>
        ) : (
          <>
            <Button variant="outline" iconLeft="clear" onClick={onClear}>
              {clearLabel}
            </Button>
            {filters}
          </>
        )}
        {view !== undefined && <ViewSwitch value={view} onChange={onViewChange} />}
      </div>
      <SearchField
        className="ds-table-toolbar__search"
        size={compact ? 'mobile' : 'desktop'}
        aria-label="Search table"
        {...searchProps}
      />
    </div>
  );
}

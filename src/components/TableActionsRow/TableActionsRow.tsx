import type { HTMLAttributes, ReactNode } from 'react';
import { Button } from '../Button';
import { SearchField, type SearchFieldProps } from '../SearchField';
import './TableActionsRow.css';

export interface TableActionsRowProps extends HTMLAttributes<HTMLDivElement> {
  /** Called on click of “Export”. */
  onExport?: () => void;
  /** Called on click of “Clear”. */
  onClear?: () => void;
  exportLabel?: ReactNode;
  clearLabel?: ReactNode;
  /** Props passed to the `SearchField` on the right (value, onSearch, placeholder…). */
  searchProps?: Omit<SearchFieldProps, 'size'>;
}

/**
 * Figma `TableActionsRow`: toolbar above a table — “Export” (dark) and “Clear” (outline)
 * buttons on the left, `SearchField` (232px) on the right.
 */
export function TableActionsRow({
  onExport,
  onClear,
  exportLabel = 'Export',
  clearLabel = 'Clear',
  searchProps,
  className,
  ...rest
}: TableActionsRowProps) {
  const classes = ['ds-table-actions', className].filter(Boolean).join(' ');
  return (
    <div role="toolbar" aria-label="Table actions" className={classes} {...rest}>
      <div className="ds-table-actions__buttons">
        <Button variant="dark" iconLeft="export" onClick={onExport}>
          {exportLabel}
        </Button>
        <Button variant="outline" iconLeft="clear" onClick={onClear}>
          {clearLabel}
        </Button>
      </div>
      <SearchField className="ds-table-actions__search" aria-label="Search table" {...searchProps} />
    </div>
  );
}

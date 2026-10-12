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
  /** Menu under the Export button (Figma `Export DropDown`): a `<Dropdown options={[CSV, PDF, Excel]} />`. Shown while `exportOpen`. */
  exportMenu?: ReactNode;
  /** The Export menu is open. The caller owns it: toggle it in `onExport`, close it on outside click / Escape. */
  exportOpen?: boolean;
  /** Props passed to the `SearchField` on the right (value, onSearch, placeholder…). */
  searchProps?: Omit<SearchFieldProps, 'size'>;
}

/**
 * Figma `TableActionsRow`: toolbar above a table — “Export” (dark) and “Clear” (outline)
 * buttons on the left, `SearchField` (232px) on the right. `exportMenu` adds the Figma `Export DropDown` under Export.
 */
export function TableActionsRow({
  onExport,
  onClear,
  exportLabel = 'Export',
  clearLabel = 'Clear',
  exportMenu,
  exportOpen = false,
  searchProps,
  className,
  ...rest
}: TableActionsRowProps) {
  const classes = ['ds-table-actions', className].filter(Boolean).join(' ');
  return (
    <div role="toolbar" aria-label="Table actions" className={classes} {...rest}>
      <div className="ds-table-actions__buttons">
        <div className="ds-table-actions__export">
          <Button
            variant="dark"
            iconLeft="export"
            aria-haspopup={exportMenu ? 'menu' : undefined}
            aria-expanded={exportMenu ? exportOpen : undefined}
            onClick={onExport}
          >
            {exportLabel}
          </Button>
          {exportMenu && exportOpen && <div className="ds-table-actions__export-menu">{exportMenu}</div>}
        </div>
        <Button variant="outline" iconLeft="clear" onClick={onClear}>
          {clearLabel}
        </Button>
      </div>
      <SearchField className="ds-table-actions__search" aria-label="Search table" {...searchProps} />
    </div>
  );
}

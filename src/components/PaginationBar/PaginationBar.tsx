import type { HTMLAttributes } from 'react';
import { ShowSelect } from '../ShowSelect';
import { Pagination } from '../Pagination';
import './PaginationBar.css';

export interface PaginationBarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current page, 1-based. */
  page: number;
  /** Total number of pages. */
  pageCount: number;
  onPageChange?: (page: number) => void;
  /** Rows per page (the “Show:” select). */
  pageSize: number;
  /** Options of the “Show:” select. Figma shows 8. */
  pageSizeOptions?: number[];
  onPageSizeChange?: (size: number) => void;
  /** Label before the select. */
  label?: string;
}

/**
 * Figma `Sow Menu Pagination`: footer of a table / list — “Show: [8 ⌄]” on the left,
 * `Pagination` on the right. White card, 5px radius, Table Row shadow.
 */
export function PaginationBar({
  page,
  pageCount,
  onPageChange,
  pageSize,
  pageSizeOptions = [8, 16, 32, 64],
  onPageSizeChange,
  label = 'Show:',
  className,
  ...rest
}: PaginationBarProps) {
  const classes = ['ds-pagination-bar', className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...rest}>
      <ShowSelect value={pageSize} options={pageSizeOptions} onChange={onPageSizeChange} label={label} />
      <Pagination page={page} pageCount={pageCount} onPageChange={onPageChange} />
    </div>
  );
}

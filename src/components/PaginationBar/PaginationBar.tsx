import { useEffect, useId, useRef, useState, type HTMLAttributes } from 'react';
import { FilterField } from '../InputField';
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
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  // Close the list on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const classes = ['ds-pagination-bar', className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...rest}>
      <div className="ds-pagination-bar__show" ref={wrapRef}>
        <span className="ds-pagination-bar__label" id={`${listId}-label`}>
          {label}
        </span>
        <div className="ds-pagination-bar__select">
          <FilterField
            className="ds-pagination-bar__field"
            value={pageSize}
            open={open}
            aria-labelledby={`${listId}-label`}
            aria-controls={listId}
            onClick={() => setOpen((o) => !o)}
          />
          {open && (
            <ul id={listId} role="listbox" aria-labelledby={`${listId}-label`} className="ds-pagination-bar__list">
              {pageSizeOptions.map((size) => (
                <li
                  key={size}
                  role="option"
                  aria-selected={size === pageSize}
                  tabIndex={0}
                  className={`ds-pagination-bar__option${size === pageSize ? ' is-selected' : ''}`}
                  onClick={() => {
                    onPageSizeChange?.(size);
                    setOpen(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onPageSizeChange?.(size);
                      setOpen(false);
                    }
                  }}
                >
                  {size}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Pagination page={page} pageCount={pageCount} onPageChange={onPageChange} />
    </div>
  );
}

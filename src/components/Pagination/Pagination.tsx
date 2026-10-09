import { IconButton } from '../IconButton';
import './Pagination.css';

export type PaginationItem = number | 'gap';

export interface PaginationProps {
  /** Current page, 1-based. */
  page: number;
  /** Total number of pages. */
  pageCount: number;
  /** Called with the new page when a page button or an arrow is pressed. */
  onPageChange?: (page: number) => void;
  /**
   * How many pages are shown on each side of the current one before the list
   * collapses into "...". Figma `Version=2` (1 2 3 4 5 6 ... 14) = 2.
   */
  siblingCount?: number;
  /**
   * `md` — 40px buttons (Figma 768px and up). `sm` — 24px buttons with 10px numbers that spread over the whole
   * width of the container (Figma `Pagination Responsive`, 480px and below).
   */
  size?: 'md' | 'sm';
  className?: string;
  /** Accessible name of the navigation landmark. */
  'aria-label'?: string;
}

const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => from + i);

/**
 * Pages to render. Short lists are shown in full (Figma `Version=1`);
 * long lists keep the first and last page and collapse the rest into "...".
 */
export function getPaginationItems(page: number, pageCount: number, siblingCount = 2): PaginationItem[] {
  // first + last + current + 2 siblings + 2 gaps; the head/tail blocks are 2 + 2*siblings wide.
  const block = 2 + 2 * siblingCount;
  if (pageCount <= block + 2) return range(1, pageCount);

  const current = Math.min(Math.max(page, 1), pageCount);
  if (current <= block - 2) return [...range(1, block), 'gap', pageCount];
  if (current >= pageCount - block + 3) return [1, 'gap', ...range(pageCount - block + 1, pageCount)];
  return [1, 'gap', ...range(current - siblingCount, current + siblingCount), 'gap', pageCount];
}

/**
 * Figma `Pagination`: previous / next arrows around numbered page buttons.
 * `Version=1` is a short list (1 2 3), `Version=2` a long one with "...".
 */
export function Pagination({
  page,
  pageCount,
  onPageChange,
  siblingCount = 2,
  size = 'md',
  className,
  'aria-label': ariaLabel = 'Pagination',
}: PaginationProps) {
  const items = getPaginationItems(page, pageCount, siblingCount);
  const go = (p: number) => {
    if (p >= 1 && p <= pageCount && p !== page) onPageChange?.(p);
  };

  return (
    <nav aria-label={ariaLabel} className={className}>
      <ul className={`ds-pagination${size === 'sm' ? ' ds-pagination--sm' : ''}`}>
        <li className="ds-pagination__item">
          <IconButton kind="prev" size={size} disabled={page <= 1} onClick={() => go(page - 1)} />
        </li>
        {items.map((item, i) =>
          item === 'gap' ? (
            <li key={`gap-${i}`} className="ds-pagination__item" aria-hidden>
              <span className="ds-pagination__gap">...</span>
            </li>
          ) : (
            <li key={item} className="ds-pagination__item">
              <IconButton kind="page" size={size} active={item === page} onClick={() => go(item)}>
                {item}
              </IconButton>
            </li>
          ),
        )}
        <li className="ds-pagination__item">
          <IconButton kind="next" size={size} disabled={page >= pageCount} onClick={() => go(page + 1)} />
        </li>
      </ul>
    </nav>
  );
}

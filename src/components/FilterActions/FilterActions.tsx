import type { HTMLAttributes, ReactNode } from 'react';
import { Button } from '../Button';
import { SearchField, type SearchFieldProps } from '../SearchField';
import './FilterActions.css';

export interface FilterActionsProps extends HTMLAttributes<HTMLDivElement> {
  /** Label of the filter button. */
  filterLabel?: ReactNode;
  /** Number of applied filters shown in the badge. Hidden when `undefined` or `0`. */
  filterCount?: number;
  /** Called on click of the filter button. */
  onFilter?: () => void;
  /** Props passed to the `SearchField` (value, onSearch, placeholder…). */
  searchProps?: Omit<SearchFieldProps, 'size'>;
}

/**
 * Figma `Actions` (mobile toolbar): the “Filter [4]” button above a full-width mobile `SearchField`.
 * Composed of `Button` (outline, filter icon, counter) and `SearchField size="mobile"`.
 */
export function FilterActions({
  filterLabel = 'Filter',
  filterCount,
  onFilter,
  searchProps,
  className,
  ...rest
}: FilterActionsProps) {
  const classes = ['ds-filter-actions', className].filter(Boolean).join(' ');
  return (
    <div role="toolbar" aria-label="Filter and search" className={classes} {...rest}>
      <Button
        variant="outline"
        iconLeft="filter-dark"
        counter={filterCount ? filterCount : undefined}
        className="ds-filter-actions__filter"
        onClick={onFilter}
      >
        {filterLabel}
      </Button>
      <SearchField size="mobile" aria-label="Search" {...searchProps} />
    </div>
  );
}

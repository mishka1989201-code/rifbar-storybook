import type { HTMLAttributes, ReactNode } from 'react';
import { FilterChevron } from '../FilterChevron';
import { IconButton } from '../IconButton';
import './FilterMenu.css';

export interface FilterMenuApplied {
  /** Stable id, returned by `onRemoveFilter`. */
  id: string;
  /** Filter name before the colon, e.g. “Status”. */
  label: ReactNode;
  /** Selected value, e.g. “Pending”. */
  value: ReactNode;
}

export interface FilterMenuProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Header title. Default “Filters”. */
  title?: ReactNode;
  /** Number of applied filters, drawn as a badge after the title. Hidden when 0 or not set. */
  count?: number;
  /** Applied filters, drawn as `FilterChevron`s under the header (Figma `Filters Chevron Light`). */
  filters?: FilterMenuApplied[];
  /** Called with the id of the filter whose × was pressed. */
  onRemoveFilter?: (id: string) => void;
  /** Called on click of the close button in the header. */
  onClose?: () => void;
  /** Accessible name of the close button. */
  closeLabel?: string;
  /** The filter sections: `CheckListModal`s, a `Modal` with a `DatePicker`… (Figma: two `Info Modal`s). */
  children?: ReactNode;
}

/**
 * Figma `Filter Responsive Menu`: the full-width filter screen of the 768px layout — a white header with the
 * title, a count badge and a close button, the applied filters as chips, and the filter sections stacked below
 * on the BG Color canvas. An organism: the sections are existing molecules passed as `children`.
 */
export function FilterMenu({
  title = 'Filters',
  count,
  filters = [],
  onRemoveFilter,
  onClose,
  closeLabel = 'Close filters',
  children,
  className,
  ...rest
}: FilterMenuProps) {
  const classes = ['ds-filter-menu', className].filter(Boolean).join(' ');
  return (
    <section className={classes} {...rest}>
      <header className="ds-filter-menu__header">
        <h2 className="ds-filter-menu__title">
          <span className="ds-filter-menu__title-text">{title}</span>
          {count != null && count > 0 && (
            <span className="ds-filter-menu__count" aria-label={`${count} applied`}>
              {count}
            </span>
          )}
        </h2>
        <IconButton kind="close" aria-label={closeLabel} onClick={onClose} />
      </header>
      <div className="ds-filter-menu__body">
        {filters.length > 0 && (
          <ul className="ds-filter-menu__chips" aria-label="Applied filters">
            {filters.map((filter) => (
              <li key={filter.id}>
                <FilterChevron
                  label={filter.label}
                  removeLabel={`Remove filter ${typeof filter.value === 'string' ? filter.value : ''}`.trim()}
                  onRemove={onRemoveFilter ? () => onRemoveFilter(filter.id) : undefined}
                >
                  {filter.value}
                </FilterChevron>
              </li>
            ))}
          </ul>
        )}
        {children}
      </div>
    </section>
  );
}

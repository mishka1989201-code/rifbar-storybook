import type { HTMLAttributes, MouseEvent, ReactNode } from 'react';
import { Icon } from '../Icon';
import './FilterChevron.css';

/** Maps to the Figma `Style` property of `Filter Chevron` (Outline Hover is the hover of `outline`). */
export type FilterChevronVariant =
  | 'outline' // Style=Outline — Stroke Light V1 fill, Secondary Grey stroke
  | 'outline-v2' // Style=Outline V2 — Stroke Light V1 fill, Headlines stroke
  | 'filled'; // Style=Filled — Headlines fill, white value

export interface FilterChevronProps extends HTMLAttributes<HTMLSpanElement> {
  /** Filter name before the colon, e.g. “Status”. */
  label: ReactNode;
  /** Selected filter value, e.g. “Primary”. */
  children: ReactNode;
  variant?: FilterChevronVariant;
  /** Called when × is clicked. Without it × is decorative. */
  onRemove?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** Accessible name of the × button. Defaults to “Remove filter”. */
  removeLabel?: string;
  /** Shows the hover look without the pointer (for Storybook only). */
  forceHover?: boolean;
}

/**
 * Figma `Filter Chevron`: an applied filter shown above a list or table —
 * “Status: Primary ×”. The × removes the filter.
 */
export function FilterChevron({
  label,
  children,
  variant = 'outline',
  onRemove,
  removeLabel = 'Remove filter',
  forceHover = false,
  className,
  ...rest
}: FilterChevronProps) {
  const classes = ['ds-filter-chevron', `ds-filter-chevron--${variant}`, forceHover && 'is-hover', className]
    .filter(Boolean)
    .join(' ');
  const icon = <Icon name="xmark" size={16} color="current" className="ds-filter-chevron__icon" />;

  return (
    <span className={classes} {...rest}>
      <span className="ds-filter-chevron__title">
        <span className="ds-filter-chevron__label">{label}:</span>
        <span className="ds-filter-chevron__value">{children}</span>
      </span>
      {onRemove ? (
        <button type="button" className="ds-filter-chevron__remove" aria-label={removeLabel} onClick={onRemove}>
          {icon}
        </button>
      ) : (
        <span className="ds-filter-chevron__remove">{icon}</span>
      )}
    </span>
  );
}

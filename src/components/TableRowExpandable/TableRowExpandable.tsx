import type { HTMLAttributes, ReactNode } from 'react';
import { Icon } from '../Icon';
import { ImageCard } from '../ImageCard';
import './TableRowExpandable.css';

export interface TableRowExpandableProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Row number. */
  index?: ReactNode;
  /** Product photo URL; without it `ImageCard` shows its placeholder. */
  image?: string;
  /** Product name (Semi-Bold). */
  name?: ReactNode;
  /** Volume / size, right-aligned, e.g. `15 ml`. */
  size?: ReactNode;
  /** Product type, e.g. `RECHARGEABLE / DISPOSABLE`. */
  type?: ReactNode;
  /** Nicotine strength, right-aligned, e.g. `5%`. */
  nicotine?: ReactNode;
  /** Price, e.g. `$15`. */
  price?: ReactNode;
  /** Figma `Style=Active`: the row is opened (violet stroke, the toggle shows the “down” chevron). */
  expanded?: boolean;
  /** Figma `Style=Disabled`. */
  disabled?: boolean;
  /** Called when the toggle button is pressed. */
  onToggle?: () => void;
  /** Accessible name of the toggle button. */
  toggleLabel?: string;
  /** Preview only: draws Figma `Style=Hover`. Real hover comes from CSS. */
  forceHover?: boolean;
}

/**
 * Figma `Table Row` (Style Static / Hover / Active / Disabled): a card-like row of the products table
 * with photo, product data and a toggle button that opens the row.
 */
export function TableRowExpandable({
  index = 1,
  image,
  name = 'Astro',
  size = '15 ml',
  type = 'RECHARGEABLE / DISPOSABLE',
  nicotine = '5%',
  price = '$15',
  expanded = false,
  disabled = false,
  onToggle,
  toggleLabel = 'Toggle details',
  forceHover = false,
  className,
  ...rest
}: TableRowExpandableProps) {
  const classes = [
    'ds-table-row-expandable',
    expanded && 'is-active',
    forceHover && 'is-hover',
    disabled && 'is-disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div role="row" className={classes} aria-disabled={disabled || undefined} {...rest}>
      <div className="ds-table-row-expandable__lead">
        <div role="cell" className="ds-table-row-expandable__cell ds-table-row-expandable__id">{index}</div>
        <ImageCard src={image} alt="" size="md" />
        <div role="cell" className="ds-table-row-expandable__cell ds-table-row-expandable__name">{name}</div>
      </div>
      <div role="cell" className="ds-table-row-expandable__cell ds-table-row-expandable__size">{size}</div>
      <div role="cell" className="ds-table-row-expandable__cell ds-table-row-expandable__type">{type}</div>
      <div role="cell" className="ds-table-row-expandable__cell ds-table-row-expandable__nicotine">{nicotine}</div>
      <div role="cell" className="ds-table-row-expandable__cell ds-table-row-expandable__price">{price}</div>
      <div role="cell" className="ds-table-row-expandable__cell ds-table-row-expandable__action">
        <button
          type="button"
          className="ds-table-row-expandable__toggle"
          aria-expanded={expanded}
          aria-label={toggleLabel}
          disabled={disabled}
          onClick={onToggle}
        >
          <Icon name={expanded ? 'chevron-down' : 'chevron-up'} size={16} color="primary" />
        </button>
      </div>
    </div>
  );
}

import type { HTMLAttributes, ReactNode } from 'react';
import './RowInfoBlock.css';

export interface RowInfoBlockProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Figma `Property 1`:
   * `pair` — `order-list__item`: label (dark) and value (grey) at the two edges, Stroke Light V2 line;
   * `line` — `Info Line 1`: grey 16px caption and 16px value in a 2 : 3 grid, Stroke Light V2 line;
   * `stacked` — mobile `order-list__item` (320px): `label` over `description` on the left, `value` on the right, Stroke Light V1 line;
   * `compact` — `Info Line` of `TicketInfo/V2`: 14px Medium, 140px caption + value that fills the rest, Stroke Light V2 line;
   * `cells` — `order-list_item2`: 2+ cells (first at the start, last at the end, the rest centered), Stroke Light V1 line.
   */
  variant?: 'pair' | 'line' | 'compact' | 'stacked' | 'cells';
  /** `pair` / `line` / `compact`: caption, e.g. “Name”, “Warehouse from”. */
  label?: ReactNode;
  /** `stacked`: second line under the label, e.g. “Banana Ice”. */
  description?: ReactNode;
  /** `pair` / `line` / `compact` / `stacked`: value (any node, e.g. a `ChevronDropDown`), e.g. “David Schwimmer”, “Chongqing #3”. */
  value?: ReactNode;
  /** `cells`: content of the columns, e.g. `['Astro', 'Banana Ice', '120']`. */
  cells?: ReactNode[];
}

/**
 * Figma `RowInfoBlock` (5 variants of one row) as ONE component: a row with 8px vertical padding
 * and a bottom line, used in order / warehouse info lists. The variants differ only in
 * typography, column layout and line color, so they are the `variant` prop.
 */
export function RowInfoBlock({
  variant = 'pair',
  label = 'Name',
  description,
  value = 'David Schwimmer',
  cells = ['Astro', 'Banana Ice', '120'],
  className,
  ...rest
}: RowInfoBlockProps) {
  const classes = ['ds-row-info-block', `ds-row-info-block--${variant}`, className].filter(Boolean).join(' ');

  if (variant === 'cells') {
    return (
      <div className={classes} {...rest}>
        {cells.map((cell, index) => (
          <span key={index} className="ds-row-info-block__cell">
            {cell}
          </span>
        ))}
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div className={classes} {...rest}>
        <span className="ds-row-info-block__text">
          <span className="ds-row-info-block__label">{label}</span>
          {description != null && <span className="ds-row-info-block__description">{description}</span>}
        </span>
        <span className="ds-row-info-block__value">{value}</span>
      </div>
    );
  }

  return (
    <div className={classes} {...rest}>
      <span className="ds-row-info-block__label">{label}</span>
      <span className="ds-row-info-block__value">{value}</span>
    </div>
  );
}

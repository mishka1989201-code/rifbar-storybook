import type { HTMLAttributes } from 'react';
import './CardGrid.css';

export type CardGridProps = HTMLAttributes<HTMLDivElement>;

/**
 * Figma `Cards Line` (Pagination Responsive, Client Orders): the cards of a list in a responsive grid, 8px apart —
 * two columns at 768px, one at 480px and below. Columns are as many as fit with a card at least
 * `--size-card-grid-min` wide. Put `CardRow`s, `TableRowOrder`s (`layout="card"`) or any other card inside.
 */
export function CardGrid({ className, children, ...rest }: CardGridProps) {
  const classes = ['ds-card-grid', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}

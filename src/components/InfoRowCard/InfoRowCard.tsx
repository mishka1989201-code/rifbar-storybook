import type { HTMLAttributes, ReactNode } from 'react';
import './InfoRowCard.css';

export interface InfoRowCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Bold caption in the left column, e.g. “Mickey Herman”. */
  label: ReactNode;
  /** Value in the right column, e.g. “Sam's Club”. */
  value: ReactNode;
}

/**
 * Figma `InfoRow.Card 1024px`: two columns — a semi-bold caption (200px) and a value that fills the rest.
 * Used in info cards on desktop (1024px) pages.
 */
export function InfoRowCard({ label, value, className, ...rest }: InfoRowCardProps) {
  const classes = ['ds-info-row-card', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...rest}>
      <div className="ds-info-row-card__label">{label}</div>
      <div className="ds-info-row-card__value">{value}</div>
    </div>
  );
}

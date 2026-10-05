import type { HTMLAttributes, ReactNode } from 'react';
import './CardStrokeRow.css';

export interface CardStrokeRowProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Caption on the left, e.g. “Colors:”. */
  label: ReactNode;
  /** Value on the right, e.g. “8”. */
  value: ReactNode;
}

/**
 * Figma `Row.CardStroke`: one line inside a card — label on the left, value on the right,
 * 16px side padding. The 16px icon next to the value is hidden in Figma, so it is not drawn;
 * pass an `<Icon>` inside `value` if needed.
 */
export function CardStrokeRow({ label, value, className, ...rest }: CardStrokeRowProps) {
  const classes = ['ds-card-stroke-row', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...rest}>
      <span className="ds-card-stroke-row__label">{label}</span>
      <span className="ds-card-stroke-row__value">{value}</span>
    </div>
  );
}

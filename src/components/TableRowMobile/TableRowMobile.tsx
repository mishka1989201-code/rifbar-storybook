import type { HTMLAttributes, ReactNode } from 'react';
import { Button, type ButtonProps } from '../Button';
import './TableRowMobile.css';

export interface TableRowMobileProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Figma `Property 1`: `360` (`360px`, button padding 8) or `480` (`480px`, taller button: 12 / 8).
   * The width is always 100% of the container; the size only changes the button height.
   */
  size?: '360' | '480';
  /** Semi-Bold caption on the left, e.g. “KPI”. */
  label?: ReactNode;
  /** Value in the middle, e.g. “1440 / 1200”. */
  value?: ReactNode;
  /** Value on the right, e.g. “116%”. */
  result?: ReactNode;
  /** Text of the action button. Default “Edit”. */
  actionLabel?: ReactNode;
  /** Props forwarded to the default action `Button` (`onClick`, `disabled`, `iconLeft`…). */
  actionProps?: Omit<ButtonProps, 'children'>;
  /** Replaces the default action button. Pass `null` to hide the button row. */
  action?: ReactNode;
}

/**
 * Figma `TableRow` (360px / 480px): a compact table row for narrow screens — three cells
 * (caption, centered value, right-aligned value) and a full-width dark `Button` with an icon under them.
 */
export function TableRowMobile({
  size = '360',
  label = 'KPI',
  value = '1440 / 1200',
  result = '116%',
  actionLabel = 'Edit',
  actionProps,
  action,
  className,
  ...rest
}: TableRowMobileProps) {
  const classes = ['ds-table-row-mobile', `ds-table-row-mobile--${size}`, className].filter(Boolean).join(' ');
  return (
    <div role="row" className={classes} {...rest}>
      <div className="ds-table-row-mobile__cells">
        <div role="cell" className="ds-table-row-mobile__cell ds-table-row-mobile__label">{label}</div>
        <div role="cell" className="ds-table-row-mobile__cell ds-table-row-mobile__value">{value}</div>
        <div role="cell" className="ds-table-row-mobile__cell ds-table-row-mobile__result">{result}</div>
      </div>
      {action !== null && (
        <div className="ds-table-row-mobile__action">
          {action ?? (
            <Button
              variant="dark"
              size="small"
              iconLeft="edit"
              {...actionProps}
              className={['ds-table-row-mobile__button', actionProps?.className].filter(Boolean).join(' ')}
            >
              {actionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

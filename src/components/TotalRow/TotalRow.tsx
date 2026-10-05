import type { HTMLAttributes, ReactNode } from 'react';
import { Button } from '../Button';
import './TotalRow.css';

export interface TotalRowProps extends HTMLAttributes<HTMLDivElement> {
  /** Small caption above the amount. */
  label?: ReactNode;
  /** The amount, e.g. `$19140`. */
  total: ReactNode;
  /** Called on click of the icon-only download button. Omit together with `onViewDoc` to hide both. */
  onDownload?: () => void;
  /** Called on click of “View doc”. */
  onViewDoc?: () => void;
  viewDocLabel?: ReactNode;
  /** Accessible name of the icon-only download button. */
  downloadLabel?: string;
}

/**
 * Figma `Row.Total`: white summary bar under a table — caption + large total on the left,
 * icon-only download button and “View doc” button (both Dark BG) on the right. Card shadow below.
 */
export function TotalRow({
  label = 'Total',
  total,
  onDownload,
  onViewDoc,
  viewDocLabel = 'View doc',
  downloadLabel = 'Download',
  className,
  ...rest
}: TotalRowProps) {
  const classes = ['ds-total-row', className].filter(Boolean).join(' ');
  const hasActions = Boolean(onDownload || onViewDoc);
  return (
    <div className={classes} {...rest}>
      <div className="ds-total-row__total">
        <span className="ds-total-row__label">{label}</span>
        <span className="ds-total-row__amount">{total}</span>
      </div>
      {hasActions && (
        <div className="ds-total-row__buttons">
          <Button variant="dark" iconOnly="download-cloud" aria-label={downloadLabel} onClick={onDownload} />
          <Button variant="dark" size="medium" iconLeft="tick" onClick={onViewDoc}>
            {viewDocLabel}
          </Button>
        </div>
      )}
    </div>
  );
}

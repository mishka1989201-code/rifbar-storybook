import type { HTMLAttributes, ReactNode } from 'react';
import { Button, type ButtonProps } from '../Button';
import './AlertRow.css';

/** Figma `Option 1` = warning (orange), `Option 4` / `Option 5` = info (blue). */
export type AlertRowTone = 'warning' | 'info';

export interface AlertRowProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Figma row color: `warning` (Warning BG) or `info` (Success BG, Hover Blue text). */
  tone?: AlertRowTone;
  /** Medium lead of the sentence, e.g. “5 types of products”. */
  lead: ReactNode;
  /** Regular rest of the sentence, e.g. “will soon be out of stock”. */
  children?: ReactNode;
  /** Label of the action at the right, e.g. “View products”. Omit it for a row without an action. */
  actionLabel?: ReactNode;
  /** Called when the action is pressed. */
  onAction?: () => void;
  /** Extra props for the action `Button` (`aria-label`, `disabled`…). */
  actionProps?: Omit<ButtonProps, 'variant' | 'children' | 'onClick'>;
}

/**
 * Figma `Welcome Card` → `Option 1 / 4 / 5`: a tinted row with a dot, a sentence (Medium lead + Regular rest)
 * and a `Text & Arrow` action at the right. A 1px Stroke Light V2 line separates stacked rows.
 */
export function AlertRow({
  tone = 'info',
  lead,
  children,
  actionLabel,
  onAction,
  actionProps,
  className,
  ...rest
}: AlertRowProps) {
  const classes = ['ds-alert-row', `ds-alert-row--${tone}`, className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...rest}>
      <p className="ds-alert-row__text">
        <span className="ds-alert-row__dot" aria-hidden="true" />
        <span className="ds-alert-row__lead">{lead}</span>
        {children != null && <> <span className="ds-alert-row__rest">{children}</span></>}
      </p>
      {actionLabel != null && (
        <Button variant="text-arrow" className="ds-alert-row__action" onClick={onAction} {...actionProps}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

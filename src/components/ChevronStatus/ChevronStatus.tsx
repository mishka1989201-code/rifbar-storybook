import type { HTMLAttributes, ReactNode } from 'react';
import { Icon } from '../Icon';
import './ChevronStatus.css';

/** Maps 1:1 to the Figma `Color` property of `Chevron.Status`. */
export type ChevronStatusColor =
  | 'primary' // Color=Primary — Hover Blue
  | 'secondary' // Color=Secondary — Grey Dark
  | 'success' // Color=Success — Green Dark
  | 'info' // Color=Info — Headlines
  | 'warning' // Color=Warning — Warning Strong
  | 'danger' // Color=Danger — Danger Strong
  | 'light' // Color=Light — BG Color, Grey Dark text
  | 'dark'; // Color=Dark — Primary Blue Dark

export interface ChevronStatusProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
  color?: ChevronStatusColor;
  /** Status text. */
  children?: ReactNode;
  /** Figma `Icon` property: `arrow_drop_up` before the text, for trend badges (“▲ 13.6%”). */
  icon?: boolean;
  /** Accessible name of the icon, e.g. “Up”. Without it the arrow is decorative. */
  iconLabel?: string;
}

/**
 * Figma `Chevron.Status`. A colored pill with a short status text
 * (order status, payment status, stock level…). Not interactive.
 */
export function ChevronStatus({ color = 'primary', icon = false, iconLabel, className, children, ...rest }: ChevronStatusProps) {
  const classes = ['ds-chevron-status', `ds-chevron-status--${color}`, className].filter(Boolean).join(' ');
  return (
    <span className={classes} {...rest}>
      {icon && <Icon name="arrow-drop-up" size={16} color="current" className="ds-chevron-status__icon" label={iconLabel} />}
      <span className="ds-chevron-status__text">{children}</span>
    </span>
  );
}

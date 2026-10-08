import type { HTMLAttributes, ReactNode } from 'react';
import { Icon } from '../Icon';
import './NotificationLine.css';

/** Figma `Type`: `Old` — white row (already read), `New` — tinted row with a light stroke (unread). */
export type NotificationLineType = 'old' | 'new';

/** `row` = Figma `NotificationLine` (page list), `popup` = Figma `Notification Line PopUp` (row of the bell pop-up). */
export type NotificationLineVariant = 'row' | 'popup';

export interface NotificationLineProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Notification text, e.g. “Check the warehouse “Warsaw #345” - problems with the quantity!”. */
  message: ReactNode;
  /** Date shown under the text with the warning icon, e.g. “06/23/2023”. */
  date?: ReactNode;
  /** `popup` = compact 300px pop-up row: icon on the left, 12px text, bottom line (Figma `Notification Line PopUp`). */
  variant?: NotificationLineVariant;
  /** Figma `Type`. */
  type?: NotificationLineType;
  /** Figma `Property 1 = Disabled`. */
  disabled?: boolean;
  /** Preview only: draws the Figma `Property 1 = Hover` state. Real hover comes from CSS. */
  forceHover?: boolean;
}

/**
 * Figma `NotificationLine` (Type Old / New × Property 1 Static / Hover / Disabled): a row of the
 * notifications list — message text and, below it, a warning icon with the date.
 */
export function NotificationLine({
  message,
  date,
  variant = 'row',
  type = 'old',
  disabled = false,
  forceHover = false,
  className,
  ...rest
}: NotificationLineProps) {
  const classes = [
    'ds-notification-line',
    `ds-notification-line--${variant}`,
    `ds-notification-line--${type}`,
    forceHover && 'is-hover',
    disabled && 'is-disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (variant === 'popup') {
    return (
      <div className={classes} aria-disabled={disabled || undefined} {...rest}>
        <Icon name="warning-v2" size={16} color="current" className="ds-notification-line__icon" />
        <div className="ds-notification-line__details">
          <p className="ds-notification-line__message">{message}</p>
          {date != null && <span className="ds-notification-line__date">{date}</span>}
        </div>
      </div>
    );
  }

  return (
    <div className={classes} aria-disabled={disabled || undefined} {...rest}>
      <div className="ds-notification-line__details">
        <p className="ds-notification-line__message">{message}</p>
        {date != null && (
          <span className="ds-notification-line__time">
            <Icon name="warning-v2" size={16} color="current" className="ds-notification-line__icon" />
            <span className="ds-notification-line__date">{date}</span>
          </span>
        )}
      </div>
    </div>
  );
}

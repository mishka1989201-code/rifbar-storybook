import type { HTMLAttributes, ReactNode } from 'react';
import { Icon, type IconName } from '../Icon';
import './Notification.css';

/** Maps 1:1 to the Figma `Property 1` (Success / Info / Warning / Error). */
export type NotificationKind = 'success' | 'info' | 'warning' | 'error';

/**
 * `toast` — status icon, text, close button on the right (Figma Success / Info / Warning / Error).
 * `banner` — close button on the left, text, buttons on the right (Figma “Sign the Contract”).
 */
export type NotificationLayout = 'toast' | 'banner';

export interface NotificationProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  kind?: NotificationKind;
  layout?: NotificationLayout;
  /** Bold lead-in before the text, e.g. “Important Notice:”. */
  title?: ReactNode;
  /** Message text. */
  children?: ReactNode;
  /** Buttons on the right, used with `layout="banner"`. */
  actions?: ReactNode;
  /** Shows the close button and is called when it is pressed. */
  onClose?: () => void;
  /** Accessible name of the close button. Default “Close”. */
  closeLabel?: string;
}

const KIND_ICON: Record<NotificationKind, IconName> = {
  success: 'tick',
  info: 'info',
  warning: 'warning-v1',
  error: 'warning-v2',
};

/**
 * Figma `Notiffications` (Success / Info / Warning / Error / Sign the Contract) as ONE component:
 * a tinted message bar. `kind` sets the colors and status icon, `layout` the arrangement.
 */
export function Notification({
  kind = 'success',
  layout = 'toast',
  title,
  children,
  actions,
  onClose,
  closeLabel = 'Close',
  className,
  ...rest
}: NotificationProps) {
  const classes = ['ds-notification', `ds-notification--${kind}`, `ds-notification--${layout}`, className]
    .filter(Boolean)
    .join(' ');
  const isBanner = layout === 'banner';
  const close = onClose && (
    <button type="button" className="ds-notification__close" aria-label={closeLabel} onClick={onClose}>
      <Icon name="xmark" size={24} color="current" />
    </button>
  );
  return (
    <div className={classes} role={kind === 'error' || kind === 'warning' ? 'alert' : 'status'} {...rest}>
      <div className="ds-notification__main">
        {isBanner ? close : <Icon name={KIND_ICON[kind]} size={24} color="current" />}
        <p className="ds-notification__text">
          {title && <strong className="ds-notification__title">{title}</strong>}
          {title && children ? ' ' : null}
          {children}
        </p>
      </div>
      {isBanner ? actions && <div className="ds-notification__actions">{actions}</div> : close}
    </div>
  );
}

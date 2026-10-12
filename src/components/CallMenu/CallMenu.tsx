import type { HTMLAttributes, ReactNode } from 'react';
import { Icon } from '../Icon';
import './CallMenu.css';

export interface CallMenuProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Called when “WhatsApp” is chosen. */
  onWhatsApp?: () => void;
  /** Called when “A phone call” is chosen. */
  onCall?: () => void;
  whatsAppLabel?: ReactNode;
  callLabel?: ReactNode;
  /** Preview only: draws the “A phone call” option pressed (Figma `Call-container`, Stroke Light V2). Real hover / press come from CSS. */
  forceCallActive?: boolean;
  /** Preview only: draws the “WhatsApp” option hovered. */
  forceWhatsAppActive?: boolean;
  /** Accessible name of the menu. */
  'aria-label'?: string;
}

/**
 * Figma `tooltip-call`: a small white bubble with an arrow on top and two ways to reach a client —
 * `WhatsApp` and `A phone call`. Opens under the phone button of a table row (see `TableRowClient`);
 * placing it next to the target is up to the caller.
 */
export function CallMenu({
  onWhatsApp,
  onCall,
  whatsAppLabel = 'WhatsApp',
  callLabel = 'A phone call',
  forceCallActive = false,
  forceWhatsAppActive = false,
  className,
  'aria-label': ariaLabel = 'Contact by',
  ...rest
}: CallMenuProps) {
  const classes = ['ds-call-menu', className].filter(Boolean).join(' ');
  return (
    <div role="menu" aria-label={ariaLabel} className={classes} {...rest}>
      <div className="ds-call-menu__body">
        <button
          type="button"
          role="menuitem"
          className={['ds-call-menu__option', 'ds-call-menu__option--whatsapp', forceWhatsAppActive && 'is-active'].filter(Boolean).join(' ')}
          onClick={onWhatsApp}
        >
          <span className="ds-call-menu__circle ds-call-menu__circle--whatsapp">
            <Icon name="whatsapp" size={16} color="current" />
          </span>
          {whatsAppLabel}
        </button>
        <button
          type="button"
          role="menuitem"
          className={['ds-call-menu__option', 'ds-call-menu__option--call', forceCallActive && 'is-active'].filter(Boolean).join(' ')}
          onClick={onCall}
        >
          <span className="ds-call-menu__circle ds-call-menu__circle--call">
            <Icon name="call-v2" size={16} color="current" />
          </span>
          {callLabel}
        </button>
      </div>
      <span className="ds-call-menu__arrow" aria-hidden="true" />
    </div>
  );
}

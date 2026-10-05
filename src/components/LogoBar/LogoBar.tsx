import type { HTMLAttributes } from 'react';
import { Icon } from '../Icon';
import { Logo, type LogoSize } from '../Logo';
import './LogoBar.css';

export interface LogoBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Called when the burger is pressed (toggles the side menu). */
  onMenuClick?: () => void;
  /** Accessible name of the burger. */
  menuLabel?: string;
  /** Whether the side menu is open. Sets `aria-expanded` and switches the icon to `burger-rolled-up`. */
  expanded?: boolean;
  /** Hides the burger (side menu not available). */
  hideMenu?: boolean;
  /** Logo size. Default `lg` (184×46, as in Figma). */
  logoSize?: LogoSize;
  /** Makes the logo a link, e.g. to the home page. */
  href?: string;
}

/**
 * Figma `Logo, Icon - Navbar`: the burger icon (24px) and the Rifbar logo, 24px apart.
 * Transparent and white by default — it sits on the dark Navbar / header.
 */
export function LogoBar({
  onMenuClick,
  menuLabel = 'Menu',
  expanded = false,
  hideMenu = false,
  logoSize = 'lg',
  href,
  className,
  ...rest
}: LogoBarProps) {
  const classes = ['ds-logo-bar', className].filter(Boolean).join(' ');
  const logo = <Logo size={logoSize} tone="inverse" />;
  return (
    <div className={classes} {...rest}>
      {!hideMenu && (
        <button
          type="button"
          className="ds-logo-bar__burger"
          aria-label={menuLabel}
          aria-expanded={expanded}
          onClick={onMenuClick}
        >
          <Icon name={expanded ? 'burger-rolled-up' : 'burger'} size={24} color="current" />
        </button>
      )}
      {href ? (
        <a className="ds-logo-bar__logo" href={href}>
          {logo}
        </a>
      ) : (
        <span className="ds-logo-bar__logo">{logo}</span>
      )}
    </div>
  );
}

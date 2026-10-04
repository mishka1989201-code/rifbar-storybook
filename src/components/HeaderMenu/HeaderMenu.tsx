import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import { Icon, type IconDot, type IconName } from '../Icon';
import './HeaderMenu.css';

export interface HeaderMenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 24px icon. Figma uses `support`, `bag` and `bell`. */
  icon: IconName;
  /** Accessible name — the button has no visible text. */
  label: string;
  /** Notification dot (Figma `… New Notif`): `warning` for Bell, `success` for Bag / Support. */
  dot?: IconDot;
  /**
   * Figma `Active`: the panel this button opens is shown, or its page is open.
   * Pair it with `aria-expanded` / `aria-current` — the component does not guess which.
   */
  active?: boolean;
  /**
   * Forces the hover visuals (Figma `Hover`). For documentation only —
   * real hover is handled by CSS `:hover`.
   */
  forceHover?: boolean;
}

/** One icon of the header (Figma `Header Menu` → `Icons 24px`). */
export function HeaderMenuItem({
  icon,
  label,
  dot,
  active = false,
  forceHover = false,
  className,
  type = 'button',
  ...rest
}: HeaderMenuItemProps) {
  const classes = ['ds-header-menu__item', active && 'is-active', forceHover && 'is-hover', className]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classes} aria-label={label} title={label} {...rest}>
      <Icon name={icon} size={24} color="current" dot={dot} />
    </button>
  );
}

export interface HeaderMenuProps extends HTMLAttributes<HTMLDivElement> {
  /** `HeaderMenuItem`s, right-aligned with a 16px gap. */
  children?: ReactNode;
}

/** Figma `Header Menu`: the row of icons at the right of the page header. */
export function HeaderMenu({ className, children, ...rest }: HeaderMenuProps) {
  return (
    <div role="group" className={['ds-header-menu', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </div>
  );
}

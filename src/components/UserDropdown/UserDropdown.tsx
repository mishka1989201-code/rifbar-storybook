import type { ButtonHTMLAttributes } from 'react';
import { Avatar } from '../Avatar';
import { Icon } from '../Icon';
import './UserDropdown.css';

export interface UserDropdownProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Full name, e.g. “Jennifer Corbett”. Also gives the avatar initials. */
  name: string;
  /** Avatar photo URL. Without it the initials are shown. */
  src?: string;
  /** The menu is open: chevron points up, `aria-expanded="true"`. Not in Figma. */
  open?: boolean;
  /** `inverse` — white name and chevron, for the dark Navbar (Figma Navbar `user`). */
  tone?: 'default' | 'inverse';
  /** Only the avatar and the chevron are drawn (Figma Navbar `Style=Off`); the name stays as the accessible name. */
  compact?: boolean;
}

/**
 * Figma `user`: avatar + name + chevron-down — the trigger of a user menu.
 * Only the trigger; the menu itself is rendered by the parent.
 */
export function UserDropdown({
  name,
  src,
  open = false,
  tone = 'default',
  compact = false,
  className,
  type = 'button',
  ...rest
}: UserDropdownProps) {
  const classes = [
    'ds-user-dropdown',
    tone === 'inverse' && 'ds-user-dropdown--inverse',
    compact && 'ds-user-dropdown--compact',
    open && 'is-open',
    className,
  ].filter(Boolean).join(' ');
  return (
    <button type={type} className={classes} aria-haspopup="true" aria-expanded={open} {...rest}>
      <Avatar variant="user" name={name} src={src} decorative />
      <span className="ds-user-dropdown__name">
        <span className="ds-user-dropdown__text">{name}</span>
        <Icon name={open ? 'chevron-up' : 'chevron-down'} size={16} color={tone === 'inverse' ? 'current' : 'primary'} />
      </span>
    </button>
  );
}

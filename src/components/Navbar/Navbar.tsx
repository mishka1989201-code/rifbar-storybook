import type { HTMLAttributes } from 'react';
import { LogoBar } from '../LogoBar';
import type { LogoSize } from '../Logo';
import { NavbarMenu, type NavbarMenuItem, type NavbarMenuSize } from '../NavbarMenu';
import { UserDropdown } from '../UserDropdown';
import './Navbar.css';

/**
 * Figma `Size`: `1920` = 300px, `1440` = 237px, `1280` / `1024` / `768` / `480` / `360` = the 253px menu
 * that slides over the content. `1280` and `1024` are drawn identically.
 */
export type NavbarSize = '1920' | '1440' | '1280' | '1024' | '768' | '480' | '360';

export interface NavbarUser {
  /** Full name, e.g. “Jennifer Corbett”. */
  name: string;
  /** Photo URL. Without it the initials are shown. */
  src?: string;
}

export interface NavbarProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Pages of the menu (see `NavbarMenu`). Groups open with `expanded` and show their `children`. */
  items: NavbarMenuItem[];
  /** Id of the active tab or sub-tab. */
  value?: string;
  /** Called with the id of the tab or sub-tab the user picked. */
  onChange?: (id: string) => void;
  /** Figma `Size`. */
  size?: NavbarSize;
  /** Figma `Style=Off`: only the burger, the tab icons and the avatar are shown. */
  collapsed?: boolean;
  /** The signed-in user at the bottom. Omit it to hide the block. */
  user?: NavbarUser;
  /** The user menu is open (chevron points up). Not in Figma. */
  userOpen?: boolean;
  /** Called when the user block is pressed. */
  onUserClick?: () => void;
  /** Called when the burger is pressed. */
  onMenuClick?: () => void;
  /** Makes the logo a link, e.g. to the home page. */
  logoHref?: string;
  /** Accessible name of the navigation landmark. */
  'aria-label'?: string;
}

const MENU_SIZE: Record<NavbarSize, NavbarMenuSize> = {
  '1920': 'desktop',
  '1440': '1440',
  '1280': '1024',
  '1024': '1024',
  '768': '768',
  '480': '480',
  '360': '360',
};

const LOGO_SIZE: Record<NavbarSize, LogoSize> = {
  '1920': 'lg',
  '1440': 'md',
  '1280': 'sm',
  '1024': 'sm',
  '768': 'sm',
  '480': 'sm',
  '360': 'sm',
};

/**
 * Figma `Navbar/Full`: the dark side menu — burger + logo, the page list and the signed-in user.
 * An organism built from `LogoBar`, `NavbarMenu` and `UserDropdown`. Colors follow the theme (`data-theme`).
 */
export function Navbar({
  items,
  value,
  onChange,
  size = '1920',
  collapsed = false,
  user,
  userOpen = false,
  onUserClick,
  onMenuClick,
  logoHref,
  className,
  'aria-label': ariaLabel = 'Main menu',
  ...rest
}: NavbarProps) {
  const classes = ['ds-navbar', `ds-navbar--${size}`, collapsed && 'ds-navbar--collapsed', className]
    .filter(Boolean)
    .join(' ');

  return (
    <aside className={classes} {...rest}>
      <div className="ds-navbar__main">
        <LogoBar
          className="ds-navbar__logo-bar"
          logoSize={LOGO_SIZE[size]}
          hideLogo={collapsed}
          expanded={!collapsed}
          rolledUp={collapsed}
          href={logoHref}
          onMenuClick={onMenuClick}
        />
        <NavbarMenu
          aria-label={ariaLabel}
          items={items}
          value={value}
          onChange={onChange}
          size={MENU_SIZE[size]}
          collapsed={collapsed}
        />
      </div>
      {user && (
        <div className="ds-navbar__user">
          <UserDropdown
            name={user.name}
            src={user.src}
            tone="inverse"
            compact={collapsed}
            open={userOpen}
            onClick={onUserClick}
          />
        </div>
      )}
    </aside>
  );
}

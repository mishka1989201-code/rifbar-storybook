import type { HTMLAttributes } from 'react';
import { Icon, type Icon16Name } from '../Icon';
import './NavbarMenu.css';

/** Figma `Size`: `Desktop` = 300px menu, the others are the 253px menu that slides over the content. */
export type NavbarMenuSize = 'desktop' | '768' | '480' | '360';

export interface NavbarMenuItem {
  /** Stable id, returned by `onChange`. */
  id: string;
  label: string;
  /** 16px icon shown before the label (the only thing shown when `collapsed`). */
  icon: Icon16Name;
  /** Shows a chevron after the label: the item opens a sub-menu. */
  expandable?: boolean;
  /** The sub-menu is open: the chevron points up. Not drawn in Figma (AI-defined). */
  expanded?: boolean;
  /**
   * Figma `Size=360px` only: the tabs below Product Settings are indented 32px, the ones above 26px.
   * Set it on those tabs to keep that offset; ignored in the other sizes.
   */
  secondary?: boolean;
  disabled?: boolean;
}

export interface NavbarMenuProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Tabs from top to bottom. Figma shows 10. */
  items: NavbarMenuItem[];
  /** Id of the active tab (Figma: filled `Hover Blue` bar, white Medium label). */
  value?: string;
  /** Called with the id of the tab the user picked. */
  onChange?: (id: string) => void;
  /** Figma `Size`. */
  size?: NavbarMenuSize;
  /** Figma `Style=Icons`: 108px menu with icons only; labels stay as the accessible name. */
  collapsed?: boolean;
  /** Accessible name of the navigation landmark. */
  'aria-label'?: string;
}

/**
 * Figma `Navbar Menu Tabs`: the vertical list of pages in the side menu.
 * Tabs are 32px high. The active one is a filled bar; the others are Not Active text on the Navbar background.
 */
export function NavbarMenu({
  items,
  value,
  onChange,
  size = 'desktop',
  collapsed = false,
  className,
  'aria-label': ariaLabel = 'Main menu',
  ...rest
}: NavbarMenuProps) {
  const classes = [
    'ds-navbar-menu',
    `ds-navbar-menu--${size}`,
    collapsed && 'ds-navbar-menu--collapsed',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <nav aria-label={ariaLabel} className={classes} {...rest}>
      <ul className="ds-navbar-menu__list">
        {items.map((item) => {
          const active = item.id === value;
          const itemClasses = [
            'ds-navbar-menu__item',
            active && 'is-active',
            item.secondary && 'ds-navbar-menu__item--secondary',
          ]
            .filter(Boolean)
            .join(' ');
          return (
            <li key={item.id}>
              <button
                type="button"
                className={itemClasses}
                disabled={item.disabled}
                aria-current={active ? 'page' : undefined}
                aria-expanded={item.expandable ? !!item.expanded : undefined}
                aria-label={collapsed ? item.label : undefined}
                title={collapsed ? item.label : undefined}
                onClick={() => onChange?.(item.id)}
              >
                <Icon name={item.icon} size={16} color="current" />
                {!collapsed && <span className="ds-navbar-menu__label">{item.label}</span>}
                {!collapsed && item.expandable && (
                  <Icon name={item.expanded ? 'chevron-up' : 'chevron-down'} size={16} color="current" />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

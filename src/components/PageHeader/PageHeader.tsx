import type { HTMLAttributes, ReactNode } from 'react';
import { Icon } from '../Icon';
import { BreadCrumbs, type BreadCrumbsProps } from '../BreadCrumbs';
import { TabsHeader, type TabsHeaderProps } from '../TabsHeader';
import './PageHeader.css';

export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Page title, e.g. “Clients”. */
  title: ReactNode;
  /** Right side of the title row: a `HeaderMenu` with its `HeaderMenuItem`s. */
  menu?: ReactNode;
  /** Adds the `BreadCrumbs` row under the title (Figma `Bread Crumbs`). */
  breadcrumbs?: BreadCrumbsProps;
  /** Adds the `TabsHeader` at the bottom (Figma `Tabs`). */
  tabs?: TabsHeaderProps;
  /** `compact` — the title is Light Headings/h5 (20 / 30px) instead of h2 (32 / 48px): Figma header at 480px and below. */
  size?: 'default' | 'compact';
  /** Shows the burger before the title (Figma header at 1280px and below, where the side menu is hidden). */
  onMenuClick?: () => void;
  /** Accessible name of the burger. */
  menuLabel?: string;
}

/**
 * Figma `Header` (Default / Tabs / Bread Crumbs / Bread Crumbs & Tabs) as ONE component: a white bar with
 * the Cards shadow, a title row with the menu and, optionally, breadcrumbs and tabs. The Figma variant
 * is chosen by which of `breadcrumbs` and `tabs` are passed.
 */
export function PageHeader({ title, menu, breadcrumbs, tabs, onMenuClick, menuLabel = 'Open menu', size = 'default', className, ...rest }: PageHeaderProps) {
  const classes = ['ds-page-header', tabs && 'ds-page-header--tabs', size === 'compact' && 'ds-page-header--compact', className].filter(Boolean).join(' ');
  return (
    <header className={classes} {...rest}>
      <div className="ds-page-header__intro">
        <div className="ds-page-header__top">
          <div className="ds-page-header__heading">
            {onMenuClick && (
              <button type="button" className="ds-page-header__burger" aria-label={menuLabel} onClick={onMenuClick}>
                <Icon name="burger-rolled-up" size={24} color="current" />
              </button>
            )}
            <h1 className="ds-page-header__title">{title}</h1>
          </div>
          {menu}
        </div>
        {breadcrumbs && <BreadCrumbs {...breadcrumbs} />}
      </div>
      {tabs && <TabsHeader {...tabs} />}
    </header>
  );
}

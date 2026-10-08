import type { HTMLAttributes, ReactNode } from 'react';
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
}

/**
 * Figma `Header` (Default / Tabs / Bread Crumbs / Bread Crumbs & Tabs) as ONE component: a white bar with
 * the Cards shadow, a title row with the menu and, optionally, breadcrumbs and tabs. The Figma variant
 * is chosen by which of `breadcrumbs` and `tabs` are passed.
 */
export function PageHeader({ title, menu, breadcrumbs, tabs, className, ...rest }: PageHeaderProps) {
  const classes = ['ds-page-header', tabs && 'ds-page-header--tabs', className].filter(Boolean).join(' ');
  return (
    <header className={classes} {...rest}>
      <div className="ds-page-header__intro">
        <div className="ds-page-header__top">
          <h1 className="ds-page-header__title">{title}</h1>
          {menu}
        </div>
        {breadcrumbs && <BreadCrumbs {...breadcrumbs} />}
      </div>
      {tabs && <TabsHeader {...tabs} />}
    </header>
  );
}

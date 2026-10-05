import type { HTMLAttributes } from 'react';
import { Icon } from '../Icon';
import './BreadCrumbs.css';

export interface BreadCrumbItem {
  label: string;
  /** Makes the crumb a link. Without `href` / `onClick` it is plain text. */
  href?: string;
  onClick?: () => void;
}

export interface BreadCrumbsProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** Path from the root to the current page. The last item is the current page. */
  items: BreadCrumbItem[];
  /** Accessible name of the navigation landmark. */
  'aria-label'?: string;
}

/**
 * Figma `Bread Crumbs`: path of the current page, crumbs separated by the 16px `Rifbar Small` icon.
 * The first crumb (root) is Grey Dark, the following ones Primary Blue Dark.
 */
export function BreadCrumbs({
  items,
  className,
  'aria-label': ariaLabel = 'Breadcrumb',
  ...rest
}: BreadCrumbsProps) {
  const classes = ['ds-breadcrumbs', className].filter(Boolean).join(' ');
  return (
    <nav aria-label={ariaLabel} className={classes} {...rest}>
      <ol className="ds-breadcrumbs__list">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          const interactive = !last && (item.href || item.onClick);
          const cls = `ds-breadcrumbs__item${i === 0 ? ' ds-breadcrumbs__item--root' : ''}`;
          return (
            <li key={`${item.label}-${i}`} className="ds-breadcrumbs__crumb">
              {i > 0 && <Icon name="rifbar-small" size={16} color="secondary" className="ds-breadcrumbs__sep" />}
              {interactive && item.href ? (
                <a className={cls} href={item.href} onClick={item.onClick}>
                  {item.label}
                </a>
              ) : interactive ? (
                <button type="button" className={cls} onClick={item.onClick}>
                  {item.label}
                </button>
              ) : (
                <span className={cls} aria-current={last ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

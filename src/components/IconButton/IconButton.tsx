import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Icon } from '../Icon';
import './IconButton.css';

/** Maps 1:1 to the Figma `Icon Button` property. */
export type IconButtonKind =
  | 'search' // Icon Button=Search
  | 'page' // Icon Button=Pagination Number
  | 'prev' // Icon Button=Pagination Arrow Left
  | 'next' // Icon Button=Pagination Arrow Right
  | 'close'; // Icon Button=Close

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: IconButtonKind;
  /**
   * `md` — 40px, Body/Small Medium (default). `sm` — 24px, Body/Micro Medium: the pagination of Figma
   * `Pagination Responsive` at 480px and below. Only for `page`, `prev` and `next`.
   */
  size?: 'md' | 'sm';
  /**
   * Figma `Status=Active`: current page (`page`), opened search (`search`).
   * Sets `aria-current="page"` / `aria-pressed` accordingly.
   */
  active?: boolean;
  /** Page number shown by `kind="page"`. */
  children?: ReactNode;
  /**
   * Forces the hover visuals (Figma `Status=Hover`). For documentation only —
   * real hover is handled by CSS `:hover`.
   */
  forceHover?: boolean;
}

const DEFAULT_LABEL: Record<Exclude<IconButtonKind, 'page'>, string> = {
  search: 'Search',
  prev: 'Previous page',
  next: 'Next page',
  close: 'Close',
};

export function IconButton({
  kind = 'search',
  size = 'md',
  active = false,
  forceHover = false,
  className,
  children,
  type = 'button',
  ...rest
}: IconButtonProps) {
  const classes = [
    'ds-icon-button',
    `ds-icon-button--${kind}`,
    size === 'sm' && 'ds-icon-button--sm',
    active && 'is-active',
    forceHover && 'is-hover',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const a11y: Record<string, unknown> = {};
  if (kind === 'page') {
    if (active) a11y['aria-current'] = 'page';
    if (!rest['aria-label']) a11y['aria-label'] = `Page ${children}`;
  } else {
    if (kind === 'search') a11y['aria-pressed'] = active;
    if (!rest['aria-label']) a11y['aria-label'] = DEFAULT_LABEL[kind];
  }

  let content: ReactNode;
  switch (kind) {
    case 'search':
      content = <Icon name="search" size={16} color="current" />;
      break;
    case 'close':
      content = <Icon name="xmark" size={24} color="current" />;
      break;
    // Figma draws the arrows as text glyphs in Body/Small Medium.
    case 'prev':
      content = <span aria-hidden>&lt;</span>;
      break;
    case 'next':
      content = <span aria-hidden>&gt;</span>;
      break;
    default:
      content = children;
  }

  return (
    <button type={type} className={classes} {...a11y} {...rest}>
      {content}
    </button>
  );
}

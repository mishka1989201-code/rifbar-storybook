import { useId, type HTMLAttributes } from 'react';
import { ICONS_16, ICONS_24, type Icon16Name, type Icon24Name, type IconDef } from './icons.generated';
import './Icon.css';

export type { Icon16Name, Icon24Name };
export type IconName = Icon16Name | Icon24Name;

/** Figma frame: `Icons 16px` or `Icons 24px`. */
export type IconSize = 16 | 24;

/**
 * Maps to the Figma `Color` / `Status` properties:
 * - `primary` — Color=Primary, Status=Static
 * - `secondary` — Color=Secondary (16px), Status=Not Active (24px)
 * - `hover` — Status=Hover / Color=Hover (24px)
 * - `current` — inherits the parent's text color (used inside buttons, links…)
 */
export type IconColor = 'primary' | 'secondary' | 'hover' | 'current';

/** Figma `… New Notif` variants: a dot in the top-right corner. */
export type IconDot = 'warning' | 'success';

export interface IconProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
  name: IconName;
  /** Which Figma set to draw from. Defaults to 16 when the icon exists there, otherwise 24. */
  size?: IconSize;
  color?: IconColor;
  /** Notification dot (Figma `Bell / Bag / Support New Notif`). */
  dot?: IconDot;
  /** Accessible name. Without it the icon is decorative (`aria-hidden`). */
  label?: string;
}

export const icon16Names = Object.keys(ICONS_16) as Icon16Name[];
export const icon24Names = Object.keys(ICONS_24) as Icon24Name[];
/** Every icon name, 16px and 24px. */
export const iconNames = [...new Set<IconName>([...icon16Names, ...icon24Names])];

/** Looks up an icon, falling back to the other size when it only exists there. */
export function getIcon(name: IconName, size?: IconSize): { def: IconDef; size: IconSize } | undefined {
  const in16 = (ICONS_16 as Record<string, IconDef>)[name];
  const in24 = (ICONS_24 as Record<string, IconDef>)[name];
  if (size === 24) return in24 ? { def: in24, size: 24 } : in16 && { def: in16, size: 16 };
  return in16 ? { def: in16, size: 16 } : in24 && { def: in24, size: 24 };
}

/**
 * Figma icon from `Icons 16px` / `Icons 24px`, drawn as inline SVG so it
 * takes its color from the `--icon-*` tokens (or `currentColor`).
 */
export function Icon({ name, size, color = 'primary', dot, label, className, ...rest }: IconProps) {
  // Masks and clip paths need ids that are unique on the page.
  const uid = useId().replace(/:/g, '');
  const found = getIcon(name, size);
  if (!found) {
    if (import.meta.env.DEV) console.warn(`[rifbar-ds] Unknown icon "${name}"`);
    return null;
  }
  const renderSize = size ?? found.size;
  const body = found.def.body.replace(/(id="|url\(#)([^")]+)/g, `$1${uid}-$2`);
  const classes = ['ds-icon', `ds-icon--${renderSize}`, `ds-icon--${color}`, className].filter(Boolean).join(' ');
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true };

  return (
    <span className={classes} {...a11y} {...rest}>
      <svg viewBox={found.def.viewBox} fill="none" focusable="false" dangerouslySetInnerHTML={{ __html: body }} />
      {dot && <span className={`ds-icon__dot ds-icon__dot--${dot}`} />}
    </span>
  );
}

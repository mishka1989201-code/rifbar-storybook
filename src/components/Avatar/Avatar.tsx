import { useState, type HTMLAttributes } from 'react';
import './Avatar.css';

/** Which Figma component the avatar comes from. */
export type AvatarVariant =
  | 'user' // `ava` — Navbar, 32px, dark fill with a light ring
  | 'chat' // `Chat Avatar` — 28px circle, Hover Blue
  | 'department'; // `Department Avatar` — 28px square (4px corners), Hover Blue

export type AvatarSize = 'xs' | 'md';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Full name: used for the initials and as the accessible name. */
  name: string;
  variant?: AvatarVariant;
  /** `xs` = 20px (inside Email - Chevron). Only for `chat` / `department`; `user` is always 32px. */
  size?: AvatarSize;
  /** Own initials instead of the ones taken from `name` (e.g. a department “Management” → “MG”). */
  initials?: string;
  /** Photo URL. If it is missing or fails to load, the initials are shown. */
  src?: string;
  /** Hide from screen readers when the name is already written next to the avatar. */
  decorative?: boolean;
}

/** “David Schwimmer” → “DS”, “Rifbar” → “R”. */
export function getInitials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const letters = words.length > 1 ? [words[0][0], words[words.length - 1][0]] : [words[0]?.[0] ?? ''];
  return letters.join('').toUpperCase();
}

/**
 * Figma `ava`, `Chat Avatar`, `Department Avatar`: a person's or a department's
 * photo or initials.
 */
export function Avatar({ name, variant = 'chat', size = 'md', initials, src, decorative = false, className, ...rest }: AvatarProps) {
  const [failed, setFailed] = useState<string>();
  const showImage = src && failed !== src;
  const classes = [
    'ds-avatar',
    `ds-avatar--${variant}`,
    variant !== 'user' && size === 'xs' && 'ds-avatar--xs',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const a11y = decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': name };

  return (
    <span className={classes} title={decorative ? undefined : name} {...a11y} {...rest}>
      {showImage ? (
        <img className="ds-avatar__image" src={src} alt="" onError={() => setFailed(src)} />
      ) : (
        initials ?? getInitials(name)
      )}
    </span>
  );
}

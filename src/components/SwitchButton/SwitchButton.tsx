import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './SwitchButton.css';

/** Maps 1:1 to the Figma `Style` property of `SwitchButtons`. */
export type SwitchButtonStyle = 'dark' | 'light';

export interface SwitchButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Figma `Tab=Active`. Filled background. */
  active?: boolean;
  /** Figma `Style`: `dark` → Primary Blue Dark fill, `light` → Secondary Light fill. Only visible when active. */
  variant?: SwitchButtonStyle;
  /** Shows the hover look without the pointer (for Storybook only). */
  forceHover?: boolean;
  /** Button label, e.g. “All clients” or “Pending (8)”. */
  children: ReactNode;
}

/**
 * Figma `SwitchButtons`: one option of a group that switches a list view (e.g. All / Pending).
 * Rendered as `<button aria-pressed>`; put several next to each other in a `role="group"`.
 */
export function SwitchButton({
  active = false,
  variant = 'dark',
  forceHover = false,
  className,
  type = 'button',
  children,
  ...rest
}: SwitchButtonProps) {
  const classes = [
    'ds-switch-button',
    `ds-switch-button--${variant}`,
    active && 'ds-switch-button--active',
    forceHover && 'is-hover',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} aria-pressed={active} className={classes} {...rest}>
      {children}
    </button>
  );
}

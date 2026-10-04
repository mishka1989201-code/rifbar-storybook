import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Icon } from '../Icon';
import './ChevronDropDown.css';

/** Maps 1:1 to the Figma `Color` property of `Chevron.DropDown`. */
export type ChevronDropDownColor =
  | 'primary' // Hover Blue
  | 'secondary' // Grey Dark
  | 'success' // Green Light
  | 'info' // Headlines (open: Blue Light shade)
  | 'warning' // Warning
  | 'danger' // Danger
  | 'light' // BG Color fill, Grey Dark text, no stroke
  | 'dark' // Primary Blue Dark
  | 'white'; // White text, no frame — for dark backgrounds

export interface ChevronDropDownProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  color?: ChevronDropDownColor;
  /** Visible label, usually the chosen value. */
  children?: ReactNode;
  /**
   * The list is open (Figma `Status=Hover` — drawn as the Active column):
   * darker color, arrow up, `aria-expanded="true"`.
   */
  open?: boolean;
  /**
   * Forces the hover / focus glow (Figma `Status=Focus or pressed`). For documentation only —
   * real hover and keyboard focus are handled by CSS.
   */
  forceHover?: boolean;
}

/**
 * Figma `Chevron.DropDown`: a pill that opens a list of options.
 * Only the trigger — the list itself is rendered by the parent.
 */
export function ChevronDropDown({
  color = 'primary',
  open = false,
  forceHover = false,
  className,
  children,
  type = 'button',
  ...rest
}: ChevronDropDownProps) {
  const classes = [
    'ds-chevron-dropdown',
    `ds-chevron-dropdown--${color}`,
    open && 'is-open',
    forceHover && 'is-hover',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classes} aria-haspopup="true" aria-expanded={open} {...rest}>
      <span className="ds-chevron-dropdown__label">{children}</span>
      <Icon name={open ? 'arrow-drop-up' : 'arrow-drop-down'} size={16} color="current" />
    </button>
  );
}

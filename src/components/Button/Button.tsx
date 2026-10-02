import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Icon, type IconName, type IconSize } from '../Icon';
import './Button.css';

/** Maps 1:1 to the Figma `Style` property of `button_action`. */
export type ButtonVariant =
  | 'outline' // Style=Outline Light BG
  | 'dark' // Style=Dark BG
  | 'light' // Style=Light Fill
  | 'danger' // Style=Red
  | 'gray' // Style=Gray BG
  | 'text-arrow' // Style=Text & Arrow
  | 'text-checkmarks'; // Style=Text & Checkmarks

/** Maps 1:1 to the Figma `Size` property. */
export type ButtonSize = 'small' | 'medium' | 'big';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Icon before the label (Figma `Icon=Left`). */
  iconLeft?: IconName;
  /** Icon after the label (Figma `Icon=Left & Right`). */
  iconRight?: IconName;
  /** Numeric badge after the label (Figma `Icon=Left & Right` on Outline). */
  counter?: number;
  /** Renders only the icon in a 37×37 square. Requires `aria-label`. */
  iconOnly?: IconName;
  /** Icon set for all icons of the button. `24` = Figma `Icon=Icon 24px`. */
  iconSize?: IconSize;
  /**
   * Forces the hover visuals (Figma `Status=Hover`). For documentation only —
   * real hover is handled by CSS `:hover`.
   */
  forceHover?: boolean;
  children?: ReactNode;
}

const TEXT_VARIANT_ICON: Partial<Record<ButtonVariant, IconName>> = {
  'text-arrow': 'chevron-right',
  'text-checkmarks': 'check-double',
};

export function Button({
  variant = 'outline',
  size = 'small',
  iconLeft,
  iconRight,
  counter,
  iconOnly,
  iconSize,
  forceHover = false,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  const isText = variant in TEXT_VARIANT_ICON;
  const classes = [
    'ds-button',
    `ds-button--${variant}`,
    !isText && `ds-button--${size}`,
    iconOnly && 'ds-button--icon-only',
    forceHover && 'is-hover',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (iconOnly) {
    return (
      <button type={type} className={classes} {...rest}>
        <Icon name={iconOnly} size={iconSize} color="current" />
      </button>
    );
  }

  const trailingIcon = iconRight ?? TEXT_VARIANT_ICON[variant];

  return (
    <button type={type} className={classes} {...rest}>
      {iconLeft && <Icon name={iconLeft} size={iconSize} color="current" />}
      <span className="ds-button__label">{children}</span>
      {trailingIcon && <Icon name={trailingIcon} size={iconSize} color="current" />}
      {counter !== undefined && <span className="ds-button__counter">{counter}</span>}
    </button>
  );
}

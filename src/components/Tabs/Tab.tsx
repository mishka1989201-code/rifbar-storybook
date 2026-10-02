import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Tab.css';

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Figma `Tab #=Active`. Medium Headlines label with a 2px underline. */
  active?: boolean;
  /** Figma `Tab #=Disabled`. Not Active look at 20% opacity. */
  disabled?: boolean;
  /** Shows the hover look without the pointer (for Storybook only). */
  forceHover?: boolean;
  /** Tab label. */
  children: ReactNode;
}

/**
 * Figma `Tabs`: one tab of a tab bar.
 * Rendered as `<button role="tab">` — put several inside an element with `role="tablist"`.
 */
export function Tab({
  active = false,
  disabled = false,
  forceHover = false,
  className,
  type = 'button',
  children,
  ...rest
}: TabProps) {
  const classes = [
    'ds-tab',
    active && 'ds-tab--active',
    forceHover && 'is-hover',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      role="tab"
      aria-selected={active}
      disabled={disabled}
      className={classes}
      {...rest}
    >
      {children}
    </button>
  );
}

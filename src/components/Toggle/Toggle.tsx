import type { InputHTMLAttributes, ReactNode } from 'react';
import './Toggle.css';

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Optional text next to the control (not part of the Figma atom). */
  children?: ReactNode;
  /**
   * Forces the hover visuals (Figma `Status=Hover`). For documentation only —
   * real hover is handled by CSS `:hover`.
   */
  forceHover?: boolean;
  /**
   * Forces the focus visuals (Figma `Status=Focus Enabled`). For documentation only —
   * real focus is handled by CSS `:focus-visible`.
   */
  forceFocus?: boolean;
}

/**
 * Figma `Toggle.atom`. A native checkbox with `role="switch"` covers the control,
 * so `checked` / `defaultChecked`, forms and keyboard work as usual.
 * `checked` = Figma `State=On State`.
 */
export function Toggle({ forceHover = false, forceFocus = false, className, children, ...rest }: ToggleProps) {
  const classes = [
    'ds-toggle',
    rest.disabled && 'is-disabled',
    forceHover && 'is-hover',
    forceFocus && 'is-focus',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={classes}>
      <span className="ds-toggle__control">
        <input className="ds-toggle__input" type="checkbox" role="switch" {...rest} />
        <span className="ds-toggle__pill" aria-hidden>
          <span className="ds-toggle__handle" />
        </span>
      </span>
      {children && <span className="ds-toggle__label">{children}</span>}
    </label>
  );
}

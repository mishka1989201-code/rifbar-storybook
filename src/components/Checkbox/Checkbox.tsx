import type { InputHTMLAttributes, ReactNode } from 'react';
import './Checkbox.css';

/** Maps 1:1 to the Figma `Type` property. */
export type CheckboxType = 'checkbox' | 'radio'; // Type=Checkbox / Type=Radiobutton

/** Maps 1:1 to the Figma `Size` property. */
export type CheckboxSize = 16 | 24;

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  type?: CheckboxType;
  size?: CheckboxSize;
  /** Optional text next to the control (not part of the Figma atom). */
  children?: ReactNode;
  /**
   * Forces the hover visuals (Figma `Status=… Hover`). For documentation only —
   * real hover is handled by CSS `:hover`.
   */
  forceHover?: boolean;
}

/*
 * Shapes are traced from the Figma vectors. Both Unchosen and Chosen shapes
 * are drawn; CSS shows the right one from the native input's `:checked`,
 * so controlled and uncontrolled usage both work.
 */
const SHAPES: Record<CheckboxType, Record<CheckboxSize, ReactNode>> = {
  checkbox: {
    24: (
      <>
        <rect className="ds-checkbox__off" x="2.75" y="2.75" width="18.5" height="18.5" rx="4.25" strokeWidth="1.5" />
        <rect className="ds-checkbox__on" x="1.25" y="1.25" width="21.5" height="21.5" rx="5.75" />
        <path className="ds-checkbox__mark" d="M9.5 11.5l2 2 4-4" strokeWidth="1.5" />
      </>
    ),
    16: (
      <>
        <rect className="ds-checkbox__off" x="1.333" y="1.333" width="13.333" height="13.333" rx="3.333" strokeWidth="1.5" />
        <rect className="ds-checkbox__on" x="0.833" y="0.833" width="14.333" height="14.333" rx="3.833" />
        <path className="ds-checkbox__mark" d="M6.333 7.667L7.667 9l2.666-2.667" strokeWidth="1" />
      </>
    ),
  },
  radio: {
    24: (
      <>
        <circle className="ds-checkbox__off" cx="12" cy="12" r="9.5" strokeWidth="1" />
        <circle className="ds-checkbox__on" cx="12" cy="12" r="10" />
        <circle className="ds-checkbox__dot" cx="12" cy="12" r="5" />
      </>
    ),
    16: (
      <>
        <circle className="ds-checkbox__off" cx="8" cy="8" r="6.333" strokeWidth="1" />
        <circle className="ds-checkbox__on" cx="8" cy="8" r="6.667" />
        <circle className="ds-checkbox__dot" cx="8" cy="8" r="3.333" />
      </>
    ),
  },
};

export function Checkbox({
  type = 'checkbox',
  size = 24,
  forceHover = false,
  className,
  children,
  ...rest
}: CheckboxProps) {
  const classes = [
    'ds-checkbox',
    `ds-checkbox--${type}`,
    `ds-checkbox--${size}`,
    rest.disabled && 'is-disabled',
    forceHover && 'is-hover',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={classes}>
      <span className="ds-checkbox__control">
        <input className="ds-checkbox__input" type={type} {...rest} />
        <svg viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden focusable="false">
          {SHAPES[type][size]}
        </svg>
      </span>
      {children && <span className="ds-checkbox__label">{children}</span>}
    </label>
  );
}

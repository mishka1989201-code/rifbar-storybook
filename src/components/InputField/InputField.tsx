import {
  forwardRef,
  useState,
  type ButtonHTMLAttributes,
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
} from 'react';
import { Icon, type IconName } from '../Icon';
import './InputField.css';

/** Preview / state props shared by every `Type` of the Figma `InputField` set. */
interface FieldStateProps {
  /** Figma `Status=Error`: Danger border + `aria-invalid`. */
  invalid?: boolean;
  /**
   * Forces the hover visuals (Figma `Status=Hover`). For documentation only —
   * real hover is handled by CSS `:hover`.
   */
  forceHover?: boolean;
  /**
   * Forces the focus visuals (Figma `Status=Focus`). For documentation only —
   * real focus is handled by CSS `:focus` / `:focus-within`.
   */
  forceFocus?: boolean;
}

function fieldClasses(
  type: 'input' | 'textarea' | 'filter' | 'color',
  { invalid, forceHover, forceFocus, disabled, filled, className }: FieldStateProps & {
    disabled?: boolean;
    filled?: boolean;
    className?: string;
  },
) {
  return [
    'ds-field',
    `ds-field--${type}`,
    filled && 'is-filled',
    invalid && 'is-invalid',
    disabled && 'is-disabled',
    forceHover && 'is-hover',
    forceFocus && 'is-focus',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

// ─── Type=Inputfield ─────────────────────────────────────────────────────────

export interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, FieldStateProps {}

/**
 * Figma `InputField` → `Type=Inputfield`. A native one-line `<input>`, 32px high,
 * full width of its container. `Status=Activated` (has a value) is detected by CSS.
 */
export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(function InputField(
  { invalid, forceHover, forceFocus, className, placeholder, type = 'text', ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      type={type}
      // A placeholder is needed for `:placeholder-shown` (empty vs filled); a space is invisible.
      placeholder={placeholder ?? ' '}
      aria-invalid={invalid || undefined}
      className={fieldClasses('input', { invalid, forceHover, forceFocus, disabled: rest.disabled, className })}
      {...rest}
    />
  );
});

// ─── Type=Textfield ──────────────────────────────────────────────────────────

export interface TextFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, FieldStateProps {}

/**
 * Figma `InputField` → `Type=Textfield`. A native multi-line `<textarea>`,
 * at least 80px high, resizable vertically.
 */
export const TextField = forwardRef<HTMLTextAreaElement, TextFieldProps>(function TextField(
  { invalid, forceHover, forceFocus, className, placeholder, ...rest },
  ref,
) {
  return (
    <textarea
      ref={ref}
      placeholder={placeholder ?? ' '}
      aria-invalid={invalid || undefined}
      className={fieldClasses('textarea', { invalid, forceHover, forceFocus, disabled: rest.disabled, className })}
      {...rest}
    />
  );
});

// ─── Type=Filter ─────────────────────────────────────────────────────────────

export interface FilterFieldProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'>, FieldStateProps {
  /** Selected option text. Empty → `placeholder` in Secondary Grey (Figma `Status=Static`). */
  value?: ReactNode;
  /** Text shown when nothing is selected. */
  placeholder?: ReactNode;
  /** The list is open: chevron points up, border Input field (Figma `Status=Focus`). */
  open?: boolean;
  /** Replaces the chevron with another 16px icon, e.g. `date` for a date picker trigger (Figma scheduled-call-menu). */
  icon?: IconName;
}

/**
 * Figma `InputField` → `Type=Filter`. The trigger of a dropdown filter: text + chevron.
 * The option list itself is not part of this atom — open it from `onClick` and pass `open`.
 */
export const FilterField = forwardRef<HTMLButtonElement, FilterFieldProps>(function FilterField(
  { value, placeholder, open = false, icon, invalid, forceHover, forceFocus, className, type = 'button', ...rest },
  ref,
) {
  const filled = value !== undefined && value !== null && value !== '';
  return (
    <button
      ref={ref}
      type={type}
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-invalid={invalid || undefined}
      className={fieldClasses('filter', {
        invalid,
        forceHover,
        forceFocus: forceFocus || open,
        disabled: rest.disabled,
        filled,
        className,
      })}
      {...rest}
    >
      <span className={filled ? 'ds-field__value' : 'ds-field__placeholder'}>{filled ? value : placeholder}</span>
      <Icon
        name={icon ?? (open ? 'chevron-up' : 'chevron-down')}
        size={16}
        color="current"
        className="ds-field__chevron"
      />
    </button>
  );
});

// ─── Type=Color ──────────────────────────────────────────────────────────────

export interface ColorFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'value' | 'defaultValue'>,
    FieldStateProps {
  /** Hex color, e.g. `#63DF95` (controlled). */
  value?: string;
  /** Hex color (uncontrolled). Without `value` / `defaultValue` the field is empty (Figma `Status=Static`). */
  defaultValue?: string;
  /** Text on the right. Figma: “Change”. */
  actionLabel?: ReactNode;
}

const EMPTY_COLOR = '#000000';

/**
 * Figma `InputField` → `Type=Color`. A color swatch + “Change”. A native
 * `<input type="color">` covers the field, so a click opens the system color picker.
 */
export const ColorField = forwardRef<HTMLInputElement, ColorFieldProps>(function ColorField(
  { value, defaultValue, actionLabel = 'Change', onChange, invalid, forceHover, forceFocus, className, ...rest },
  ref,
) {
  const [inner, setInner] = useState(defaultValue);
  const current = value ?? inner;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (value === undefined) setInner(e.target.value);
    onChange?.(e);
  };

  return (
    <label
      className={fieldClasses('color', {
        invalid,
        forceHover,
        forceFocus,
        disabled: rest.disabled,
        filled: current !== undefined,
        className,
      })}
    >
      <input
        ref={ref}
        type="color"
        className="ds-field__color-input"
        value={current ?? EMPTY_COLOR}
        onChange={handleChange}
        aria-invalid={invalid || undefined}
        aria-label="Choose color"
        {...rest}
      />
      <span className="ds-field__swatch" style={{ backgroundColor: current ?? EMPTY_COLOR }} aria-hidden />
      <span className="ds-field__action" aria-hidden>
        {actionLabel}
      </span>
    </label>
  );
});

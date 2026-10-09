import type { LabelHTMLAttributes, ReactNode } from 'react';
import './LabeledField.css';

export interface LabeledFieldProps extends Omit<LabelHTMLAttributes<HTMLLabelElement>, 'title'> {
  /** Caption above the control, e.g. “Name”. */
  title: ReactNode;
  /** Adds the orange `*` after the title (Figma `Client*`). Mark the control too (`required` on an input, `aria-required` on a `FilterField`). */
  required?: boolean;
  /**
   * Error message under the control (Figma `Error/Importantly/Info` → Error): Regular 12px in Danger,
   * e.g. “To continue - enter the value in the input field!”. Mark the control `invalid` too.
   */
  error?: ReactNode;
  /** The control: `InputField`, `TextField`, `FilterField`… */
  children?: ReactNode;
}

/**
 * Figma `Input/Title`: a Body/Small Medium caption 4px above a field. The whole thing is one
 * `<label>`, so the caption names the control inside it (input, textarea or button) without ids.
 */
export function LabeledField({ title, required = false, error, children, className, ...rest }: LabeledFieldProps) {
  const classes = ['ds-labeled-field', className].filter(Boolean).join(' ');
  return (
    <label className={classes} {...rest}>
      <span className="ds-labeled-field__title">
        {title}
        {required && (
          <span className="ds-labeled-field__required" aria-hidden="true">
            *
          </span>
        )}
      </span>
      {children}
      {error != null && (
        <span className="ds-labeled-field__error" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}

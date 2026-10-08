import type { LabelHTMLAttributes, ReactNode } from 'react';
import './LabeledField.css';

export interface LabeledFieldProps extends Omit<LabelHTMLAttributes<HTMLLabelElement>, 'title'> {
  /** Caption above the control, e.g. “Name”. */
  title: ReactNode;
  /** Adds the orange `*` after the title (Figma `Client*`). Mark the control too (`required` on an input, `aria-required` on a `FilterField`). */
  required?: boolean;
  /** The control: `InputField`, `TextField`, `FilterField`… */
  children?: ReactNode;
}

/**
 * Figma `Input/Title`: a Body/Small Medium caption 4px above a field. The whole thing is one
 * `<label>`, so the caption names the control inside it (input, textarea or button) without ids.
 */
export function LabeledField({ title, required = false, children, className, ...rest }: LabeledFieldProps) {
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
    </label>
  );
}

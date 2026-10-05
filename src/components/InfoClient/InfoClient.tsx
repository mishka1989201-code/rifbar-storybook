import type { HTMLAttributes, ReactNode } from 'react';
import './InfoClient.css';

export interface InfoClientField {
  /** Stable key. */
  id: string;
  /** Small grey caption, e.g. “Work phone”. */
  label: ReactNode;
  /** Value under the caption, e.g. “+44325678473”. */
  value: ReactNode;
}

export interface InfoClientProps extends HTMLAttributes<HTMLDListElement> {
  /** Label/value pairs in order. Defaults to the 6 fields of the Figma frame. */
  fields?: InfoClientField[];
  /**
   * How fields are spread along the row (CSS `justify-content`):
   * `between` — spread edge to edge (Figma `Direction=Line`), `start` — packed to the left with
   * a 24px gap (Figma `Direction=Wrap`). Fields always wrap onto the next line when they do not fit.
   */
  justify?: 'between' | 'start';
}

/** The 6 fields of the Figma frame. */
export const DEFAULT_INFO_CLIENT_FIELDS: InfoClientField[] = [
  { id: 'name', label: 'Name', value: 'Mickey Herman' },
  { id: 'company', label: 'Company', value: "Sam's Club" },
  { id: 'phone', label: 'Work phone', value: '+44325678473' },
  { id: 'email', label: 'Email', value: 'mickeyherman23@gmail.com' },
  { id: 'country', label: 'Country', value: 'USA' },
  { id: 'orders', label: 'Order volume', value: '3500' },
];

/**
 * Figma `InfoClient` (Direction=Line / Wrap) as ONE flex component: white block of label/value pairs.
 * The two Figma variants differ only in `justify-content`, so they are the `justify` prop.
 */
export function InfoClient({
  fields = DEFAULT_INFO_CLIENT_FIELDS,
  justify = 'between',
  className,
  ...rest
}: InfoClientProps) {
  const classes = ['ds-info-client', `ds-info-client--${justify}`, className].filter(Boolean).join(' ');
  return (
    <dl className={classes} {...rest}>
      {fields.map((field) => (
        <div key={field.id} className="ds-info-client__field">
          <dt className="ds-info-client__label">{field.label}</dt>
          <dd className="ds-info-client__value">{field.value}</dd>
        </div>
      ))}
    </dl>
  );
}

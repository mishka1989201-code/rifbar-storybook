import type { HTMLAttributes, ReactNode } from 'react';
import './OrderCard.css';

export interface OrderCardField {
  /** Stable key. */
  id: string;
  /** Blue caption, e.g. “Client:”. */
  label: ReactNode;
  /** Value on the right: text or a `ChevronStatus`. */
  value: ReactNode;
  /** Underlined value (Figma: client name). */
  underline?: boolean;
}

export interface OrderCardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Card title, e.g. “Order #4645”. */
  title: ReactNode;
  /** Button in the top-right corner (Figma: light icon button with a chevron). */
  action?: ReactNode;
  /** Document preview URL. */
  preview?: string;
  /** What the preview shows. */
  previewAlt?: string;
  /** Label/value rows. */
  fields?: OrderCardField[];
}

/** Figma `Card` Property 2=Order: title row with a button, a document preview and label/value rows. */
export function OrderCard({
  title,
  action,
  preview,
  previewAlt = '',
  fields = [],
  className,
  ...rest
}: OrderCardProps) {
  const classes = ['ds-order-card', className].filter(Boolean).join(' ');
  return (
    <article className={classes} {...rest}>
      <header className="ds-order-card__header">
        <h3 className="ds-order-card__title">{title}</h3>
        {action}
      </header>
      {preview && (
        <div className="ds-order-card__preview">
          <img className="ds-order-card__image" src={preview} alt={previewAlt} loading="lazy" />
        </div>
      )}
      {fields.length > 0 && (
        <dl className="ds-order-card__fields">
          {fields.map((field) => (
            <div key={field.id} className="ds-order-card__field">
              <dt className="ds-order-card__label">{field.label}</dt>
              <dd className={['ds-order-card__value', field.underline && 'is-underline'].filter(Boolean).join(' ')}>
                {field.value}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </article>
  );
}

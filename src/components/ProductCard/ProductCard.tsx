import type { HTMLAttributes, ReactNode } from 'react';
import { Checkbox, type CheckboxProps } from '../Checkbox';
import './ProductCard.css';

export interface ProductCardSpec {
  /** Stable key. */
  id: string;
  /** Blue caption, e.g. “Colors:”. */
  label: ReactNode;
  /** Value on the right, e.g. “8”. */
  value: ReactNode;
}

export interface ProductCardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Product photo URL. */
  image?: string;
  /** What the photo shows. */
  imageAlt?: string;
  /** Badge in the top-left corner of the photo, e.g. “$25”. */
  badge?: ReactNode;
  /** Shows a checkbox in the top-right corner of the photo. */
  selectable?: boolean;
  /** Props of the checkbox, e.g. `checked`, `onChange`, `aria-label`. */
  checkboxProps?: Omit<CheckboxProps, 'size' | 'type'>;
  /** Product name. */
  title: ReactNode;
  /** Line under the name, e.g. “RECHARGEABLE / DISPOSABLE”. */
  subtitle?: ReactNode;
  /** Label/value rows. */
  specs?: ProductCardSpec[];
  /** Bottom area, usually a full-width `<Button variant="dark" size="big">`. */
  action?: ReactNode;
}

/** Figma `Card` Property 2=Category: product photo, name, spec rows and a big button. */
export function ProductCard({
  image,
  imageAlt = '',
  badge,
  selectable = false,
  checkboxProps,
  title,
  subtitle,
  specs = [],
  action,
  className,
  ...rest
}: ProductCardProps) {
  const classes = ['ds-product-card', className].filter(Boolean).join(' ');
  return (
    <article className={classes} {...rest}>
      <div className="ds-product-card__media">
        {image && <img className="ds-product-card__image" src={image} alt={imageAlt} loading="lazy" />}
        {badge && <span className="ds-product-card__badge">{badge}</span>}
        {selectable && <Checkbox size={24} className="ds-product-card__check" {...checkboxProps} />}
      </div>
      <div className="ds-product-card__content">
        <div className="ds-product-card__info">
          <div className="ds-product-card__heading">
            <h3 className="ds-product-card__title">{title}</h3>
            {subtitle && <p className="ds-product-card__subtitle">{subtitle}</p>}
          </div>
          {specs.length > 0 && (
            <dl className="ds-product-card__specs">
              {specs.map((spec) => (
                <div key={spec.id} className="ds-product-card__spec">
                  <dt className="ds-product-card__label">{spec.label}</dt>
                  <dd className="ds-product-card__value">{spec.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        {action && <div className="ds-product-card__action">{action}</div>}
      </div>
    </article>
  );
}

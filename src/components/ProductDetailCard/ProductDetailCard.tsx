import type { HTMLAttributes, ReactNode } from 'react';
import { RowInfoBlock } from '../RowInfoBlock';
import './ProductDetailCard.css';

export interface ProductDetailRow {
  /** Caption, e.g. “File type”. */
  label: ReactNode;
  /** Value, e.g. “PNG”. */
  value: ReactNode;
}

export interface ProductDetailCardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Large title, e.g. “Cheerleader costume”. */
  title: ReactNode;
  /** Picture URL. Without it a neutral empty frame is drawn. */
  image?: string;
  /** Alternative text of the picture. Default: empty (decorative) — the title is next to it. */
  imageAlt?: string;
  /** Label / value rows under the title (Figma `Information 1`). */
  details?: ProductDetailRow[];
  /** Text under the caption `descriptionTitle`. */
  description?: ReactNode;
  /** Caption of the description. Default “Description”. */
  descriptionTitle?: ReactNode;
  /** Buttons under the text, e.g. `<Button variant="dark" iconLeft="download-cloud">Download</Button>`. */
  actions?: ReactNode;
}

/**
 * Figma `Product Card` (1524px): a white card with a square picture at the left and, at the right, the title,
 * label / value rows, a description and the actions. The rows are `RowInfoBlock variant="line"`.
 * On a narrow container the info drops under the picture.
 */
export function ProductDetailCard({
  title,
  image,
  imageAlt = '',
  details = [],
  description,
  descriptionTitle = 'Description',
  actions,
  className,
  ...rest
}: ProductDetailCardProps) {
  const classes = ['ds-product-detail-card', className].filter(Boolean).join(' ');
  return (
    <article className={classes} {...rest}>
      <div className="ds-product-detail-card__image">
        {image && <img className="ds-product-detail-card__img" src={image} alt={imageAlt} />}
      </div>
      <div className="ds-product-detail-card__info">
        <h2 className="ds-product-detail-card__title">{title}</h2>
        {details.length > 0 && (
          <div className="ds-product-detail-card__details">
            {details.map((row, i) => (
              <RowInfoBlock key={i} variant="line" label={row.label} value={row.value} />
            ))}
          </div>
        )}
        {description != null && (
          <section className="ds-product-detail-card__description">
            <h3 className="ds-product-detail-card__description-title">{descriptionTitle}</h3>
            <p className="ds-product-detail-card__description-text">{description}</p>
          </section>
        )}
        {actions != null && <div className="ds-product-detail-card__actions">{actions}</div>}
      </div>
    </article>
  );
}

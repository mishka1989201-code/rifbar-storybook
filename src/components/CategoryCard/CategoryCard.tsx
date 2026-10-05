import type { HTMLAttributes, ReactNode } from 'react';
import './CategoryCard.css';

export interface CategoryCardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Picture URL. */
  image?: string;
  /** What the picture shows. Empty by default: the title already names the category. */
  imageAlt?: string;
  /** Category name under the picture, e.g. “Name of Image”. One line, cut with an ellipsis. */
  title: ReactNode;
  /** Renders the card as a link. */
  href?: string;
}

/**
 * Figma `Card Category` (Property 1 = Static / Hover): a small tile with a picture and a centred name.
 * Hover is a state, not a prop — it comes from `:hover` / `:focus-visible`.
 */
export function CategoryCard({ image, imageAlt = '', title, href, className, ...rest }: CategoryCardProps) {
  const classes = ['ds-category-card', className].filter(Boolean).join(' ');
  const body = (
    <>
      <div className="ds-category-card__media">
        {image && <img className="ds-category-card__image" src={image} alt={imageAlt} loading="lazy" />}
      </div>
      <span className="ds-category-card__title">{title}</span>
    </>
  );
  if (href) {
    return (
      <a className={classes} href={href} {...(rest as HTMLAttributes<HTMLAnchorElement>)}>
        {body}
      </a>
    );
  }
  return (
    <div className={classes} {...(rest as HTMLAttributes<HTMLDivElement>)}>
      {body}
    </div>
  );
}

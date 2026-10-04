import { useState, type HTMLAttributes } from 'react';
import { Icon } from '../Icon';
import './ImageCard.css';

/** Maps 1:1 to the Figma `Property 1`. */
export type ImageCardSize =
  | 'md' // Property 1=Middle — 64px
  | 'sm'; // Property 1=Small — 32px

export interface ImageCardProps extends HTMLAttributes<HTMLSpanElement> {
  /** Photo URL. If it is missing or fails to load, a placeholder icon is shown. */
  src?: string;
  /** What the photo shows (e.g. the product name). Empty string = decorative. */
  alt: string;
  size?: ImageCardSize;
  /**
   * `cover` (Figma) fills the square and crops the edges;
   * `contain` shows the whole photo with white around it.
   */
  fit?: 'cover' | 'contain';
}

/** Figma `imageCards`: a square product photo thumbnail. */
export function ImageCard({ src, alt, size = 'md', fit = 'cover', className, ...rest }: ImageCardProps) {
  const [failed, setFailed] = useState<string>();
  const showImage = src && failed !== src;
  const classes = ['ds-image-card', `ds-image-card--${size}`, !showImage && 'is-empty', className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...rest}>
      {showImage ? (
        <img
          className={`ds-image-card__image ds-image-card__image--${fit}`}
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(src)}
        />
      ) : (
        <Icon name="image" size={size === 'md' ? 24 : 16} color="secondary" label={alt ? `${alt} (no photo)` : undefined} />
      )}
    </span>
  );
}

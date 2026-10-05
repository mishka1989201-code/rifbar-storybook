import type { HTMLAttributes, ReactNode } from 'react';
import './ClientDetails.css';

export interface ClientDetailsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Grey caption on top of the card. */
  title?: ReactNode;
  /**
   * Text of the card. Plain string: split into paragraphs on blank lines (`\n\n`).
   * Any other node is rendered as is; `<p>` elements get the 12px paragraph gap.
   */
  children: ReactNode;
}

/**
 * Figma `Client Details`: white block (16px side / 32px bottom padding) with a light-grey
 * rounded card — grey caption “Detailed information” and a free-form multi-paragraph text.
 */
export function ClientDetails({
  title = 'Detailed information',
  children,
  className,
  ...rest
}: ClientDetailsProps) {
  const classes = ['ds-client-details', className].filter(Boolean).join(' ');
  const body =
    typeof children === 'string'
      ? children.split(/\n{2,}/).map((text, i) => <p key={i}>{text}</p>)
      : children;
  return (
    <div className={classes} {...rest}>
      <div className="ds-client-details__card">
        <div className="ds-client-details__title">{title}</div>
        <div className="ds-client-details__text">{body}</div>
      </div>
    </div>
  );
}

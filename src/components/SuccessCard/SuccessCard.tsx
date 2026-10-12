import { useId, type HTMLAttributes, type ReactNode } from 'react';
import './SuccessCard.css';

export interface SuccessCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Message under the illustration, e.g. “The Discount is Successful”. */
  title?: ReactNode;
  /** Replaces the hexagon-check illustration. */
  illustration?: ReactNode;
}

/**
 * Figma `Successfully v2`: a card with a big green hexagon with a check mark and a Light 32px message, e.g. after a
 * discount is applied. It draws only the card: showing it, centring it and closing it (a timer or a click) belong to the page.
 * The illustration is drawn in SVG from its measured shape (the Figma asset could not be downloaded, proxy 403).
 */
export function SuccessCard({ title = 'The Discount is Successful', illustration, className, ...rest }: SuccessCardProps) {
  const maskId = useId();
  const classes = ['ds-success-card', className].filter(Boolean).join(' ');
  return (
    <div role="status" className={classes} {...rest}>
      <span className="ds-success-card__illustration" aria-hidden>
        {illustration ?? (
          <svg viewBox="0 0 192 218" width="192" height="218" fill="none" focusable="false">
            <defs>
              {/* The check cuts a gap in the hexagon, as in Figma. */}
              <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="192" height="218">
                <rect width="192" height="218" fill="#fff" />
                <path d="M58 112 L92 146 L170 36" stroke="#000" strokeWidth="46" strokeLinejoin="miter" />
              </mask>
            </defs>
            <path
              d="M96 12 L181.5 61.5 V156.5 L96 206 L10.5 156.5 V61.5 Z"
              stroke="currentColor"
              strokeWidth="21"
              strokeLinejoin="miter"
              mask={`url(#${maskId})`}
            />
            <path d="M58 112 L92 146 L172 34" stroke="currentColor" strokeWidth="24" strokeLinejoin="miter" />
          </svg>
        )}
      </span>
      <p className="ds-success-card__title">{title}</p>
    </div>
  );
}

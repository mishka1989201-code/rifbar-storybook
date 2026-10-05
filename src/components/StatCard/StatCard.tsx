import type { HTMLAttributes, ReactNode } from 'react';
import './StatCard.css';

export interface StatCardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Small caption above the number, e.g. “In processing”. */
  label: ReactNode;
  /** Big number, e.g. “19.39k”. */
  value: ReactNode;
  /** Link or button under the number, e.g. `<Button variant="text-arrow">See all</Button>`. */
  footer?: ReactNode;
  /** Right-aligned block (Figma “Full amount”). Switches the card to one row. */
  aside?: ReactNode;
  /** Rifbar sign in the top-right corner (Figma `Logo`). */
  watermark?: boolean;
}

// Sign of the Rifbar logo (Figma `Logo`), same paths as `Logo`.
const SIGN =
  'M4.45543 40.5375C4.45543 38.4531 6.13537 36.8 8.25358 36.8C10.3718 36.8 12.0517 38.4531 12.0517 40.5375C12.0517 42.6219 10.3718 44.275 8.25358 44.275C6.13537 44.275 4.45543 42.6219 4.45543 40.5375ZM4.82063 2.80313L27.5364 14.8063C35.0596 19.0469 33.2336 27.7437 31.3345 30.4031C31.0423 29.0375 29.5815 26.6656 26.3677 24.8687L4.45543 12.7937C0.876424 10.8531 -1.24176 7.83437 0.730342 2.22812C1.31467 0.646875 1.97204 0.14375 2.55636 0C2.77549 1.65312 3.28677 2.0125 4.82063 2.80313ZM4.89367 18.4L27.5364 30.3313C35.0596 34.6437 33.2336 43.3406 31.4075 46C31.1154 44.6344 29.6545 42.2625 26.4408 40.4656L4.52847 28.3906C0.949464 26.45 -1.16872 23.4312 0.803383 17.825C1.38771 16.2437 2.04508 15.7406 2.6294 15.5969C2.84853 17.1781 3.35981 17.6094 4.89367 18.4Z';

/**
 * Figma `Card` Property 1=Card.InProcessingV1 / V2 as ONE component: a number with a caption.
 * V1 = column with a footer and the watermark, V2 = one row with an `aside` block.
 */
export function StatCard({ label, value, footer, aside, watermark = false, className, ...rest }: StatCardProps) {
  const classes = ['ds-stat-card', aside && 'has-aside', className].filter(Boolean).join(' ');
  return (
    <article className={classes} {...rest}>
      <div className="ds-stat-card__main">
        <p className="ds-stat-card__label">{label}</p>
        <p className="ds-stat-card__value">{value}</p>
      </div>
      {footer && <div className="ds-stat-card__footer">{footer}</div>}
      {aside && <div className="ds-stat-card__aside">{aside}</div>}
      {watermark && (
        <svg className="ds-stat-card__watermark" viewBox="0 0 34 46" aria-hidden focusable="false">
          <path d={SIGN} fill="currentColor" />
        </svg>
      )}
    </article>
  );
}

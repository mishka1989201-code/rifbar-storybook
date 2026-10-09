import type { HTMLAttributes, ReactNode } from 'react';
import { AlertRow, type AlertRowProps } from '../AlertRow';
import './WelcomeCard.css';

export interface WelcomeCardStat {
  /** Small caption, e.g. “New orders”. */
  label: ReactNode;
  /** Big value, e.g. “14,209”. */
  value: ReactNode;
}

export interface WelcomeCardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Greeting in Hover Blue, e.g. “Good Afternoon, Arnold!”. */
  title: ReactNode;
  /** Line under the greeting. */
  subtitle?: ReactNode;
  /** Figma `Visits and Sale numbers`: caption + value pairs. */
  stats?: WelcomeCardStat[];
  /** Header picture (Figma: products on the right side). Without it the header is the plain dark fill. */
  image?: string;
  /** Rows under the header (Figma `Bottom`: Option 1, 4, 5) — `AlertRow` props. */
  rows?: AlertRowProps[];
}

/**
 * Figma `Welcome Card`: a dark header (greeting, subtitle, two numbers, picture on the right)
 * and a stack of `AlertRow`s with things that need attention.
 */
export function WelcomeCard({ title, subtitle, stats = [], image, rows = [], className, ...rest }: WelcomeCardProps) {
  const classes = ['ds-welcome-card', className].filter(Boolean).join(' ');
  return (
    <section className={classes} {...rest}>
      <header className="ds-welcome-card__header">
        {image && <div className="ds-welcome-card__image" style={{ backgroundImage: `url("${image}")` }} aria-hidden="true" />}
        <div className="ds-welcome-card__text">
          <h2 className="ds-welcome-card__title">{title}</h2>
          {subtitle != null && <p className="ds-welcome-card__subtitle">{subtitle}</p>}
        </div>
        {stats.length > 0 && (
          <dl className="ds-welcome-card__stats">
            {stats.map((stat, i) => (
              <div key={i} className="ds-welcome-card__stat">
                <dt className="ds-welcome-card__label">{stat.label}</dt>
                <dd className="ds-welcome-card__value">{stat.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </header>
      {rows.length > 0 && (
        <div className="ds-welcome-card__rows">
          {rows.map((row, i) => (
            <AlertRow key={i} {...row} />
          ))}
        </div>
      )}
    </section>
  );
}

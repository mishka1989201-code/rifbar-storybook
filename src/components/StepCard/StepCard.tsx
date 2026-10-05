import type { HTMLAttributes, ReactNode } from 'react';
import { Icon, type IconName } from '../Icon';
import './StepCard.css';

export interface StepCardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Icon in the round badge. Default `doc-new`. */
  icon?: IconName;
  /** Step name, e.g. “New”. */
  title: ReactNode;
  /** Grey line under the name, e.g. a date. */
  caption?: ReactNode;
}

/** Figma `Card` Property 2=Step: a round icon, a step name and a date. */
export function StepCard({ icon = 'doc-new', title, caption, className, ...rest }: StepCardProps) {
  const classes = ['ds-step-card', className].filter(Boolean).join(' ');
  return (
    <article className={classes} {...rest}>
      <div className="ds-step-card__head">
        <span className="ds-step-card__badge">
          <Icon name={icon} size={24} color="current" />
        </span>
        <h3 className="ds-step-card__title">{title}</h3>
      </div>
      {caption && <p className="ds-step-card__caption">{caption}</p>}
    </article>
  );
}

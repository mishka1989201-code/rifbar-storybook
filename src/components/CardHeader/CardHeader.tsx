import type { HTMLAttributes, ReactNode } from 'react';
import { Icon, type IconName } from '../Icon';
import './CardHeader.css';

export interface CardHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Section title, e.g. “Client info”. */
  title: ReactNode;
  /** 16px icon inside the round badge. Default `user` (Figma `person`). */
  icon?: IconName;
  /** Optional content pushed to the right edge (toggle, buttons…). Not in the Figma frame. */
  actions?: ReactNode;
}

/**
 * Figma `Row.HeaderCard`: white title row of a card — round light-blue badge with an icon
 * and a Headlines-colored Semi-Bold h5 title; 1px Secondary Light line below.
 */
export function CardHeader({ title, icon = 'user', actions, className, ...rest }: CardHeaderProps) {
  const classes = ['ds-card-header', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...rest}>
      <div className="ds-card-header__title">
        <span className="ds-card-header__badge" aria-hidden="true">
          <Icon name={icon} size={16} color="current" />
        </span>
        <h3 className="ds-card-header__text">{title}</h3>
      </div>
      {actions && <div className="ds-card-header__actions">{actions}</div>}
    </div>
  );
}

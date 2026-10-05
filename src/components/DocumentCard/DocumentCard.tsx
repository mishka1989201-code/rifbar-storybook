import type { HTMLAttributes, ReactNode } from 'react';
import { Icon, type IconName } from '../Icon';
import './DocumentCard.css';

export interface DocumentCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** 24px icon before the title. Default `finance` (Figma `solid/finance`). */
  icon?: IconName;
  /** Bold-ish caption, e.g. “Invoice#”. */
  title: ReactNode;
  /** Grey value after the title, e.g. the invoice number. Long values break instead of overflowing. */
  value?: ReactNode;
  /** Full-width buttons stacked under the header (Figma `Vertical Buttons`), e.g. `Button`s. */
  actions?: ReactNode;
}

/**
 * Figma `Edit User Access New`: a grey card with a document line — icon, title, value — and a column of
 * full-width buttons (Download, Send via Email).
 */
export function DocumentCard({ icon = 'finance', title, value, actions, className, ...rest }: DocumentCardProps) {
  const classes = ['ds-document-card', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...rest}>
      <div className="ds-document-card__header">
        <Icon name={icon} size={24} color="current" />
        <span className="ds-document-card__title">{title}</span>
        {value !== undefined && <span className="ds-document-card__value">{value}</span>}
      </div>
      {actions && <div className="ds-document-card__actions">{actions}</div>}
    </div>
  );
}

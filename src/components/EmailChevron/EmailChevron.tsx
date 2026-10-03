import type { HTMLAttributes, MouseEvent } from 'react';
import { Avatar } from '../Avatar';
import { Icon } from '../Icon';
import './EmailChevron.css';

export interface EmailChevronProps extends HTMLAttributes<HTMLSpanElement> {
  /** Recipient's name, e.g. “David Schwimmer”. Also gives the avatar initials. */
  name: string;
  /** Avatar photo URL. Without it the initials are shown. */
  avatarSrc?: string;
  /** Called when × is clicked. Without it × is decorative. */
  onRemove?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** Accessible name of the × button. Defaults to “Remove {name}”. */
  removeLabel?: string;
}

/**
 * Figma `Email - Chevron`: a recipient in a “To:” field —
 * avatar + name + ×. The × removes the recipient.
 */
export function EmailChevron({ name, avatarSrc, onRemove, removeLabel, className, ...rest }: EmailChevronProps) {
  const classes = ['ds-email-chevron', className].filter(Boolean).join(' ');
  const icon = <Icon name="xmark" size={16} color="current" className="ds-email-chevron__icon" />;

  return (
    <span className={classes} {...rest}>
      <span className="ds-email-chevron__title">
        <Avatar name={name} src={avatarSrc} size="xs" decorative />
        <span className="ds-email-chevron__name">{name}</span>
      </span>
      {onRemove ? (
        <button
          type="button"
          className="ds-email-chevron__remove"
          aria-label={removeLabel ?? `Remove ${name}`}
          onClick={onRemove}
        >
          {icon}
        </button>
      ) : (
        <span className="ds-email-chevron__remove">{icon}</span>
      )}
    </span>
  );
}

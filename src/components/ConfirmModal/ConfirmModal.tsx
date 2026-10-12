import { useId, type HTMLAttributes, type ReactNode } from 'react';
import { IconButton } from '../IconButton';
import './ConfirmModal.css';

/** `default` = 630px, buttons hug their labels; `compact` = 493px with two equal-width footer buttons (Figma Approve Modal of the Clients delete popup). */
export type ConfirmModalSize = 'default' | 'compact';

export interface ConfirmModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Question, e.g. “Do you want approve?”. */
  title: ReactNode;
  /** Explanation under the title, e.g. “Accept user registration for further cooperation.”. */
  description?: ReactNode;
  /** Called on click of the close button. */
  onClose?: () => void;
  /** Accessible name of the close button. */
  closeLabel?: string;
  /** Figma width: `default` 630px or `compact` 493px (the footer buttons share the width equally). */
  size?: ConfirmModalSize;
  /** Footer: usually two `Button`s (Cancel / Accept). */
  actions?: ReactNode;
}

/**
 * Figma `Approve Modal`: a centred confirmation dialog — close button in the corner, a big question, a grey
 * explanation and a footer with two actions. For form pop-ups with an icon, fields and sections use `Modal`.
 * It draws only the dialog: overlay, positioning, focus trap and `Esc` belong to the page.
 */
export function ConfirmModal({
  title,
  description,
  onClose,
  closeLabel = 'Close',
  actions,
  size = 'default',
  className,
  ...rest
}: ConfirmModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const classes = ['ds-confirm-modal', size === 'compact' && 'ds-confirm-modal--compact', className].filter(Boolean).join(' ');
  return (
    <div
      role="alertdialog"
      aria-labelledby={titleId}
      aria-describedby={description != null ? descriptionId : undefined}
      className={classes}
      {...rest}
    >
      <div className="ds-confirm-modal__header">
        <IconButton kind="close" aria-label={closeLabel} onClick={onClose} />
      </div>
      <div className="ds-confirm-modal__body">
        <h2 id={titleId} className="ds-confirm-modal__title">
          {title}
        </h2>
        {description != null && (
          <p id={descriptionId} className="ds-confirm-modal__description">
            {description}
          </p>
        )}
      </div>
      {actions != null && <div className="ds-confirm-modal__footer">{actions}</div>}
    </div>
  );
}

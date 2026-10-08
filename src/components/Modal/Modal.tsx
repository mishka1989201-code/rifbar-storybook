import { useId, type HTMLAttributes, type LabelHTMLAttributes, type ReactNode } from 'react';
import { Icon, type IconName } from '../Icon';
import { IconButton } from '../IconButton';
import './Modal.css';

/** Figma `Property 1`: Desktop = 450px wide, Mobile = 340px wide. */
export type ModalSize = 'desktop' | 'mobile';

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Header title, e.g. “Create warehouse”. */
  title: ReactNode;
  /** 24px icon before the title. Pass `null` to hide it. Default `plus-box` (Figma Plus). */
  icon?: IconName | null;
  /** Figma `Property 1`. */
  size?: ModalSize;
  /** Called on click of the close button in the header. */
  onClose?: () => void;
  /** Accessible name of the close button. */
  closeLabel?: string;
  /** Body: `ModalSection`s. */
  children?: ReactNode;
  /** Footer: usually two `Button`s (the footer is hidden when empty). */
  actions?: ReactNode;
}

/**
 * Figma `Pop-up warehouse` (Property 1 = Desktop / Mobile): the dialog surface of a form pop-up —
 * header with an icon, title and close button, body sections separated by lines, and a footer with actions.
 * It draws only the dialog itself: the overlay, positioning and focus trap belong to the page.
 */
export function Modal({
  title,
  icon = 'plus-box',
  size = 'desktop',
  onClose,
  closeLabel = 'Close',
  children,
  actions,
  className,
  ...rest
}: ModalProps) {
  const titleId = useId();
  const classes = ['ds-modal', `ds-modal--${size}`, className].filter(Boolean).join(' ');
  return (
    <div role="dialog" aria-labelledby={titleId} className={classes} {...rest}>
      <div className="ds-modal__header">
        <div className="ds-modal__title-wrap">
          {icon && (
            <span className="ds-modal__icon" aria-hidden>
              <Icon name={icon} size={24} color="current" />
            </span>
          )}
          <h2 id={titleId} className="ds-modal__title">
            {title}
          </h2>
        </div>
        <IconButton kind="close" aria-label={closeLabel} onClick={onClose} />
      </div>
      {children != null && <div className="ds-modal__body">{children}</div>}
      {actions != null && <div className="ds-modal__footer">{actions}</div>}
    </div>
  );
}

export interface ModalSectionProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/** Figma `modal__body`: a block of the body with a 1px bottom line; fields inside are 16px apart. */
export function ModalSection({ className, children, ...rest }: ModalSectionProps) {
  const classes = ['ds-modal__section', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}

export interface ModalFieldProps extends Omit<LabelHTMLAttributes<HTMLLabelElement>, 'children'> {
  /** Field caption, e.g. “Warehouse name”. */
  label: ReactNode;
  /** The control: `InputField`, `FilterField`… */
  children?: ReactNode;
}

/** Figma `Name / Title` + field: Body/Small Medium caption 4px above a control. */
export function ModalField({ label, children, className, ...rest }: ModalFieldProps) {
  const classes = ['ds-modal__field', className].filter(Boolean).join(' ');
  return (
    <div className={classes}>
      <label className="ds-modal__label" {...rest}>
        {label}
      </label>
      {children}
    </div>
  );
}

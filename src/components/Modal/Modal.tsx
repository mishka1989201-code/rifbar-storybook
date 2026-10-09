import { useId, type HTMLAttributes, type LabelHTMLAttributes, type ReactNode } from 'react';
import { Icon, type IconName } from '../Icon';
import { IconButton } from '../IconButton';
import './Modal.css';

/**
 * Figma `Property 1`: Desktop = 450px wide, Mobile = 340px wide. `wide` = 630px (Figma `Add Product Modal`, two-column form).
 * `list` = 736px (Figma `Info Modal`, a list of options).
 * `480` / `360` = Figma `Modal` Property 2 (Add / Edit product): 20px title, stacked full-width footer buttons; `360` has 10px sides.
 */
export type ModalSize = 'desktop' | 'mobile' | 'wide' | 'list' | '480' | '360';

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Header title, e.g. “Create warehouse”. */
  title: ReactNode;
  /** 24px icon before the title. Pass `null` to hide it. Default `plus-box` (Figma Plus). */
  icon?: IconName | null;
  /** Figma `Property 1`. */
  size?: ModalSize;
  /**
   * Information under the title (Figma `Error/Importantly/Info` → Info): Medium text in Secondary Grey,
   * e.g. “You have selected some product(s) for the customer…”.
   */
  description?: ReactNode;
  /**
   * An important note under the description (Figma `Error/Importantly/Info` → Importantly): Semi-Bold text in Warning,
   * e.g. “If you specify the discount value as 0 or empty… it will be deleted.”.
   */
  important?: ReactNode;
  /** Called on click of the close button in the header. */
  onClose?: () => void;
  /** Replaces the close button in the header (Figma `Info Modal` has a 37px `button_action` with a chevron up). */
  headerAction?: ReactNode;
  /** Draws the Tooltip Shadow around the dialog (Figma `Info Modal`). Default: no shadow, the page adds its own. */
  elevated?: boolean;
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
  description,
  important,
  onClose,
  headerAction,
  elevated = false,
  closeLabel = 'Close',
  children,
  actions,
  className,
  ...rest
}: ModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const classes = ['ds-modal', `ds-modal--${size}`, elevated && 'ds-modal--elevated', className].filter(Boolean).join(' ');
  return (
    <div
      role="dialog"
      aria-labelledby={titleId}
      aria-describedby={description != null ? descriptionId : undefined}
      className={classes}
      {...rest}
    >
      <div className="ds-modal__header">
        <div className="ds-modal__bar">
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
        {headerAction ?? <IconButton kind="close" aria-label={closeLabel} onClick={onClose} />}
        </div>
        {description != null && (
          <p id={descriptionId} className="ds-modal__description">
            {description}
          </p>
        )}
        {important != null && (
          <p className="ds-modal__important" role="note">
            {important}
          </p>
        )}
      </div>
      {children != null && <div className="ds-modal__body">{children}</div>}
      {actions != null && <div className="ds-modal__footer">{actions}</div>}
    </div>
  );
}

export interface ModalSectionProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  /** The 1px bottom line. Figma `Add Product Modal` has none under its single body block. Default `true`. */
  divider?: boolean;
}

/** Figma `modal__body`: a block of the body with a 1px bottom line; fields inside are 16px apart. */
export function ModalSection({ divider = true, className, children, ...rest }: ModalSectionProps) {
  const classes = ['ds-modal__section', !divider && 'ds-modal__section--plain', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}

export interface ModalFieldProps extends Omit<LabelHTMLAttributes<HTMLLabelElement>, 'children'> {
  /** Field caption, e.g. “Warehouse name”. */
  label: ReactNode;
  /** Error message under the control (Figma `Error/Importantly/Info` → Error). Mark the control `invalid` too. */
  error?: ReactNode;
  /** The control: `InputField`, `FilterField`… */
  children?: ReactNode;
}

/** Figma `Name / Title` + field: Body/Small Medium caption 4px above a control. */
export function ModalField({ label, error, children, className, ...rest }: ModalFieldProps) {
  const classes = ['ds-modal__field', className].filter(Boolean).join(' ');
  return (
    <div className={classes}>
      <label className="ds-modal__label" {...rest}>
        {label}
      </label>
      {children}
      {error != null && (
        <span className="ds-modal__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

export interface ModalRowProps extends HTMLAttributes<HTMLDivElement> {
  /** `ModalField`s side by side. */
  children?: ReactNode;
}

/**
 * Figma: two `Input Field`s in one line, 16px apart, equal width. In a narrow dialog the fields stack
 * (AI-defined: Figma draws only the wide dialog).
 */
export function ModalRow({ className, children, ...rest }: ModalRowProps) {
  const classes = ['ds-modal__row', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}

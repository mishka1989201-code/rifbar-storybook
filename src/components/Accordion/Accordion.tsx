import { useId, useState, type HTMLAttributes, type ReactNode } from 'react';
import { Icon } from '../Icon';
import './Accordion.css';

export interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onChange'> {
  /** Header text, e.g. “Clients”. */
  title: ReactNode;
  /** Controlled state. Figma `Property 1=Focus` is the opened look (Headlines stroke and title, chevron up). */
  open?: boolean;
  /** Initial state when uncontrolled. */
  defaultOpen?: boolean;
  /** Called with the next state when the header is pressed. */
  onOpenChange?: (open: boolean) => void;
  /** Figma `Property 1=Disabled`. */
  disabled?: boolean;
  /** Preview only: draws the Figma `Property 1=Hover` state. Real hover comes from CSS. */
  forceHover?: boolean;
  /** The panel shown under the header when open. Not drawn in Figma. */
  children?: ReactNode;
}

/**
 * Figma `Accordion` (Property 1 Static / Hover / Focus / Disabled): a full-width header card with a title
 * and a square chevron button. The whole header is one `<button aria-expanded>`; `children` is the panel.
 */
export function Accordion({
  title,
  open,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  forceHover = false,
  children,
  className,
  ...rest
}: AccordionProps) {
  const [inner, setInner] = useState(defaultOpen);
  const isOpen = open ?? inner;
  const panelId = useId();

  const toggle = () => {
    const next = !isOpen;
    setInner(next);
    onOpenChange?.(next);
  };

  const classes = [
    'ds-accordion',
    isOpen && 'is-open',
    forceHover && 'is-hover',
    disabled && 'is-disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...rest}>
      <button
        type="button"
        className="ds-accordion__header"
        aria-expanded={isOpen}
        aria-controls={children != null ? panelId : undefined}
        disabled={disabled}
        onClick={toggle}
      >
        <span className="ds-accordion__title">{title}</span>
        <span className="ds-accordion__toggle">
          <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} size={16} color="primary" />
        </span>
      </button>
      {isOpen && children != null && (
        <div id={panelId} role="region" className="ds-accordion__panel">
          {children}
        </div>
      )}
    </div>
  );
}

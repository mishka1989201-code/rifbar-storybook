import { forwardRef, type HTMLAttributes } from 'react';
import './Scrollbar.css';

/**
 * Figma has two scrollbars:
 * - `content`  = `Scrollbar Content` (page / panel / table scroll, 11px track)
 * - `dropdown` = `Scrollbar.DropdownAndPopUp` (lists in dropdowns and pop-ups, 3px)
 */
export type ScrollbarVariant = 'content' | 'dropdown';

export interface ScrollbarProps extends HTMLAttributes<HTMLDivElement> {
  variant?: ScrollbarVariant;
  /**
   * Which axis scrolls. Default `y`, as in Figma (only a vertical scrollbar is drawn).
   */
  axis?: 'y' | 'x' | 'both';
}

/**
 * A scroll container that wears the Figma scrollbar. Give it a height
 * (`style`, `className` or a parent) — the thumb length follows the content,
 * so Figma `Property 1=Big / Small` is just a taller or shorter container.
 * The region is focusable (`tabIndex=0`) so keyboard users can scroll it;
 * give it an `aria-label` / `aria-labelledby`.
 */
export const Scrollbar = forwardRef<HTMLDivElement, ScrollbarProps>(function Scrollbar(
  { variant = 'content', axis = 'y', className, tabIndex = 0, role = 'region', children, ...rest },
  ref,
) {
  const classes = ['ds-scrollbar', `ds-scrollbar--${variant}`, `ds-scrollbar--${axis}`, className]
    .filter(Boolean)
    .join(' ');
  return (
    <div ref={ref} className={classes} tabIndex={tabIndex} role={role} {...rest}>
      {children}
    </div>
  );
});

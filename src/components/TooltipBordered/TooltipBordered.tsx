import type { HTMLAttributes, ReactNode } from 'react';
import './TooltipBordered.css';

/** Maps 1:1 to the Figma `Position` property. The arrow is on the opposite side:
 *  `left` = the bubble sits to the left of its target, the arrow points right. */
export type TooltipBorderedPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * `default` = white bubble, Headlines border (Figma component default).
 * `subtle` = BG Color bubble, Stroke Light V2 border, Secondary Grey headline: the tooltip drawn in
 * `Hover Row in Table` (a Figma instance override, not a component property).
 */
export type TooltipBorderedTone = 'default' | 'subtle';

/** Maps 1:1 to the Figma `Width mode` property. */
export type TooltipBorderedWidth = 'hug' | 'fixed';

export interface TooltipBorderedProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Figma `Position`: which side of the target the bubble is on. */
  position?: TooltipBorderedPosition;
  /** Figma `Width mode`: `fixed` = 300px, text wraps; `hug` = one line, as wide as the text. */
  widthMode?: TooltipBorderedWidth;
  /** Colours of the bubble. Light and dark values come from the `--tooltip-bordered-subtle-*` tokens. */
  tone?: TooltipBorderedTone;
  /** Headline (Figma `Show headline`). Leave empty to hide it. */
  title?: ReactNode;
  /** Body text (Figma `Show body text`). Leave empty to hide it. */
  children?: ReactNode;
}

/**
 * Figma `Tooltip with border + shadow`. A white bubble with a Headlines border, an arrow and a soft shadow,
 * for tooltips with richer content (a headline + text). Static: showing it on hover/focus and
 * placing it next to the target is up to the caller. `children` may hold several `<p>` paragraphs.
 */
export function TooltipBordered({
  position = 'left',
  widthMode = 'fixed',
  tone = 'default',
  title,
  children,
  className,
  ...rest
}: TooltipBorderedProps) {
  const classes = ['ds-tooltip-bordered', `ds-tooltip-bordered--${position}`, `ds-tooltip-bordered--${widthMode}`, tone === 'subtle' && 'ds-tooltip-bordered--subtle', className]
    .filter(Boolean)
    .join(' ');
  return (
    <div role="tooltip" className={classes} {...rest}>
      <div className="ds-tooltip-bordered__body">
        {title && <p className="ds-tooltip-bordered__title">{title}</p>}
        {children && <div className="ds-tooltip-bordered__text">{children}</div>}
      </div>
      <span className="ds-tooltip-bordered__arrow" aria-hidden="true" />
    </div>
  );
}

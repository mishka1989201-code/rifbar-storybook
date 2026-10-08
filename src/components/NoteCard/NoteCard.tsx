import type { HTMLAttributes, ReactNode } from 'react';
import { Icon } from '../Icon';
import './NoteCard.css';

export interface NoteCardProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /**
   * Text of the note. Plain string: split into paragraphs on blank lines (`\n\n`).
   * Any other node is rendered as is; `<p>` elements get the 12px paragraph gap.
   */
  children: ReactNode;
  /** Date line under the text, e.g. “07.23.2023”. Omit to hide the line. */
  date?: string;
  /** Machine-readable value for the `<time>` element, e.g. `2023-07-23`. */
  dateTime?: string;
  /** Called when the “more” link is clicked. Without it the link is not drawn. */
  onMore?: () => void;
  /** Text of the link at the end of the note. */
  moreLabel?: ReactNode;
  /** Shows the Figma `Hover` look without the pointer. For documentation only — real hover is CSS `:hover`. */
  forceHover?: boolean;
}

/**
 * Figma `Notes`: a white card with the text of a note in a light-grey rounded box
 * (an optional “more” link at its end) and the date with a clock icon under it.
 * Static: Stroke Light V1 border and Cards Shadow; Hover: Headlines border and Hover Large Cards shadow.
 */
export function NoteCard({
  children,
  date,
  dateTime,
  onMore,
  moreLabel = 'more',
  forceHover = false,
  className,
  ...rest
}: NoteCardProps) {
  const classes = ['ds-note-card', forceHover && 'is-hover', className].filter(Boolean).join(' ');
  const body =
    typeof children === 'string'
      ? children.split(/\n{2,}/).map((text, i) => <p key={i}>{text}</p>)
      : children;
  return (
    <article className={classes} {...rest}>
      <div className="ds-note-card__content">
        <div className="ds-note-card__text">{body}</div>
        {onMore && (
          <button type="button" className="ds-note-card__more" onClick={onMore}>
            {moreLabel}
          </button>
        )}
      </div>
      {date && (
        <div className="ds-note-card__date">
          <Icon name="time-new" size={16} color="current" className="ds-note-card__date-icon" />
          <time dateTime={dateTime}>{date}</time>
        </div>
      )}
    </article>
  );
}

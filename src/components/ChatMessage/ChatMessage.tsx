import type { HTMLAttributes, ReactNode } from 'react';
import { Avatar } from '../Avatar';
import { Icon } from '../Icon';
import './ChatMessage.css';

/** Figma `Property 1`: `Recieved +Avatar +Time` → `received`, `sent + Time & Check` → `sent`. */
export type ChatMessageDirection = 'received' | 'sent';

export interface ChatMessageProps extends HTMLAttributes<HTMLDivElement> {
  /** Message text. */
  children: ReactNode;
  /** `received` = white card with the sender's avatar, `sent` = tinted card. */
  direction?: ChatMessageDirection;
  /** Sender's name (received only): gives the `Chat Avatar` its initials and accessible name. Without it no avatar is drawn. */
  author?: string;
  /** Sender's photo URL; initials are shown when it is missing or fails to load. */
  avatarSrc?: string;
  /** Time line under the text (Figma `11.54 am`). Omit to hide it. */
  time?: string;
  /** Machine-readable value for the `<time>` element, e.g. `2023-05-12T11:54`. */
  dateTime?: string;
  /** Sent only: the double check after the time (Figma `Time & Check`). */
  checked?: boolean;
}

/**
 * Figma `Message`: one message card of the chat.
 * The card fills the width of its container (Figma: 600px).
 */
export function ChatMessage({
  children,
  direction = 'received',
  author,
  avatarSrc,
  time,
  dateTime,
  checked = true,
  className,
  ...rest
}: ChatMessageProps) {
  const sent = direction === 'sent';
  const classes = ['ds-chat-message', `ds-chat-message--${direction}`, className].filter(Boolean).join(' ');

  const timeLine = time ? (
    <div className="ds-chat-message__meta">
      <time className="ds-chat-message__time" dateTime={dateTime}>
        {time}
      </time>
      {sent && checked && <Icon name="check-double" size={16} color="current" label="Read" className="ds-chat-message__check" />}
    </div>
  ) : null;

  if (sent) {
    return (
      <div className={classes} {...rest}>
        <p className="ds-chat-message__text">{children}</p>
        {timeLine}
      </div>
    );
  }

  return (
    <div className={classes} {...rest}>
      {author && <Avatar variant="chat" name={author} src={avatarSrc} className="ds-chat-message__avatar" />}
      <div className="ds-chat-message__body">
        <p className="ds-chat-message__text ds-chat-message__bubble">{children}</p>
        {timeLine}
      </div>
    </div>
  );
}

import { useEffect, useRef, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import type { Icon24Name } from '../Icon';
import { ChatHeader } from '../ChatHeader';
import { ChatMessage, type ChatMessageDirection } from '../ChatMessage';
import { MessageBox, type MessageBoxProps } from '../MessageBox';
import './ChatLayout.css';

/** Date separator between messages of different days (Figma `May 7, 2023`). */
export interface ChatLayoutDate {
  type: 'date';
  label: ReactNode;
}

/** One message of the thread; fields map 1:1 to `ChatMessage`. */
export interface ChatLayoutMessage {
  type: 'message';
  id: string | number;
  text: ReactNode;
  direction?: ChatMessageDirection;
  author?: string;
  avatarSrc?: string;
  time?: string;
  dateTime?: string;
  checked?: boolean;
}

export type ChatLayoutItem = ChatLayoutDate | ChatLayoutMessage;

export interface ChatLayoutProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Subject of the conversation (`ChatHeader` title). */
  title: ReactNode;
  /** Quote of the first message under the title. */
  quote?: ReactNode;
  /** 24px icon before the title. Default `chat`. */
  icon?: Icon24Name;
  /** Date separators and messages, oldest first. */
  items?: ChatLayoutItem[];
  /** Shown instead of the thread when `items` is empty. */
  emptyText?: ReactNode;
  /** Called with the trimmed text when the user sends a message from the `MessageBox`. */
  onSend?: (value: string) => void;
  /** Props passed to the `MessageBox` (placeholder, disabled, value, onChange, labels…). */
  messageBoxProps?: Omit<MessageBoxProps, 'onSend'>;
  /** Accessible name of the message list. */
  listLabel?: string;
  /** Fixed height of the whole layout. The thread then scrolls and stays pinned to the newest message. Omit to grow with the content (Figma). */
  height?: CSSProperties['height'];
}

/**
 * Figma `chat  layout v2`: the whole chat panel — `ChatHeader` on top, the thread of date
 * separators and `ChatMessage` cards on a Secondary Light canvas, `MessageBox` at the bottom.
 */
export function ChatLayout({
  title,
  quote,
  icon,
  items = [],
  emptyText = 'No messages yet.',
  onSend,
  messageBoxProps,
  listLabel = 'Messages',
  height,
  className,
  style,
  ...rest
}: ChatLayoutProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const classes = ['ds-chat-layout', height !== undefined && 'has-height', className].filter(Boolean).join(' ');

  // Keep the newest message in view when the thread scrolls.
  useEffect(() => {
    const el = listRef.current;
    if (el && height !== undefined) el.scrollTop = el.scrollHeight;
  }, [items.length, height]);

  return (
    <section className={classes} style={{ ...style, height }} {...rest}>
      <ChatHeader title={title} quote={quote} icon={icon} />
      <div ref={listRef} className="ds-chat-layout__list" role="log" aria-label={listLabel} tabIndex={height !== undefined ? 0 : undefined}>
        {items.length === 0 && <p className="ds-chat-layout__empty">{emptyText}</p>}
        {items.map((item, i) => {
          if (item.type === 'date') {
            return (
              <p key={`date-${i}`} className="ds-chat-layout__date">
                {item.label}
              </p>
            );
          }
          const direction = item.direction ?? 'received';
          return (
            <div key={item.id} className={`ds-chat-layout__row ds-chat-layout__row--${direction}`}>
              <ChatMessage
                className="ds-chat-layout__message"
                direction={direction}
                author={item.author}
                avatarSrc={item.avatarSrc}
                time={item.time}
                dateTime={item.dateTime}
                checked={item.checked}
              >
                {item.text}
              </ChatMessage>
            </div>
          );
        })}
      </div>
      <MessageBox {...messageBoxProps} onSend={onSend} />
    </section>
  );
}

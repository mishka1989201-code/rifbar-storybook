import type { HTMLAttributes, ReactNode } from 'react';
import { Icon, type Icon24Name } from '../Icon';
import './ChatHeader.css';

export interface ChatHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Subject of the conversation (Figma: Semi-Bold h5). */
  title: ReactNode;
  /** Quote of the first message under the title. Quotation marks are added by the component. Omit to hide the line. */
  quote?: ReactNode;
  /** 24px icon before the title. Default `chat`. */
  icon?: Icon24Name;
}

/**
 * Figma `chat header`: white bar on top of a chat — icon + Headlines h5 title, and the quote of
 * the first message in Grey Dark under it. 1px Stroke Light V2 line below, Header Shadow.
 */
export function ChatHeader({ title, quote, icon = 'chat', className, ...rest }: ChatHeaderProps) {
  const classes = ['ds-chat-header', className].filter(Boolean).join(' ');
  return (
    <header className={classes} {...rest}>
      <div className="ds-chat-header__title">
        <Icon name={icon} size={24} color="current" className="ds-chat-header__icon" />
        <h2 className="ds-chat-header__text">{title}</h2>
      </div>
      {quote && <p className="ds-chat-header__quote">“{quote}”</p>}
    </header>
  );
}

import { useState, type FormEvent, type FormHTMLAttributes } from 'react';
import { Icon } from '../Icon';
import './MessageBox.css';

export interface MessageBoxProps
  extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onChange' | 'onSubmit' | 'defaultValue'> {
  /** Controlled text. Leave it out for an uncontrolled box. */
  value?: string;
  defaultValue?: string;
  /** Called with the new text on every keystroke. */
  onChange?: (value: string) => void;
  /** Called with the trimmed text when the user presses Enter or the send button. Empty text is not sent. */
  onSend?: (value: string) => void;
  /** Figma `Type your message...`. */
  placeholder?: string;
  /** Figma `Disabled`: 20% opacity, nothing can be typed or sent. */
  disabled?: boolean;
  /** Accessible name of the text field (it has no visible label). */
  inputLabel?: string;
  /** Accessible name of the send button. */
  sendLabel?: string;
  /** Shows the Figma `Focus` look without focus. For documentation only — real focus is handled by CSS `:focus-within`. */
  forceFocus?: boolean;
  /** Shows the Figma `Focus & Hover` send-button look. For documentation only — real hover is CSS `:hover`. */
  forceHover?: boolean;
}

/**
 * Figma `message box`: the bar at the bottom of a chat — one-line text field and a send arrow.
 * White bar with a 1px Stroke Light V2 line above and the Header Shadow.
 */
export function MessageBox({
  value,
  defaultValue = '',
  onChange,
  onSend,
  placeholder = 'Type your message...',
  disabled = false,
  inputLabel = 'Message',
  sendLabel = 'Send',
  forceFocus = false,
  forceHover = false,
  className,
  ...rest
}: MessageBoxProps) {
  const [inner, setInner] = useState(defaultValue);
  const text = value ?? inner;

  const classes = [
    'ds-message-box',
    text && 'has-value',
    forceFocus && 'is-focus',
    forceHover && 'is-hover',
    disabled && 'is-disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (disabled || !trimmed) return;
    onSend?.(trimmed);
  };

  return (
    <form className={classes} onSubmit={handleSubmit} {...rest}>
      <input
        type="text"
        className="ds-message-box__input"
        value={text}
        placeholder={placeholder}
        disabled={disabled}
        aria-label={inputLabel}
        autoComplete="off"
        onChange={(e) => {
          setInner(e.target.value);
          onChange?.(e.target.value);
        }}
      />
      <button type="submit" className="ds-message-box__send" disabled={disabled} aria-label={sendLabel} title={sendLabel}>
        <Icon name="send-chat" size={24} color="current" />
      </button>
    </form>
  );
}

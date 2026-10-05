import { useState, type ChangeEvent, type FormEvent, type InputHTMLAttributes } from 'react';
import { IconButton } from '../IconButton';
import './SearchField.css';

/** Figma `Property 1`: Desktop = 32px high, Mobile = 40px high. */
export type SearchFieldSize = 'desktop' | 'mobile';

export interface SearchFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Figma `Property 1`. */
  size?: SearchFieldSize;
  /** Called on Enter or on click of the search button, with the current text. */
  onSearch?: (value: string) => void;
  /** Accessible name of the search button. */
  searchLabel?: string;
  /**
   * Forces the focus visuals. For documentation only —
   * real focus is handled by CSS `:focus-within`.
   */
  forceFocus?: boolean;
}

/**
 * Figma `SearchField`: one-line search input with an attached search button.
 * `Style=Active` (has text) is detected automatically; `Style=Disabled` is `disabled`.
 */
export function SearchField({
  size = 'desktop',
  onSearch,
  searchLabel = 'Search',
  forceFocus = false,
  className,
  placeholder = 'Search by keyword',
  value,
  defaultValue,
  onChange,
  disabled,
  ...rest
}: SearchFieldProps) {
  const [inner, setInner] = useState(String(defaultValue ?? ''));
  const current = value !== undefined ? String(value) : inner;
  const active = current.length > 0;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (value === undefined) setInner(e.target.value);
    onChange?.(e);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!disabled) onSearch?.(current);
  };

  const classes = [
    'ds-search',
    `ds-search--${size}`,
    active && 'is-active',
    forceFocus && 'is-focus',
    disabled && 'is-disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <form role="search" className={classes} onSubmit={handleSubmit}>
      <input
        type="search"
        className="ds-search__input"
        placeholder={placeholder}
        value={current}
        onChange={handleChange}
        disabled={disabled}
        {...rest}
      />
      <IconButton kind="search" type="submit" active={active} disabled={disabled} aria-label={searchLabel} />
    </form>
  );
}

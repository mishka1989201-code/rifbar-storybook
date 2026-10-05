import { useEffect, useId, useRef, useState, type HTMLAttributes } from 'react';
import { FilterField } from '../InputField';
import './ShowSelect.css';

export interface ShowSelectProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current value, e.g. rows per page. */
  value: number;
  /** Options of the list. Figma shows 8. */
  options?: number[];
  onChange?: (value: number) => void;
  /** Label before the select. */
  label?: string;
}

/**
 * Figma `viewing style 2`: “Show: [8 ⌄]” — a label and a `FilterField` that opens a list of options.
 * Used on its own above lists and inside `PaginationBar`.
 */
export function ShowSelect({
  value,
  options = [8, 16, 32, 64],
  onChange,
  label = 'Show:',
  className,
  ...rest
}: ShowSelectProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  // Close the list on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const choose = (size: number) => {
    onChange?.(size);
    setOpen(false);
  };

  const classes = ['ds-show-select', className].filter(Boolean).join(' ');

  return (
    <div className={classes} ref={wrapRef} {...rest}>
      <span className="ds-show-select__label" id={`${listId}-label`}>
        {label}
      </span>
      <div className="ds-show-select__select">
        <FilterField
          className="ds-show-select__field"
          value={value}
          open={open}
          aria-labelledby={`${listId}-label`}
          aria-controls={listId}
          onClick={() => setOpen((o) => !o)}
        />
        {open && (
          <ul id={listId} role="listbox" aria-labelledby={`${listId}-label`} className="ds-show-select__list">
            {options.map((size) => (
              <li
                key={size}
                role="option"
                aria-selected={size === value}
                tabIndex={0}
                className={`ds-show-select__option${size === value ? ' is-selected' : ''}`}
                onClick={() => choose(size)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    choose(size);
                  }
                }}
              >
                {size}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

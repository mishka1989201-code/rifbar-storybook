import { useState, type ReactNode } from 'react';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { Modal, type ModalProps } from '../Modal';
import { SearchField } from '../SearchField';
import './CheckListModal.css';

export interface CheckListOption {
  /** Stable value, returned in `onChange`. */
  value: string;
  /** Row text, e.g. “Pending”. */
  label: ReactNode;
  disabled?: boolean;
}

export interface CheckListModalProps extends Omit<ModalProps, 'children' | 'onChange' | 'size' | 'icon' | 'headerAction'> {
  /** Rows of the list. Figma: 8 statuses. */
  options: CheckListOption[];
  /** Values of the checked rows. */
  value?: string[];
  /** Called with the new list of checked values. */
  onChange?: (value: string[]) => void;
  /** Text of the first row that checks / clears every option (Figma `All`). Omit it for no such row. */
  allLabel?: ReactNode;
  /** Info text under the title (Figma: a hidden 460px text in the header) — `Modal` `description`. */
  description?: ReactNode;
  /** Shows a search field above the list (Figma: a hidden `Search Box`). Filters the rows by their text. */
  searchable?: boolean;
  /** Placeholder of the search field. */
  searchPlaceholder?: string;
  /** Accessible name of the list. Defaults to the title. */
  listLabel?: string;
  /** Hides the list; the header button then shows a chevron down. Not in Figma (AI-defined). */
  collapsed?: boolean;
  /** Called on click of the header button (the chevron up, or down when `collapsed`). */
  onCollapse?: () => void;
  /** Accessible name of the header button. */
  collapseLabel?: string;
}

const textOf = (node: ReactNode) => (typeof node === 'string' || typeof node === 'number' ? String(node) : '');

/**
 * Figma `Info Modal`: a 736px dialog with a Semi-Bold title and a chevron button in the header, and under it a list
 * of rows — Medium text at the left, a 24px `Checkbox` at the right, a Stroke Light V1 line between rows.
 * It is the `Modal` surface (size `list`, `elevated`) with a header `Button` and the rows inside.
 */
export function CheckListModal({
  options,
  value = [],
  onChange,
  allLabel,
  description,
  searchable = false,
  searchPlaceholder = 'Search',
  listLabel,
  collapsed = false,
  onCollapse,
  collapseLabel = 'Collapse',
  title,
  className,
  ...rest
}: CheckListModalProps) {
  const [query, setQuery] = useState('');
  const enabled = options.filter((o) => !o.disabled);
  const allChecked = enabled.length > 0 && enabled.every((o) => value.includes(o.value));
  const needle = query.trim().toLowerCase();
  const visible = needle ? options.filter((o) => textOf(o.label).toLowerCase().includes(needle)) : options;

  const toggle = (option: CheckListOption) => {
    onChange?.(value.includes(option.value) ? value.filter((v) => v !== option.value) : [...value, option.value]);
  };
  const toggleAll = () => {
    const locked = value.filter((v) => options.find((o) => o.value === v)?.disabled);
    onChange?.(allChecked ? locked : [...locked, ...enabled.map((o) => o.value)]);
  };

  const classes = ['ds-check-list-modal', className].filter(Boolean).join(' ');

  return (
    <Modal
      {...rest}
      title={title}
      icon={null}
      size="list"
      elevated
      className={classes}
      description={description}
      headerAction={
        <Button
          variant="light"
          iconOnly={collapsed ? 'chevron-down' : 'chevron-up'}
          aria-label={collapseLabel}
          aria-expanded={!collapsed}
          onClick={onCollapse}
        />
      }
    >
      {collapsed ? null : <>
      {searchable && (
        <div className="ds-check-list-modal__search">
          <SearchField
            size="mobile"
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      )}
      <ul className="ds-check-list-modal__list" aria-label={listLabel ?? textOf(title) ?? undefined}>
        {allLabel != null && !needle && (
          <li className="ds-check-list-modal__row">
            <Checkbox className="ds-check-list-modal__check" checked={allChecked} onChange={toggleAll}>
              {allLabel}
            </Checkbox>
          </li>
        )}
        {visible.map((option) => (
          <li key={option.value} className="ds-check-list-modal__row">
            <Checkbox
              className="ds-check-list-modal__check"
              checked={value.includes(option.value)}
              disabled={option.disabled}
              onChange={() => toggle(option)}
            >
              {option.label}
            </Checkbox>
          </li>
        ))}
        {visible.length === 0 && <li className="ds-check-list-modal__empty">Nothing found</li>}
      </ul>
      </>}
    </Modal>
  );
}

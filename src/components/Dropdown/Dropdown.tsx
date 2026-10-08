import { useId, useState, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import { Checkbox } from '../Checkbox';
import { Icon } from '../Icon';
import { Scrollbar } from '../Scrollbar';
import { SearchField, type SearchFieldProps } from '../SearchField';
import './Dropdown.css';

/** Figma `Style`: `list` = Standart / Radio Button / Checkbox (± Search), `notifications` = Notification, `user` = User Dropdown. */
export type DropdownVariant = 'list' | 'notifications' | 'user';

/** `list` rows: plain text (Figma Standart), with a radio (Radio Button) or with a checkbox (Checkbox). */
export type DropdownControl = 'none' | 'radio' | 'checkbox';

export interface DropdownOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
  /** Preview only: draws the hover row of Figma. Real hover comes from CSS. */
  forceHover?: boolean;
}

export interface DropdownNotification {
  id: string;
  text: ReactNode;
  /** Unread: the row has the BG Color fill (the first row in Figma). */
  unread?: boolean;
}

export interface DropdownAction {
  value: string;
  label: ReactNode;
  /** Preview only: draws the hover row of Figma. */
  forceHover?: boolean;
}

export interface DropdownProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Figma `Style` family. */
  variant?: DropdownVariant;

  // ── list ──
  /** `list`: rows of the menu. */
  options?: DropdownOption[];
  /** `list`: Figma Standart (`none`), Radio Button (`radio`), Checkbox (`checkbox`). `checkbox` is multi-select. */
  control?: DropdownControl;
  /** `list`: adds a `SearchField` on top that filters the rows (Figma `… & Search`). */
  searchable?: boolean;
  /** `list`: props of the `SearchField`. */
  searchProps?: Omit<SearchFieldProps, 'size' | 'value' | 'defaultValue'>;
  /** `list`: controlled value — a string, or an array for `control="checkbox"`. */
  value?: string | string[];
  /** `list`: initial value when uncontrolled. */
  defaultValue?: string | string[];
  /** `list`: called with the new value (an array for `control="checkbox"`). */
  onChange?: (value: string | string[]) => void;
  /** `list`: text when the search finds nothing. */
  emptyLabel?: ReactNode;
  /**
   * `list`: show at most this many rows, the rest scrolls under the Figma dropdown `Scrollbar`
   * (Figma SortBy shows 4 rows). Without it the panel grows with its content.
   */
  maxRows?: number;
  /** `list` with `maxRows`: accessible name of the scrolling list. */
  listLabel?: string;

  // ── notifications ──
  notifications?: DropdownNotification[];
  /** `notifications`: called when a row is pressed. */
  onNotificationClick?: (id: string) => void;
  /** `notifications`: called on “See all”. */
  onSeeAll?: () => void;
  seeAllLabel?: ReactNode;

  // ── user ──
  /** `user`: first line, e.g. “David Schwimmer”. */
  name?: ReactNode;
  /** `user`: second line (Hover Blue), e.g. an e-mail. */
  email?: ReactNode;
  /** `user`: rows under the divider, e.g. Settings, Logout. */
  actions?: DropdownAction[];
  /** `user`: called with the action `value`. */
  onAction?: (value: string) => void;
}

const DEFAULT_OPTIONS: DropdownOption[] = [
  { value: 'none', label: 'None' },
  { value: 'pending', label: 'Pending' },
  { value: 'shipping', label: 'In shipping' },
  { value: 'received', label: 'Received' },
];

const DEFAULT_NOTIFICATIONS: DropdownNotification[] = [
  { id: '1', text: 'Check the warehouse “Warsaw #345” - problems with the quantity!', unread: true },
  { id: '2', text: 'Check the warehouse “Chongqing #3” - problems with the quantity!' },
  { id: '3', text: 'Check the warehouse “Chongqing #3” - problems with the quantity!' },
];

const DEFAULT_ACTIONS: DropdownAction[] = [
  { value: 'settings', label: 'Settings' },
  { value: 'logout', label: 'Logout' },
];

const toArray = (v: string | string[] | undefined) => (v === undefined ? [] : Array.isArray(v) ? v : [v]);

/**
 * Figma `Dropdown` (8 styles) as ONE component: a white menu panel with a Stroke Light V1 border and the
 * Tooltip shadow. `variant="list"` + `control` + `searchable` cover Standart / Radio Button / Checkbox
 * and their `& Search` forms; `notifications` and `user` are the two special panels.
 * It draws only the panel — opening, positioning and closing belong to the trigger.
 */
export function Dropdown({
  variant = 'list',
  options = DEFAULT_OPTIONS,
  control = 'none',
  searchable = false,
  searchProps,
  value,
  defaultValue,
  onChange,
  emptyLabel = 'Nothing found',
  maxRows,
  listLabel = 'Options',
  notifications = DEFAULT_NOTIFICATIONS,
  onNotificationClick,
  onSeeAll,
  seeAllLabel = 'See all',
  name = 'David Schwimmer',
  email = 'davidschwimmer23@gmail.com',
  actions = DEFAULT_ACTIONS,
  onAction,
  className,
  ...rest
}: DropdownProps) {
  const groupName = useId();
  const [inner, setInner] = useState<string | string[] | undefined>(defaultValue);
  const [query, setQuery] = useState('');
  const current = toArray(value !== undefined ? value : inner);

  const choose = (optionValue: string) => {
    let next: string | string[];
    if (control === 'checkbox') {
      next = current.includes(optionValue) ? current.filter((v) => v !== optionValue) : [...current, optionValue];
    } else {
      next = optionValue;
    }
    setInner(next);
    onChange?.(next);
  };

  const classes = [
    'ds-dropdown',
    `ds-dropdown--${variant}`,
    variant === 'list' && searchable && 'ds-dropdown--search',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // ─── notifications ─────────────────────────────────────────────────────
  if (variant === 'notifications') {
    return (
      <div className={classes} {...rest}>
        <ul className="ds-dropdown__notifications">
          {notifications.map((n) => {
            const body = (
              <>
                <Icon name="warning-v2" size={16} color="current" className="ds-dropdown__warning" />
                <span className="ds-dropdown__notification-text">{n.text}</span>
              </>
            );
            return (
              <li key={n.id} className={`ds-dropdown__notification${n.unread ? ' is-unread' : ''}`}>
                {onNotificationClick ? (
                  <button type="button" className="ds-dropdown__notification-button" onClick={() => onNotificationClick(n.id)}>
                    {body}
                  </button>
                ) : (
                  <span className="ds-dropdown__notification-button">{body}</span>
                )}
              </li>
            );
          })}
        </ul>
        <button type="button" className="ds-dropdown__see-all" onClick={onSeeAll}>
          <span>{seeAllLabel}</span>
          <Icon name="chevron-right" size={16} color="current" />
        </button>
      </div>
    );
  }

  // ─── user ──────────────────────────────────────────────────────────────
  if (variant === 'user') {
    return (
      <div className={classes} {...rest}>
        <div className="ds-dropdown__group">
          <div className="ds-dropdown__row ds-dropdown__row--static">{name}</div>
          <div className="ds-dropdown__row ds-dropdown__row--static ds-dropdown__row--email">{email}</div>
        </div>
        <hr className="ds-dropdown__divider" />
        <div role="menu" className="ds-dropdown__group">
          {actions.map((action) => (
            <button
              key={action.value}
              type="button"
              role="menuitem"
              className={`ds-dropdown__row ds-dropdown__row--button${action.forceHover ? ' is-hover' : ''}`}
              onClick={() => onAction?.(action.value)}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ─── list ──────────────────────────────────────────────────────────────
  const needle = query.trim().toLowerCase();
  const visible = needle
    ? options.filter((o) => typeof o.label !== 'string' || o.label.toLowerCase().includes(needle))
    : options;

  const rows = visible.map((option) => {
    const selected = current.includes(option.value);
    const rowClasses = [
      'ds-dropdown__row',
      selected && 'is-selected',
      option.forceHover && 'is-hover',
      option.disabled && 'is-disabled',
    ]
      .filter(Boolean)
      .join(' ');

    if (control === 'none') {
      return (
        <div
          key={option.value}
          role="option"
          aria-selected={selected}
          aria-disabled={option.disabled || undefined}
          tabIndex={option.disabled ? undefined : 0}
          className={rowClasses}
          onClick={() => !option.disabled && choose(option.value)}
          onKeyDown={(e) => {
            if (!option.disabled && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              choose(option.value);
            }
          }}
        >
          {option.label}
        </div>
      );
    }

    return (
      <div key={option.value} className={`${rowClasses} ds-dropdown__row--control`}>
        <Checkbox
          type={control}
          size={16}
          name={control === 'radio' ? groupName : undefined}
          checked={selected}
          disabled={option.disabled}
          onChange={() => choose(option.value)}
        >
          {option.label}
        </Checkbox>
      </div>
    );
  });

  const listRole = control === 'none' ? 'listbox' : control === 'radio' ? 'radiogroup' : 'group';

  return (
    <div className={classes} {...rest}>
      {searchable && (
        <SearchField
          {...searchProps}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            searchProps?.onChange?.(e);
          }}
        />
      )}
      {(() => {
        const content =
          rows.length > 0 ? rows : <div className="ds-dropdown__row ds-dropdown__row--static ds-dropdown__empty">{emptyLabel}</div>;
        return maxRows ? (
          <Scrollbar
            variant="dropdown"
            role={listRole}
            aria-label={listLabel}
            className="ds-dropdown__group ds-dropdown__group--scroll"
            style={{ '--ds-dropdown-rows': maxRows } as CSSProperties}
          >
            {content}
          </Scrollbar>
        ) : (
          <div role={listRole} className="ds-dropdown__group">
            {content}
          </div>
        );
      })()}
    </div>
  );
}

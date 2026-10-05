import { useId, type HTMLAttributes } from 'react';
import { Icon } from '../Icon';
import './ViewSwitch.css';

export type ViewMode = 'cards' | 'list';

export interface ViewSwitchProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current view. */
  value: ViewMode;
  onChange?: (value: ViewMode) => void;
  /** Label before the icons. */
  label?: string;
  /** Accessible names of the two buttons. */
  cardsLabel?: string;
  listLabel?: string;
}

const MODES: { mode: ViewMode; icon: 'cards-view' | 'list-view' }[] = [
  { mode: 'cards', icon: 'cards-view' },
  { mode: 'list', icon: 'list-view' },
];

/**
 * Figma `viewing style`: “View:” label and two 24px icon buttons — cards and list.
 * The chosen view is Primary Blue Dark, the other is Secondary Grey and turns Hover Blue Light on hover.
 */
export function ViewSwitch({
  value,
  onChange,
  label = 'View:',
  cardsLabel = 'Cards view',
  listLabel = 'List view',
  className,
  ...rest
}: ViewSwitchProps) {
  const labelId = useId();
  const names: Record<ViewMode, string> = { cards: cardsLabel, list: listLabel };
  const classes = ['ds-view-switch', className].filter(Boolean).join(' ');

  return (
    <div role="group" aria-labelledby={labelId} className={classes} {...rest}>
      <span className="ds-view-switch__label" id={labelId}>
        {label}
      </span>
      <div className="ds-view-switch__buttons">
        {MODES.map(({ mode, icon }) => (
          <button
            key={mode}
            type="button"
            className={`ds-view-switch__button${mode === value ? ' is-active' : ''}`}
            aria-label={names[mode]}
            aria-pressed={mode === value}
            onClick={() => onChange?.(mode)}
          >
            <Icon name={icon} size={24} color="current" />
          </button>
        ))}
      </div>
    </div>
  );
}

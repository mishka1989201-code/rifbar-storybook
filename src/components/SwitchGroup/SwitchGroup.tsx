import type { HTMLAttributes, ReactNode } from 'react';
import { Icon, type IconName } from '../Icon';
import { SwitchButton, type SwitchButtonStyle } from '../SwitchButton';
import './SwitchGroup.css';

export interface SwitchGroupOption<T extends string = string> {
  /** Value passed to `onChange`. */
  value: T;
  /** Text of the button, e.g. “Purchase” or “Pending (8)”. */
  label: ReactNode;
  /** Optional 16px icon before the label (Figma Light: truck, bag). */
  icon?: IconName;
  disabled?: boolean;
}

export interface SwitchGroupProps<T extends string = string>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: SwitchGroupOption<T>[];
  /** Value of the chosen option. */
  value: T;
  onChange?: (value: T) => void;
  /** `light` — white card with the chosen button in Secondary Light; `dark` — grey track with the chosen button in Primary Blue Dark. */
  tone?: SwitchButtonStyle;
  /** Accessible name of the group. */
  'aria-label'?: string;
}

/**
 * Figma `Switch` (Light / Dark / Light Hover / Hover Dark): a track that holds `SwitchButton`s,
 * one of them chosen. Hover is a state of the buttons, not a prop.
 */
export function SwitchGroup<T extends string = string>({
  options,
  value,
  onChange,
  tone = 'light',
  className,
  ...rest
}: SwitchGroupProps<T>) {
  const classes = ['ds-switch-group', `ds-switch-group--${tone}`, className].filter(Boolean).join(' ');
  return (
    <div role="group" className={classes} {...rest}>
      {options.map((option) => (
        <SwitchButton
          key={option.value}
          className="ds-switch-group__button"
          variant={tone}
          active={option.value === value}
          disabled={option.disabled}
          onClick={() => onChange?.(option.value)}
        >
          {option.icon && <Icon name={option.icon} size={16} color="current" />}
          {option.label}
        </SwitchButton>
      ))}
    </div>
  );
}

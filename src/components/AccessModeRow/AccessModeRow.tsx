import { useId, type HTMLAttributes, type ReactNode } from 'react';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import './AccessModeRow.css';

export type AccessMode = 'default' | 'custom';

export interface AccessModeRowProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Chosen mode. */
  value: AccessMode;
  onChange?: (value: AccessMode) => void;
  /** Called when “Edit” is pressed. The button is active only in `custom` mode. */
  onEdit?: () => void;
  /** Figma `Property 1=Disabled`: the whole row is at 20% and not interactive. */
  disabled?: boolean;
  defaultLabel?: ReactNode;
  customLabel?: ReactNode;
  editLabel?: ReactNode;
  /** Group name of the two radios. Generated when omitted. */
  name?: string;
}

/**
 * Figma `Edit User Access` (Property 1 = Custom / Default / Disabled): a grey card with two radios —
 * Default and Custom — and an “Edit” button that works only for Custom.
 */
export function AccessModeRow({
  value,
  onChange,
  onEdit,
  disabled = false,
  defaultLabel = 'Default',
  customLabel = 'Custom',
  editLabel = 'Edit',
  name,
  className,
  ...rest
}: AccessModeRowProps) {
  const generated = useId();
  const group = name ?? generated;
  const classes = ['ds-access-row', disabled && 'is-disabled', className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...rest}>
      <div role="radiogroup" className="ds-access-row__radios">
        <Checkbox
          type="radio"
          size={16}
          name={group}
          value="default"
          checked={value === 'default'}
          disabled={disabled}
          onChange={() => onChange?.('default')}
        >
          {defaultLabel}
        </Checkbox>
        <Checkbox
          type="radio"
          size={16}
          name={group}
          value="custom"
          checked={value === 'custom'}
          disabled={disabled}
          onChange={() => onChange?.('custom')}
        >
          {customLabel}
        </Checkbox>
      </div>
      <Button variant="outline" iconLeft="edit" disabled={disabled || value !== 'custom'} onClick={onEdit}>
        {editLabel}
      </Button>
    </div>
  );
}

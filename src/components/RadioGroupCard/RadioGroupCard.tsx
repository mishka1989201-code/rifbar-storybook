import { useId, useState, type HTMLAttributes, type ReactNode } from 'react';
import { Checkbox } from '../Checkbox';
import './RadioGroupCard.css';

export interface RadioGroupCardOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface RadioGroupCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'title' | 'defaultValue'> {
  /** Caption above the card, e.g. “Integrations for invoices”. */
  title?: ReactNode;
  options: RadioGroupCardOption[];
  /** Controlled value. */
  value?: string;
  /** Initial value when uncontrolled. */
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Whole group at 20% and not interactive. */
  disabled?: boolean;
  /** Group name of the radios. Generated when omitted. */
  name?: string;
}

/**
 * Figma `Integrations for invoices` (Edit User Access card with a title): a caption and a grey card
 * with a row of radio options. The chosen option is Medium / Headlines, the others Regular / Grey Dark.
 */
export function RadioGroupCard({
  title,
  options,
  value,
  defaultValue,
  onChange,
  disabled = false,
  name,
  className,
  ...rest
}: RadioGroupCardProps) {
  const generated = useId();
  const group = name ?? generated;
  const titleId = `${generated}-title`;
  const [inner, setInner] = useState(defaultValue);
  const current = value ?? inner;
  const classes = ['ds-radio-group-card', disabled && 'is-disabled', className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...rest}>
      {title != null && (
        <p id={titleId} className="ds-radio-group-card__title">
          {title}
        </p>
      )}
      <div
        role="radiogroup"
        aria-labelledby={title != null ? titleId : undefined}
        aria-disabled={disabled || undefined}
        className="ds-radio-group-card__card"
      >
        {options.map((option) => (
          <Checkbox
            key={option.value}
            type="radio"
            size={16}
            name={group}
            value={option.value}
            checked={current === option.value}
            disabled={disabled || option.disabled}
            onChange={() => {
              setInner(option.value);
              onChange?.(option.value);
            }}
          >
            {option.label}
          </Checkbox>
        ))}
      </div>
    </div>
  );
}

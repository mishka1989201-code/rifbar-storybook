import { useId, type HTMLAttributes, type ReactNode } from 'react';
import { InputField } from '../InputField';
import './TableRowQuantity.css';

export interface TableRowQuantityProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onChange' | 'defaultValue'> {
  /** Item name on the left, e.g. “Banana Ice”. */
  name: ReactNode;
  /** Optional thumbnail before the name (Figma `Image and Name`, image hidden in this frame), e.g. an `ImageCard`. */
  image?: ReactNode;
  /** Values between the name and the field, e.g. unit price and total (Figma shows two `$15`). */
  prices?: ReactNode[];
  /** Controlled quantity. Leave it out for an uncontrolled field. */
  value?: string;
  defaultValue?: string;
  /** Called with the new quantity on every keystroke. */
  onChange?: (value: string) => void;
  /** Figma `Type amount`. */
  placeholder?: string;
  /** The field is disabled (20% opacity, from `InputField`). */
  disabled?: boolean;
  /** Danger border and `aria-invalid` (from `InputField`). */
  invalid?: boolean;
  /** Preview only: forces the field's hover look. */
  forceHover?: boolean;
  /** Preview only: forces the field's focus look. */
  forceFocus?: boolean;
}

/**
 * Figma `TableRows / Choice of quantity` → one row: white 10px card with the item name, prices
 * and a 200px quantity `InputField`. The name is the accessible label of the field.
 */
export function TableRowQuantity({
  name,
  image,
  prices = [],
  value,
  defaultValue,
  onChange,
  placeholder = 'Type amount',
  disabled,
  invalid,
  forceHover,
  forceFocus,
  className,
  ...rest
}: TableRowQuantityProps) {
  const nameId = useId();
  const classes = ['ds-table-row-quantity', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...rest}>
      <div className="ds-table-row-quantity__item">
        {image}
        <span id={nameId} className="ds-table-row-quantity__name">
          {name}
        </span>
      </div>
      <div className="ds-table-row-quantity__values">
        {prices.map((price, index) => (
          <span key={index} className="ds-table-row-quantity__price">
            {price}
          </span>
        ))}
        <InputField
          className="ds-table-row-quantity__input"
          inputMode="numeric"
          aria-labelledby={nameId}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          invalid={invalid}
          forceHover={forceHover}
          forceFocus={forceFocus}
          onChange={(e) => onChange?.(e.target.value)}
        />
      </div>
    </div>
  );
}
